import React, { useState } from 'react';
import {
  QuizQuestion,
  QuizOption,
  ORAL_PRACTICE_QUESTIONS,
} from './quizData';
import {
  Volume2,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Languages,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { speakSpanish, playCorrectQuizSound, playTryAgainSound } from './sound';

interface QuizCardProps {
  question: QuizQuestion;
  currentNumber: number;
  totalQuestions: number;
  userAnswer?: 'A' | 'B' | 'C' | 'D' | null;
  onAnswer: (letter: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  autoRevealArmenian: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentNumber,
  totalQuestions,
  userAnswer,
  onAnswer,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  autoRevealArmenian,
}) => {
  // Local state for translation visibility if autoRevealArmenian is false
  const [revealedArmenianItems, setRevealedArmenianItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [showOralPractice, setShowOralPractice] = useState(false);

  // Helper to toggle Armenian translation for a specific item (e.g. 'question', 'opt-A', 'oral-0')
  const toggleArmenian = (key: string) => {
    setRevealedArmenianItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isRevealed = (key: string) => {
    return autoRevealArmenian || !!revealedArmenianItems[key];
  };

  const isSubmitted = !!userAnswer;
  const isCorrect =
    question.correctAnswer === 'ANY' ||
    userAnswer === question.correctAnswer;

  const handleSelectOption = (opt: QuizOption) => {
    if (isSubmitted) return; // already answered this turn

    const answerCorrect =
      question.correctAnswer === 'ANY' || opt.letter === question.correctAnswer;

    if (answerCorrect) {
      playCorrectQuizSound();
    } else {
      playTryAgainSound();
    }

    onAnswer(opt.letter, answerCorrect);
  };

  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden text-slate-100">
      {/* Top Part Badge & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {question.partTitleEs}
          </span>
          <span className="text-xs text-slate-400 font-medium font-sans">
            ({question.partTitleHy})
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>Հարց {currentNumber} / {totalQuestions}</span>
        </div>
      </div>

      {/* Question Text Box (Spanish + Armenian on click) */}
      <div className="mb-6">
        <div
          onClick={() => toggleArmenian('question')}
          className="group cursor-pointer p-4 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/40 transition-all duration-200"
          title="Нажмите на текст на испанском, чтобы открыть армянский перевод"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed group-hover:text-amber-200 transition-colors">
              {question.questionEs}
            </h3>
            <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakSpanish(question.questionEs);
                }}
                className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors"
                title="Озвучить на испанском"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span
                className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                  isRevealed('question')
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-700/60 text-amber-300'
                }`}
                title="Թարգմանություն / Перевод"
              >
                <Languages className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Click to reveal prompt or translated text */}
          {isRevealed('question') ? (
            <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-start gap-2 text-amber-200/90 text-sm sm:text-base font-medium font-sans animate-fade-in">
              <span className="text-xs uppercase tracking-wider font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                Հայերեն
              </span>
              <span>{question.questionHy}</span>
            </div>
          ) : (
            <p className="mt-2 text-xs text-amber-400/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանությունը տեսնելու համար</span>
            </p>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt) => {
          const optKey = `opt-${opt.letter}`;
          const isSelected = userAnswer === opt.letter;
          const isCorrectAnswer =
            question.correctAnswer === 'ANY' ||
            question.correctAnswer === opt.letter;

          let optionStyle =
            'bg-slate-800/40 hover:bg-slate-800 border-slate-700/70 hover:border-slate-500 text-slate-200 cursor-pointer';

          if (isSubmitted) {
            if (isSelected) {
              if (isCorrect) {
                optionStyle =
                  'bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/30';
              } else {
                optionStyle =
                  'bg-rose-950/70 border-rose-400 text-rose-100 ring-2 ring-rose-400/30';
              }
            } else if (isCorrectAnswer && !question.isPersonal) {
              // Highlight the correct answer if the user picked wrong
              optionStyle =
                'bg-emerald-950/40 border-emerald-500/80 text-emerald-200/90';
            }
          }

          return (
            <div
              key={opt.letter}
              onClick={() => handleSelectOption(opt)}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 select-none ${optionStyle}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 border ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                          : 'bg-rose-500 text-white border-rose-300'
                        : isSubmitted && isCorrectAnswer && !question.isPersonal
                        ? 'bg-emerald-600/60 text-white border-emerald-400'
                        : 'bg-slate-700/70 text-slate-300 border-slate-600'
                    }`}
                  >
                    {opt.letter}
                  </span>

                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold leading-relaxed">
                      {opt.es}
                    </p>

                    {/* Armenian Translation */}
                    {isRevealed(optKey) ? (
                      <p className="mt-2 text-xs sm:text-sm text-amber-200/90 font-sans border-t border-slate-700/40 pt-1.5 animate-fade-in flex items-center gap-1.5">
                        <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded">
                          HY
                        </span>
                        {opt.hy}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleArmenian(optKey);
                        }}
                        className="mt-1 text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Languages className="w-3 h-3 text-amber-400" />
                        Տեսնել թարգմանությունը (հայերեն)
                      </button>
                    )}
                  </div>
                </div>

                {/* Audio button for option */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSpanish(opt.es);
                  }}
                  className="p-1 text-slate-400 hover:text-amber-300 transition-colors shrink-0"
                  title="Озвучить вариант"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Answer Feedback (Never blocks if wrong!) */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-2xl border-2 mb-6 animate-fade-in ${
            isCorrect
              ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-100'
              : 'bg-slate-800/90 border-amber-400/50 text-slate-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <h4 className="font-bold text-sm sm:text-base mb-1">
                {isCorrect
                  ? '¡Excelente! / Շատ ապրես! (Правильно!)'
                  : '¡Casi! Ничего страшного — игра продолжается!'}
              </h4>

              {question.explanationEs && (
                <div className="text-xs sm:text-sm text-slate-200 mt-1">
                  <p>{question.explanationEs}</p>
                  {question.explanationHy && (
                    <p className="text-amber-200/90 font-sans mt-1">
                      {question.explanationHy}
                    </p>
                  )}
                </div>
              )}

              {isCorrect && (
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-yellow-300 bg-yellow-950/40 px-3 py-1.5 rounded-xl border border-yellow-500/30 w-fit">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Получен спин барабана и право выбрать букву в Поле Чудес!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Oral Practice Section (Práctica oral) */}
      <div className="mb-6 bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowOralPractice(!showOralPractice)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-amber-300">
              Práctica oral — Բանավոր խոսքի վարժություն (5 հարց)
            </span>
          </div>
          {showOralPractice ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showOralPractice && (
          <div className="p-4 pt-1 border-t border-slate-700/40 space-y-3 animate-fade-in">
            <p className="text-xs text-slate-400 italic">
              Հարցեր ուսուցչի կամ ինքնաստուգման համար՝ իսպաներեն ավելի երկար խոսելու համար։ Սեղմեք՝ թարգմանությունը տեսնելու համար։
            </p>

            <div className="space-y-2">
              {ORAL_PRACTICE_QUESTIONS.map((oral, i) => {
                const oralKey = `oral-${i}`;
                const oralRevealed = isRevealed(oralKey);
                return (
                  <div
                    key={i}
                    onClick={() => toggleArmenian(oralKey)}
                    className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-medium text-slate-200">
                        • {oral.es}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(oral.es);
                          }}
                          className="p-1 text-slate-400 hover:text-amber-300"
                          title="Озвучить"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {oralRevealed && (
                      <p className="text-xs text-amber-300/90 font-sans mt-1 pl-3 animate-fade-in">
                        {oral.hy}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            hasPrev
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer'
              : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
          }`}
        >
          ← Նախորդը
        </button>

        <div className="flex items-center gap-2">
          {hasNext ? (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md shadow-amber-500/30"
            >
              <span>Հաջորդ հարցը</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black transition-all cursor-pointer"
            >
              <span>Ավարտել քվիզը</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
