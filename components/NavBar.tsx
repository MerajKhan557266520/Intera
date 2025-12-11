import React from 'react';
import { Compass, PlusCircle, User, Hexagon, Activity } from 'lucide-react';

interface NavBarProps {
    currentView: string;
    onChangeView: (view: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, onChangeView }) => {
    const navItems = [
        { id: 'universe', icon: Compass, label: 'Universe' },
        { id: 'cocreate', icon: PlusCircle, label: 'Co-Create' },
        { id: 'fusion', icon: Hexagon, label: 'Fusion' },
        { id: 'profile', icon: User, label: 'Identity' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="glass-panel rounded-full px-6 py-3 flex items-center space-x-8 neon-glow">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onChangeView(item.id)}
                        className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                            currentView === item.id 
                            ? 'text-cyan-400 transform -translate-y-2 scale-110' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <item.icon size={24} />
                        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};