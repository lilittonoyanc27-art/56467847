import React, { useState } from 'react';
import { Sparkles, Trophy, HelpCircle, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import { playLetterCorrectSound, playWrongLetterSound, playJackpotWinFanfare, speakSpanish } from './sound';
import confetti from 'canvas-confetti';

interface CapitanBoardProps {
  targetWord?: string; // default "CAPITAN"
  guessedLetters: Set<string>;
  onGuessLetter: (letter: string, isCorrect: boolean) => void;
  canPickLetter: boolean;
  score: number;
  remainingSpins: number;
  onResetGame: () => void;
}

const ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
  'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q',
  'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const CapitanBoard: React.FC<CapitanBoardProps> = ({
  targetWord = "CAPITAN",
  guessedLetters,
  onGuessLetter,
  canPickLetter,
  score,
  remainingSpins,
  onResetGame,
}) => {
  const [wholeWordGuess, setWholeWordGuess] = useState('');
  const [showSolveModal, setShowSolveModal] = useState(false);
  const [solveError, setSolveError] = useState<string | null>(null);

  const lettersArray = targetWord.split('');
  const isWordFullyGuessed = lettersArray.every((char) => guessedLetters.has(char));

  const handleLetterClick = (letter: string) => {
    if (guessedLetters.has(letter) || isWordFullyGuessed) return;

    const isCorrect = lettersArray.includes(letter);
    if (isCorrect) {
      playLetterCorrectSound();
      // Check if this letter completes the word
      const updatedLetters = new Set(guessedLetters);
      updatedLetters.add(letter);
      if (lettersArray.every((c) => updatedLetters.has(c))) {
        triggerVictory();
      }
    } else {
      playWrongLetterSound();
    }

    onGuessLetter(letter, isCorrect);
  };

  const triggerVictory = () => {
    playJackpotWinFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.4 },
      });
    }, 400);
  };

  const handleSolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGuess = wholeWordGuess.trim().toUpperCase().replace(/Á/g, 'A');
    if (cleanGuess === targetWord) {
      // Reveal all letters
      lettersArray.forEach((letter) => {
        onGuessLetter(letter, true);
      });
      setShowSolveModal(false);
      setSolveError(null);
      setWholeWordGuess('');
      triggerVictory();
    } else {
      playWrongLetterSound();
      setSolveError('Неверно! Но игра продолжается, крутите барабан или выбирайте буквы.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Studio Banner */}
      <div className="w-full max-w-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-7 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Header Title with Pole Chudes feel */}
          <div className="flex items-center justify-between w-full mb-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/30">
                Табло Поля Чудес
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">
                Очки: <strong className="text-amber-400 text-sm font-black">{score}</strong>
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Спины: <strong className="text-emerald-400 text-sm font-black">{remainingSpins}</strong>
              </span>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Секретное слово ({targetWord.length} букв)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center justify-center gap-1.5">
              <span>Без подсказок — только ваша интуиция и испанский алфавит!</span>
            </p>
          </div>

          {/* Letter Board Tiles (Classic TV Studio style) */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 py-3 px-2 w-full max-w-lg mb-6">
            {lettersArray.map((letter, idx) => {
              const isRevealed = guessedLetters.has(letter) || isWordFullyGuessed;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-11 h-16 sm:w-14 sm:h-20 rounded-xl flex items-center justify-center font-black text-2xl sm:text-3xl transition-all duration-500 transform shadow-lg select-none border-2 ${
                      isRevealed
                        ? 'bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-500 text-slate-950 border-yellow-200 rotate-0 scale-100 shadow-amber-400/40 ring-4 ring-yellow-400/30'
                        : 'bg-gradient-to-b from-slate-800 to-slate-950 text-slate-600 border-slate-700/80 shadow-black/60'
                    }`}
                  >
                    {isRevealed ? (
                      <span className="drop-shadow-sm font-black animate-scale-up">
                        {letter}
                      </span>
                    ) : (
                      <span className="text-slate-500 font-extrabold text-lg sm:text-xl">
                        ?
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 font-semibold">
                    {idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Victory Card */}
          {isWordFullyGuessed && (
            <div className="w-full bg-gradient-to-r from-emerald-950/90 via-emerald-900/90 to-teal-950/90 border-2 border-emerald-400/60 rounded-2xl p-5 mb-6 text-center animate-bounce-short shadow-xl shadow-emerald-900/40">
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-black text-xl mb-1">
                <Trophy className="w-7 h-7 text-yellow-400 animate-spin" />
                СЛОВО УГАДАНО: {targetWord}!
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 mb-3">
                Поздравляем! Вы раскрыли главное слово сектора «Поле Чудес»!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => speakSpanish(targetWord)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-yellow-300" />
                  Произнести: «{targetWord}» (исп.)
                </button>
                <button
                  onClick={onResetGame}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Сыграть заново
                </button>
              </div>
            </div>
          )}

          {/* Prompt status */}
          <div className="text-center mb-4">
            {canPickLetter && !isWordFullyGuessed ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs sm:text-sm font-bold animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Выберите букву на клавиатуре ниже!
              </span>
            ) : !isWordFullyGuessed ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 text-xs font-medium">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Ответьте правильно на вопрос квиза или раскрутите барабан, чтобы выбрать букву
              </span>
            ) : null}
          </div>

          {/* Interactive Alphabet Keyboard */}
          <div className="w-full">
            <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 sm:gap-2 justify-center">
              {ALPHABET.map((char) => {
                const isGuessed = guessedLetters.has(char);
                const isInWord = lettersArray.includes(char);
                const isCorrectMatch = isGuessed && isInWord;
                const isWrongMatch = isGuessed && !isInWord;

                let btnStyle = 'bg-slate-800/90 text-slate-200 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-300 border-slate-700 active:scale-95 cursor-pointer';

                if (isCorrectMatch) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-700/30 cursor-default ring-1 ring-emerald-300';
                } else if (isWrongMatch) {
                  btnStyle = 'bg-slate-900/60 text-slate-600 border-slate-800/80 cursor-default opacity-40 line-through';
                } else if (!canPickLetter || isWordFullyGuessed) {
                  btnStyle = 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800 cursor-pointer';
                }

                return (
                  <button
                    key={char}
                    onClick={() => handleLetterClick(char)}
                    disabled={isGuessed || isWordFullyGuessed}
                    className={`h-10 sm:h-11 rounded-xl font-extrabold text-sm sm:text-base border transition-all duration-150 flex items-center justify-center ${btnStyle}`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom solve word quick modal trigger */}
          {!isWordFullyGuessed && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowSolveModal(true);
                  setSolveError(null);
                }}
                className="text-xs font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 hover:decoration-amber-300 transition-colors cursor-pointer"
              >
                Знаете всё слово? Назвать слово целиком!
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Whole Word Guess Modal */}
      {showSolveModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl text-white animate-scale-up">
            <h3 className="text-xl font-black text-amber-400 mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Назовите слово целиком
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Введите слово из 7 букв. Если ответ неверный — не переживайте, игра всё равно продолжится!
            </p>

            <form onSubmit={handleSolveSubmit} className="space-y-4">
              <input
                type="text"
                maxLength={10}
                placeholder="Слово (на испанском / латинице)..."
                value={wholeWordGuess}
                onChange={(e) => setWholeWordGuess(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-amber-400/50 text-white font-black text-center text-xl tracking-widest uppercase focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400/30"
              />

              {solveError && (
                <p className="text-xs text-rose-300 bg-rose-950/60 p-2.5 rounded-xl border border-rose-500/30">
                  {solveError}
                </p>
              )}

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowSolveModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/30"
                >
                  Проверить слово
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
