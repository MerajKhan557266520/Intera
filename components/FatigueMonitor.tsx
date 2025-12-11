import React from 'react';
import { Coffee, RefreshCw } from 'lucide-react';

interface FatigueMonitorProps {
    fatigueLevel: number;
    onReset: () => void;
}

export const FatigueMonitor: React.FC<FatigueMonitorProps> = ({ fatigueLevel, onReset }) => {
    // Only show if fatigue is high (simulated > 5 interactions)
    if (fatigueLevel < 5) return null;

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md animate-in slide-in-from-top duration-500">
            <div className="bg-[#1e1b4b] border border-indigo-500/50 rounded-2xl p-4 shadow-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500/20 p-2 rounded-full text-indigo-300">
                        <Coffee size={20} />
                    </div>
                    <div>
                        <h4 className="text-indigo-200 font-bold text-sm">Fatigue Detected</h4>
                        <p className="text-indigo-400/80 text-xs">We noticed repetitive scrolling. Switching context?</p>
                    </div>
                </div>
                <button 
                    onClick={onReset}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    <RefreshCw size={12} />
                    Refresh Mood
                </button>
            </div>
        </div>
    );
};