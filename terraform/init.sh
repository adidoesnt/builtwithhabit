source .envrc

# Create TF State S3 Bucket
aws s3api create-bucket --bucket bwh-tf-state --region ap-southeast-1 --create-bucket-configuration LocationConstraint=ap-southeast-1 >> /dev/null 2>&1
aws s3api put-bucket-versioning --bucket bwh-tf-state --versioning-configuration Status=Enabled >> /dev/null 2>&1

# Create TF State Lock DynamoDB Table
aws dynamodb create-table \
    --table-name bwh-tf-state-lock \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region ap-southeast-1 >> /dev/null 2>&1
