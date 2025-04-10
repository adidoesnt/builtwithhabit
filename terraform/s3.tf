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
