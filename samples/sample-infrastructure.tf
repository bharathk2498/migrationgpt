# Sample Terraform Infrastructure for Testing MigrationGPT
# This file demonstrates common cloud resources and security issues

provider "aws" {
  region = "us-east-1"
}

# Web Application Servers
resource "aws_instance" "web_server" {
  count         = 3
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
  
  tags = {
    Name        = "web-server-${count.index + 1}"
    Environment = "production"
    Application = "web-app"
  }
  
  # Security Issue: No encryption
  # Security Issue: Public IP
  associate_public_ip_address = true
}

# Database Instance
resource "aws_db_instance" "main_database" {
  identifier     = "production-db"
  engine         = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.large"
  
  allocated_storage = 100
  storage_type      = "gp2"
  
  # Security Issue: No encryption at rest
  storage_encrypted = false
  
  # Security Issue: Publicly accessible
  publicly_accessible = true
  
  username = "admin"
  password = "changeme123"  # Security Issue: Weak password in code
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"
  
  tags = {
    Name        = "main-database"
    Environment = "production"
  }
}

# S3 Storage Bucket
resource "aws_s3_bucket" "application_data" {
  bucket = "my-app-data-bucket-2024"
  
  tags = {
    Name        = "application-data"
    Environment = "production"
  }
}

# Security Issue: Public bucket
resource "aws_s3_bucket_public_access_block" "application_data" {
  bucket = aws_s3_bucket.application_data.id
  
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Security Issue: No encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "application_data" {
  bucket = aws_s3_bucket.application_data.id
  
  # Encryption disabled
  # rule {
  #   apply_server_side_encryption_by_default {
  #     sse_algorithm = "AES256"
  #   }
  # }
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "main-vpc"
  }
}

# Security Group - Web Tier
resource "aws_security_group" "web_tier" {
  name        = "web-tier-sg"
  description = "Security group for web tier"
  vpc_id      = aws_vpc.main.id
  
  # Security Issue: Overly permissive inbound rules
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Open to internet
  }
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "web-tier-security-group"
  }
}

# Load Balancer
resource "aws_lb" "application" {
  name               = "app-load-balancer"
  internal           = false
  load_balancer_type = "application"
  
  subnets = [aws_subnet.public_1.id, aws_subnet.public_2.id]
  
  # Security Issue: No deletion protection
  enable_deletion_protection = false
  
  tags = {
    Name = "application-lb"
  }
}

# Subnets
resource "aws_subnet" "public_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  
  tags = {
    Name = "public-subnet-1"
  }
}

resource "aws_subnet" "public_2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"
  
  tags = {
    Name = "public-subnet-2"
  }
}

# Outputs
output "vpc_id" {
  value = aws_vpc.main.id
}

output "database_endpoint" {
  value = aws_db_instance.main_database.endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.application_data.bucket
}
