resource "aws_iam_policy" "bwh_lambda_policy" {
  name = "bwh-lambda-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "secretsmanager:GetSecretValue",
        Resource = [
          aws_secretsmanager_secret.bwh_stripe_keys.arn
        ]
      }
    ]
  })
}

resource "aws_iam_role" "bwh_lambda_role" {
  name = "bwh-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "bwh_lambda_policy_attachment" {
  role       = aws_iam_role.bwh_lambda_role.name
  policy_arn = aws_iam_policy.bwh_lambda_policy.arn
}

