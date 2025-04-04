resource "aws_secretsmanager_secret" "bwh_stripe_keys" {
  name = "bwh-stripe-keys-2"
}

resource "aws_secretsmanager_secret_version" "bwh_stripe_keys_version" {
  secret_id = aws_secretsmanager_secret.bwh_stripe_keys.id
  secret_string = jsonencode({
    public_stripe_key     = var.public_stripe_key
    secret_stripe_key     = var.secret_stripe_key
    stripe_webhook_secret = var.stripe_webhook_secret
  })
}
