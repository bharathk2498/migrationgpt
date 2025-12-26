import json
from typing import Dict, List
import logging

logger = logging.getLogger(__name__)

class SecurityAgent:
    def __init__(self):
        self.priority_matrix = {
            "critical": {"score": 90, "weight": 1.0},
            "high": {"score": 70, "weight": 0.7},
            "medium": {"score": 50, "weight": 0.4},
            "low": {"score": 30, "weight": 0.2}
        }
    
    def assess(self, security_results: Dict) -> Dict:
        logger.info("Security agent assessing findings")
        
        findings = security_results.get("findings", [])
        
        categorized_findings = self.categorize_findings(findings)
        risk_score = self.calculate_risk_score(categorized_findings)
        recommendations = self.generate_recommendations(categorized_findings)
        
        return {
            "risk_score": risk_score,
            "findings": categorized_findings,
            "recommendations": recommendations,
            "summary": self.create_summary(categorized_findings, risk_score)
        }
    
    def categorize_findings(self, findings: List[Dict]) -> List[Dict]:
        categorized = []
        
        for finding in findings:
            severity = finding.get("severity", "medium")
            categorized.append({
                "type": finding.get("type", "unknown"),
                "severity": severity,
                "description": finding.get("description", ""),
                "resource": finding.get("resource", "N/A"),
                "remediation": finding.get("remediation", "Review configuration"),
                "estimated_fix_time": self.estimate_fix_time(severity),
                "compliance_impact": finding.get("compliance_impact", [])
            })
        
        return sorted(categorized, key=lambda x: self.priority_matrix[x["severity"]]["score"], reverse=True)
    
    def calculate_risk_score(self, findings: List[Dict]) -> int:
        if not findings:
            return 0
        
        total_score = 0
        for finding in findings:
            severity = finding.get("severity", "medium")
            total_score += self.priority_matrix[severity]["score"]
        
        avg_score = total_score / len(findings)
        
        return min(100, int(avg_score))
    
    def estimate_fix_time(self, severity: str) -> str:
        time_estimates = {
            "critical": "1-2 days",
            "high": "2-4 hours",
            "medium": "1-2 hours",
            "low": "30-60 minutes"
        }
        return time_estimates.get(severity, "1 hour")
    
    def generate_recommendations(self, findings: List[Dict]) -> List[Dict]:
        recommendations = []
        
        critical_count = sum(1 for f in findings if f["severity"] == "critical")
        high_count = sum(1 for f in findings if f["severity"] == "high")
        
        if critical_count > 0:
            recommendations.append({
                "priority": 1,
                "action": "Address all critical security findings before migration",
                "impact": "Prevents major security breaches",
                "effort": "High"
            })
        
        if high_count > 5:
            recommendations.append({
                "priority": 2,
                "action": "Implement security automation for recurring issues",
                "impact": "Reduces ongoing security debt",
                "effort": "Medium"
            })
        
        recommendations.append({
            "priority": 3,
            "action": "Enable continuous security monitoring post-migration",
            "impact": "Early detection of configuration drift",
            "effort": "Low"
        })
        
        return recommendations
    
    def create_summary(self, findings: List[Dict], risk_score: int) -> str:
        critical = sum(1 for f in findings if f["severity"] == "critical")
        high = sum(1 for f in findings if f["severity"] == "high")
        
        risk_level = "Low" if risk_score < 40 else "Medium" if risk_score < 70 else "High"
        
        summary = f"Security Assessment: {risk_level} Risk (Score: {risk_score}/100). "
        summary += f"Identified {len(findings)} findings: {critical} critical, {high} high priority. "
        
        if critical > 0:
            summary += "Immediate action required on critical issues before migration."
        else:
            summary += "No critical blockers identified. Proceed with recommended remediations."
        
        return summary
