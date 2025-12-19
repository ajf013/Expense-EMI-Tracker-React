import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import Button from './Button';
import { FaTrash, FaPlus } from 'react-icons/fa';

const EMIList = () => {
    const { emis, addEmi, deleteEmi, isSharedView } = useExpense();
    const [showForm, setShowForm] = useState(false);
    const [newEmi, setNewEmi] = useState({ name: '', amount: '', totalMonths: '', startDate: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newEmi.name || !newEmi.amount) return;
        addEmi(newEmi);
        setNewEmi({ name: '', amount: '', totalMonths: '', startDate: '' });
        setShowForm(false);
    };

    const calculateProgress = (startDate, totalMonths) => {
        if (!startDate || !totalMonths) return { current: 1, remaining: totalMonths };
        const start = new Date(startDate);
        const now = new Date();

        // Calculate months difference
        let months = (now.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += now.getMonth();

        // If current day is before start day in month, subtract 1? 
        // Simplified: Just month diff. 
        // Ensure at least month 1
        const currentParam = Math.max(1, months + 1);
        const remaining = Math.max(0, totalMonths - currentParam);

        return { current: currentParam, remaining };
    };

    return (
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Monthly EMIs</h3>
                {!isSharedView && (
                    <Button onClick={() => setShowForm(!showForm)} className="btn-icon">
                        <FaPlus />
                    </Button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <input
                        className="glass-input"
                        placeholder="EMI Name"
                        value={newEmi.name}
                        onChange={e => setNewEmi({ ...newEmi, name: e.target.value })}
                    />
                    <input
                        className="glass-input"
                        type="number"
                        placeholder="Amount"
                        value={newEmi.amount}
                        onChange={e => setNewEmi({ ...newEmi, amount: e.target.value })}
                    />
                    <input
                        className="glass-input"
                        type="number"
                        placeholder="Total Months"
                        value={newEmi.totalMonths}
                        onChange={e => setNewEmi({ ...newEmi, totalMonths: e.target.value })}
                    />
                    <input
                        className="glass-input"
                        type="date"
                        value={newEmi.startDate}
                        onChange={e => setNewEmi({ ...newEmi, startDate: e.target.value })}
                    />
                    <Button type="submit">Add EMI</Button>
                </form>
            )}

            {emis.length === 0 ? (
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>No EMIs configured.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--card-border)', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Name</th>
                                <th style={{ padding: '0.5rem' }}>Amount</th>
                                <th style={{ padding: '0.5rem' }}>Status</th>
                                <th style={{ padding: '0.5rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emis.map(emi => {
                                const { current, remaining } = calculateProgress(emi.startDate, emi.totalMonths);
                                return (
                                    <tr key={emi.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem 0.5rem' }}>{emi.name}</td>
                                        <td style={{ padding: '1rem 0.5rem' }}>₹{emi.amount}</td>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <span style={{ fontSize: '0.8rem', background: 'var(--primary-color)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                Month {current} / {emi.totalMonths || '?'}
                                            </span>
                                            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '2px' }}>
                                                {remaining} left
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <button onClick={() => deleteEmi(emi.id)} className="btn-icon" style={{ color: '#ef4444' }}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EMIList;
