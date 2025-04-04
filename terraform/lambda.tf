resource "aws_lambda_function" "check_payment_intent_status" {
  function_name = "bwh-check-payment-intent-status"
  role = aws_iam_role.bwh_lambda_role.arn
  handler = "index.handler"
  runtime = "nodejs18.x"

  filename = "./lambda.zip"
  source_code_hash = filebase64sha256("./lambda.zip")
}
