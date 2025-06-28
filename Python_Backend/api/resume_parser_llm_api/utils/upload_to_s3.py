import boto3
import os

def upload_file_to_s3(local_file_path: str, s3_key: str) -> str:
    """Upload a file to S3 with proper error handling and URL generation"""
    try:
        # Initialize S3 client with default credentials chain
        # (will automatically check env vars, ~/.aws/credentials, etc.)
        s3 = boto3.client('s3')
        
        bucket_name = os.getenv("AWS_S3_BUCKET")
        if not bucket_name:
            raise ValueError("AWS_S3_BUCKET environment variable not set")
        
        # Sanitize the S3 key (replace spaces and special characters)
        s3_key = s3_key.replace(" ", "_")
        
        # Upload with public-read ACL (modify as needed)
        s3.upload_file(
            local_file_path,
            bucket_name,
            s3_key,
            ExtraArgs={
                'ACL': 'private',  # or 'public-read' if you want public access
                'ContentType': 'application/pdf'
            }
        )
        
        # Generate URL (use virtual-hosted style)
        region = s3.get_bucket_location(Bucket=bucket_name)['LocationConstraint']
        # For us-east-1, the LocationConstraint is None
        if region is None:
            region = 'us-east-1'
            
        return f"https://{bucket_name}.s3.{region}.amazonaws.com/{s3_key}"
        
    except Exception as e:
        raise Exception(f"Failed to upload to S3: {str(e)}")