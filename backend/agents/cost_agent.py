import logging
from typing import Dict, List

logger = logging.getLogger(__name__)

class CostAgent:
    def __init__(self):
        self.compute_costs = {
            "aws": {"ec2_per_hour": 0.10, "rds_per_hour": 0.15, "lambda_per_million": 0.20},
            "azure": {"vm_per_hour": 0.12, "sql_per_hour": 0.18, "functions_per_million": 0.20},
            "gcp": {"compute_per_hour": 0.09, "sql_per_hour": 0.14, "functions_per_million": 0.18}
        }
    
    def estimate(self, infra_results: Dict, target_cloud: str = "aws") -> Dict:
        logger.info(f"Cost agent estimating for {target_cloud}")
        
        resources = infra_results.get("resources", [])
        
        migration_cost = self.calculate_migration_cost(resources)
        operational_cost = self.calculate_operational_cost(resources, target_cloud)
        optimization_opportunities = self.identify_optimizations(resources)
        
        return {
            "migration_cost": migration_cost,
            "monthly_operational_cost": operational_cost,
            "yearly_operational_cost": operational_cost * 12,
            "three_year_tco": migration_cost + (operational_cost * 36),
            "optimization_opportunities": optimization_opportunities,
            "total_cost": migration_cost,
            "cost_breakdown": self.create_breakdown(migration_cost, operational_cost)
        }
    
    def calculate_migration_cost(self, resources: List[Dict]) -> float:
        base_cost = 50000
        
        resource_multiplier = len(resources) * 1000
        complexity_cost = 0
        
        for resource in resources:
            if "database" in resource.get("type", "").lower():
                complexity_cost += 5000
            elif "network" in resource.get("type", "").lower():
                complexity_cost += 2000
            else:
                complexity_cost += 1000
        
        return base_cost + resource_multiplier + complexity_cost
    
    def calculate_operational_cost(self, resources: List[Dict], cloud: str) -> float:
        monthly_cost = 0
        pricing = self.compute_costs.get(cloud, self.compute_costs["aws"])
        
        for resource in resources:
            resource_type = resource.get("type", "").lower()
            
            if "compute" in resource_type or "instance" in resource_type:
                monthly_cost += pricing.get("ec2_per_hour", 0.10) * 730
            elif "database" in resource_type:
                monthly_cost += pricing.get("rds_per_hour", 0.15) * 730
            elif "storage" in resource_type:
                monthly_cost += 100
            else:
                monthly_cost += 50
        
        return round(monthly_cost, 2)
    
    def identify_optimizations(self, resources: List[Dict]) -> List[Dict]:
        optimizations = []
        
        compute_count = sum(1 for r in resources if "compute" in r.get("type", "").lower())
        db_count = sum(1 for r in resources if "database" in r.get("type", "").lower())
        
        if compute_count > 5:
            optimizations.append({
                "opportunity": "Right-size compute instances",
                "potential_savings": "20-30%",
                "estimated_annual_savings": 15000,
                "effort": "Medium"
            })
        
        if db_count > 0:
            optimizations.append({
                "opportunity": "Use managed database services",
                "potential_savings": "15-25%",
                "estimated_annual_savings": 12000,
                "effort": "Low"
            })
        
        optimizations.append({
            "opportunity": "Implement auto-scaling",
            "potential_savings": "25-40%",
            "estimated_annual_savings": 20000,
            "effort": "Medium"
        })
        
        return optimizations
    
    def create_breakdown(self, migration_cost: float, operational_cost: float) -> Dict:
        return {
            "one_time_costs": {
                "discovery_and_assessment": migration_cost * 0.15,
                "migration_execution": migration_cost * 0.50,
                "testing_and_validation": migration_cost * 0.20,
                "training_and_documentation": migration_cost * 0.15
            },
            "monthly_operational": {
                "compute": operational_cost * 0.45,
                "storage": operational_cost * 0.20,
                "networking": operational_cost * 0.15,
                "management_and_monitoring": operational_cost * 0.20
            }
        }
