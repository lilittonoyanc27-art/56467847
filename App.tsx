import React, { useState, useEffect } from 'react';
import {
  QUIZ_QUESTIONS,
  QUIZ_PARTS,
  QuizQuestion,
} from './quizData';
import { DrumWheel, WheelSector } from './DrumWheel';
import { CapitanBoard } from './CapitanBoard';
import { QuizCard } from './QuizCard';
import {
  Trophy,
  RotateCw,
  HelpCircle,
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
  CheckCircle2,
  ListOrdered,
  Eye,
  EyeOff,
  Flame,
  Award,
} from 'lucide-react';
import { playJackpotWinFanfare, playLetterCorrectSound } from './sound';

export default function App() {
  // Navigation mode: 'all' (Quiz + Pole Chudes side-by-side or stacked), 'quiz', 'drum'
  const [activeTab, setActiveTab] = useState<'all' | 'quiz' | 'drum'>('all');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: 'A' | 'B' | 'C' | 'D' }>({});
  const [autoRevealArmenian, setAutoRevealArmenian] = useState(false);

  // Pole Chudes Game state
  const [score, setScore] = useState(500);
  const [remainingSpins, setRemainingSpins] = useState(3); // Start with 3 free spins
  const [canPickLetter, setCanPickLetter] = useState(true);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [lastSector, setLastSector] = useState<WheelSector | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const TARGET_WORD = 'CAPITAN';
  const targetLetters = TARGET_WORD.split('');
  const isWordFullyGuessed = targetLetters.every((c) => guessedLetters.has(c));

  // Current question
  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  // Total correct quiz answers
  const correctCount = QUIZ_QUESTIONS.filter((q) => {
    const ans = userAnswers[q.id];
    return ans && (q.correctAnswer === 'ANY' || ans === q.correctAnswer);
  }).length;

  // Handle Quiz answer
  const handleQuizAnswer = (letter: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: letter,
    }));

    if (isCorrect) {
      setScore((prev) => prev + 250);
      setRemainingSpins((prev) => prev + 1);
      setCanPickLetter(true);
    }
  };

  // Next / Prev question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Drum Spin callback
  const handleSpinEnd = (sector: WheelSector) => {
    setLastSector(sector);
    setRemainingSpins((prev) => Math.max(0, prev - 1));

    if (sector.type === 'points') {
      setScore((prev) => prev + sector.value);
      setCanPickLetter(true);
    } else if (sector.type === 'prize') {
      setScore((prev) => prev + sector.value);
      setRemainingSpins((prev) => prev + 1);
      setCanPickLetter(true);
    } else if (sector.type === 'plus') {
      // Reveal a random missing letter in CAPITAN
      const unrevealed = targetLetters.filter((l) => !guessedLetters.has(l));
      if (unrevealed.length > 0) {
        const randomL = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        handleGuessLetter(randomL, true);
        playLetterCorrectSound();
      }
      setCanPickLetter(true);
    } else if (sector.type === 'double') {
      setScore((prev) => prev * 2);
      setCanPickLetter(true);
    } else if (sector.type === 'bankrupt') {
      setScore(0);
      setCanPickLetter(true); // Player still allowed to continue!
    } else if (sector.type === 'chance') {
      setScore((prev) => prev + sector.value);
      setCanPickLetter(true);
    }
  };

  // Handle guessing a letter
  const handleGuessLetter = (letter: string, isCorrect: boolean) => {
    setGuessedLetters((prev) => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });

    if (isCorrect) {
      setScore((prev) => prev + 300);
      // Extra spin bonus on correct letter!
      setRemainingSpins((prev) => prev + 1);
    }

    // Require another spin or another correct quiz answer to pick again
    setCanPickLetter(false);
  };

  // Reset entire game
  const handleResetGame = () => {
    setGuessedLetters(new Set());
    setScore(500);
    setRemainingSpins(3);
    setCanPickLetter(true);
    setLastSector(null);
  };

  // Quick jump to part
  const jumpToPart = (partId: number) => {
    const firstQ = QUIZ_QUESTIONS.find((q) => q.part === partId);
    if (firstQ) {
      setCurrentQuestionIndex(firstQ.id - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  Quiz Viajes & Поле Чудес
                </h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  ES 🇪🇸 & HY 🇦🇲
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ճանապարհորդություն, հյուրանոց և հանգիստ • Nivel A2–B1
              </p>
            </div>
          </div>

          {/* Player stats bar */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="text-xs font-bold">
                <span className="text-slate-400 hidden sm:inline">Очки: </span>
                <span className="text-amber-400 text-sm font-black">{score}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl">
              <RotateCw className="w-4 h-4 text-emerald-400" />
              <div className="text-xs font-bold">
                <span className="text-slate-400 hidden sm:inline">Спины: </span>
                <span className="text-emerald-400 text-sm font-black">{remainingSpins}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl">
              <Award className="w-4 h-4 text-indigo-400" />
              <div className="text-xs font-bold">
                <span className="text-slate-400 hidden sm:inline">Квиз: </span>
                <span className="text-indigo-300 text-sm font-black">{correctCount}/20</span>
              </div>
            </div>

            {/* Translation mode quick toggle */}
            <button
              onClick={() => setAutoRevealArmenian(!autoRevealArmenian)}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                autoRevealArmenian
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={autoRevealArmenian ? 'Թաքցնել թարգմանությունը (սեղմեք բացելու համար)' : 'Միշտ ցույց տալ հայերեն թարգմանությունը'}
            >
              {autoRevealArmenian ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="hidden md:inline font-sans">
                {autoRevealArmenian ? 'Հայերենը միացված է' : 'Հայերեն՝ սեղմելով'}
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-800/80 py-2 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              ⭐ Все вместе (Квиз + Поле Чудес)
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              📖 Квиз (20 вопросов A2-B1)
            </button>
            <button
              onClick={() => setActiveTab('drum')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'drum'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              🎡 Барабан и Слово CAPITAN
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-amber-300/80 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Клик по тексту на испанском открывает армянский перевод</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6">

        {/* Question Selector Bar (1 to 20) */}
        {(activeTab === 'all' || activeTab === 'quiz') && (
          <div className="mb-6 bg-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {QUIZ_PARTS.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => jumpToPart(part.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      currentQuestion.part === part.id
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {part.titleEs} ({part.range})
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400">
                <span>Вопрос {currentQuestionIndex + 1} из 20</span>
              </div>
            </div>

            {/* 20 Question Buttons */}
            <div className="flex flex-wrap gap-1.5 justify-start">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                let bgClass = 'bg-slate-800 text-slate-400 border-slate-700';

                if (ans) {
                  const isCorrect = q.correctAnswer === 'ANY' || ans === q.correctAnswer;
                  bgClass = isCorrect
                    ? 'bg-emerald-600/80 text-white border-emerald-400'
                    : 'bg-rose-900/60 text-rose-200 border-rose-500/50';
                }

                if (isCurrent) {
                  bgClass += ' ring-2 ring-amber-400 font-black scale-105';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold flex items-center justify-center border transition-all cursor-pointer ${bgClass}`}
                    title={`Հարց ${q.id}: ${q.questionEs.slice(0, 30)}...`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content View Layout */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Quiz Card */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <QuizCard
                question={currentQuestion}
                currentNumber={currentQuestionIndex + 1}
                totalQuestions={QUIZ_QUESTIONS.length}
                userAnswer={userAnswers[currentQuestion.id] || null}
                onAnswer={handleQuizAnswer}
                onNext={handleNextQuestion}
                onPrev={handlePrevQuestion}
                hasPrev={currentQuestionIndex > 0}
                hasNext={currentQuestionIndex < QUIZ_QUESTIONS.length - 1}
                autoRevealArmenian={autoRevealArmenian}
              />
            </div>

            {/* Right Column: Pole Chudes Drum & CAPITAN Board */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6">
              <CapitanBoard
                targetWord={TARGET_WORD}
                guessedLetters={guessedLetters}
                onGuessLetter={handleGuessLetter}
                canPickLetter={canPickLetter}
                score={score}
                remainingSpins={remainingSpins}
                onResetGame={handleResetGame}
              />

              <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
                <div className="text-center mb-3">
                  <h3 className="text-lg font-black text-white flex items-center justify-center gap-2">
                    <RotateCw className="w-5 h-5 text-amber-400" />
                    Барабан «Поле Чудес»
                  </h3>
                  <p className="text-xs text-slate-400">
                    Крутите барабан за очки и открывайте буквы в слове!
                  </p>
                </div>

                <DrumWheel
                  onSpinEnd={handleSpinEnd}
                  canSpin={remainingSpins > 0}
                  disabledReason={
                    remainingSpins <= 0
                      ? 'Спины закончились. Ответьте на вопрос квиза правильно, чтобы получить спин!'
                      : undefined
                  }
                  lastSector={lastSector}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="flex flex-col items-center max-w-3xl mx-auto">
            <QuizCard
              question={currentQuestion}
              currentNumber={currentQuestionIndex + 1}
              totalQuestions={QUIZ_QUESTIONS.length}
              userAnswer={userAnswers[currentQuestion.id] || null}
              onAnswer={handleQuizAnswer}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              hasPrev={currentQuestionIndex > 0}
              hasNext={currentQuestionIndex < QUIZ_QUESTIONS.length - 1}
              autoRevealArmenian={autoRevealArmenian}
            />

            {/* Quick Banner to Pole Chudes */}
            <div className="mt-8 p-4 w-full max-w-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-amber-300">
                  Барабан Поля Чудес ждёт!
                </h4>
                <p className="text-xs text-slate-400">
                  У вас {remainingSpins} спинов. Раскрутите барабан и угадайте секретное слово!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('drum')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors cursor-pointer shrink-0"
              >
                К барабану →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'drum' && (
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
            <CapitanBoard
              targetWord={TARGET_WORD}
              guessedLetters={guessedLetters}
              onGuessLetter={handleGuessLetter}
              canPickLetter={canPickLetter}
              score={score}
              remainingSpins={remainingSpins}
              onResetGame={handleResetGame}
            />

            <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center">
              <div className="text-center mb-4">
                <h3 className="text-xl font-black text-white flex items-center justify-center gap-2">
                  <RotateCw className="w-5 h-5 text-amber-400" />
                  Барабан Поля Чудес
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Секторы: 250–1000 очков, ПРИЗ 🎁, ШАНС 🍀, +БУКВА 🔤, x2 ОЧКИ 🌟
                </p>
              </div>

              <DrumWheel
                onSpinEnd={handleSpinEnd}
                canSpin={remainingSpins > 0}
                disabledReason={
                  remainingSpins <= 0
                    ? 'Спины закончились. Ответьте на вопрос в квизе, чтобы получить новый спин!'
                    : undefined
                }
                lastSector={lastSector}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>
          QUIZ: VIAJES, HOTELES Y VACACIONES • Ճանապարհորդություն, հյուրանոց և հանգիստ • Поле Чудес
        </p>
      </footer>
    </div>
  );
}
