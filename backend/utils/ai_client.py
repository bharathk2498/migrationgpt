import os
import logging
from typing import Dict, Optional
from .demo_mode import is_demo_mode, get_demo_client

logger = logging.getLogger(__name__)

class AIClient:
    """
    AI Client that automatically switches between demo mode and production
    """
    
    def __init__(self):
        self.demo_mode = is_demo_mode()
        
        if self.demo_mode:
            logger.info("Running in DEMO MODE - No AWS credentials required!")
            self.client = get_demo_client()
        else:
            logger.info("Running in PRODUCTION MODE - Using AWS Bedrock")
            self.client = self._init_bedrock_client()
    
    def _init_bedrock_client(self):
        """
        Initialize AWS Bedrock client (only in production mode)
        """
        try:
            import boto3
            return boto3.client(
                'bedrock-runtime',
                region_name=os.getenv('AWS_REGION', 'us-east-1'),
                aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
            )
        except Exception as e:
            logger.warning(f"Failed to initialize Bedrock client: {e}")
            logger.info("Falling back to DEMO MODE")
            self.demo_mode = True
            return get_demo_client()
    
    def analyze(self, prompt: str, context: Optional[Dict] = None) -> str:
        """
        Analyze using AI (demo or production)
        """
        if self.demo_mode:
            return self.client.analyze(prompt, context or {})
        else:
            return self._invoke_bedrock(prompt, context)
    
    def _invoke_bedrock(self, prompt: str, context: Optional[Dict]) -> str:
        """
        Invoke AWS Bedrock (production mode only)
        """
        try:
            import json
            
            response = self.client.invoke_model(
                modelId=os.getenv('BEDROCK_MODEL', 'anthropic.claude-3-5-sonnet-20241022-v2:0'),
                body=json.dumps({
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens": 4096,
                    "messages": [
                        {"role": "user", "content": prompt}
                    ]
                })
            )
            
            result = json.loads(response['body'].read())
            return result['content'][0]['text']
            
        except Exception as e:
            logger.error(f"Bedrock invocation failed: {e}")
            return "Analysis completed with limited AI capabilities."
    
    def get_security_assessment(self, findings):
        if self.demo_mode:
            return self.client.get_security_assessment(findings)
        else:
            return self._invoke_bedrock(f"Security assessment for: {findings}", {})
    
    def get_cost_optimization(self, resources):
        if self.demo_mode:
            return self.client.get_cost_optimization(resources)
        else:
            return self._invoke_bedrock(f"Cost optimization for: {resources}", {})
    
    def get_architecture_design(self, infrastructure):
        if self.demo_mode:
            return self.client.get_architecture_design(infrastructure)
        else:
            return self._invoke_bedrock(f"Architecture design for: {infrastructure}", {})
    
    def get_migration_strategy(self, complexity):
        if self.demo_mode:
            return self.client.get_migration_strategy(complexity)
        else:
            return self._invoke_bedrock(f"Migration strategy for {complexity} complexity", {})


def get_ai_client():
    """
    Get AI client instance (auto-detects demo vs production mode)
    """
    return AIClient()
