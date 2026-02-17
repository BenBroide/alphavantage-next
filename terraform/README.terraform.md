# Terraform Deployment Guide

This Terraform configuration creates:
- An S3 bucket with versioning enabled
- An IAM user with read/write access to the bucket
- Access credentials for the IAM user

## Prerequisites

1. Install Terraform: https://www.terraform.io/downloads
2. Configure AWS credentials:
   ```bash
   aws configure
   ```
   Or set environment variables:
   ```bash
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   export AWS_DEFAULT_REGION="us-east-1"
   ```

## Deployment Steps

### 1. Initialize Terraform
```bash
terraform init
```

### 2. Review the plan
```bash
terraform plan
```

### 3. Apply the configuration
```bash
terraform apply
```
Type `yes` when prompted to confirm.

### 4. View outputs
```bash
terraform output
```

To see the secret access key (it's marked as sensitive):
```bash
terraform output iam_secret_access_key
```

### 5. Save credentials
Save the outputs to a file (don't commit this file):
```bash
terraform output -json > terraform-outputs.json
```

## Outputs

After deployment, you'll get:
- `bucket_name` - The S3 bucket name
- `bucket_arn` - The S3 bucket ARN
- `bucket_region` - The region where bucket was created
- `iam_user_name` - IAM user name
- `iam_user_arn` - IAM user ARN
- `iam_access_key_id` - Access key ID (for AWS SDK)
- `iam_secret_access_key` - Secret access key (sensitive, use `terraform output iam_secret_access_key`)

## Customization

You can customize the deployment by creating a `terraform.tfvars` file:
```hcl
aws_region   = "us-west-2"
project_name = "my-custom-name"
```

## Cleanup

To destroy all resources:
```bash
terraform destroy
```
Type `yes` when prompted to confirm.

## Security Notes

- The IAM user has read/write access ONLY to this specific bucket
- The bucket has public access blocked by default
- Versioning is enabled to prevent accidental data loss
- The secret access key is marked as sensitive in outputs
- Never commit `terraform.tfstate` or `*.tfvars` files to version control
