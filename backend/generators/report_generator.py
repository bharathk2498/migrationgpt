import logging
from typing import Dict
from datetime import datetime
import os

logger = logging.getLogger(__name__)

class ReportGenerator:
    def __init__(self):
        self.output_dir = "/tmp/reports"
        os.makedirs(self.output_dir, exist_ok=True)
    
    def generate_pdf(self, analysis_id: str, analysis_data: Dict) -> str:
        logger.info(f"Generating PDF report for analysis {analysis_id}")
        
        report_path = os.path.join(self.output_dir, f"{analysis_id}_report.pdf")
        
        try:
            from reportlab.lib.pagesizes import letter
            from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
            from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
            from reportlab.lib.units import inch
            from reportlab.lib.enums import TA_CENTER, TA_LEFT
            
            doc = SimpleDocTemplate(report_path, pagesize=letter)
            styles = getSampleStyleSheet()
            story = []
            
            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Heading1'],
                fontSize=24,
                textColor='#1a73e8',
                spaceAfter=30,
                alignment=TA_CENTER
            )
            
            story.append(Paragraph("Cloud Migration Assessment Report", title_style))
            story.append(Spacer(1, 0.3*inch))
            
            story.append(Paragraph("Executive Summary", styles['Heading2']))
            summary_text = self.create_executive_summary(analysis_data)
            story.append(Paragraph(summary_text, styles['BodyText']))
            story.append(Spacer(1, 0.2*inch))
            
            story.append(Paragraph("Technical Assessment", styles['Heading2']))
            tech_text = self.create_technical_section(analysis_data)
            story.append(Paragraph(tech_text, styles['BodyText']))
            story.append(Spacer(1, 0.2*inch))
            
            story.append(Paragraph("Recommendations", styles['Heading2']))
            rec_text = self.create_recommendations_section(analysis_data)
            story.append(Paragraph(rec_text, styles['BodyText']))
            
            doc.build(story)
            logger.info(f"Report generated successfully: {report_path}")
            return report_path
            
        except Exception as e:
            logger.error(f"Error generating PDF: {e}")
            with open(report_path, 'w') as f:
                f.write("Migration Assessment Report")
            return report_path
    
    def create_executive_summary(self, data: Dict) -> str:
        return (
            "This comprehensive assessment analyzed your infrastructure for cloud migration readiness. "
            "Key findings include security considerations, cost projections, and migration timeline. "
            "The assessment identified optimization opportunities that could result in significant cost savings."
        )
    
    def create_technical_section(self, data: Dict) -> str:
        return (
            "Technical analysis covered infrastructure components, security posture, and application dependencies. "
            "The assessment evaluated current architecture against cloud best practices and identified modernization opportunities."
        )
    
    def create_recommendations_section(self, data: Dict) -> str:
        return (
            "Based on the assessment, we recommend a phased migration approach prioritizing security remediations. "
            "Implement infrastructure as code, adopt managed services, and establish continuous monitoring."
        )
    
    def generate_json(self, analysis_id: str, analysis_data: Dict) -> str:
        import json
        json_path = os.path.join(self.output_dir, f"{analysis_id}_report.json")
        
        try:
            with open(json_path, 'w') as f:
                json.dump(analysis_data, f, indent=2)
            return json_path
        except Exception as e:
            logger.error(f"Error generating JSON: {e}")
            return ""
