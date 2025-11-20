import React from 'react';
import { AlertTriangle, Info, CheckCircle, Radio } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const AlertCard = ({ alert }) => {
    const {
        sender,
        sent,
        status,
        headline,
        description,
        urgency,
        severity,
        certainty,
        broadcastImmediate,
        wirelessImmediate,
        areaDesc
    } = alert;

    const isEmergency = wirelessImmediate || severity === 'Extreme' || severity === 'Severe';
    const isTest = status === 'Test';

    const getSeverityColor = (sev) => {
        switch (sev?.toLowerCase()) {
            case 'extreme': return 'bg-red-500/20 border-red-500 text-red-200';
            case 'severe': return 'bg-orange-500/20 border-orange-500 text-orange-200';
            case 'moderate': return 'bg-yellow-500/20 border-yellow-500 text-yellow-200';
            case 'minor': return 'bg-blue-500/20 border-blue-500 text-blue-200';
            default: return 'bg-slate-700/50 border-slate-600 text-slate-300';
        }
    };

    const containerClass = cn(
        "relative overflow-hidden rounded-xl border p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.01]",
        getSeverityColor(severity),
        isEmergency && "animate-pulse-red border-2 shadow-2xl shadow-red-900/50"
    );

    return (
        <div className={containerClass}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {isEmergency ? (
                        <AlertTriangle className="w-8 h-8 text-red-500 animate-bounce" />
                    ) : isTest ? (
                        <Info className="w-6 h-6 text-blue-400" />
                    ) : (
                        <Radio className="w-6 h-6 text-green-400" />
                    )}
                    <div>
                        <h3 className="text-lg font-bold tracking-wide uppercase opacity-90">{sender}</h3>
                        <p className="text-xs opacity-60">{new Date(sent).toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                        isEmergency ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"
                    )}>
                        {status}
                    </span>
                    {wirelessImmediate && (
                        <span className="mt-1 text-[10px] text-red-400 font-bold uppercase animate-pulse">
                            Wireless Immediate
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="mb-6">
                <h2 className="text-2xl font-extrabold mb-2 leading-tight">{headline}</h2>
                <p className="text-sm opacity-80 whitespace-pre-wrap leading-relaxed">{description}</p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                <div className="bg-black/20 p-3 rounded-lg">
                    <span className="block text-xs opacity-50 uppercase">Urgency</span>
                    <span className="font-semibold">{urgency}</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                    <span className="block text-xs opacity-50 uppercase">Severity</span>
                    <span className="font-semibold">{severity}</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                    <span className="block text-xs opacity-50 uppercase">Certainty</span>
                    <span className="font-semibold">{certainty}</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                    <span className="block text-xs opacity-50 uppercase">Broadcast</span>
                    <span className="font-semibold">{broadcastImmediate ? "Yes" : "No"}</span>
                </div>
            </div>

            {/* Areas */}
            {areaDesc && areaDesc.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                    <span className="block text-xs opacity-50 uppercase mb-2">Affected Areas</span>
                    <div className="flex flex-wrap gap-2">
                        {areaDesc.map((area, i) => (
                            <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20 transition-colors">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertCard;
