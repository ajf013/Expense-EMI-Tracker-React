import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import Button from './Button';
import { FaTrash, FaShoppingBag, FaUtensils, FaCar, FaBolt, FaEllipsisH } from 'react-icons/fa';

const CategoryIcon = ({ category }) => {
    switch (category) {
        case 'food': return <FaUtensils />;
        case 'travel': return <FaCar />;
        case 'utilities': return <FaBolt />;
        case 'shopping': return <FaShoppingBag />;
        default: return <FaEllipsisH />;
    }
};

const ExpenseList = () => {
    const { expenses, addExpense, deleteExpense } = useExpense();
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('other');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!desc || !amount) return;
        addExpense({ description: desc, amount: parseFloat(amount), category, date: new Date().toISOString() });
        setDesc('');
        setAmount('');
    };

    return (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3>Quick Expense</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 1fr) 1fr 100px auto', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <select
                    className="glass-input"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="other">General</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="utilities">Bills</option>
                    <option value="shopping">Shop</option>
                </select>
                <input
                    className="glass-input"
                    placeholder="Description"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
                <input
                    className="glass-input"
                    type="number"
                    placeholder="₹"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <Button type="submit" style={{ padding: '0.75rem' }}>Add</Button>
            </form>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {expenses.length === 0 ? (
                    <p style={{ textAlign: 'center', opacity: 0.6 }}>No recent expenses.</p>
                ) : (
                    expenses.map(exp => (
                        <div key={exp.id} style={{ display: 'flex', alignItems: 'center', padding: '0.75rem', borderBottom: '1px solid var(--card-border)', gap: '1rem' }}>
                            <div style={{ background: 'var(--input-bg)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
                                <CategoryIcon category={exp.category} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500 }}>{exp.description}</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{new Date(exp.date).toLocaleDateString()}</div>
                            </div>
                            <div style={{ fontWeight: 600, color: '#ef4444' }}>
                                -₹{exp.amount}
                            </div>
                            <button onClick={() => deleteExpense(exp.id)} className="btn-icon" style={{ opacity: 0.5 }}>
                                <FaTrash size={12} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
