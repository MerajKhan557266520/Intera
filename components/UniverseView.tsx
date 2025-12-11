import React, { useEffect, useState } from 'react';
import { UniverseNode } from '../types';
import { generateUniverseNodes } from '../services/geminiService';
import { Loader2, Play, Users, Gamepad2, BrainCircuit } from 'lucide-react';

interface UniverseViewProps {
    onInteract: () => void;
}

export const UniverseView: React.FC<UniverseViewProps> = ({ onInteract }) => {
    const [nodes, setNodes] = useState<UniverseNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNode, setSelectedNode] = useState<UniverseNode | null>(null);

    useEffect(() => {
        const fetchUniverse = async () => {
            // Simulated user interests
            const interests = ['Sci-Fi', 'Electronic Music', 'Sustainable Tech', 'Retro Gaming'];
            const data = await generateUniverseNodes(interests);
            setNodes(data);
            setLoading(false);
        };
        fetchUniverse();
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'MINI_GAME': return <Gamepad2 size={16} />;
            case 'SOCIAL_EVENT': return <Users size={16} />;
            case 'MEMORY_CAPSULE': return <BrainCircuit size={16} />;
            default: return <Play size={16} />;
        }
    };

    if (loading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-cyan-500">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="animate-pulse text-sm tracking-widest uppercase">Generating Universe...</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden perspective-1000">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black -z-10" />
            
            {/* Grid Lines for depth perception */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
                     backgroundSize: '100px 100px',
                     transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
                     pointerEvents: 'none'
                 }} 
            />

            {/* Content Nodes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {nodes.map((node, i) => {
                    // Calculate pseudo-random positions for the "Cloud" layout
                    // In a real app, this would use Three.js or more complex math
                    const xPos = node.coordinates.x * 10;
                    const yPos = node.coordinates.y * 5;
                    const scale = 1 - (Math.abs(node.coordinates.z) / 40);
                    const zIndex = Math.floor(scale * 100);

                    return (
                        <div
                            key={node.id}
                            className={`absolute pointer-events-auto cursor-pointer transition-all duration-500 ease-out group ${i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}
                            style={{
                                transform: `translate(${xPos}px, ${yPos}px) scale(${scale})`,
                                zIndex: zIndex
                            }}
                            onClick={() => {
                                onInteract();
                                setSelectedNode(node);
                            }}
                        >
                            <div className="relative w-48 h-64 rounded-2xl overflow-hidden glass-panel group-hover:neon-glow group-hover:scale-105 transition-all border-t border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-10" />
                                <img 
                                    src={node.imageUrl} 
                                    alt={node.title} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <div className="flex items-center space-x-2 text-xs font-bold mb-1" style={{ color: node.color }}>
                                        {getTypeIcon(node.type)}
                                        <span>{node.type.replace('_', ' ')}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{node.title}</h3>
                                    <p className="text-xs text-gray-400 line-clamp-2">{node.description}</p>
                                </div>

                                {/* Creator Badge */}
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-[10px] border border-white/10 z-20">
                                    @{node.creator}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Active Node Modal Overlay */}
            {selectedNode && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="max-w-2xl w-full bg-[#0f172a] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl relative">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedNode(null); }}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20"
                        >
                            ✕
                        </button>
                        
                        <div className="relative h-64">
                             <img src={selectedNode.imageUrl} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
                             <div className="absolute bottom-6 left-6">
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedNode.title}</h2>
                                <div className="flex space-x-3">
                                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-mono border border-cyan-500/30">
                                        {selectedNode.type}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-mono border border-purple-500/30">
                                        @{selectedNode.creator}
                                    </span>
                                </div>
                             </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {selectedNode.description}
                                <span className="block mt-4 text-sm text-slate-500 italic">
                                    Entering this node blends your current context with the creator's universe. 
                                    This is a simulated immersive environment.
                                </span>
                            </p>

                            <div className="flex space-x-4">
                                <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                    Enter Experience
                                </button>
                                <button className="flex-1 border border-slate-600 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all">
                                    Co-Create Remix
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};