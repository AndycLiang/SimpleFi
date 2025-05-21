from typing import Dict, List, Optional
import openai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class AIService:
    @staticmethod
    async def analyze_financial_health(financial_data: Dict) -> Dict:
        """
        Analyze financial health using OpenAI's GPT model.
        """
        try:
            prompt = f"""
            Based on the following financial data, provide a comprehensive analysis:
            Revenue: ${financial_data.get('revenue', 0):,.2f}
            Expenses: ${financial_data.get('expenses', 0):,.2f}
            Accounts Receivable: ${financial_data.get('accounts_receivable', 0):,.2f}
            Accounts Payable: ${financial_data.get('accounts_payable', 0):,.2f}
            Cash Balance: ${financial_data.get('cash_balance', 0):,.2f}

            Please analyze:
            1. Overall financial health
            2. Cash flow status
            3. Key recommendations
            4. Potential risks
            """

            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a skilled financial analyst."},
                    {"role": "user", "content": prompt}
                ]
            )

            return {
                "analysis": response.choices[0].message.content,
                "status": "success"
            }
        except Exception as e:
            return {
                "analysis": "Error performing financial analysis.",
                "status": "error",
                "error": str(e)
            }

    @staticmethod
    async def process_invoice(invoice_text: str) -> Dict:
        """
        Extract information from invoice text using OpenAI's GPT model.
        """
        try:
            prompt = f"""
            Extract the following information from this invoice:
            1. Invoice number
            2. Date
            3. Amount
            4. Vendor/Customer name
            5. Line items

            Invoice text:
            {invoice_text}
            
            Return the information in a structured format.
            """

            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert at processing invoices."},
                    {"role": "user", "content": prompt}
                ]
            )

            return {
                "extracted_data": response.choices[0].message.content,
                "status": "success"
            }
        except Exception as e:
            return {
                "extracted_data": "Error processing invoice.",
                "status": "error",
                "error": str(e)
            }

    @staticmethod
    async def suggest_categorization(transaction_description: str) -> Dict:
        """
        Suggest account categorization for a transaction using OpenAI's GPT model.
        """
        try:
            prompt = f"""
            Suggest the appropriate accounting categorization for this transaction:
            Transaction: {transaction_description}

            Please provide:
            1. Account category (e.g., Revenue, Expense, Asset, Liability)
            2. Specific account suggestion
            3. Confidence level (High, Medium, Low)
            """

            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert accountant."},
                    {"role": "user", "content": prompt}
                ]
            )

            return {
                "suggestion": response.choices[0].message.content,
                "status": "success"
            }
        except Exception as e:
            return {
                "suggestion": "Error suggesting categorization.",
                "status": "error",
                "error": str(e)
            }

    @staticmethod
    async def generate_financial_insights(transactions: List[Dict]) -> Dict:
        """
        Generate insights from transaction history using OpenAI's GPT model.
        """
        try:
            # Format transactions for the prompt
            transactions_text = "\n".join([
                f"- {t['date']}: {t['description']} (${t['amount']:,.2f})"
                for t in transactions
            ])

            prompt = f"""
            Analyze these transactions and provide insights:
            {transactions_text}

            Please provide:
            1. Spending patterns
            2. Unusual transactions
            3. Cost-saving opportunities
            4. Cash flow predictions
            """

            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a financial advisor specializing in business analytics."},
                    {"role": "user", "content": prompt}
                ]
            )

            return {
                "insights": response.choices[0].message.content,
                "status": "success"
            }
        except Exception as e:
            return {
                "insights": "Error generating insights.",
                "status": "error",
                "error": str(e)
            } 