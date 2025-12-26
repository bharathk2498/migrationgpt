import logging
from typing import Dict, List
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class MigrationAgent:
    def __init__(self):
        self.phase_templates = {
            "discovery": {"duration_weeks": 2, "effort_days": 10},
            "planning": {"duration_weeks": 2, "effort_days": 10},
            "poc": {"duration_weeks": 3, "effort_days": 15},
            "execution": {"duration_weeks": 8, "effort_days": 40},
            "testing": {"duration_weeks": 3, "effort_days": 15},
            "cutover": {"duration_weeks": 2, "effort_days": 10}
        }
    
    def create_plan(self, infra_results: Dict, security_assessment: Dict, 
                   cost_estimate: Dict, arch_recommendations: Dict) -> Dict:
        logger.info("Migration agent creating migration plan")
        
        resource_count = len(infra_results.get("resources", []))
        complexity = self.assess_complexity(resource_count, security_assessment)
        
        phases = self.generate_phases(complexity)
        timeline = self.calculate_timeline(phases)
        resources_needed = self.estimate_resources(complexity)
        runbook = self.create_runbook(phases)
        
        return {
            "complexity": complexity,
            "phases": phases,
            "timeline_weeks": timeline,
            "resources_needed": resources_needed,
            "runbook": runbook,
            "success_criteria": self.define_success_criteria(),
            "risk_mitigation": self.create_risk_mitigation_plan(security_assessment)
        }
    
    def assess_complexity(self, resource_count: int, security_assessment: Dict) -> str:
        critical_findings = sum(1 for f in security_assessment.get("findings", []) 
                               if f.get("severity") == "critical")
        
        if resource_count > 50 or critical_findings > 10:
            return "high"
        elif resource_count > 20 or critical_findings > 5:
            return "medium"
        else:
            return "low"
    
    def generate_phases(self, complexity: str) -> List[Dict]:
        multiplier = {"low": 1.0, "medium": 1.3, "high": 1.6}
        factor = multiplier.get(complexity, 1.0)
        
        phases = []
        start_date = datetime.now()
        
        for phase_name, template in self.phase_templates.items():
            duration = int(template["duration_weeks"] * factor)
            effort = int(template["effort_days"] * factor)
            
            phases.append({
                "name": phase_name.capitalize(),
                "duration_weeks": duration,
                "effort_days": effort,
                "start_date": start_date.strftime("%Y-%m-%d"),
                "end_date": (start_date + timedelta(weeks=duration)).strftime("%Y-%m-%d"),
                "deliverables": self.get_phase_deliverables(phase_name),
                "dependencies": self.get_phase_dependencies(phase_name)
            })
            
            start_date += timedelta(weeks=duration)
        
        return phases
    
    def calculate_timeline(self, phases: List[Dict]) -> int:
        return sum(phase["duration_weeks"] for phase in phases)
    
    def estimate_resources(self, complexity: str) -> Dict:
        base_team = {
            "lead_architect": 1,
            "cloud_engineers": 2,
            "security_engineer": 1,
            "devops_engineer": 1,
            "qa_engineer": 1
        }
        
        if complexity == "high":
            base_team["cloud_engineers"] = 4
            base_team["security_engineer"] = 2
        elif complexity == "medium":
            base_team["cloud_engineers"] = 3
        
        return {
            "team_composition": base_team,
            "total_team_size": sum(base_team.values())
        }
    
    def create_runbook(self, phases: List[Dict]) -> List[Dict]:
        runbook = []
        
        for phase in phases:
            runbook.append({
                "phase": phase["name"],
                "steps": self.get_phase_steps(phase["name"]),
                "checkpoints": self.get_phase_checkpoints(phase["name"]),
                "rollback_procedures": self.get_rollback_procedures(phase["name"])
            })
        
        return runbook
    
    def get_phase_deliverables(self, phase: str) -> List[str]:
        deliverables_map = {
            "discovery": ["Infrastructure inventory", "Application dependencies", "Risk assessment"],
            "planning": ["Migration strategy", "Resource plan", "Timeline"],
            "poc": ["Proof of concept", "Performance baseline", "Cost validation"],
            "execution": ["Migrated infrastructure", "Configuration documentation", "Security validation"],
            "testing": ["Test results", "Performance reports", "Security audit"],
            "cutover": ["Production deployment", "Cutover checklist", "Monitoring setup"]
        }
        return deliverables_map.get(phase, [])
    
    def get_phase_dependencies(self, phase: str) -> List[str]:
        dependencies_map = {
            "discovery": [],
            "planning": ["Discovery complete"],
            "poc": ["Planning approved"],
            "execution": ["POC validated"],
            "testing": ["Execution complete"],
            "cutover": ["Testing passed"]
        }
        return dependencies_map.get(phase, [])
    
    def get_phase_steps(self, phase: str) -> List[str]:
        return [f"Step 1 for {phase}", f"Step 2 for {phase}", f"Step 3 for {phase}"]
    
    def get_phase_checkpoints(self, phase: str) -> List[str]:
        return [f"Checkpoint 1 for {phase}", f"Checkpoint 2 for {phase}"]
    
    def get_rollback_procedures(self, phase: str) -> List[str]:
        return ["Document current state", "Create backup", "Execute rollback", "Verify rollback"]
    
    def define_success_criteria(self) -> List[Dict]:
        return [
            {"metric": "Zero data loss", "target": "100%"},
            {"metric": "Uptime during migration", "target": "99.9%"},
            {"metric": "Performance degradation", "target": "<5%"},
            {"metric": "Security posture", "target": "Equal or better"},
            {"metric": "Cost within budget", "target": "+/-10%"}
        ]
    
    def create_risk_mitigation_plan(self, security_assessment: Dict) -> List[Dict]:
        return [
            {
                "risk": "Data loss during migration",
                "probability": "Low",
                "impact": "Critical",
                "mitigation": "Comprehensive backup strategy, validation checkpoints"
            },
            {
                "risk": "Downtime exceeds window",
                "probability": "Medium",
                "impact": "High",
                "mitigation": "Phased migration, blue-green deployment"
            },
            {
                "risk": "Security vulnerabilities introduced",
                "probability": "Medium",
                "impact": "High",
                "mitigation": "Security scanning at each phase, compliance validation"
            }
        ]
