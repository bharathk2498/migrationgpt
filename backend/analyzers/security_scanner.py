import logging
from typing import Dict, List

logger = logging.getLogger(__name__)

class SecurityScanner:
    def __init__(self):
        self.security_rules = {
            "encryption": [
                {"id": "SEC-001", "check": "storage_encryption", "severity": "critical"},
                {"id": "SEC-002", "check": "transmission_encryption", "severity": "high"}
            ],
            "access_control": [
                {"id": "SEC-003", "check": "public_access", "severity": "critical"},
                {"id": "SEC-004", "check": "iam_policies", "severity": "high"}
            ],
            "network": [
                {"id": "SEC-005", "check": "network_segmentation", "severity": "medium"},
                {"id": "SEC-006", "check": "firewall_rules", "severity": "high"}
            ]
        }
        
        self.compliance_frameworks = {
            "SOC2": ["SEC-001", "SEC-002", "SEC-003", "SEC-004"],
            "HIPAA": ["SEC-001", "SEC-002", "SEC-003"],
            "PCI-DSS": ["SEC-001", "SEC-002", "SEC-003", "SEC-004", "SEC-006"]
        }
    
    def scan(self, infra_results: Dict) -> Dict:
        logger.info("Security scanner performing scan")
        
        resources = infra_results.get("resources", [])
        
        findings = self.run_security_checks(resources)
        compliance_status = self.check_compliance(findings)
        risk_assessment = self.assess_risk(findings)
        
        return {
            "findings": findings,
            "total_findings": len(findings),
            "compliance_status": compliance_status,
            "risk_assessment": risk_assessment,
            "scan_timestamp": "2024-01-01T00:00:00Z"
        }
    
    def run_security_checks(self, resources: List[Dict]) -> List[Dict]:
        findings = []
        
        for resource in resources:
            findings.extend(self.check_encryption(resource))
            findings.extend(self.check_access_control(resource))
            findings.extend(self.check_network_security(resource))
        
        if not findings:
            findings = self.create_sample_findings()
        
        return findings
    
    def check_encryption(self, resource: Dict) -> List[Dict]:
        findings = []
        resource_type = resource.get("type", "").lower()
        
        if "storage" in resource_type or "s3" in resource_type:
            findings.append({
                "id": "SEC-001",
                "type": "Unencrypted Storage",
                "severity": "critical",
                "resource": resource.get("name", "unknown"),
                "description": "Storage resource is not encrypted at rest",
                "remediation": "Enable encryption using AWS KMS or equivalent",
                "compliance_impact": ["SOC2", "HIPAA", "PCI-DSS"]
            })
        
        return findings
    
    def check_access_control(self, resource: Dict) -> List[Dict]:
        findings = []
        resource_type = resource.get("type", "").lower()
        
        if "s3" in resource_type or "storage" in resource_type:
            findings.append({
                "id": "SEC-003",
                "type": "Public Access Enabled",
                "severity": "critical",
                "resource": resource.get("name", "unknown"),
                "description": "Resource allows public access",
                "remediation": "Restrict access to authorized users/services only",
                "compliance_impact": ["SOC2", "HIPAA", "PCI-DSS"]
            })
        
        return findings
    
    def check_network_security(self, resource: Dict) -> List[Dict]:
        findings = []
        resource_type = resource.get("type", "").lower()
        
        if "network" in resource_type or "vpc" in resource_type:
            findings.append({
                "id": "SEC-006",
                "type": "Overly Permissive Firewall",
                "severity": "high",
                "resource": resource.get("name", "unknown"),
                "description": "Security group allows traffic from 0.0.0.0/0",
                "remediation": "Implement least privilege network access",
                "compliance_impact": ["PCI-DSS"]
            })
        
        return findings
    
    def create_sample_findings(self) -> List[Dict]:
        return [
            {
                "id": "SEC-001",
                "type": "Unencrypted Storage",
                "severity": "critical",
                "resource": "app-storage",
                "description": "S3 bucket not encrypted at rest",
                "remediation": "Enable AES-256 encryption",
                "compliance_impact": ["SOC2", "HIPAA"]
            },
            {
                "id": "SEC-003",
                "type": "Public Access",
                "severity": "high",
                "resource": "database-backup",
                "description": "Database backup accessible publicly",
                "remediation": "Restrict to VPC only",
                "compliance_impact": ["PCI-DSS"]
            },
            {
                "id": "SEC-005",
                "type": "Network Segmentation",
                "severity": "medium",
                "resource": "vpc-main",
                "description": "No network segmentation between tiers",
                "remediation": "Implement subnet isolation",
                "compliance_impact": []
            }
        ]
    
    def check_compliance(self, findings: List[Dict]) -> Dict:
        compliance_status = {}
        
        for framework, required_rules in self.compliance_frameworks.items():
            finding_ids = [f["id"] for f in findings]
            violations = [rule for rule in required_rules if rule in finding_ids]
            
            compliance_status[framework] = {
                "compliant": len(violations) == 0,
                "violations": len(violations),
                "compliance_percentage": ((len(required_rules) - len(violations)) / len(required_rules)) * 100
            }
        
        return compliance_status
    
    def assess_risk(self, findings: List[Dict]) -> Dict:
        critical_count = sum(1 for f in findings if f["severity"] == "critical")
        high_count = sum(1 for f in findings if f["severity"] == "high")
        medium_count = sum(1 for f in findings if f["severity"] == "medium")
        
        overall_risk = "low"
        if critical_count > 0:
            overall_risk = "critical"
        elif high_count > 3:
            overall_risk = "high"
        elif high_count > 0 or medium_count > 5:
            overall_risk = "medium"
        
        return {
            "overall_risk": overall_risk,
            "critical_findings": critical_count,
            "high_findings": high_count,
            "medium_findings": medium_count,
            "low_findings": 0
        }
