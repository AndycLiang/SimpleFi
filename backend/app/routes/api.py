from fastapi import APIRouter, HTTPException, Body, status
from typing import List, Dict, Any
from fastapi.responses import FileResponse
import os

router = APIRouter()

# Define request and response models if you have them (recommended for type safety)
# from ..models.account import AccountCreate, Account  # Example imports

@router.get("/accounts")
async def get_accounts():
  """
  Stub endpoint to get all accounts.
  """
  print("Received GET request for /accounts")
  # Replace with actual logic to fetch accounts from the database
  return [
    {"id": 1, "name": "Cash", "type": "Asset"},
    {"id": 2, "name": "Accounts Payable", "type": "Liability"},
  ]

@router.post("/accounts")
async def create_account(account_data: Dict[str, Any] = Body(...)):
  """
  Stub endpoint to create a new account.
  """
  print(f"Received POST request for /accounts with data: {account_data}")
  # Replace with actual logic to create an account in the database
  # You would typically validate account_data here
  return {"message": "Account created successfully", "account": account_data}

@router.get("/journal-entries")
async def get_journal_entries():
  """
  Stub endpoint to get all journal entries.
  """
  print("Received GET request for /journal-entries")
  # Replace with actual logic to fetch journal entries from the database
  return [
    {"id": 101, "date": "2023-10-27", "description": "Example entry", "debits": [], "credits": []},
  ]

@router.post("/journal-entries")
async def create_journal_entry(entry_data: Dict[str, Any] = Body(...)):
  """
  Stub endpoint to create a new journal entry.
  """
  print(f"Received POST request for /journal-entries with data: {entry_data}")
  # Replace with actual logic to create a journal entry in the database
  # You would typically validate entry_data here
  return {"message": "Journal entry created successfully", "entry": entry_data}

@router.put("/journal-entries/{entry_id}")
async def update_journal_entry(entry_id: int, entry_data: Dict[str, Any] = Body(...)):
  """
  Stub endpoint to update a journal entry.
  """
  print(f"Received PUT request for /journal-entries/{entry_id} with data: {entry_data}")
  # Replace with actual logic to update a journal entry in the database
  # Check if entry_id exists and update the entry
  return {"message": f"Journal entry {entry_id} updated successfully", "entry": entry_data}

# --- AI Endpoints ---

@router.post("/ai/chat")
async def send_ai_chat_message(message_data: Dict[str, str] = Body(...)):
    """
    Stub endpoint to send a message to the AI chat.
    """
    print(f"Received POST request for /ai/chat with data: {message_data}")
    user_message = message_data.get("message")
    if not user_message:
        raise HTTPException(status_code=400, detail="Message not provided")

    # Replace with actual logic to interact with your AI service
    ai_response = f"AI received your message: {user_message}"
    return {"response": ai_response}

@router.post("/ai/analyze-financial-health")
async def analyze_financial_health(financial_data: Dict[str, Any] = Body(...)):
    """
    Stub endpoint for AI financial health analysis.
    """
    print(f"Received POST request for /ai/analyze-financial-health with data: {financial_data}")
    # Replace with actual logic to call your AI service for analysis
    analysis_results = {"summary": "Financial health analysis results placeholder."}
    return analysis_results

@router.post("/ai/extract-invoice-data")
async def extract_invoice_data(invoice_data: Dict[str, Any] = Body(...)):
    """
    Stub endpoint for AI invoice data extraction.
    """
    print(f"Received POST request for /ai/extract-invoice-data with data: {invoice_data}")
    # Replace with actual logic to call your AI service for invoice extraction
    extracted_data = {"invoice_number": "INV-001", "total_amount": 100.00}
    return extracted_data

@router.post("/ai/suggest-categorization")
async def suggest_categorization(transaction_data: Dict[str, Any] = Body(...)):
    """
    Stub endpoint for AI categorization suggestion.
    """
    print(f"Received POST request for /ai/suggest-categorization with data: {transaction_data}")
    # Replace with actual logic to call your AI service for categorization
    suggested_category = "Utilities Expense"
    return {"category": suggested_category}

# --- Invoice Endpoints ---

@router.get("/invoices/{invoice_id}/pdf")
async def get_invoice_pdf(invoice_id: int):
    """
    Stub endpoint to get an invoice PDF.
    """
    print("HELLO THERE!")
    pdf_path = "backend/storage/invoices/test_invoice.pdf"  # Path to your dummy PDF
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="PDF not found")
    return FileResponse(pdf_path, media_type='application/pdf')
