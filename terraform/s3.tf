# Production
resource "aws_s3_bucket" "bwh_main_bucket" {
  bucket = "bwh-main-bucket"

  tags = {
    Name = "BWH Main Bucket"
  }
}

resource "aws_s3_bucket_public_access_block" "bwh_main_bucket_public_access" {
  bucket = aws_s3_bucket.bwh_main_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
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
    allowed_origins = ["*.builtwithhabit.com"]
    allowed_headers = ["Content-Type"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "bwh_main_bucket_policy" {
  bucket = aws_s3_bucket.bwh_main_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.bwh_main_bucket.arn}/assets/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.bwh_main_bucket_public_access]
}

# Staging
resource "aws_s3_bucket" "bwh_staging_bucket" {
  bucket = "bwh-staging-bucket"

  tags = {
    Name = "BWH Staging Bucket"
  }
}

resource "aws_s3_bucket_public_access_block" "bwh_staging_bucket_public_access" {
  bucket = aws_s3_bucket.bwh_staging_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
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

resource "aws_s3_bucket_policy" "bwh_staging_bucket_policy" {
  bucket = aws_s3_bucket.bwh_staging_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.bwh_staging_bucket.arn}/assets/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.bwh_staging_bucket_public_access]
}
