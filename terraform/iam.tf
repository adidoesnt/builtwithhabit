resource "aws_iam_policy" "bwh_check_payment_intent_status_lambda_policy" {
  name = "bwh-check-payment-intent-status-lambda-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "secretsmanager:GetSecretValue",
        Resource = aws_secretsmanager_secret.bwh_stripe_keys.arn
      },
      {
        Effect = "Allow"
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ]
        Resource = aws_sqs_queue.bwh_payment_intent_queue.arn
      }
    ]
  })
}

resource "aws_iam_role" "bwh_check_payment_intent_status_lambda_role" {
  name = "bwh-check-payment-intent-status-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "bwh_check_payment_intent_status_lambda_policy_attachment" {
  role       = aws_iam_role.bwh_check_payment_intent_status_lambda_role.name
  policy_arn = aws_iam_policy.bwh_check_payment_intent_status_lambda_policy.arn
}

resource "aws_iam_role_policy_attachment" "bwh_check_payment_intent_status_lambda_basic_execution_policy_attachment" {
  role       = aws_iam_role.bwh_check_payment_intent_status_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
