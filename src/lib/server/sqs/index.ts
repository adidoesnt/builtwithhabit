import { env } from '$env/dynamic/private';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const { REGION, QUEUE_URL } = env;

const sqs = new SQSClient({ region: REGION });

export const sendMessage = async (message: Record<string, unknown>) => {
	try {
		const messageBody = JSON.stringify(message);

		const command = new SendMessageCommand({
			QueueUrl: QUEUE_URL,
			MessageBody: messageBody
		});

		const result = await sqs.send(command);

		console.log('Message sent to SQS:', result);
	} catch (error) {
		console.error('Error sending message to SQS:', error);
	}
};
