import logging
from typing import Dict
from datetime import datetime
import os

logger = logging.getLogger(__name__)

class ProposalGenerator:
    def __init__(self):
        self.output_dir = "/tmp/proposals"
        os.makedirs(self.output_dir, exist_ok=True)
    
    def generate_proposal(self, project_name: str, analysis_data: Dict) -> Dict:
        logger.info(f"Generating proposal for project: {project_name}")
        
        proposal = {
            "project_name": project_name,
            "generated_date": datetime.utcnow().isoformat(),
            "executive_summary": self.create_executive_summary(analysis_data),
            "technical_approach": self.create_technical_approach(analysis_data),
            "timeline": self.create_timeline(analysis_data),
            "cost_estimate": self.create_cost_estimate(analysis_data),
            "team_composition": self.create_team_composition(analysis_data),
            "success_criteria": self.create_success_criteria(),
            "risk_mitigation": self.create_risk_mitigation(analysis_data),
            "next_steps": self.create_next_steps()
        }
        
        return proposal
    
    def create_executive_summary(self, data: Dict) -> Dict:
        return {
            "overview": "Comprehensive cloud migration strategy tailored to your infrastructure",
            "key_benefits": [
                "Improved scalability and reliability",
                "Enhanced security posture",
                "Cost optimization opportunities",
                "Modern cloud-native architecture"
            ],
            "investment": "Detailed cost breakdown provided",
            "timeline": "Phased approach over multiple weeks"
        }
    
    def create_technical_approach(self, data: Dict) -> Dict:
        return {
            "methodology": "Agile migration with continuous validation",
            "phases": [
                "Discovery and Planning",
                "Proof of Concept",
                "Migration Execution",
                "Testing and Validation",
                "Cutover and Optimization"
            ],
            "tools_and_technologies": [
                "Infrastructure as Code (Terraform)",
                "CI/CD Pipeline",
                "Automated Testing",
                "Monitoring and Observability"
            ]
        }
    
    def create_timeline(self, data: Dict) -> Dict:
        return {
            "total_duration_weeks": 20,
            "phases": [
                {"name": "Discovery", "weeks": 2},
                {"name": "Planning", "weeks": 2},
                {"name": "POC", "weeks": 3},
                {"name": "Execution", "weeks": 8},
                {"name": "Testing", "weeks": 3},
                {"name": "Cutover", "weeks": 2}
            ],
            "key_milestones": [
                "Week 4: Migration plan approved",
                "Week 7: POC validated",
                "Week 15: Migration 80% complete",
                "Week 18: Testing passed",
                "Week 20: Production cutover"
            ]
        }
    
    def create_cost_estimate(self, data: Dict) -> Dict:
        return {
            "total_investment": "$340,000",
            "breakdown": {
                "professional_services": "$200,000",
                "infrastructure_costs": "$100,000",
                "tools_and_licenses": "$40,000"
            },
            "payment_terms": "Milestone-based payments",
            "roi_projection": "12-18 months"
        }
    
    def create_team_composition(self, data: Dict) -> Dict:
        return {
            "team_size": 6,
            "roles": [
                {"role": "Lead Architect", "count": 1, "description": "Overall technical leadership"},
                {"role": "Cloud Engineers", "count": 2, "description": "Migration execution"},
                {"role": "Security Engineer", "count": 1, "description": "Security validation"},
                {"role": "DevOps Engineer", "count": 1, "description": "Automation and CI/CD"},
                {"role": "QA Engineer", "count": 1, "description": "Testing and validation"}
            ]
        }
    
    def create_success_criteria(self) -> Dict:
        return {
            "metrics": [
                {"metric": "Zero data loss", "target": "100%"},
                {"metric": "Uptime", "target": "99.9%"},
                {"metric": "Performance", "target": "Equal or better"},
                {"metric": "Security posture", "target": "Improved"},
                {"metric": "Cost variance", "target": "+/-10%"}
            ]
        }
    
    def create_risk_mitigation(self, data: Dict) -> Dict:
        return {
            "key_risks": [
                {
                    "risk": "Data loss",
                    "mitigation": "Comprehensive backup strategy",
                    "probability": "Low"
                },
                {
                    "risk": "Downtime",
                    "mitigation": "Blue-green deployment",
                    "probability": "Medium"
                }
            ]
        }
    
    def create_next_steps(self) -> List[str]:
        return [
            "Review and approve proposal",
            "Sign statement of work",
            "Kickoff meeting",
            "Begin discovery phase"
        ]
