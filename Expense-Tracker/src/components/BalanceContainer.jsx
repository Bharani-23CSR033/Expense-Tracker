import React from 'react';

function BalanceContainer({ income, expense, balance }) {
  return (
    <div className="balance-container">
      <div className="balance-item">
        <div className="title">Income</div>
        <div className="amount">${income.toFixed(2)}</div>
      </div>
      <div className="balance-item">
        <div className="title">Expenses</div>
        <div className="amount">${expense.toFixed(2)}</div>
      </div>
      <div className="balance-item">
        <div className="title">Balance</div>
        <div className="amount">${balance.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default BalanceContainer;
