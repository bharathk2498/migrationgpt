# Sample Files for Testing MigrationGPT

These sample infrastructure files are designed to demonstrate MigrationGPT's analysis capabilities.

## Files Included

### 1. sample-infrastructure.tf
**Type:** Terraform  
**Cloud:** AWS  
**Resources:** Web servers, database, S3 bucket, VPC, load balancer

**Intentional Issues:**
- Unencrypted storage (database, S3)
- Publicly accessible database
- Overly permissive security groups
- Weak passwords in code
- No deletion protection
- Public S3 bucket

**Expected Analysis:**
- Risk Score: 70-80 (High)
- Findings: 12-15 security issues
- Estimated Cost: $250K-$350K
- Timeline: 18-22 weeks

---

### 2. sample-cloudformation.json
**Type:** CloudFormation  
**Cloud:** AWS  
**Resources:** EC2 instance, RDS database, S3 bucket, security group

**Intentional Issues:**
- Similar security issues as Terraform example
- CloudFormation-specific patterns

**Expected Analysis:**
- Risk Score: 65-75 (Medium-High)
- Findings: 8-12 security issues
- Estimated Cost: $180K-$280K
- Timeline: 14-18 weeks

---

## How to Use

### Via Web Interface

1. Start MigrationGPT:
```bash
./start.sh
```

2. Open http://localhost:3000

3. Upload one of these sample files

4. View analysis results!

---

### Via API

```bash
# Analyze Terraform file
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@samples/sample-infrastructure.tf" \
  -F "project_name=terraform-demo" \
  -F "target_cloud=aws"

# Analyze CloudFormation file
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@samples/sample-cloudformation.json" \
  -F "project_name=cloudformation-demo" \
  -F "target_cloud=aws"
```

---

## What MigrationGPT Will Find

### Security Findings
• **Critical Issues:**
  - Unencrypted databases
  - Public S3 buckets
  - Publicly accessible databases

• **High Priority:**
  - Overly permissive firewall rules
  - SSH open to internet (0.0.0.0/0)
  - Weak password management

• **Medium Priority:**
  - No deletion protection
  - Missing backup encryption
  - Insufficient network segmentation

### Cost Analysis
• Migration cost breakdown
• Operational cost projections
• Optimization opportunities (20-30% savings)
• 3-year TCO calculation

### Architecture Recommendations
• Containerization strategy
• Multi-AZ deployment
• Managed services migration
• Infrastructure as Code templates

### Migration Timeline
• Phased approach (4-6 phases)
• Week-by-week breakdown
• Resource allocation
• Risk mitigation steps

---

## Creating Your Own Test Files

You can create custom test files:

### Terraform Example
```hcl
resource "aws_instance" "test" {
  ami           = "ami-12345"
  instance_type = "t3.micro"
}
```

### CloudFormation Example
```json
{
  "Resources": {
    "MyInstance": {
      "Type": "AWS::EC2::Instance",
      "Properties": {
        "InstanceType": "t3.micro"
      }
    }
  }
}
```

---

## Tips for Best Results

1. **Include variety:** Mix compute, storage, database, networking resources
2. **Add complexity:** More resources = more detailed analysis
3. **Real scenarios:** Use patterns from actual infrastructure
4. **Security issues:** Include some intentional issues to test detection

---

## Demo Mode vs Production Mode

**Demo Mode** (Default):
- Instant analysis (30 seconds)
- Mock AI responses
- Realistic but simulated results
- No AWS credentials needed

**Production Mode** (Optional):
- Real AI analysis (2-5 minutes)
- AWS Bedrock powered
- Highly accurate results
- Requires AWS credentials

---

## Need Help?

Check the main README or open an issue:
https://github.com/bharathk2498/migrationgpt/issues
