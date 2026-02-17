terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "alphavantage-next"
}

# S3 Bucket
resource "aws_s3_bucket" "app_bucket" {
  bucket = "${var.project_name}-${random_id.bucket_suffix.hex}"

  tags = {
    Name        = "${var.project_name}-bucket"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}

# Random suffix for unique bucket name
resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# Block public access
resource "aws_s3_bucket_public_access_block" "app_bucket" {
  bucket = aws_s3_bucket.app_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning
resource "aws_s3_bucket_versioning" "app_bucket" {
  bucket = aws_s3_bucket.app_bucket.id
  
  versioning_configuration {
    status = "Enabled"
  }
}

# IAM User for bucket access
resource "aws_iam_user" "bucket_user" {
  name = "${var.project_name}-s3-user"

  tags = {
    Name        = "${var.project_name}-s3-user"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}

# IAM Access Key for the user
resource "aws_iam_access_key" "bucket_user_key" {
  user = aws_iam_user.bucket_user.name
}

# IAM Policy for bucket read/write access
resource "aws_iam_policy" "bucket_rw_policy" {
  name        = "${var.project_name}-s3-rw-policy"
  description = "Read/Write access to ${var.project_name} S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket",
          "s3:GetBucketLocation"
        ]
        Resource = aws_s3_bucket.app_bucket.arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObjectAcl",
          "s3:PutObjectAcl"
        ]
        Resource = "${aws_s3_bucket.app_bucket.arn}/*"
      }
    ]
  })
}

# Attach policy to user
resource "aws_iam_user_policy_attachment" "bucket_user_policy" {
  user       = aws_iam_user.bucket_user.name
  policy_arn = aws_iam_policy.bucket_rw_policy.arn
}

# Outputs
output "bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.app_bucket.id
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.app_bucket.arn
}

output "bucket_region" {
  description = "Region of the S3 bucket"
  value       = aws_s3_bucket.app_bucket.region
}

output "iam_user_name" {
  description = "IAM user name"
  value       = aws_iam_user.bucket_user.name
}

output "iam_user_arn" {
  description = "IAM user ARN"
  value       = aws_iam_user.bucket_user.arn
}

output "iam_access_key_id" {
  description = "IAM user access key ID"
  value       = aws_iam_access_key.bucket_user_key.id
}

output "iam_secret_access_key" {
  description = "IAM user secret access key"
  value       = aws_iam_access_key.bucket_user_key.secret
  sensitive   = true
}
