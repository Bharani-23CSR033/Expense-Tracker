import React, { useState, useEffect } from 'react';

export default function ExpenseForm({ addExpense, initialData, cancelEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount);
    } else {
      setTitle('');
      setAmount('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({
      title,
      amount: parseFloat(amount),
    });

    setTitle('');
    setAmount('');
  };

  return (
    <div className="expense-form">
      <h3>{initialData ? 'Edit Expense' : 'Add Expense'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button type="submit">
          {initialData ? 'Update' : 'Add'} Expense
        </button>

        {/* Cancel Button: Only show if editing */}
        {initialData && (
         <button
  type="button"
  className="cancel-btn"
  onClick={cancelEdit}
>
  Cancel
</button>

        )}
      </form>
    </div>
  );
}
