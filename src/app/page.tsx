'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import DateInput from '@/components/DateInput';
import ResultCard from '@/components/ResultCard';
import EventCard from '@/components/EventCard';
import { getFullConversion, ConversionResult } from '@/lib/converter';
import { getEventsForBsDate } from '@/data/events';
import { NepaliEvent } from '@/data/events';
import { toNepaliNumeral } from '@/data/bsData';

type ConversionMode = 'ad-to-bs' | 'bs-to-ad';

export default function Home() {
  const [mode, setMode] = useState<ConversionMode>('ad-to-bs');

  // Input date state
  const [inputYear, setInputYear] = useState(2025);
  const [inputMonth, setInputMonth] = useState(2);
  const [inputDay, setInputDay] = useState(24);

  // Conversion result
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [events, setEvents] = useState<NepaliEvent[]>([]);

  const inputType = mode === 'ad-to-bs' ? 'ad' : 'bs';
  const outputType = mode === 'ad-to-bs' ? 'bs' : 'ad';

  // Perform conversion
  const convert = useCallback(() => {
    const r = getFullConversion(inputType, inputYear, inputMonth, inputDay);
    if (r) {
      setResult(r);
      setEvents(getEventsForBsDate(r.bs.year, r.bs.month, r.bs.day));
    } else {
      setResult(null);
      setEvents([]);
    }
  }, [inputType, inputYear, inputMonth, inputDay]);

  useEffect(() => {
    convert();
  }, [convert]);

  // When mode toggles, swap input to the current output
  const handleModeChange = (newMode: ConversionMode) => {
    if (newMode === mode) return;
    // Swap: take the converted output as the new input
    if (result) {
      const target = newMode === 'ad-to-bs' ? result.ad : result.bs;
      setInputYear(target.year);
      setInputMonth(target.month);
      setInputDay(target.day);
    } else {
      // Default values
      if (newMode === 'ad-to-bs') {
        setInputYear(2025);
        setInputMonth(2);
        setInputDay(24);
      } else {
        setInputYear(2081);
        setInputMonth(11);
        setInputDay(12);
      }
    }
    setMode(newMode);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] bg-violet-500/8 dark:bg-violet-500/4 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] bg-emerald-500/8 dark:bg-emerald-500/4 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-amber-400/5 dark:bg-amber-400/3 rounded-full blur-[130px]" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 px-4 py-3.5
                   bg-white/60 dark:bg-black/60
                   backdrop-blur-xl
                   border-b border-black/5 dark:border-white/5"
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl
                            bg-gradient-to-br from-violet-500 to-emerald-500
                            shadow-lg shadow-violet-500/20">
              <span className="text-white text-base">📅</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-800 dark:text-white tracking-tight leading-tight">
                Miti Converter
              </h1>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 font-nepali tracking-wide leading-tight">
                मिति रूपान्तरक
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight">
            Date Converter
          </h2>
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 max-w-md mx-auto">
            Instant conversion between Gregorian (AD) and Bikram Sambat (BS)
          </p>
        </motion.div>

        {/* Converter Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl p-6 md:p-8
                     bg-white/60 dark:bg-white/[0.03]
                     backdrop-blur-md
                     border border-black/5 dark:border-white/[0.08]
                     shadow-xl shadow-black/5 dark:shadow-black/30"
        >
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex rounded-2xl p-1 bg-gray-100/80 dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
              <button
                onClick={() => handleModeChange('ad-to-bs')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative
                  ${mode === 'ad-to-bs'
                    ? 'text-white shadow-md'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                aria-label="Convert AD to BS"
                role="tab"
                aria-selected={mode === 'ad-to-bs'}
              >
                {mode === 'ad-to-bs' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 shadow-lg shadow-violet-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">AD → BS</span>
              </button>
              <button
                onClick={() => handleModeChange('bs-to-ad')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 relative
                  ${mode === 'bs-to-ad'
                    ? 'text-white shadow-md'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                aria-label="Convert BS to AD"
                role="tab"
                aria-selected={mode === 'bs-to-ad'}
              >
                {mode === 'bs-to-ad' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">BS → AD</span>
              </button>
            </div>
          </div>

          {/* Input Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1.5 h-5 rounded-full ${mode === 'ad-to-bs' ? 'bg-violet-500' : 'bg-emerald-500'}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {mode === 'ad-to-bs' ? 'Enter AD Date' : 'Enter BS Date'}
                </span>
                {mode === 'bs-to-ad' && (
                  <span className="text-xs font-nepali text-gray-400 dark:text-gray-500">
                    (बि.सं. मिति)
                  </span>
                )}
              </div>

              <DateInput
                type={inputType}
                year={inputYear}
                month={inputMonth}
                day={inputDay}
                onYearChange={setInputYear}
                onMonthChange={setInputMonth}
                onDayChange={setInputDay}
              />
            </motion.div>
          </AnimatePresence>

          {/* Divider with arrow */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center
                          ${mode === 'ad-to-bs'
                  ? 'bg-violet-500/10 dark:bg-violet-500/20'
                  : 'bg-emerald-500/10 dark:bg-emerald-500/20'
                }`}
            >
              <svg className={`w-4 h-4 ${mode === 'ad-to-bs' ? 'text-violet-500' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
          </div>

          {/* Result Section */}
          <AnimatePresence mode="wait">
            {result ? (
              <ResultCard result={result} type={outputType} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6 text-sm text-gray-400 dark:text-gray-500"
              >
                Enter a valid date above to see the conversion
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EventCard events={events} />
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          bg-white/40 dark:bg-white/5
                          border border-black/5 dark:border-white/5
                          text-xs text-gray-400 dark:text-gray-500">
            <span>📊</span>
            <span>Supports BS {toNepaliNumeral(1970)} – {toNepaliNumeral(2100)} ({1913} – {2044} AD)</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-xs text-gray-400 dark:text-gray-600 border-t border-black/5 dark:border-white/5">
        <p>Miti Converter — मिति रूपान्तरक © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
