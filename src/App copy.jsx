import React, { useState } from 'react';
import './styles.css';

function App() {
  const [rentAmount, setRentAmount] = useState('');
  const [moveDate, setMoveDate] = useState('');
  const [moveAction, setMoveAction] = useState('moveIn');
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const calculateProratedAmount = () => {
    try {
      if (!rentAmount.trim() || !moveDate.trim()) {
        setError('Please enter both rent amount and move date.');
        return;
      }

      // Validate move date format
      const dateRegex = /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[01])\/\d{4}$/;
      if (!dateRegex.test(moveDate)) {
        setError('Please enter the move date in MM/DD/YYYY format.');
        return;
      }

      const [month, day, year] = moveDate.split('/');
      const moveDateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();

      if (moveDateObj > today) {
        setError('Move date cannot be in the future.');
        return;
      }

      const daysInMonth = new Date(moveDateObj.getFullYear(), moveDateObj.getMonth() + 1, 0).getDate();
      const remainingDays = daysInMonth - moveDateObj.getDate() + 1;

      const amountPerDay = parseFloat(rentAmount) / daysInMonth;
      let proratedAmount = 0;

      let billableDays = 0;

      if (moveAction === 'moveIn') {
        proratedAmount = amountPerDay * remainingDays;
        billableDays = remainingDays;
      } else if (moveAction === 'moveOut') {
        proratedAmount = amountPerDay * moveDateObj.getDate();
        billableDays = moveDateObj.getDate();
      }

      setSummary({
        moveDate: `${moveDateObj.getMonth() + 1}/${moveDateObj.getDate()}/${moveDateObj.getFullYear()}`,
        daysInMonth,
        amountPerDay: amountPerDay.toFixed(2),
        proratedAmount: proratedAmount.toFixed(2),
        billableDays,
      });

      setError(null);
    } catch (error) {
      setError('An error occurred while calculating the prorated amount.');
    }
  };

  const handleCalculate = () => {
    calculateProratedAmount();
  };

  return (
    <center>
      <div className="prorated-rent-calculator">
        <h2>Prorated Rent Calculator</h2>

        <div>
          <label>Rent Amount:</label>
          <input type="number" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} />
        </div>

        <div>
          <label>Move-In/Out:</label>
          <select value={moveAction} onChange={(e) => setMoveAction(e.target.value)}>
            <option value="moveIn">Move In</option>
            <option value="moveOut">Move Out</option>
          </select>
        </div>

        <div>
          <label>Move Date:</label>
          <input type="text" value={moveDate} onChange={(e) => setMoveDate(e.target.value)} placeholder="MM/DD/YYYY" />
        </div>

        <button onClick={handleCalculate}>Calculate</button>

        {error && <p className="error">{error}</p>}

        {summary && (
          <div className="summary">
            <p>Prorated Amount: ${summary.proratedAmount}</p>
            <p>Move Date: {summary.moveDate}</p>
            <p>Days in Month: {summary.daysInMonth}</p>
            <p>Amount / Day: ${summary.amountPerDay}</p>
            <p>Billable Days: {summary.billableDays}</p>
          </div>
        )}
      </div>
    </center>
  );
}

export default App;
