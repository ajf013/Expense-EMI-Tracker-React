import React, { useState } from 'react';
import { FaShareAlt, FaCheck } from 'react-icons/fa';
import { useExpense } from '../context/ExpenseContext';

const ShareButton = () => {
    const { getShareableLink, isSharedView } = useExpense();
    const [copied, setCopied] = useState(false);

    if (isSharedView) return null; // Don't show share button in shared view

    const handleShare = async () => {
        const link = getShareableLink();
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            // Optional: You could use a nicer toast here if available
            // alert('Link copied to clipboard!'); 
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback
            prompt("Copy this link:", link);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="btn-icon"
            style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            title="Share Live View"
        >
            {copied ? <FaCheck color="var(--primary-color)" /> : <FaShareAlt />}
        </button>
    );
};

export default ShareButton;
