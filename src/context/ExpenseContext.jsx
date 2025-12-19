import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    // Check for shared data in URL
    const searchParams = new URLSearchParams(window.location.search);
    const sharedDataParam = searchParams.get('data');
    const [isSharedView, setIsSharedView] = useState(false);

    // Initial Load Logic
    const [salary, setSalary] = useState(() => {
        if (sharedDataParam) {
            try {
                const data = JSON.parse(atob(sharedDataParam));
                if (data.salary !== undefined) {
                    setIsSharedView(true);
                    return parseFloat(data.salary);
                }
            } catch (e) {
                console.error("Failed to parse shared data", e);
            }
        }
        return parseFloat(localStorage.getItem('salary')) || 0;
    });

    const [emis, setEmis] = useState(() => {
        if (sharedDataParam) {
            try {
                const data = JSON.parse(atob(sharedDataParam));
                if (data.emis) return data.emis;
            } catch (e) { /* ignore */ }
        }
        return JSON.parse(localStorage.getItem('emis')) || [];
    });

    const [expenses, setExpenses] = useState(() => {
        if (sharedDataParam) {
            try {
                const data = JSON.parse(atob(sharedDataParam));
                if (data.expenses) return data.expenses;
            } catch (e) { /* ignore */ }
        }
        return JSON.parse(localStorage.getItem('expenses')) || [];
    });

    // Persistence (Only if NOT a shared view)
    useEffect(() => {
        if (!isSharedView) {
            localStorage.setItem('salary', salary);
        }
    }, [salary, isSharedView]);

    useEffect(() => {
        if (!isSharedView) {
            localStorage.setItem('emis', JSON.stringify(emis));
        }
    }, [emis, isSharedView]);

    useEffect(() => {
        if (!isSharedView) {
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }
    }, [expenses, isSharedView]);

    // Monthly Reset Logic
    useEffect(() => {
        if (isSharedView) return;

        const currentMonthKey = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
        const storedMonthKey = localStorage.getItem('lastVisitedMonth');

        if (storedMonthKey && storedMonthKey !== currentMonthKey) {
            // It's a new month! Reset transactional data.
            // 1. Clear Expenses
            setExpenses([]);

            // 2. Reset EMI Paid status
            // We need to use the functional update to ensure we have the latest state if it was just loaded
            setEmis(prevEmis => prevEmis.map(e => ({ ...e, isPaid: false })));

            // Optional: You could notify the user here via a toast
            console.log("New month detected. Resetting data.");
        }

        // Update the stored month to today
        localStorage.setItem('lastVisitedMonth', currentMonthKey);
    }, [isSharedView]); // Run once on mount (and if share view changes, though unlikely to matter for persistent logic)

    // Actions
    const updateSalary = (amount) => {
        if (isSharedView) return; // Read only
        setSalary(parseFloat(amount));
    };

    const addEmi = (emi) => {
        if (isSharedView) return;
        setEmis([...emis, { ...emi, id: uuidv4(), paidMonths: 0, isPaid: false }]);
    };

    const deleteEmi = (id) => {
        if (isSharedView) return;
        setEmis(emis.filter(e => e.id !== id));
    };

    const toggleEmiPaid = (id) => {
        if (isSharedView) return;
        setEmis(emis.map(e => e.id === id ? { ...e, isPaid: !e.isPaid } : e));
    };

    const addExpense = (expense) => {
        if (isSharedView) return;
        setExpenses([{ ...expense, id: uuidv4(), date: new Date().toISOString() }, ...expenses]);
    };

    const deleteExpense = (id) => {
        if (isSharedView) return;
        setExpenses(expenses.filter(e => e.id !== id));
    };

    const clearAll = () => {
        if (isSharedView) return;
        setSalary(0);
        setEmis([]);
        setExpenses([]);
    }

    // Share Helper
    const getShareableLink = () => {
        const data = { salary, emis, expenses };
        const encoded = btoa(JSON.stringify(data));
        const url = new URL(window.location.href);
        url.searchParams.set('data', encoded);
        return url.toString();
    };

    // Derived State
    const totalEmiAmount = emis.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const balance = salary - totalEmiAmount - totalExpenses;

    return (
        <ExpenseContext.Provider value={{
            salary, updateSalary,
            emis, addEmi, deleteEmi, toggleEmiPaid,
            expenses, addExpense, deleteExpense,
            balance, totalEmiAmount, totalExpenses,
            clearAll,
            isSharedView, getShareableLink
        }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);
