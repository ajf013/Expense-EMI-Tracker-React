import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import SalaryInput from './SalaryInput';
import EMIList from './EMIList';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
    const { balance, totalEmiAmount, totalExpenses, salary } = useExpense();

    return (
        <div>
            <SalaryInput />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1rem', textAlign: 'center', background: 'rgba(99, 102, 241, 0.1)' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Available Balance</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: balance < 0 ? '#ef4444' : 'var(--primary-color)', overflowWrap: 'break-word' }}>
                        ₹{balance.toLocaleString()}
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total EMI</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, overflowWrap: 'break-word' }}>
                        ₹{totalEmiAmount.toLocaleString()}
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Expenses</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444', overflowWrap: 'break-word' }}>
                        ₹{totalExpenses.toLocaleString()}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <EMIList />
                <ExpenseList />
            </div>
        </div>
    );
};

export default Dashboard;
