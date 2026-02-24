'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { NepaliEvent } from '@/data/events';

interface EventCardProps {
    events: NepaliEvent[];
}

const categoryColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    festival: {
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        text: 'text-orange-600 dark:text-orange-400',
        border: 'border-orange-500/20 dark:border-orange-500/30',
        icon: '🎉'
    },
    national: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-500/20 dark:border-blue-500/30',
        icon: '🏛️'
    },
    religious: {
        bg: 'bg-purple-500/10 dark:bg-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-500/20 dark:border-purple-500/30',
        icon: '🙏'
    },
    cultural: {
        bg: 'bg-teal-500/10 dark:bg-teal-500/20',
        text: 'text-teal-600 dark:text-teal-400',
        border: 'border-teal-500/20 dark:border-teal-500/30',
        icon: '🎭'
    },
};

export default function EventCard({ events }: EventCardProps) {
    return (
        <AnimatePresence mode="wait">
            {events.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="mt-6"
                >
                    <div className="relative overflow-hidden rounded-2xl
                          bg-white/60 dark:bg-white/5
                          backdrop-blur-md
                          border border-black/5 dark:border-white/10
                          p-6 shadow-xl">
                        {/* Decorative gradient */}
                        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-10 bg-amber-500" />
                        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-10 bg-rose-500" />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl
                                bg-amber-500/10 dark:bg-amber-500/20">
                                    <span className="text-xl">📅</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                                        Events & Festivals
                                    </h3>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-nepali">
                                        पर्व तथा चाडपर्व
                                    </p>
                                </div>
                            </div>

                            {/* Events list */}
                            <div className="space-y-3">
                                {events.map((event, index) => {
                                    const colors = categoryColors[event.category] || categoryColors.cultural;
                                    return (
                                        <motion.div
                                            key={`${event.name}-${index}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`p-4 rounded-xl border ${colors.border} ${colors.bg}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl mt-0.5">{colors.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className={`font-bold text-base ${colors.text}`}>
                                                            {event.name}
                                                        </h4>
                                                        {event.isHoliday && (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold
                                             bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400
                                             border border-red-500/20">
                                                                HOLIDAY
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-sm font-nepali mt-0.5 ${colors.text} opacity-70`}>
                                                        {event.nameNp}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
