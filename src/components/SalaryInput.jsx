import React from 'react';
import { useExpense } from '../context/ExpenseContext';

const SalaryInput = () => {
    const { salary, updateSalary, isSharedView } = useExpense();

    return (
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.8 }}>Monthly Salary</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹</span>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => updateSalary(e.target.value)}
                        className="glass-input"
                        style={{ fontSize: '1.5rem', fontWeight: 600, width: '200px', background: 'transparent', border: 'none', padding: '0' }}
                        disabled={isSharedView}
                    />
                </div>
            </div>
        </div>
    );
};

export default SalaryInput;
