import React from 'react';

export default function ExpenseListItem({ title, amount, onDelete, onEdit }) {
  const isNegative = amount < 0;

  return (
    <div className={`expense-item ${isNegative ? 'negative' : 'positive'}`}>
      <div className="expense-title">{title}</div>
      <div className="expense-amount">${amount.toFixed(2)}</div>

      {/* Buttons Container */}
      <div className="action-buttons">
        <button className="edit-btn" onClick={onEdit}>edit</button>
        <button className="delete-btn" onClick={onDelete}>del</button>
      </div>
    </div>
  );
}
