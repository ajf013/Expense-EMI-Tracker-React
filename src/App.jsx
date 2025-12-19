import { ThemeProvider, useTheme } from './context/ThemeContext'
import { ExpenseProvider, useExpense } from './context/ExpenseContext'
import Background from './components/Background'
import Dashboard from './components/Dashboard'
import ShareButton from './components/ShareButton'
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import Footer from './components/Footer/Footer';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn-icon" style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

const Layout = () => {
  const { isSharedView } = useExpense();

  return (
    <>
      <Background />
      {isSharedView && (
        <div style={{
          background: '#f59e0b',
          color: '#fff',
          textAlign: 'center',
          padding: '0.5rem',
          fontWeight: 'bold',
          position: 'relative',
          zIndex: 10
        }}>
          You are viewing a shared snapshot. Changes will not be saved.
        </div>
      )}
      <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>
        <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px' }}>Expense and EMI Tracker</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShareButton />
            <ThemeToggle />
          </div>
        </header>
        <Dashboard />
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <Layout />
      </ExpenseProvider>
    </ThemeProvider>
  )
}

export default App
