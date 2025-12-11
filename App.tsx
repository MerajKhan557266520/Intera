import React, { useState, useEffect } from 'react';
import { NavBar } from './components/NavBar';
import { UniverseView } from './components/UniverseView';
import { CoCreationStudio } from './components/CoCreationStudio';
import { ProfileHUD } from './components/ProfileHUD';
import { FatigueMonitor } from './components/FatigueMonitor';
import { UserStats } from './types';

// Mock User Stats
const initialStats: UserStats = {
    reputation: 12450,
    creativity: 85,
    collaboration: 92,
    empathy: 78,
    streak: 42
};

export default function App() {
    const [currentView, setCurrentView] = useState('universe');
    const [fatigueLevel, setFatigueLevel] = useState(0);
    const [userStats, setUserStats] = useState(initialStats);

    // Interaction handler to simulate fatigue tracking and gamification
    const handleInteraction = () => {
        setFatigueLevel(prev => prev + 1);
        setUserStats(prev => ({
            ...prev,
            reputation: prev.reputation + 5 // Micro-reward for interaction
        }));
    };

    const handleResetFatigue = () => {
        setFatigueLevel(0);
        // Maybe change view automatically to break pattern
        setCurrentView(currentView === 'universe' ? 'cocreate' : 'universe');
    };

    return (
        <div className="w-screen h-screen bg-black text-white overflow-hidden relative font-sans selection:bg-cyan-500/30">
            
            {/* Top Bar / Branding */}
            <div className="fixed top-0 left-0 p-6 z-40 pointer-events-none">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 animate-pulse" />
                    <span className="text-2xl font-bold tracking-tighter">ENTRA<span className="text-cyan-400">2.0</span></span>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="w-full h-full relative">
                {currentView === 'universe' && <UniverseView onInteract={handleInteraction} />}
                {currentView === 'cocreate' && <CoCreationStudio onInteract={handleInteraction} />}
                {currentView === 'profile' && <ProfileHUD stats={userStats} />}
                {currentView === 'fusion' && (
                    <div className="flex items-center justify-center h-full text-slate-500">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Social Story Fusion</h2>
                            <p>Coming in Module 2.1 - Blending realities...</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Smart Overlays */}
            <FatigueMonitor fatigueLevel={fatigueLevel} onReset={handleResetFatigue} />

            {/* Navigation */}
            <NavBar currentView={currentView} onChangeView={(view) => {
                setCurrentView(view);
                handleInteraction(); // Changing view counts as interaction
            }} />

            {/* Background Ambience (Optional global effects) */}
            <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900 blur-[120px]" />
            </div>
        </div>
    );
}