import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import Typewriter from 'typewriter-effect';
import Button from './Button';

const SalaryInput = () => {
    const { salary, updateSalary } = useExpense();
    const [isEditing, setIsEditing] = useState(salary === 0);
    const [inputVal, setInputVal] = useState(salary);

    const handleSave = () => {
        updateSalary(inputVal);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
                <h3>Monthly Income</h3>
                <h2 style={{ fontSize: '3rem', color: 'var(--primary-color)', margin: '1rem 0' }}>
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(salary)}
                </h2>
                <Button onClick={() => setIsEditing(true)} variant="secondary">Update Salary</Button>
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', minHeight: '1.5em' }}>
                <Typewriter
                    options={{
                        strings: ['What is your monthly salary?', 'Enter your income details...'],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        deleteSpeed: 30,
                    }}
                />
            </h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
                <input
                    type="number"
                    className="glass-input"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="e.g. 50000"
                />
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
};

export default SalaryInput;
