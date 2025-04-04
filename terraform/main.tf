provider "aws" {
  profile = "default"
  region  = "ap-southeast-1"
}

variable "public_stripe_key" {
  description = "Public Stripe Key"
  type        = string
  sensitive   = true
}

variable "secret_stripe_key" {
  description = "Secret Stripe Key"
  type        = string
  sensitive   = true
}

variable "stripe_webhook_secret" {
  description = "Stripe Webhook Secret"
  type        = string
  sensitive   = true
}

terraform {
  backend "s3" {
    bucket  = "bwh-tf-state"
    key     = "infra/terraform.tfstate"
    region  = "ap-southeast-1"
    profile = "default"

    dynamodb_table = "bwh-tf-state-lock"
    encrypt        = true
  }
}
