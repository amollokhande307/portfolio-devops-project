import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// SVGs for cursor states
const AWSArrow = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#0073BB" floodOpacity="0.7" />
      </filter>
    </defs>
    <polygon points="4,4 28,16 4,28 10,16" fill="#0073BB" filter="url(#glow)" />
  </svg>
);

const CLIPrompt = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="#fff" opacity="0.1" />
    <text x="10" y="22" fontSize="18" fill="#008AD7">&gt;_</text>
  </svg>
);

const DockerWhale = () => (
  <svg width="40" height="32" viewBox="0 0 40 32">
    <ellipse cx="20" cy="28" rx="18" ry="4" fill="#00A1F1" opacity="0.2" />
    <rect x="10" y="18" width="20" height="8" rx="4" fill="#2496ED" />
    <circle cx="30" cy="20" r="4" fill="#2496ED" />
    <rect x="12" y="14" width="4" height="4" fill="#fff" />
    <rect x="18" y="14" width="4" height="4" fill="#fff" />
    <rect x="24" y="14" width="4" height="4" fill="#fff" />
  </svg>
);

const KubectlIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="#326CE5" />
    <text x="7" y="22" fontSize="18" fill="#fff">k|&gt;</text>
  </svg>
);

const AWSSpinner = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" stroke="#0073BB" strokeWidth="4" fill="none" opacity="0.2" />
    <path d="M16 2 A14 14 0 0 1 30 16" stroke="#0073BB" strokeWidth="4" fill="none" />
  </svg>
);

const TerraformPlan = () => (
  <svg width="40" height="32" viewBox="0 0 40 32">
    <rect x="8" y="20" width="24" height="8" rx="4" fill="#7B42F6" />
    <rect x="12" y="12" width="16" height="8" rx="4" fill="#B266FF" />
    <rect x="16" y="4" width="8" height="8" rx="4" fill="#E0C3FC" />
  </svg>
);

const cursorStates = {
  default: AWSArrow,
  button: CLIPrompt,
  project: DockerWhale,
  skill: KubectlIcon,
  loading: AWSSpinner,
  drag: TerraformPlan,
};

const getCursorState = (state: keyof typeof cursorStates) => {
  const Comp = cursorStates[state] || AWSArrow;
  return <Comp />;
};

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default'|'button'|'project'|'skill'|'loading'|'drag'>('default');
  const [visible, setVisible] = useState(true);
  const [scale, setScale] = useState(1);

  // Parallax/physics for desktop, iOS-style for mobile
  useEffect(() => {
    let rafId: number;
    const moveCursor = (e: MouseEvent | TouchEvent) => {
      let x, y;
      if ('touches' in e && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ('clientX' in e) {
        x = e.clientX;
        y = e.clientY;
      }
      if (typeof x === 'number' && typeof y === 'number') {
        rafId = requestAnimationFrame(() => {
          if (cursorRef.current) {
            gsap.to(cursorRef.current, {
              x: x - 16,
              y: y - 16,
              force3D: true,
              duration: 0.18,
              ease: 'power2.out',
            });
          }
        });
      }
    };
    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('touchmove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('touchmove', moveCursor);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Cursor state logic
  useEffect(() => {
    const setButton = () => setCursorState('button');
    const setProject = () => setCursorState('project');
    const setSkill = () => setCursorState('skill');
    const setDefault = () => setCursorState('default');
    const setLoading = () => setCursorState('loading');
    const setDrag = () => setCursorState('drag');
    // Button hover
    document.querySelectorAll('button, .cursor-button').forEach(el => {
      el.addEventListener('mouseenter', setButton);
      el.addEventListener('mouseleave', setDefault);
    });
    // Project hover
    document.querySelectorAll('.project-card').forEach(el => {
      el.addEventListener('mouseenter', setProject);
      el.addEventListener('mouseleave', setDefault);
    });
    // Skill hover
    document.querySelectorAll('.skill-card').forEach(el => {
      el.addEventListener('mouseenter', setSkill);
      el.addEventListener('mouseleave', setDefault);
    });
    // Loading and drag states (custom events)
    window.addEventListener('cursor-loading', setLoading);
    window.addEventListener('cursor-drag', setDrag);
    window.addEventListener('cursor-default', setDefault);
    return () => {
      document.querySelectorAll('button, .cursor-button').forEach(el => {
        el.removeEventListener('mouseenter', setButton);
        el.removeEventListener('mouseleave', setDefault);
      });
      document.querySelectorAll('.project-card').forEach(el => {
        el.removeEventListener('mouseenter', setProject);
        el.removeEventListener('mouseleave', setDefault);
      });
      document.querySelectorAll('.skill-card').forEach(el => {
        el.removeEventListener('mouseenter', setSkill);
        el.removeEventListener('mouseleave', setDefault);
      });
      window.removeEventListener('cursor-loading', setLoading);
      window.removeEventListener('cursor-drag', setDrag);
      window.removeEventListener('cursor-default', setDefault);
    };
  }, []);

  // Hide cursor on mobile
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setVisible(!isTouch);
  }, []);

  // Loading/drag animation
  useEffect(() => {
    if (cursorState === 'loading' && cursorRef.current) {
      gsap.to(cursorRef.current, { rotate: 360, repeat: -1, duration: 1, ease: 'linear' });
    } else if (cursorState === 'drag' && cursorRef.current) {
      gsap.to(cursorRef.current, { y: '+=10', yoyo: true, repeat: -1, duration: 0.5, ease: 'power1.inOut' });
    } else if (cursorRef.current) {
      gsap.killTweensOf(cursorRef.current);
      gsap.set(cursorRef.current, { rotate: 0, y: 0 });
    }
  }, [cursorState]);

  // Scale for project hover
  useEffect(() => {
    if (cursorState === 'project') setScale(1.1);
    else setScale(1);
  }, [cursorState]);

  if (!visible) return null;
  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: `scale(${scale})`,
        transition: 'transform 0.18s cubic-bezier(0.28, 0.11, 0.32, 1)',
        mixBlendMode: 'exclusion',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {getCursorState(cursorState)}
    </div>
  );
};

export default CustomCursor; 