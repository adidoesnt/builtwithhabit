provider "aws" {
  profile = "default"
  region  = "ap-southeast-1"
}

variable "access_key_id" {
  description = "AWS Access Key ID for BWH"
  type        = string
}

variable "secret_access_key" {
  description = "AWS Secret Access Key for BWH"
  type        = string
}

# TODO: Create the backend bucket and lock table

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
