const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://bharaneedharan:bharani@cluster0.siqfccp.mongodb.net/expense?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Connection error:", err));

// Schema & Model
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true }
});
const Expense = mongoose.model('Expense', expenseSchema);

// Routes

// CREATE
app.post('/expenses', async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newExpense = new Expense({ title, amount });
    await newExpense.save();
    res.status(201).json({ message: 'Expense saved successfully', expense: newExpense });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save expense', details: err.message });
  }
});

// READ
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses', details: err.message });
  }
});

// UPDATE
app.put('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(id, { title, amount }, { new: true });

    if (!updatedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense', details: err.message });
  }
});

// DELETE
app.delete('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
