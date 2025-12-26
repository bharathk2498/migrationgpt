# MigrationGPT API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication
Currently no authentication required (add in production)

## Endpoints

### Health Check

#### GET /health

Check API health status

**Response**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

### Analyze Infrastructure

#### POST /api/analyze

Analyze infrastructure files and generate migration assessment

**Request**
- Content-Type: `multipart/form-data`
- Parameters:
  - `file` (required): Infrastructure file (.tf, .json, .yaml)
  - `project_name` (optional): Project identifier
  - `target_cloud` (optional): Target cloud (aws, azure, gcp)

**Example**
```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@infrastructure.tf" \
  -F "project_name=my-migration" \
  -F "target_cloud=aws"
```

**Response**
```json
{
  "analysis_id": "uuid-here",
  "status": "completed",
  "risk_score": 72,
  "findings_count": 15,
  "estimated_cost": 340000,
  "timeline_weeks": 20
}
```

---

### Get Analysis

#### GET /api/analysis/{analysis_id}

Retrieve detailed analysis results

**Response**
```json
{
  "analysis_id": "uuid-here",
  "status": "completed",
  "security_assessment": {...},
  "cost_estimate": {...},
  "architecture_recommendations": {...},
  "migration_plan": {...}
}
```

---

### Download Report

#### GET /api/analysis/{analysis_id}/report

Download PDF report

**Response**
- Content-Type: `application/pdf`
- File: migration_assessment_{analysis_id}.pdf

---

### Metrics

#### GET /metrics

Retrieve system metrics

**Response**
```json
{
  "total_analyses": 150,
  "avg_analysis_time_seconds": 180,
  "success_rate": 98.5
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid file format"
}
```

### 404 Not Found
```json
{
  "detail": "Analysis not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Analysis processing failed"
}
```

---

## Rate Limiting

(To be implemented)
- 100 requests per hour per IP
- 10 concurrent analyses per account

---

## Data Models

### AnalysisRequest
```python
{
  "project_name": str,
  "target_cloud": str,  # aws, azure, gcp
  "compliance_requirements": List[str]
}
```

### SecurityFinding
```python
{
  "id": str,
  "type": str,
  "severity": str,  # critical, high, medium, low
  "resource": str,
  "description": str,
  "remediation": str,
  "compliance_impact": List[str]
}
```

### CostEstimate
```python
{
  "migration_cost": float,
  "monthly_operational_cost": float,
  "yearly_operational_cost": float,
  "three_year_tco": float,
  "optimization_opportunities": List[Dict]
}
```

---

## Interactive Documentation

Access Swagger UI:
```
http://localhost:8000/docs
```

Access ReDoc:
```
http://localhost:8000/redoc
```
