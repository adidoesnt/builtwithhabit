resource "aws_lambda_function" "check_payment_intent_status" {
  function_name = "bwh-check-payment-intent-status"
  role          = aws_iam_role.bwh_check_payment_intent_status_lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  filename         = "./check-payment-intent-status-lambda.zip"
  source_code_hash = filebase64sha256("./check-payment-intent-status-lambda.zip")
}

resource "aws_lambda_event_source_mapping" "bwh_payment_intent_queue_mapping" {
  event_source_arn = aws_sqs_queue.bwh_payment_intent_queue.arn
  function_name    = aws_lambda_function.check_payment_intent_status.arn
  enabled          = true
  batch_size       = 1
}
