'use client';

import { useState, useEffect } from 'react';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '600', '700'] });

// Brand colors
const C = {
  red: '#EF4B61',
  navy: '#36478E',
  gold: '#FFD246',
  purple: '#7F489C',
  green: '#74C047',
  warmWhite: '#F8F2D7',
  navyDark: '#1E2A5E',
  orangeChar: '#F68C1E',
  pinkChar: '#F499C1',
};

const CHALLENGES = [
  { day: 'Sunday',    char: 'MO', text: 'Stretch together for 5 minutes. Major Orange says touch your toes!', emoji: '🧘' },
  { day: 'Monday',   char: 'MO', text: 'Do 20 jumping jacks together before dinner!', emoji: '⭐' },
  { day: 'Tuesday',  char: 'PP', text: 'Race to the end of the street and back — first one back wins a high five!', emoji: '🏃' },
  { day: 'Wednesday',char: 'MO', text: 'Hold a plank for 30 seconds. Can the whole family do it?', emoji: '💪' },
  { day: 'Thursday', char: 'PP', text: 'Play freeze tag for 10 minutes. No phones allowed!', emoji: '🧊' },
  { day: 'Friday',   char: 'PP', text: 'Dance battle! 3 rounds, family votes on the winner.', emoji: '🕺' },
  { day: 'Saturday', char: 'MO', text: 'Go on a 15-minute nature walk and find 5 cool things.', emoji: '🌿' },
];

const EPISODES = [
  {
    num: 1, char: 'MO',
    title: 'Big & Strong Kickoff',
    desc: 'Intro to family movement. Jumping, crawling, bear walks. Get loose, get loud.',
    duration: '20 min',
  },
  {
    num: 2, char: 'PP',
    title: 'Princess Punch Power',
    desc: 'Boxing-inspired cardio for families. Jabs, hooks, and silly combos.',
    duration: '20 min',
  },
  {
    num: 3, char: 'MO',
    title: 'Backyard Olympics',
    desc: 'Sprint challenges, long jump, and relay races. No track required.',
    duration: '20 min',
  },
  {
    num: 4, char: 'PP',
    title: 'Flexibility & Flow',
    desc: 'Yoga-inspired stretching the whole family can do together.',
    duration: '20 min',
  },
  {
    num: 5, char: 'MO',
    title: 'Core & Climb',
    desc: 'Planks, climbers, and obstacle fun. Build a real foundation.',
    duration: '20 min',
  },
  {
    num: 6, char: 'BOTH',
    title: 'The Championship',
    desc: 'Final challenge combining all skills. Family vs. family. Who\'s the Wonderade champion?',
    duration: '20 min',
  },
];

