import React, { useState } from 'react';
import { coCreateContent } from '../services/geminiService';
import { GeneratedContent } from '../types';
import { Sparkles, Send, Mic } from 'lucide-react';

interface CoCreationStudioProps {
    onInteract: () => void;
}

export const CoCreationStudio: React.FC<CoCreationStudioProps> = ({ onInteract }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<GeneratedContent | null>(null);

    const handleCreate = async () => {
        if (!prompt.trim()) return;
        onInteract();
        setIsGenerating(true);
        const data = await coCreateContent(prompt, 'story');
        setResult(data);
        setIsGenerating(false);
    };

    return (
        <div className="w-full h-full pt-10 px-6 pb-24 overflow-y-auto bg-slate-950 flex flex-col items-center">
            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                        AI Co-Creation Studio
                    </h1>
                    <p className="text-slate-400">Describe a world, a game, or a story. The AI builds the skeleton; you bring the soul.</p>
                </div>

                {/* Input Area */}
                <div className="glass-panel p-2 rounded-2xl flex items-center space-x-2 neon-glow relative">
                    <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. A cyberpunk detective story where gravity is optional..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white p-4 placeholder-slate-500 outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    />
                    <button className="p-3 text-slate-400 hover:text-white transition-colors">
                        <Mic size={20} />
                    </button>
                    <button 
                        onClick={handleCreate}
                        disabled={isGenerating}
                        className="bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-xl font-bold transition-all disabled:opacity-50"
                    >
                        {isGenerating ? <Sparkles className="animate-spin" /> : <Send size={20} />}
                    </button>
                </div>

                {/* Result Area */}
                {result && (
                    <div className="animate-in slide-in-from-bottom duration-700 fade-in">
                        <div className="glass-panel rounded-3xl overflow-hidden border border-purple-500/30">
                            <div className="bg-purple-900/20 p-6 border-b border-purple-500/10 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-purple-200">{result.title}</h2>
                                <span className="text-xs font-mono text-purple-400 border border-purple-400/50 px-2 py-1 rounded">DRAFT V1.0</span>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="prose prose-invert prose-lg">
                                    <p>{result.content}</p>
                                </div>
                                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                                    <h3 className="text-sm font-bold text-cyan-400 uppercase mb-2 flex items-center gap-2">
                                        <Sparkles size={14} /> Suggested Visuals
                                    </h3>
                                    <p className="text-sm text-slate-400 italic">{result.suggestedVisuals}</p>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-lg text-sm font-semibold transition-all">
                                        Regenerate
                                    </button>
                                    <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-purple-500/20">
                                        Publish to Universe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {!result && !isGenerating && (
                    <div className="grid grid-cols-2 gap-4">
                        {['Dreamscape generator', 'AR Scavenger Hunt', 'Virtual Concert', 'Interactive Memory'].map((suggestion) => (
                            <button 
                                key={suggestion}
                                onClick={() => setPrompt(suggestion)}
                                className="p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-900/10 text-slate-400 hover:text-cyan-200 text-left transition-all text-sm"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};