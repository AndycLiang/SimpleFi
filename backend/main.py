from fastapi import FastAPI, Depends, HTTPException
from .app.routes import api
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from typing import List
from datetime import date
from pydantic import BaseModel, Field
from app.models.models import AccountTypeEnum, Account  # Assuming AccountTypeEnum and Account models are defined in models.py
from app.database import get_db
from sqlalchemy.orm import Session

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="SimpleFi API",
    description="AI-Powered Accounting System API",
    version="1.0.0"
)
app.include_router(api.router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to SimpleFi API",
        "status": "active",
        "version": "1.0.0"
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "services": {
            "database": "connected",
            "ai_service": "available"
        }
    }

# Pydantic models for request/response validation
class AccountBase(BaseModel):
    account_code: str = Field(..., description="Unique code for the GL account")
    account_name: str = Field(..., description="Name of the GL account")
    account_type: AccountTypeEnum = Field(..., description="Type of the GL account (Asset, Liability, Equity, Revenue, Expense)")
    description: str | None = Field(None, description="Description of the GL account")
    parent_account_id: int | None = None

class AccountCreate(AccountBase):
    pass

class AccountUpdate(AccountBase):
    pass

class AccountResponse(AccountBase):
    id: int = Field(..., description="ID of the GL account")

    class Config:
        orm_mode = True

class JournalItemBase(BaseModel):
 account_id: int
 debit: float = 0.0
 credit: float = 0.0

class JournalItemCreate(JournalItemBase):
 pass

class JournalItemResponse(JournalItemBase):
 id: int
 journal_entry_id: int

 class Config:
 orm_mode = True

class JournalEntryBase(BaseModel):
 date: date
 description: str

class JournalEntryCreate(JournalEntryBase):
 items: List[JournalItemCreate]

class JournalEntryResponse(JournalEntryBase):
 id: int
 items: List[JournalItemResponse] = []

 class Config:
 orm_mode = True

# Chart of Accounts Endpoints
@app.get("/accounts", response_model=List[AccountResponse])
async def get_all_accounts(db: Session = Depends(get_db)):
    accounts = db.query(Account).all()
    return accounts

@app.post("/accounts", response_model=AccountResponse)
async def create_account(account: AccountCreate, db: Session = Depends(get_db)):
    db_account = Account(**account.dict())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

@app.get("/accounts/{account_id}", response_model=AccountResponse)
async def get_account(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return account

@app.put("/accounts/{account_id}", response_model=AccountResponse)
async def update_account(account_id: int, account: AccountUpdate, db: Session = Depends(get_db)):
    db_account = db.query(Account).filter(Account.id == account_id).first()
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")

    for key, value in account.dict(exclude_unset=True).items():
        setattr(db_account, key, value)

    db.commit()
    db.refresh(db_account)
    return db_account

@app.delete("/accounts/{account_id}")
async def delete_account(account_id: int, db: Session = Depends(get_db)):
    db_account = db.query(Account).filter(Account.id == account_id).first()
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    db.delete(db_account)
    db.commit()
    return {"message": "Account deleted successfully"}

# Journal Entry Endpoints
@app.get("/journal_entries", response_model=List[JournalEntryResponse])
async def get_all_journal_entries(db: Session = Depends(get_db)):
    journal_entries = db.query(JournalEntry).options(joinedload(JournalEntry.items)).all()
    return journal_entries

@app.post("/journal_entries", response_model=JournalEntryResponse)
async def create_journal_entry(journal_entry: JournalEntryCreate, db: Session = Depends(get_db)):
    db_journal_entry = JournalEntry(date=journal_entry.date, description=journal_entry.description)
    db.add(db_journal_entry)
    db.commit()
    db.refresh(db_journal_entry)

    for item in journal_entry.items:
 db_item = JournalItem(journal_entry_id=db_journal_entry.id, **item.dict())
 db.add(db_item)

    db.commit()
    db.refresh(db_journal_entry)
 return db_journal_entry

@app.get("/journal_entries/{journal_entry_id}", response_model=JournalEntryResponse)
async def get_journal_entry(journal_entry_id: int, db: Session = Depends(get_db)):
    journal_entry = db.query(JournalEntry).options(joinedload(JournalEntry.items)).filter(JournalEntry.id == journal_entry_id).first()
    if journal_entry is None:
        raise HTTPException(status_code=404, detail="Journal Entry not found")
 return journal_entry

@app.put("/journal_entries/{journal_entry_id}", response_model=JournalEntryResponse)
async def update_journal_entry(journal_entry_id: int, journal_entry: JournalEntryCreate, db: Session = Depends(get_db)):
    db_journal_entry = db.query(JournalEntry).options(joinedload(JournalEntry.items)).filter(JournalEntry.id == journal_entry_id).first()
    if db_journal_entry is None:
        raise HTTPException(status_code=404, detail="Journal Entry not found")

    db_journal_entry.date = journal_entry.date
    db_journal_entry.description = journal_entry.description

    # Update journal items - this is a simplified approach, a more robust solution might involve diffing and managing additions/deletions
    # For simplicity, we'll just delete existing items and add new ones
    db.query(JournalItem).filter(JournalItem.journal_entry_id == journal_entry_id).delete()
    for item in journal_entry.items:
 db_item = JournalItem(journal_entry_id=db_journal_entry.id, **item.dict())
 db.add(db_item)

    db.commit()
    db.refresh(db_journal_entry)
 return db_journal_entry

@app.delete("/journal_entries/{journal_entry_id}")
async def delete_journal_entry(journal_entry_id: int, db: Session = Depends(get_db)):
    db_journal_entry = db.query(JournalEntry).filter(JournalEntry.id == journal_entry_id).first()
    if db_journal_entry is None:
        raise HTTPException(status_code=404, detail="Journal Entry not found")
    db.delete(db_journal_entry)
    db.commit()
 return {"message": "Journal Entry deleted successfully"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 