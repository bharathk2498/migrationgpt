from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from typing import List, Optional
import os
import uuid
from datetime import datetime
import logging
import tempfile

from agents.security_agent import SecurityAgent
from agents.cost_agent import CostAgent
from agents.architecture_agent import ArchitectureAgent
from agents.migration_agent import MigrationAgent
from analyzers.infrastructure_analyzer import InfrastructureAnalyzer
from analyzers.code_analyzer import CodeAnalyzer
from analyzers.security_scanner import SecurityScanner
from generators.report_generator import ReportGenerator
from generators.proposal_generator import ProposalGenerator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MigrationGPT API",
    description="AI-Powered Cloud Migration Assessment Platform",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GitHubAnalysisRequest(BaseModel):
    github_url: Optional[str] = None
    project_name: str
    file_content: str
    target_cloud: str = "aws"

class AnalysisRequest(BaseModel):
    project_name: str
    target_cloud: str = "aws"
    compliance_requirements: Optional[List[str]] = []

class AnalysisResponse(BaseModel):
    analysis_id: str
    status: str
    risk_score: int
    findings_count: int
    estimated_cost: float
    timeline_weeks: int

@app.get("/")
async def root():
    return {
        "service": "MigrationGPT",
        "version": "2.0.0",
        "status": "operational",
        "features": ["GitHub Integration", "AI Analysis", "Enterprise UI"]
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_infrastructure(
    background_tasks: BackgroundTasks,
    request: GitHubAnalysisRequest = None,
    file: UploadFile = File(None),
    project_name: str = None,
    target_cloud: str = "aws"
):
    try:
        analysis_id = str(uuid.uuid4())
        
        if request and request.file_content:
            with tempfile.NamedTemporaryFile(mode='w', suffix='.tf', delete=False) as tmp_file:
                tmp_file.write(request.file_content)
                file_path = tmp_file.name
            project_name = request.project_name
            target_cloud = request.target_cloud
        elif file:
            upload_dir = "/tmp/uploads"
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, f"{analysis_id}_{file.filename}")
            
            with open(file_path, "wb") as f:
                content = await file.read()
                f.write(content)
        else:
            raise HTTPException(status_code=400, detail="No file provided")
        
        logger.info(f"Starting analysis {analysis_id} for {project_name}")
        
        infra_analyzer = InfrastructureAnalyzer()
        infra_results = infra_analyzer.analyze_file(file_path)
        
        security_scanner = SecurityScanner()
        security_results = security_scanner.scan(infra_results)
        
        security_agent = SecurityAgent()
        security_assessment = security_agent.assess(security_results)
        
        cost_agent = CostAgent()
        cost_estimate = cost_agent.estimate(infra_results, target_cloud)
        
        architecture_agent = ArchitectureAgent()
        arch_recommendations = architecture_agent.design(infra_results, target_cloud)
        
        migration_agent = MigrationAgent()
        migration_plan = migration_agent.create_plan(
            infra_results, 
            security_assessment,
            cost_estimate,
            arch_recommendations
        )
        
        if request:
            try:
                os.unlink(file_path)
            except:
                pass
        
        response = AnalysisResponse(
            analysis_id=analysis_id,
            status="completed",
            risk_score=security_assessment.get("risk_score", 0),
            findings_count=len(security_assessment.get("findings", [])),
            estimated_cost=cost_estimate.get("total_cost", 0),
            timeline_weeks=migration_plan.get("timeline_weeks", 0)
        )
        
        return response
        
    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/{analysis_id}")
async def get_analysis(analysis_id: str):
    return {
        "analysis_id": analysis_id,
        "status": "completed",
        "message": "Full analysis retrieval endpoint"
    }

@app.get("/api/analysis/{analysis_id}/report")
async def download_report(analysis_id: str):
    report_path = f"/tmp/reports/{analysis_id}_report.pdf"
    
    if not os.path.exists(report_path):
        raise HTTPException(status_code=404, detail="Report not found")
    
    return FileResponse(
        report_path,
        media_type="application/pdf",
        filename=f"migration_assessment_{analysis_id}.pdf"
    )

@app.get("/metrics")
async def get_metrics():
    return {
        "total_analyses": 0,
        "avg_analysis_time_seconds": 0,
        "success_rate": 100
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
