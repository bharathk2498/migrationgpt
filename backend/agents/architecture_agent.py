import logging
from typing import Dict, List

logger = logging.getLogger(__name__)

class ArchitectureAgent:
    def __init__(self):
        self.cloud_services = {
            "aws": {
                "compute": ["EC2", "ECS", "EKS", "Lambda"],
                "database": ["RDS", "Aurora", "DynamoDB"],
                "storage": ["S3", "EBS", "EFS"],
                "networking": ["VPC", "ALB", "CloudFront"]
            },
            "azure": {
                "compute": ["Virtual Machines", "AKS", "Functions"],
                "database": ["Azure SQL", "Cosmos DB"],
                "storage": ["Blob Storage", "Disk Storage"],
                "networking": ["VNet", "Load Balancer", "CDN"]
            },
            "gcp": {
                "compute": ["Compute Engine", "GKE", "Cloud Functions"],
                "database": ["Cloud SQL", "Firestore"],
                "storage": ["Cloud Storage", "Persistent Disk"],
                "networking": ["VPC", "Load Balancing", "Cloud CDN"]
            }
        }
    
    def design(self, infra_results: Dict, target_cloud: str = "aws") -> Dict:
        logger.info(f"Architecture agent designing for {target_cloud}")
        
        resources = infra_results.get("resources", [])
        
        target_architecture = self.map_to_cloud_services(resources, target_cloud)
        modernization_opportunities = self.identify_modernization(resources)
        architecture_patterns = self.recommend_patterns(resources)
        
        return {
            "target_architecture": target_architecture,
            "modernization_opportunities": modernization_opportunities,
            "recommended_patterns": architecture_patterns,
            "infrastructure_as_code": self.generate_iac_template(target_architecture, target_cloud)
        }
    
    def map_to_cloud_services(self, resources: List[Dict], cloud: str) -> Dict:
        services = self.cloud_services.get(cloud, self.cloud_services["aws"])
        mapping = {
            "compute": [],
            "database": [],
            "storage": [],
            "networking": []
        }
        
        for resource in resources:
            resource_type = resource.get("type", "").lower()
            
            if "compute" in resource_type or "instance" in resource_type:
                mapping["compute"].append({
                    "source": resource.get("name", "unknown"),
                    "target": services["compute"][0],
                    "configuration": "t3.medium or equivalent"
                })
            elif "database" in resource_type:
                mapping["database"].append({
                    "source": resource.get("name", "unknown"),
                    "target": services["database"][0],
                    "configuration": "db.t3.medium or equivalent"
                })
            elif "storage" in resource_type:
                mapping["storage"].append({
                    "source": resource.get("name", "unknown"),
                    "target": services["storage"][0],
                    "configuration": "Standard storage class"
                })
        
        if not mapping["networking"]:
            mapping["networking"].append({
                "component": "VPC",
                "configuration": "Multi-AZ deployment with private/public subnets"
            })
        
        return mapping
    
    def identify_modernization(self, resources: List[Dict]) -> List[Dict]:
        opportunities = []
        
        vm_count = sum(1 for r in resources if "instance" in r.get("type", "").lower())
        
        if vm_count > 0:
            opportunities.append({
                "type": "Containerization",
                "description": "Migrate from VMs to containers (ECS/EKS)",
                "benefits": ["Better resource utilization", "Faster deployments", "Improved scalability"],
                "effort": "Medium",
                "timeline": "4-6 weeks"
            })
        
        opportunities.append({
            "type": "Serverless",
            "description": "Move appropriate workloads to serverless (Lambda/Functions)",
            "benefits": ["Pay per use", "Auto-scaling", "Reduced ops overhead"],
            "effort": "Low to Medium",
            "timeline": "2-4 weeks"
        })
        
        opportunities.append({
            "type": "Managed Services",
            "description": "Replace self-managed components with cloud-native managed services",
            "benefits": ["Reduced maintenance", "Built-in HA/DR", "Cost optimization"],
            "effort": "Low",
            "timeline": "2-3 weeks"
        })
        
        return opportunities
    
    def recommend_patterns(self, resources: List[Dict]) -> List[Dict]:
        patterns = []
        
        patterns.append({
            "pattern": "Well-Architected Framework",
            "pillars": ["Operational Excellence", "Security", "Reliability", "Performance", "Cost Optimization"],
            "implementation": "Follow cloud provider best practices"
        })
        
        patterns.append({
            "pattern": "Multi-AZ Deployment",
            "description": "Deploy across multiple availability zones for high availability",
            "benefits": "99.99% uptime SLA"
        })
        
        patterns.append({
            "pattern": "Infrastructure as Code",
            "tools": ["Terraform", "CloudFormation", "Pulumi"],
            "benefits": "Repeatable, versioned, auditable infrastructure"
        })
        
        return patterns
    
    def generate_iac_template(self, architecture: Dict, cloud: str) -> Dict:
        return {
            "provider": cloud,
            "template_type": "terraform",
            "note": "Full IaC template would be generated based on architecture mapping",
            "components": list(architecture.keys())
        }
