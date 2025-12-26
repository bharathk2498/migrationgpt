import os
import logging
from typing import Dict, List
import random

logger = logging.getLogger(__name__)

DEMO_MODE = os.getenv("DEMO_MODE", "true").lower() == "true"

class DemoAIClient:
    """
    Mock AI client for demo mode - no AWS credentials needed!
    Provides realistic responses without external API calls.
    """
    
    def __init__(self):
        self.responses = {
            "security_analysis": [
                "Critical security finding: Unencrypted S3 bucket detected. This poses a significant data exposure risk.",
                "High priority: Database is publicly accessible. Immediate action required to restrict access.",
                "Medium risk: Network security groups allow unrestricted inbound traffic on port 22.",
                "IAM policies are overly permissive. Recommend implementing least privilege access."
            ],
            "cost_analysis": [
                "Based on current infrastructure, estimated migration cost is $340,000 with 18% potential savings through right-sizing.",
                "Monthly operational costs projected at $12,500. Reserved instances could reduce this by 30%.",
                "Auto-scaling implementation could save approximately $45,000 annually."
            ],
            "architecture": [
                "Recommend containerization using ECS Fargate for improved scalability and reduced operational overhead.",
                "Multi-AZ deployment across 3 availability zones will ensure 99.99% uptime SLA.",
                "Implement CloudFront CDN to reduce latency by 60% for global users."
            ],
            "migration_plan": [
                "Phased migration approach recommended over 20 weeks with 4 major milestones.",
                "Discovery and planning phase: 4 weeks, followed by proof of concept validation.",
                "Execute migration in 3 waves to minimize business disruption and risk."
            ]
        }
    
    def analyze(self, prompt: str, context: Dict) -> str:
        """
        Generate realistic AI response based on context
        """
        if "security" in prompt.lower():
            return random.choice(self.responses["security_analysis"])
        elif "cost" in prompt.lower():
            return random.choice(self.responses["cost_analysis"])
        elif "architecture" in prompt.lower():
            return random.choice(self.responses["architecture"])
        else:
            return random.choice(self.responses["migration_plan"])
    
    def get_security_assessment(self, findings: List[Dict]) -> Dict:
        return {
            "analysis": "Comprehensive security analysis completed. Multiple findings identified across encryption, access control, and network security domains.",
            "recommendations": [
                "Enable encryption at rest for all storage resources",
                "Implement network segmentation between application tiers",
                "Review and restrict IAM policies to least privilege",
                "Enable CloudTrail and Config for compliance monitoring"
            ],
            "priority_actions": [
                "Address critical findings within 48 hours",
                "Implement security automation for continuous compliance"
            ]
        }
    
    def get_cost_optimization(self, resources: List[Dict]) -> Dict:
        base_cost = len(resources) * 15000 + random.randint(50000, 100000)
        savings = base_cost * 0.25
        
        return {
            "analysis": f"Infrastructure analysis reveals opportunities for ${savings:,.0f} in annual savings.",
            "recommendations": [
                f"Right-size EC2 instances: Save ${savings * 0.4:,.0f}/year",
                f"Implement auto-scaling: Save ${savings * 0.3:,.0f}/year",
                f"Reserved instances: Save ${savings * 0.3:,.0f}/year"
            ],
            "roi_timeline": "Savings achievable within 3-6 months of implementation"
        }
    
    def get_architecture_design(self, infrastructure: Dict) -> Dict:
        return {
            "analysis": "Modern cloud-native architecture recommended for optimal performance and cost efficiency.",
            "recommendations": [
                "Migrate to containerized microservices architecture",
                "Implement serverless for event-driven workloads",
                "Use managed services to reduce operational overhead",
                "Deploy multi-region for disaster recovery"
            ],
            "benefits": [
                "60% faster deployment cycles",
                "40% reduction in infrastructure costs",
                "99.99% availability SLA",
                "Improved developer productivity"
            ]
        }
    
    def get_migration_strategy(self, complexity: str) -> Dict:
        weeks = {"low": 12, "medium": 20, "high": 28}
        timeline = weeks.get(complexity, 20)
        
        return {
            "analysis": f"Based on {complexity} complexity assessment, migration timeline is {timeline} weeks.",
            "approach": "Phased migration with continuous validation and rollback capabilities",
            "phases": [
                {"name": "Discovery & Planning", "weeks": timeline // 5},
                {"name": "Proof of Concept", "weeks": timeline // 5},
                {"name": "Migration Execution", "weeks": timeline // 2},
                {"name": "Testing & Validation", "weeks": timeline // 6},
                {"name": "Cutover & Optimization", "weeks": timeline // 10}
            ],
            "success_factors": [
                "Executive sponsorship and clear governance",
                "Comprehensive testing at each phase",
                "Dedicated migration team with cloud expertise",
                "Automated deployment and rollback procedures"
            ]
        }


def get_demo_client():
    """
    Returns demo AI client that works without any credentials
    """
    return DemoAIClient()


def is_demo_mode() -> bool:
    """
    Check if running in demo mode
    """
    return DEMO_MODE
