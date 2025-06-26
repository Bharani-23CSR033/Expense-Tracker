import React, { useEffect, useState } from 'react';
import axios from 'axios';
import History from './History';
import ExpenseForm from './ExpenseForm';
import BalanceContainer from './BalanceContainer';

const FIXED_INCOME = 800;

function ExpenseContainer() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const addExpense = async (expense) => {
    try {
      if (editingExpense) {
        const res = await axios.put(`http://localhost:3000/expenses/${editingExpense._id}`, expense);
        setExpenses((prev) =>
          prev.map((item) => item._id === editingExpense._id ? res.data.expense : item)
        );
        setEditingExpense(null);
      } else {
        const res = await axios.post('http://localhost:3000/expenses', expense);
        setExpenses((prev) => [...prev, res.data.expense]);
      }
    } catch (err) {
      console.error('Error saving expense:', err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/expenses/${id}`);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
      if (editingExpense?.id === id) setEditingExpense(null);
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const editExpense = (id) => {
    const item = expenses.find((exp) => exp._id === id);
    setEditingExpense(item);
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = FIXED_INCOME - totalExpense;

  return (
    <div className="expense-container">
      <h1>Expense Tracker</h1>
      <BalanceContainer income={FIXED_INCOME} expense={totalExpense} balance={balance} />
      <ExpenseForm
        addExpense={addExpense}
        initialData={editingExpense}
        cancelEdit={() => setEditingExpense(null)}
      />
      <History expenses={expenses} onDelete={deleteExpense} onEdit={editExpense} />
    </div>
  );
}

export default ExpenseContainer;
