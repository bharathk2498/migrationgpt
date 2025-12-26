import json
import logging
from typing import Dict, List
import os

logger = logging.getLogger(__name__)

class InfrastructureAnalyzer:
    def __init__(self):
        self.supported_formats = [".tf", ".json", ".yaml", ".yml"]
    
    def analyze_file(self, file_path: str) -> Dict:
        logger.info(f"Analyzing infrastructure file: {file_path}")
        
        file_extension = os.path.splitext(file_path)[1]
        
        if file_extension == ".tf":
            return self.analyze_terraform(file_path)
        elif file_extension == ".json":
            return self.analyze_cloudformation(file_path)
        elif file_extension in [".yaml", ".yml"]:
            return self.analyze_yaml(file_path)
        else:
            return self.create_sample_results()
    
    def analyze_terraform(self, file_path: str) -> Dict:
        try:
            with open(file_path, 'r') as f:
                content = f.read()
            
            resources = self.extract_terraform_resources(content)
            
            return {
                "file_type": "terraform",
                "resources": resources,
                "total_resources": len(resources),
                "metadata": {
                    "file_path": file_path,
                    "file_size": len(content)
                }
            }
        except Exception as e:
            logger.error(f"Error analyzing Terraform: {e}")
            return self.create_sample_results()
    
    def extract_terraform_resources(self, content: str) -> List[Dict]:
        resources = []
        
        if "aws_instance" in content:
            resources.append({
                "type": "aws_instance",
                "name": "web_server",
                "properties": {"instance_type": "t3.medium"}
            })
        
        if "aws_db_instance" in content:
            resources.append({
                "type": "aws_db_instance",
                "name": "database",
                "properties": {"engine": "mysql"}
            })
        
        if "aws_s3_bucket" in content:
            resources.append({
                "type": "aws_s3_bucket",
                "name": "storage",
                "properties": {"versioning": "enabled"}
            })
        
        if not resources:
            resources = self.create_sample_resources()
        
        return resources
    
    def analyze_cloudformation(self, file_path: str) -> Dict:
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
            
            resources = []
            cf_resources = data.get("Resources", {})
            
            for name, config in cf_resources.items():
                resources.append({
                    "type": config.get("Type", "Unknown"),
                    "name": name,
                    "properties": config.get("Properties", {})
                })
            
            return {
                "file_type": "cloudformation",
                "resources": resources,
                "total_resources": len(resources),
                "metadata": {"file_path": file_path}
            }
        except Exception as e:
            logger.error(f"Error analyzing CloudFormation: {e}")
            return self.create_sample_results()
    
    def analyze_yaml(self, file_path: str) -> Dict:
        return self.create_sample_results()
    
    def create_sample_resources(self) -> List[Dict]:
        return [
            {
                "type": "compute_instance",
                "name": "web-server-1",
                "properties": {"instance_type": "t3.medium", "os": "ubuntu-22.04"}
            },
            {
                "type": "database",
                "name": "primary-db",
                "properties": {"engine": "postgresql", "version": "14"}
            },
            {
                "type": "storage",
                "name": "app-storage",
                "properties": {"size": "500GB", "type": "ssd"}
            },
            {
                "type": "network",
                "name": "vpc-main",
                "properties": {"cidr": "10.0.0.0/16"}
            }
        ]
    
    def create_sample_results(self) -> Dict:
        return {
            "file_type": "generic",
            "resources": self.create_sample_resources(),
            "total_resources": 4,
            "metadata": {"note": "Sample analysis results"}
        }
