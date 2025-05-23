from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()

class TransactionType(enum.Enum):
    ACCOUNTS_PAYABLE = "accounts_payable"
    ACCOUNTS_RECEIVABLE = "accounts_receivable"
    BANK = "bank"

class TransactionStatus(enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class AccountType(enum.Enum):
    ASSET = "Asset"
    LIABILITY = "Liability"
    EQUITY = "Equity"
    REVENUE = "Revenue"
    EXPENSE = "Expense"

class NormalBalance(enum.Enum):
    DEBIT = "Debit"
    CREDIT = "Credit"

class Account(Base):
    __tablename__ = "chart_of_accounts"

    id = Column(Integer, primary_key=True, index=True)
    account_code = Column(String, unique=True, index=True)
    account_name = Column(String, unique=True, index=True)
 account_type = Column(Enum(AccountType))
    description = Column(String, nullable=True)
    normal_balance = Column(Enum(NormalBalance))

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    entry_date = Column(DateTime, default=datetime.utcnow)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    journal_items = relationship("JournalItem", back_populates="journal_entry")

class JournalItem(Base):
    __tablename__ = "journal_items"

    id = Column(Integer, primary_key=True, index=True)
    journal_entry_id = Column(Integer, ForeignKey("journal_entries.id"))
 account_id = Column(Integer, ForeignKey("chart_of_accounts.id"))
    debit = Column(Float, default=0.0)
    credit = Column(Float, default=0.0)
    journal_entry = relationship("JournalEntry", back_populates="journal_items")

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)  # Customer, Vendor
    email = Column(String)
    phone = Column(String)
    address = Column(String)
    tax_id = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    invoice_number = Column(String, unique=True, index=True)
    contact_id = Column(Integer, ForeignKey("contacts.id"))
    type = Column(String)  # Payable, Receivable
    amount = Column(Float)
    due_date = Column(DateTime)
    status = Column(String)  # Draft, Sent, Paid, Overdue
    
    # Relationship
    contact = relationship("Contact")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class BankReconciliation(Base):
    __tablename__ = "bank_reconciliations"
    id = Column(Integer, primary_key=True, index=True)
 account_id = Column(Integer, ForeignKey("chart_of_accounts.id"))
    statement_date = Column(DateTime)
    statement_balance = Column(Float)
    reconciled_balance = Column(Float)
    status = Column(String)  # In Progress, Completed
    
    # Relationship
    account = relationship("Account")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) 