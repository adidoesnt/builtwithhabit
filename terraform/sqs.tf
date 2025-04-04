resource "aws_sqs_queue" "bwh_payment_intent_queue" {
  name                       = "bwh-payment-intent-queue"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 86400
  delay_seconds              = 900
  receive_wait_time_seconds  = 20
}