function CharAvatar({ char, size = 56 }) {
  const isMO = char === 'MO';
  const isBoth = char === 'BOTH';
  if (isBoth) {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `linear-gradient(135deg, ${C.orangeChar} 50%, ${C.pinkChar} 50%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.45, flexShrink: 0,
        border: `3px solid ${C.warmWhite}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}>
        🏆
      </div>
    );
  }
  const src = isMO ? '/characters/major-orange.png' : '/characters/princess-punch.png';
  const bg = isMO ? C.orangeChar : C.pinkChar;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      border: `3px solid ${C.warmWhite}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      overflow: 'hidden',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={isMO ? 'Major Orange' : 'Princess Punch'}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}

function CharName({ char }) {
  if (char === 'MO') return <span style={{ color: C.orangeChar, fontWeight: 700 }}>Major Orange</span>;
  if (char === 'PP') return <span style={{ color: '#E56CA9', fontWeight: 700 }}>Princess Punch</span>;
  return <span style={{ color: C.gold, fontWeight: 700 }}>Both Characters</span>;
}

// ── POSE SVGs ─────────────────────────────────────────────────────────────────
function PoseJumpingJack() {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="46" y1="46" x2="12" y2="14" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="74" y1="46" x2="108" y2="14" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="52" y1="70" x2="20" y2="126" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="68" y1="70" x2="100" y2="126" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <rect x="43" y="60" width="34" height="18" rx="7" fill="#6CC941" stroke="#36478E" strokeWidth="3"/>
      <ellipse cx="60" cy="48" rx="17" ry="18" fill="#F68C1E" stroke="#36478E" strokeWidth="3"/>
      <circle cx="60" cy="20" r="15" fill="#F68C1E" stroke="#36478E" strokeWidth="3"/>
      <circle cx="55" cy="18" r="2" fill="#36478E"/>
      <circle cx="65" cy="18" r="2" fill="#36478E"/>
      <path d="M55 25 Q60 29 65 25" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="14" r="5" fill="#F68C1E" stroke="#36478E" strokeWidth="2.5"/>
      <circle cx="108" cy="14" r="5" fill="#F68C1E" stroke="#36478E" strokeWidth="2.5"/>
      <ellipse cx="20" cy="126" rx="7" ry="4" fill="#36478E"/>
      <ellipse cx="100" cy="126" rx="7" ry="4" fill="#36478E"/>
    </svg>
  );
}

function PosePlank() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="28" y1="42" x2="28" y2="78" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <line x1="42" y1="42" x2="42" y2="78" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="28" cy="80" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="42" cy="80" rx="8" ry="5" fill="#36478E"/>
      <line x1="80" y1="46" x2="80" y2="80" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <line x1="96" y1="46" x2="96" y2="80" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <rect x="70" y="74" width="16" height="12" rx="5" fill="#7F489C" stroke="#36478E" strokeWidth="2.5"/>
      <rect x="88" y="74" width="16" height="12" rx="5" fill="#7F489C" stroke="#36478E" strokeWidth="2.5"/>
      <rect x="28" y="30" width="88" height="22" rx="11" fill="#FDE5EA" stroke="#36478E" strokeWidth="3"/>
      <circle cx="128" cy="33" r="17" fill="#FDE5EA" stroke="#36478E" strokeWidth="3"/>
      <path d="M115 20 Q128 12 141 18" stroke="#F499C1" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="133" cy="30" r="2.5" fill="#36478E"/>
      <path d="M129 38 Q133 43 138 39" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function PoseSquat() {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="43" y1="56" x2="10" y2="62" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="77" y1="56" x2="110" y2="62" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="50" y1="82" x2="22" y2="112" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="70" y1="82" x2="98" y2="112" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="22" y1="112" x2="18" y2="132" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="98" y1="112" x2="102" y2="132" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <rect x="43" y="70" width="34" height="18" rx="7" fill="#6CC941" stroke="#36478E" strokeWidth="3"/>
      <ellipse cx="60" cy="55" rx="17" ry="18" fill="#F68C1E" stroke="#36478E" strokeWidth="3"/>
      <circle cx="60" cy="26" r="15" fill="#F68C1E" stroke="#36478E" strokeWidth="3"/>
      <circle cx="55" cy="24" r="2" fill="#36478E"/>
      <circle cx="65" cy="24" r="2" fill="#36478E"/>
      <path d="M55 31 Q60 35 65 31" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="10" cy="62" r="5" fill="#F68C1E" stroke="#36478E" strokeWidth="2.5"/>
      <circle cx="110" cy="62" r="5" fill="#F68C1E" stroke="#36478E" strokeWidth="2.5"/>
      <ellipse cx="18" cy="132" rx="9" ry="5" fill="#36478E"/>
      <ellipse cx="102" cy="132" rx="9" ry="5" fill="#36478E"/>
    </svg>
  );
}

function PosePunchCombo() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="90" y1="42" x2="128" y2="38" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <rect x="126" y="30" width="20" height="16" rx="6" fill="#7F489C" stroke="#36478E" strokeWidth="2.5"/>
      <line x1="148" y1="33" x2="156" y2="29" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="150" y1="38" x2="158" y2="38" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="148" y1="43" x2="156" y2="47" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="68" y1="44" x2="50" y2="48" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <rect x="30" y="40" width="20" height="16" rx="6" fill="#7F489C" stroke="#36478E" strokeWidth="2.5"/>
      <line x1="68" y1="68" x2="48" y2="92" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <line x1="84" y1="68" x2="100" y2="92" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="48" cy="94" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="100" cy="94" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="78" cy="52" rx="18" ry="22" fill="#FDE5EA" stroke="#36478E" strokeWidth="3"/>
      <circle cx="85" cy="22" r="16" fill="#FDE5EA" stroke="#36478E" strokeWidth="3"/>
      <path d="M74 12 Q85 6 96 10" stroke="#F499C1" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="90" cy="20" r="2.5" fill="#36478E"/>
      <path d="M86 28 Q90 33 95 29" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function PoseBearCrawl() {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="106" y1="46" x2="116" y2="74" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="90" y1="46" x2="94" y2="74" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="50" y1="50" x2="38" y2="78" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <line x1="34" y1="50" x2="22" y2="78" stroke="#F68C1E" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="55" cy="50" rx="22" ry="12" fill="#6CC941" stroke="#36478E" strokeWidth="3"/>
      <ellipse cx="82" cy="40" rx="42" ry="18" fill="#F68C1E" stroke="#36478E" strokeWidth="3"/>
      <ellipse cx="38" cy="80" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="22" cy="80" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="116" cy="76" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="94" cy="76" rx="8" ry="5" fill="#36478E"/>
      <circle cx="130" cy="30" r="17" fill="#F68C1E" stroke="#36478E" strokeWidth="3"/>
      <circle cx="120" cy="16" r="8" fill="#F68C1E" stroke="#36478E" strokeWidth="3"/>
      <circle cx="136" cy="27" r="2.5" fill="#36478E"/>
      <path d="M130 35 Q134 40 139 36" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function PoseStarJump() {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="46" y1="54" x2="10" y2="22" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <line x1="74" y1="54" x2="110" y2="22" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <rect x="2" y="14" width="16" height="13" rx="5" fill="#7F489C" stroke="#36478E" strokeWidth="2.5"/>
      <rect x="102" y="14" width="16" height="13" rx="5" fill="#7F489C" stroke="#36478E" strokeWidth="2.5"/>
      <line x1="52" y1="76" x2="18" y2="122" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <line x1="68" y1="76" x2="102" y2="122" stroke="#FDE5EA" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="18" cy="124" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="102" cy="124" rx="8" ry="5" fill="#36478E"/>
      <ellipse cx="60" cy="62" rx="16" ry="18" fill="#FDE5EA" stroke="#36478E" strokeWidth="3"/>
      <circle cx="60" cy="32" r="16" fill="#FDE5EA" stroke="#36478E" strokeWidth="3"/>
      <path d="M46 22 Q54 14 60 18" stroke="#F499C1" strokeWidth="5" strokeLinecap="round"/>
      <path d="M60 16 Q66 12 74 18" stroke="#F499C1" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="55" cy="30" r="2" fill="#36478E"/>
      <circle cx="65" cy="30" r="2" fill="#36478E"/>
      <path d="M55 37 Q60 42 65 37" stroke="#36478E" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 52 L10 57 L12 52 L10 47 Z" fill="#FFD246"/>
      <path d="M108 52 L110 57 L112 52 L110 47 Z" fill="#FFD246"/>
      <path d="M16 98 L18 104 L20 98 L18 92 Z" fill="#FFD246"/>
      <path d="M100 98 L102 104 L104 98 L102 92 Z" fill="#FFD246"/>
    </svg>
  );
}

const POSES = [
  { id: 1, Svg: PoseJumpingJack, name: 'Jumping Jack',  character: 'Major Orange',   color: '#F68C1E', cue: 'Legs wide, arms up!' },
  { id: 2, Svg: PosePlank,       name: 'Plank Hold',    character: 'Princess Punch',  color: '#F499C1', cue: 'Flat back, hold strong!' },
  { id: 3, Svg: PoseSquat,       name: 'Power Squat',   character: 'Major Orange',   color: '#F68C1E', cue: 'Knees out, chest up!' },
  { id: 4, Svg: PosePunchCombo,  name: 'Punch Combo',   character: 'Princess Punch',  color: '#F499C1', cue: 'Jab! Cross! Go!' },
  { id: 5, Svg: PoseBearCrawl,   name: 'Bear Crawl',    character: 'Major Orange',   color: '#F68C1E', cue: 'Crawl like a bear!' },
  { id: 6, Svg: PoseStarJump,    name: 'Star Jump',     character: 'Princess Punch',  color: '#F499C1', cue: 'Explode like a star!' },
];

function PoseCard({ pose }) {
  return (
    <div style={{
      flexShrink: 0, width: 158, borderRadius: 16,
      background: '#1a2a4a', border: '1px solid rgba(255,255,255,0.1)',
      padding: '12px 10px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <div style={{ width: 120, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <pose.Svg />
      </div>
      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 14, color: '#fff', textAlign: 'center' }}>{pose.name}</div>
      <div style={{ fontSize: 11, color: pose.color, fontWeight: 600 }}>{pose.character}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>{pose.cue}</div>
    </div>
  );
}

// ── HOME TAB ──────────────────────────────────────────────────────────────────
function HomeTab({ streak, todayDone, onComplete }) {
  const today = new Date().getDay(); // 0=Sun
  const challenge = CHALLENGES[today];
  const isMO = challenge.char === 'MO';
  const charColor = isMO ? C.orangeChar : '#E56CA9';
  const bgGradient = isMO
    ? `linear-gradient(160deg, ${C.navyDark} 0%, #2D3A6B 100%)`
    : `linear-gradient(160deg, #3A1F5C 0%, #2D1A4A 100%)`;

  return (
    <div style={{ minHeight: '100%', background: bgGradient, padding: '0 0 100px' }}>
      {/* Header */}
      <div style={{ padding: '32px 20px 20px', textAlign: 'center' }}>
        <div style={{
          fontSize: 11, letterSpacing: 3, fontWeight: 700,
          color: C.gold, textTransform: 'uppercase', marginBottom: 6,
        }}>
          Wonderade Active
        </div>
        <div style={{
          fontFamily: fredoka.style.fontFamily,
          fontSize: 28, fontWeight: 700, color: C.warmWhite, lineHeight: 1.1,
        }}>
          Daily Challenge
        </div>
        <div style={{
          fontSize: 13, color: 'rgba(248,242,215,0.55)', marginTop: 6,
        }}>
          {challenge.day} · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Streak pill */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
        <div style={{
          background: 'rgba(255,210,70,0.15)',
          border: `1.5px solid ${C.gold}`,
          borderRadius: 999,
          padding: '8px 20px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 20 }}>🔥</span>
          <span style={{
            fontFamily: fredoka.style.fontFamily,
            fontSize: 17, fontWeight: 600, color: C.gold,
          }}>
            {streak} day streak
          </span>
        </div>
      </div>

      {/* Character + speech bubble card */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 24,
          border: `1.5px solid rgba(255,255,255,0.10)`,
          overflow: 'hidden',
        }}>
          {/* Character header */}
          <div style={{
            background: `linear-gradient(135deg, ${charColor}22 0%, ${charColor}11 100%)`,
            borderBottom: `1px solid rgba(255,255,255,0.08)`,
            padding: '20px 20px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <CharAvatar char={challenge.char} size={88} />
            <div>
              <div style={{ fontSize: 12, color: 'rgba(248,242,215,0.5)', marginBottom: 3, letterSpacing: 1, textTransform: 'uppercase' }}>
                Today&apos;s host
              </div>
              <div style={{
                fontFamily: fredoka.style.fontFamily,
                fontSize: 22, fontWeight: 700, color: C.warmWhite,
              }}>
                <CharName char={challenge.char} />
              </div>
            </div>
          </div>

          {/* Speech bubble body */}
          <div style={{ padding: '20px 20px 8px' }}>
            <div style={{
              background: charColor,
              borderRadius: 16,
              padding: '18px 18px',
              position: 'relative',
            }}>
              {/* triangle notch */}
              <div style={{
                position: 'absolute', top: -10, left: 28,
                width: 0, height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: `10px solid ${charColor}`,
              }} />
              <div style={{
                fontSize: 36, textAlign: 'center', marginBottom: 10,
              }}>{challenge.emoji}</div>
              <div style={{
                fontFamily: fredoka.style.fontFamily,
                fontSize: 21, fontWeight: 600, color: '#fff',
                lineHeight: 1.3, textAlign: 'center',
              }}>
                &ldquo;{challenge.text}&rdquo;
              </div>
            </div>
          </div>

          {/* Complete button */}
          <div style={{ padding: '16px 20px 24px' }}>
            {todayDone ? (
              <div style={{
                background: `${C.green}22`,
                border: `2px solid ${C.green}`,
                borderRadius: 16,
                padding: '16px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>✅</div>
                <div style={{
                  fontFamily: fredoka.style.fontFamily,
                  fontSize: 20, fontWeight: 700, color: C.green,
                }}>
                  Challenge Complete!
                </div>
                <div style={{ fontSize: 13, color: 'rgba(248,242,215,0.5)', marginTop: 4 }}>
                  See you tomorrow 👋
                </div>
              </div>
            ) : (
              <button
                onClick={onComplete}
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${C.green} 0%, #4FB148 100%)`,
                  border: 'none',
                  borderRadius: 16,
                  padding: '18px',
                  fontFamily: fredoka.style.fontFamily,
                  fontSize: 22, fontWeight: 700, color: '#fff',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: `0 4px 20px ${C.green}55`,
                  letterSpacing: 0.5,
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'transform 0.1s',
                }}
              >
                <span style={{ fontSize: 26 }}>💪</span>
                We Did It! ✓
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pose Cards */}
      <div style={{ marginTop: 20, padding: '0 20px' }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#fff', marginBottom: 10, paddingLeft: 4 }}>
          Try These Moves
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {POSES.map(pose => <PoseCard key={pose.id} pose={pose} />)}
        </div>
      </div>

      {/* Motivational nudge */}
      {!todayDone && streak > 0 && (
        <div style={{ textAlign: 'center', marginTop: 24, padding: '0 20px' }}>
          <div style={{ fontSize: 13, color: 'rgba(248,242,215,0.45)' }}>
            Keep your {streak}-day streak alive 🔥
          </div>
        </div>
      )}
    </div>
  );
}

// ── SERIES TAB ────────────────────────────────────────────────────────────────
function SeriesTab() {
  return (
    <div style={{
      minHeight: '100%',
      background: C.warmWhite,
      padding: '0 0 100px',
    }}>
      {/* Header */}
      <div style={{
        background: C.navy,
        padding: '36px 20px 24px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 3, fontWeight: 700,
          color: C.gold, textTransform: 'uppercase', marginBottom: 8,
        }}>
          Wonderade Active
        </div>
        <div style={{
          fontFamily: fredoka.style.fontFamily,
          fontSize: 26, fontWeight: 700, color: C.warmWhite,
          lineHeight: 1.15, marginBottom: 10,
        }}>
          Family Workout Series
        </div>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,210,70,0.15)',
          border: `1px solid ${C.gold}55`,
          borderRadius: 999,
          padding: '6px 16px',
          fontSize: 13, color: C.gold,
        }}>
          6 episodes · 20 min each · Do them together
        </div>
      </div>

      {/* Episode cards */}
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {EPISODES.map((ep) => {
          const isMO = ep.char === 'MO';
          const isBoth = ep.char === 'BOTH';
          const accent = isBoth ? C.gold : isMO ? C.orangeChar : '#E56CA9';
          const bgTop = isBoth
            ? `linear-gradient(135deg, ${C.gold}18 0%, ${C.purple}18 100%)`
            : isMO
            ? `${C.orangeChar}12`
            : `#E56CA918`;

          return (
            <div key={ep.num} style={{
              background: '#fff',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(54,71,142,0.08)',
              border: `1.5px solid rgba(54,71,142,0.08)`,
            }}>
              {/* Top accent strip */}
              <div style={{
                background: bgTop,
                borderBottom: `1.5px solid ${accent}33`,
                padding: '14px 16px 12px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  background: accent,
                  borderRadius: 12,
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: fredoka.style.fontFamily,
                  fontSize: 18, fontWeight: 700, color: '#fff',
                  flexShrink: 0,
                }}>
                  {ep.num}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: fredoka.style.fontFamily,
                    fontSize: 18, fontWeight: 700,
                    color: C.navy, lineHeight: 1.2,
                  }}>
                    {ep.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                    with <CharName char={ep.char} /> · {ep.duration}
                  </div>
                </div>
                <CharAvatar char={ep.char} size={44} />
              </div>

              {/* Body */}
              <div style={{ padding: '12px 16px 16px' }}>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.5, marginBottom: 14 }}>
                  {ep.desc}
                </div>
                <button style={{
                  background: accent,
                  border: 'none',
                  borderRadius: 12,
                  padding: '11px 22px',
                  fontFamily: fredoka.style.fontFamily,
                  fontSize: 16, fontWeight: 700, color: '#fff',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: `0 3px 12px ${accent}44`,
                  letterSpacing: 0.3,
                }}>
                  ▶ Start Episode
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PROFILE TAB ───────────────────────────────────────────────────────────────
function ProfileTab({ streak, totalCompleted }) {
  const today = new Date().getDay();
  const challenge = CHALLENGES[today];
  const isMO = challenge.char === 'MO';

  return (
    <div style={{
      minHeight: '100%',
      background: C.warmWhite,
      padding: '0 0 100px',
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyDark} 100%)`,
        padding: '40px 20px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.gold} 0%, ${C.orangeChar} 100%)`,
          margin: '0 auto 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36,
          boxShadow: `0 4px 20px ${C.gold}55`,
        }}>
          🏅
        </div>
        <div style={{
          fontFamily: fredoka.style.fontFamily,
          fontSize: 26, fontWeight: 700, color: C.warmWhite,
        }}>
          Family Profile
        </div>
        <div style={{ fontSize: 13, color: 'rgba(248,242,215,0.5)', marginTop: 4 }}>
          The Wonderade Champions
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '24px 20px 0', display: 'flex', gap: 14 }}>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 20,
          padding: '20px 16px',
          textAlign: 'center',
          boxShadow: '0 2px 12px rgba(54,71,142,0.08)',
          border: `1.5px solid rgba(54,71,142,0.06)`,
        }}>
          <div style={{ fontSize: 36, marginBottom: 4 }}>🔥</div>
          <div style={{
            fontFamily: fredoka.style.fontFamily,
            fontSize: 36, fontWeight: 700, color: C.navy,
          }}>
            {streak}
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 2, fontWeight: 600 }}>
            Day Streak
          </div>
        </div>
        <div style={{
          flex: 1,
          background: '#fff',
          borderRadius: 20,
          padding: '20px 16px',
          textAlign: 'center',
          boxShadow: '0 2px 12px rgba(54,71,142,0.08)',
          border: `1.5px solid rgba(54,71,142,0.06)`,
        }}>
          <div style={{ fontSize: 36, marginBottom: 4 }}>⭐</div>
          <div style={{
            fontFamily: fredoka.style.fontFamily,
            fontSize: 36, fontWeight: 700, color: C.navy,
          }}>
            {totalCompleted}
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 2, fontWeight: 600 }}>
            Challenges Done
          </div>
        </div>
      </div>

      {/* Character progress */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: '20px',
          boxShadow: '0 2px 12px rgba(54,71,142,0.08)',
          border: `1.5px solid rgba(54,71,142,0.06)`,
        }}>
          <div style={{
            fontFamily: fredoka.style.fontFamily,
            fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 16,
          }}>
            Your Characters
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { char: 'MO', label: 'Major Orange', subtitle: 'Strength & Endurance' },
              { char: 'PP', label: 'Princess Punch', subtitle: 'Speed & Agility' },
            ].map((c) => (
              <div key={c.char} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <CharAvatar char={c.char} size={52} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: fredoka.style.fontFamily,
                    fontSize: 16, fontWeight: 700, color: C.navy,
                  }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: 12, color: '#888' }}>{c.subtitle}</div>
                </div>
                <div style={{
                  background: `${C.gold}22`,
                  border: `1px solid ${C.gold}`,
                  borderRadius: 999,
                  padding: '4px 12px',
                  fontSize: 12, fontWeight: 700, color: '#9A7300',
                }}>
                  Unlocked
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wonderade branding */}
      <div style={{ textAlign: 'center', padding: '32px 20px 0' }}>
        <div style={{
          fontFamily: fredoka.style.fontFamily,
          fontSize: 22, fontWeight: 700,
          color: C.red, letterSpacing: 1,
        }}>
          WONDERADE ★
        </div>
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
          The juice you wish you had growing up
        </div>
      </div>
    </div>
  );
}

