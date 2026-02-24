'use client';

import { motion } from 'framer-motion';
import { ConversionResult } from '@/lib/converter';
import { toNepaliNumeral } from '@/data/bsData';

interface ResultCardProps {
    result: ConversionResult;
    type: 'ad' | 'bs';
}

export default function ResultCard({ result, type }: ResultCardProps) {
    const isBS = type === 'bs';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            key={isBS ? result.bsDateFormatted : result.adDateFormatted}
            className="relative overflow-hidden rounded-2xl
                 bg-white/60 dark:bg-white/5
                 backdrop-blur-md
                 border border-black/5 dark:border-white/10
                 p-6 shadow-xl"
        >
            {/* Decorative gradient orb */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20
        ${isBS ? 'bg-violet-500' : 'bg-emerald-500'}`} />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className={`w-1.5 h-8 rounded-full ${isBS ? 'bg-violet-500' : 'bg-emerald-500'}`} />
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 dark:text-gray-500">
                            {isBS ? 'Converted BS Date' : 'Converted AD Date'}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 dark:text-gray-500">
                            {isBS ? 'रूपान्तरित बि.सं. मिति' : 'रूपान्तरित ई.सं. मिति'}
                        </p>
                    </div>
                </div>

                {/* Date display */}
                <div className="space-y-1 mb-4">
                    {isBS ? (
                        <>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                                {result.bs.day} {result.bsMonthNameEn} {result.bs.year}
                            </p>
                            <p className="text-lg font-medium text-gray-500 dark:text-gray-400 font-nepali">
                                {toNepaliNumeral(result.bs.day)} {result.bsMonthNameNp} {toNepaliNumeral(result.bs.year)}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                                {result.adMonthNameEn} {result.ad.day}, {result.ad.year}
                            </p>
                            <p className="text-sm font-mono text-gray-400 dark:text-gray-500">
                                {result.adDateFormatted}
                            </p>
                        </>
                    )}
                </div>

                {/* Day of week */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl
          ${isBS ? 'bg-violet-500/10 dark:bg-violet-500/20' : 'bg-emerald-500/10 dark:bg-emerald-500/20'}`}>
                    <svg className={`w-4 h-4 ${isBS ? 'text-violet-500' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className={`text-sm font-semibold ${isBS ? 'text-violet-600 dark:text-violet-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {result.dayOfWeekEn}
                    </span>
                    <span className={`text-sm font-nepali ${isBS ? 'text-violet-500/70 dark:text-violet-400/70' : 'text-emerald-500/70 dark:text-emerald-400/70'}`}>
                        ({result.dayOfWeekNp})
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
