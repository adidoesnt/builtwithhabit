const { S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const s3Client = new S3Client({ region: 'ap-southeast-1' });
const sesClient = new SESClient({ region: 'ap-southeast-1' });

async function streamToString(stream) {
	const chunks = [];
	for await (const chunk of stream) {
		chunks.push(chunk);
	}
	return Buffer.concat(chunks).toString('utf-8');
}

function parseEmail(emailContent) {
	// Parse email headers and content
	const lines = emailContent.split('\n');
	const headers = {};
	let bodyStartIndex = 0;
	let inHeaders = true;

	// Parse headers
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Empty line indicates end of headers
		if (line.trim() === '') {
			bodyStartIndex = i + 1;
			inHeaders = false;
			break;
		}

		// Parse header line
		if (inHeaders && line.includes(':')) {
			const colonIndex = line.indexOf(':');
			const headerName = line.substring(0, colonIndex).trim().toLowerCase();
			const headerValue = line.substring(colonIndex + 1).trim();
			headers[headerName] = headerValue;
		}
	}

	// Extract body content
	const bodyLines = lines.slice(bodyStartIndex);
	const body = bodyLines.join('\n').trim();

	// Extract key information
	const from = headers['from'] || 'Unknown Sender';
	const to = headers['to'] || 'Unknown Recipient';
	const subject = headers['subject'] || 'No Subject';
	const date = headers['date'] || new Date().toISOString();

	return {
		from,
		to,
		subject,
		date,
		body,
		headers,
		rawContent: emailContent
	};
}

async function forwardEmail(email) {
	// Get destination email from environment variable
	const forwardToEmails = process.env.FORWARD_TO_EMAILS?.split(',') ?? [
		'irm5es@virginia.edu',
		'aditya_banerjee@icloud.com'
	];
	const fromEmail = process.env.FROM_EMAIL ?? 'admin@builtwithhabit.com';

	// Create forwarded subject
	const forwardedSubject = `Fwd: ${email.subject}`;

	// Create forwarded body with original email content
	const forwardedBody = `
--- Forwarded Message ---
From: ${email.from}
To: ${email.to}
Date: ${email.date}
Subject: ${email.subject}

${email.body}

--- End Forwarded Message ---
	`.trim();

	// Send email using SES
	await Promise.allSettled(
		forwardToEmails.map(async (forwardToEmail) => {
			const sendEmailCommand = new SendEmailCommand({
				Source: fromEmail,
				Destination: {
					ToAddresses: [forwardToEmail]
				},
				Message: {
					Subject: {
						Data: forwardedSubject,
						Charset: 'UTF-8'
					},
					Body: {
						Text: {
							Data: forwardedBody,
							Charset: 'UTF-8'
						}
					}
				}
			});

			try {
				const result = await sesClient.send(sendEmailCommand);
				console.log('Email forwarded successfully:', result.MessageId);
				return result;
			} catch (error) {
				console.error('Error sending email via SES:', error);
				throw error;
			}
		})
	);
}

exports.handler = async (event) => {
	try {
		// Parse the event
		console.log('Received event:', JSON.stringify(event, null, 2));
		const record = event.Records[0];

		const bucketName = record.s3.bucket.name;
		const key = decodeURIComponent(record.s3.object.key);
		console.log('Bucket name:', bucketName);
		console.log('Key:', key);

		// Get the file from the S3 bucket
		const getObjectCommand = new GetObjectCommand({
			Bucket: bucketName,
			Key: key
		});
		const emailData = await s3Client.send(getObjectCommand);
		const emailContent = await streamToString(emailData.Body);
		const email = parseEmail(emailContent);
		await forwardEmail(email);

		// Delete the file from the S3 bucket
		const deleteObjectCommand = new DeleteObjectCommand({
			Bucket: bucketName,
			Key: key
		});
		await s3Client.send(deleteObjectCommand);
	} catch (error) {
		console.error('Error forwarding BWH emails:', error);
		throw error;
	}
};