// ── BOTTOM NAV ────────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab }) {
  const tabs = [
    { id: 'home',    label: 'Home',   emoji: '🏠' },
    { id: 'series',  label: 'Series', emoji: '🎯' },
    { id: 'profile', label: 'Profile',emoji: '👤' },
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: C.navy,
      borderTop: `1.5px solid rgba(255,255,255,0.10)`,
      display: 'flex',
      height: 72,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {tabs.map((t) => {
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, border: 'none', background: 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 4,
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
              transition: 'opacity 0.15s',
            }}
          >
            <div style={{
              fontSize: active ? 24 : 22,
              filter: active ? 'none' : 'grayscale(40%) opacity(0.55)',
              transition: 'all 0.15s',
              transform: active ? 'scale(1.1)' : 'scale(1)',
            }}>
              {t.emoji}
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700,
              color: active ? C.gold : 'rgba(248,242,215,0.4)',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              transition: 'color 0.15s',
            }}>
              {t.label}
            </div>
            {active && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                width: 28, height: 3,
                background: C.gold,
                borderRadius: '3px 3px 0 0',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── ROOT PAGE ─────────────────────────────────────────────────────────────────
export default function ActivePage() {
  const [tab, setTab] = useState('home');
  const [streak, setStreak] = useState(0);
  const [todayDone, setTodayDone] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem('wonderade_active') || '{}');
    setStreak(saved.streak || 0);
    setTotalCompleted(saved.totalCompleted || 0);
    setTodayDone(saved.lastCompleted === today);
  }, []);

  function handleComplete() {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem('wonderade_active') || '{}');
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // Increment streak only if yesterday was done (or first time)
    const newStreak = (saved.lastCompleted === yesterday || saved.streak === 0)
      ? (saved.streak || 0) + 1
      : 1;
    const newTotal = (saved.totalCompleted || 0) + 1;

    const updated = { streak: newStreak, totalCompleted: newTotal, lastCompleted: today };
    localStorage.setItem('wonderade_active', JSON.stringify(updated));
    setStreak(newStreak);
    setTotalCompleted(newTotal);
    setTodayDone(true);
  }

  return (
    <div style={{
      maxWidth: 430,
      margin: '0 auto',
      minHeight: '100dvh',
      position: 'relative',
      fontFamily: `var(--font-quicksand), system-ui, sans-serif`,
      overflow: 'hidden',
    }}>
      {/* Content area */}
      <div style={{ minHeight: 'calc(100dvh - 72px)', overflowY: 'auto' }}>
        {tab === 'home'    && <HomeTab streak={streak} todayDone={todayDone} onComplete={handleComplete} />}
        {tab === 'series'  && <SeriesTab />}
        {tab === 'profile' && <ProfileTab streak={streak} totalCompleted={totalCompleted} />}
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
