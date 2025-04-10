# Production
resource "aws_s3_bucket" "bwh_main_bucket" {
  bucket = "bwh-main-bucket"

  tags = {
    Name = "BWH Main Bucket"
  }
}

resource "aws_s3_bucket_versioning" "bwh_main_bucket_versioning" {
  bucket = aws_s3_bucket.bwh_main_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_cors_configuration" "bwh_main_bucket_cors" {
  bucket = aws_s3_bucket.bwh_main_bucket.id

  cors_rule {
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*.beingsofhabit.com", "*.boh-services.com"]
    allowed_headers = ["Content-Type"]
    max_age_seconds = 3000
  }
}

# Staging
resource "aws_s3_bucket" "bwh_staging_bucket" {
  bucket = "bwh-staging-bucket"

  tags = {
    Name = "BWH Staging Bucket"
  }
}

resource "aws_s3_bucket_versioning" "bwh_staging_bucket_versioning" {
  bucket = aws_s3_bucket.bwh_staging_bucket.id

  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_cors_configuration" "bwh_staging_bucket_cors" {
  bucket = aws_s3_bucket.bwh_staging_bucket.id

  cors_rule {
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    allowed_headers = ["*"]
    max_age_seconds = 3000
  }
}
