import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { UserStats } from '../types';
import { Award, Zap, Heart } from 'lucide-react';

interface ProfileHUDProps {
    stats: UserStats;
}

export const ProfileHUD: React.FC<ProfileHUDProps> = ({ stats }) => {
    const data = [
        { subject: 'Creativity', A: stats.creativity, fullMark: 100 },
        { subject: 'Empathy', A: stats.empathy, fullMark: 100 },
        { subject: 'Collab', A: stats.collaboration, fullMark: 100 },
        { subject: 'Influence', A: stats.reputation, fullMark: 100 },
        { subject: 'Activity', A: 85, fullMark: 100 },
        { subject: 'Trend', A: 65, fullMark: 100 },
    ];

    return (
        <div className="w-full h-full pt-10 px-6 pb-24 overflow-y-auto bg-slate-950 flex flex-col items-center">
             <div className="max-w-4xl w-full">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Alex_Nova</h1>
                        <p className="text-cyan-400 font-mono text-sm">Level 42 Architect</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">{stats.reputation.toLocaleString()}</div>
                        <p className="text-slate-500 text-xs uppercase tracking-wider">Reputation Score</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Radar Chart */}
                    <div className="glass-panel rounded-3xl p-4 h-[350px] flex flex-col items-center justify-center relative">
                         <h3 className="absolute top-6 left-6 text-sm font-bold text-slate-400 uppercase">Influence Matrix</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Mike"
                                    dataKey="A"
                                    stroke="#06b6d4"
                                    strokeWidth={3}
                                    fill="#06b6d4"
                                    fillOpacity={0.3}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border-l-4 border-purple-500">
                            <div className="bg-purple-500/20 p-3 rounded-full text-purple-400">
                                <Award size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Top Collaborator</h4>
                                <p className="text-sm text-slate-400">Co-created 12 universes this week</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border-l-4 border-pink-500">
                            <div className="bg-pink-500/20 p-3 rounded-full text-pink-400">
                                <Heart size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">High Empathy</h4>
                                <p className="text-sm text-slate-400">Your interactions improved community mood by 15%</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border-l-4 border-yellow-500">
                            <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-400">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">Daily Streak</h4>
                                <p className="text-sm text-slate-400">{stats.streak} days active in the Verse</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 glass-panel rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden">
                                        <img src={`https://picsum.photos/100?random=${i+10}`} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium">Expanded "Neo-Tokyo" Story</p>
                                        <p className="text-slate-500 text-xs">2 hours ago</p>
                                    </div>
                                </div>
                                <span className="text-cyan-400 text-xs font-bold">+50 REP</span>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
        </div>
    );
};