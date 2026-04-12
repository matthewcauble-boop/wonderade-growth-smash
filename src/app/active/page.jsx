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
  const bg = isBoth ? `linear-gradient(135deg, ${C.orangeChar} 50%, ${C.pinkChar} 50%)` : isMO ? C.orangeChar : C.pinkChar;
  const label = isBoth ? '🏆' : isMO ? '🍊' : '🦄';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, flexShrink: 0,
      border: `3px solid ${C.warmWhite}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
    }}>
      {label}
    </div>
  );
}

function CharName({ char }) {
  if (char === 'MO') return <span style={{ color: C.orangeChar, fontWeight: 700 }}>Major Orange</span>;
  if (char === 'PP') return <span style={{ color: '#E56CA9', fontWeight: 700 }}>Princess Punch</span>;
  return <span style={{ color: C.gold, fontWeight: 700 }}>Both Characters</span>;
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
            <CharAvatar char={challenge.char} size={64} />
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
