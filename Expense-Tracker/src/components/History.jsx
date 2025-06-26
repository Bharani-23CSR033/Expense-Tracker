import React from 'react';
import ExpenseListItem from './ExpenseListItem';

function History({ expenses, onDelete, onEdit }) {
  return (
    <div className="history">
      <h3>History</h3>
      {expenses.map((expense) => (
        <ExpenseListItem
          key={expense._id}
          title={expense.title}
          amount={expense.amount}
          onDelete={() => onDelete(expense._id)}
          onEdit={() => onEdit(expense._id)}
        />
      ))}
    </div>
  );
}

export default History;
