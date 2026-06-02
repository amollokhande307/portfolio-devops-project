import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, ChevronDown, Terminal, Server, Activity } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phases = [
    { text: '$ kubectl get nodes', delay: 100 },
    { text: '$ kubectl get nodes\nNAME                 STATUS   ROLES    AGE', delay: 50 },
    { text: '$ kubectl get nodes\nNAME                 STATUS   ROLES    AGE\namol-lokhande        Ready    master   365d', delay: 30 }
  ];

  useEffect(() => {
    if (currentPhase < phases.length) {
      const phase = phases[currentPhase];
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= phase.text.length) {
          setTypedText(phase.text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            if (currentPhase < phases.length - 1) {
              setCurrentPhase(currentPhase + 1);
            }
          }, 1000);
        }
      }, phase.delay);

      return () => clearInterval(typeInterval);
    }
  }, [currentPhase]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: 'https://github.com/amollokhande307',
      label: 'GitHub',
      description: 'Code Repository',
      color: 'hover:bg-gray-800',
      animation: 'animate-pulse'
    },
    {
      icon: <Linkedin size={20} />,
      url: 'https://www.linkedin.com/in/amol-lokhande-382976361',
      label: 'LinkedIn',
      description: 'Professional Network',
      color: 'hover:bg-[#0077B5]',
      animation: 'animate-bounce'
    },
    {
      icon: <Server size={20} />,
      url: 'https://www.instagram.com/amol_lokhande_02',
      label: 'Instagram',
      description: 'Instagram',
      color: 'hover:bg-gradient-to-r from-purple-500 to-pink-500',
      animation: 'animate-pulse'
    }
  ];

  // Add Amazon Ember font CDN to the document head if not present
  if (typeof window !== 'undefined' && !document.getElementById('amazon-ember-font')) {
    const link = document.createElement('link');
    link.id = 'amazon-ember-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.cdnfonts.com/css/amazon-ember';
    document.head.appendChild(link);
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="matrix-rain opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#232F3E]/5 via-transparent to-[#007FFF]/5"></div>
      </div>

      {/* Floating Cloud Icons */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="absolute top-20 left-20 w-16 h-16 opacity-20 animate-float">
          <div className="w-full h-full bg-[#FF9900] rounded-lg flex items-center justify-center text-white font-bold text-xs">
            AWS
          </div>
        </div>
        <div className="absolute top-40 right-20 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-full h-full bg-[#007FFF] rounded-lg flex items-center justify-center text-white font-bold text-xs">
            Azure
          </div>
        </div>
        <div className="absolute bottom-40 left-40 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-full h-full bg-[#4285F4] rounded-lg flex items-center justify-center text-white font-bold text-xs">
            GCP
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Terminal-Style Command Output */}
        <div className={`mb-8 p-6 rounded-lg border font-mono text-left max-w-2xl mx-auto ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-700 text-green-400' 
            : 'bg-gray-900 border-gray-700 text-green-400'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} />
            <span className="text-xs text-gray-500">amol@cloud-engineer:~$</span>
          </div>
          <pre className="text-sm whitespace-pre-wrap">
            {typedText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
              |
            </span>
          </pre>
        </div>

        {/* Profile Photo with Matrix Effect */}
        <div className="mb-8">
          <div className="relative inline-block mb-8 group">
            <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[#007FFF] shadow-2xl overflow-hidden transform group-hover:scale-105 transition-all duration-500 relative ${
              isDarkMode ? 'shadow-blue-500/25' : 'shadow-blue-500/25'
            }`}>
              {/* Matrix overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              
              <img 
                src="/WhatsApp Image 2025-07-07 at 21.49.05_ef2d8c6b.jpg" 
                alt="Amol Lokhande - Cloud & DevOps Engineer"
                className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div 
                className={`w-full h-full bg-gradient-to-br from-[#232F3E] to-[#007FFF] flex items-center justify-center`}
                style={{ display: 'none' }}
              >
                <span className="text-4xl md:text-5xl font-bold text-[#FF9900]">AL</span>
              </div>
              
              {/* Cloud provider logos on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="grid grid-cols-3 gap-2">
                  <div className="w-8 h-8 bg-[#FF9900] rounded flex items-center justify-center text-white text-xs font-bold">AWS</div>
                  <div className="w-8 h-8 bg-[#007FFF] rounded flex items-center justify-center text-white text-xs font-bold">Az</div>
                  <div className="w-8 h-8 bg-[#4285F4] rounded flex items-center justify-center text-white text-xs font-bold">GCP</div>
                </div>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
              <Activity size={16} className="text-white" />
            </div>
          </div>
        </div>

        {/* Name with Typing Animation */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2" style={{ fontFamily: 'Amazon Ember, IBM Plex Mono, monospace' }}>
            <span className="bg-gradient-to-r from-[#232F3E] via-[#007FFF] to-[#FF9900] bg-clip-text text-transparent">
              Amol Lokhande
            </span>
          </h1>
          {/* Infrastructure Header (AWS Console Style) */}
          <div
            className="text-2xl font-bold mb-4 flex items-center justify-center"
            style={{
              fontFamily: 'Amazon Ember, IBM Plex Mono, monospace',
              color: isDarkMode ? '#0073BB' : '#232F3E',
              letterSpacing: '0.01em',
              transition: 'opacity 0.3s cubic-bezier(0.28, 0.11, 0.32, 1), transform 0.3s cubic-bezier(0.28, 0.11, 0.32, 1)',
              willChange: 'opacity, transform',
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            Infrastructure
          </div>
          {/* CLI-style role output */}
          <div className={`font-mono text-lg md:text-xl p-3 rounded border-l-4 border-[#007FFF] ${
            isDarkMode ? 'bg-slate-800 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            <span className="text-[#007FFF]">role:</span> Cloud & DevOps Engineer
            <br />
            <span className="text-[#FF9900]">status:</span> Available for opportunities
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-8">
          <p className={`text-lg md:text-xl leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Architecting scalable cloud infrastructure and building enterprise-grade applications. 
            Specializing in containerization, automation, and AI-driven solutions for modern businesses.
          </p>
        </div>

        {/* Enhanced Social Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative inline-flex items-center gap-4 px-8 py-4 rounded-xl font-medium transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white shadow-lg hover:shadow-2xl border border-slate-600' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-2xl border border-gray-200'
              } ${social.color}`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Icon with animation */}
              <span className={`group-hover:scale-125 transition-transform duration-300 ${social.animation}`}>
                {social.icon}
              </span>
              
              <div className="text-left">
                <div className="font-bold">{social.label}</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {social.description}
                </div>
              </div>
              
              {/* Connection indicator */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#007FFF]/10 to-[#FF9900]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>

        {/* Scroll Indicator with Cloud Theme */}
        <div className="animate-bounce">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 ${
            isDarkMode ? 'bg-slate-800 text-gray-400 hover:text-[#007FFF]' : 'bg-white text-gray-500 hover:text-[#007FFF] shadow-lg'
          }`}
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="text-sm font-mono">explore_infrastructure</span>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* Matrix Rain CSS */}
      <style jsx>{`
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 255, 0, 0.03) 50%,
            transparent 100%
          );
          animation: matrix-fall 20s linear infinite;
        }
        
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
};

export default Hero;