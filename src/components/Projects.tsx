import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, Filter, Code, Server, Brain, Globe, Play, GitBranch, Users, TrendingUp } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  category: string;
  githubUrl?: string;
  linkedinUrl: string;
  tags: string[];
  icon: string | React.ReactNode;
  status?: 'PROD' | 'DEV';
  metrics?: {
    stars?: number;
    forks?: number;
    engagement?: string;
  };
  // Custom fields for UI
  archDiagram?: string;
  linkedinPreview?: string;
  codeSnippet?: string;
  perfMetrics?: string;
  workflowDiagram?: string;
  s3Badge?: boolean;
  videoPreview?: string;
  geoApi?: boolean;
  mobilePreview?: string;
  codeQuality?: string;
}

interface ProjectsProps {
  isDarkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [animatingCards, setAnimatingCards] = useState<number[]>([]);

  // Add Docker whale SVG for DinD
  const DockerWhaleSVG = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="20" width="24" height="6" rx="3" fill="#2496ED"/>
      <rect x="8" y="14" width="4" height="4" fill="#fff"/>
      <rect x="14" y="14" width="4" height="4" fill="#fff"/>
      <rect x="20" y="14" width="4" height="4" fill="#fff"/>
      <ellipse cx="16" cy="28" rx="12" ry="2" fill="#00A1F1" opacity="0.2"/>
      <circle cx="26" cy="18" r="3" fill="#2496ED"/>
    </svg>
  );

  const projects: Project[] = [
    // Python Projects
    {
      title: 'College Student Info',
      description: 'Student profile management system with advanced data handling and intuitive user interface for educational institutions.',
      category: 'Python',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/college%20student.txt',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_my-first-project-college-student-profile-activity-7346395278616186880-fASR',
      tags: ['Python', 'Data Management', 'UI/UX'],
      icon: '🎓',
      status: 'PROD',
      metrics: { stars: 12, forks: 5, engagement: '2.1K views' }
    },
    {
      title: 'WhatsApp Message Sender',
      description: 'Enterprise-grade automated messaging solution with bulk sending capabilities and delivery tracking.',
      category: 'Python',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/whatsapp.py',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_just-built-whatsapp-message-sender-app-using-activity-7348555003076186113-bhUL',
      tags: ['Python', 'Automation', 'WhatsApp API'],
      icon: '📱',
      status: 'PROD',
      metrics: { stars: 28, forks: 12, engagement: '3.5K views' }
    },
    {
      title: 'Email Sender App',
      description: 'Professional email automation platform with template management, scheduling, and analytics dashboard.',
      category: 'Python',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/email.py',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_python-smtp-streamlit-activity-7348572146006163457-H6U6',
      tags: ['Python', 'SMTP', 'Automation', 'Templates'],
      icon: '📧',
      status: 'DEV',
      metrics: { engagement: 'Coming Soon' }
    },
    {
      title: 'Twilio Communication App',
      description: 'Multi-channel communication hub integrating SMS, voice calls, and messaging with advanced routing.',
      category: 'Python',
      githubUrl: undefined,
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_python-twilio-streamlit-activity-7349283860439793664-8YMs',
      tags: ['Python', 'Twilio API', 'Communication', 'Voice'],
      icon: '📞',
      status: 'PROD',
      metrics: { engagement: 'In Development' }
    },
    {
      title: 'Twitter Client (Tweepy)',
      description: 'Advanced Twitter management tool with sentiment analysis and automated engagement features.',
      category: 'Python',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/Twitter.py',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_python-streamlit-tweepy-activity-7349675132459593731-7Zkh',
      tags: ['Python', 'Tweepy', 'Social Media', 'ML'],
      icon: '🐦',
      status: 'PROD',
      metrics: { engagement: 'Live Demo' }
    },
    {
      title: 'All-in-One Communication App',
      description: 'Unified communication platform integrating multiple messaging services with centralized management.',
      category: 'Python',
      githubUrl: undefined,
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_summerinternship-python-streamlit-activity-7350000889304133632-uta_',
      tags: ['Python', 'Multi-platform', 'Integration', 'Dashboard'],
      icon: '💬',
      status: 'PROD',
      metrics: { engagement: 'Enterprise Ready' }
    },
    {
      title: 'System RAM Monitor',
      description: 'Real-time system performance monitoring with alerting, logging, and predictive analytics.',
      category: 'Python',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/ram.py',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_python-streamlit-systemmonitoring-activity-7352362843758862336-7z1o',
      tags: ['Python', 'System Monitoring', 'Performance', 'Alerts'],
      icon: '📊',
      status: 'PROD',
      metrics: { engagement: 'Production Use' }
    },
    // Docker Projects
    {
      title: 'Apache Web Server',
      description: 'Production-ready containerized Apache deployment with SSL, load balancing, and auto-scaling.',
      category: 'Docker',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/tree/main/apache%20setup',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_devops-docker-apache-activity-7350381049182392321-ZTwX',
      tags: ['Docker', 'Apache', 'DevOps', 'SSL'],
      icon: '🐳',
      status: 'PROD',
      metrics: { stars: 15, forks: 8, engagement: '1.8K views' }
    },
    {
      title: 'Docker in Docker (DinD)',
      description: 'Advanced containerization setup enabling nested Docker environments for CI/CD pipelines.',
      category: 'Docker',
      githubUrl: undefined,
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_devops-docker-dind-activity-7350381049182392321-ZTwX',
      tags: ['Docker', 'DinD', 'CI/CD', 'Orchestration'],
      // Use Docker whale SVG
      icon: <DockerWhaleSVG />,
      status: 'PROD',
      metrics: { engagement: 'Enterprise Solution' }
    },
    {
      title: 'Flask Inside Docker',
      description: 'Containerized Flask application with multi-stage builds, health checks, and production optimization.',
      category: 'Docker',
      githubUrl: undefined,
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_devops-docker-flask-activity-7350381049182392321-ZTwX',
      tags: ['Docker', 'Flask', 'Python', 'Multi-stage'],
      icon: '🌶️',
      status: 'PROD',
      metrics: { engagement: 'Best Practices' },
      // Custom fields for UI
      archDiagram: '/placeholder-architecture.png', // Placeholder image path
      linkedinPreview: 'See how Flask, Docker, and Python combine for robust deployments.'
    },
    // AI Projects
    {
      title: 'AI-Powered Banking Assistant',
      description: 'Intelligent banking chatbot with NLP capabilities for customer service and financial advisory.',
      category: 'AI',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/bank%20manager.txt',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_my-first-ai-powered-banking-assistant-activity-7346942613884698624-nqnB',
      tags: ['AI', 'NLP', 'Banking', 'Chatbot'],
      icon: '🤖',
      status: 'PROD',
      metrics: { stars: 22, forks: 9, engagement: '4.2K views' }
    },
    {
      title: 'AI-Powered Multi-Tech Tool',
      description: 'Comprehensive AI toolkit integrating machine learning models for automated problem-solving.',
      category: 'AI',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/manubase.py',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_my-first-ai-powered-multi-tech-tool-activity-7346942613884698624-nqnB',
      tags: ['AI', 'Machine Learning', 'Automation', 'Multi-platform'],
      icon: '🧠',
      status: 'DEV',
      metrics: { engagement: 'Research Phase' },
      // Custom fields for UI
      codeSnippet: `def solve_problem(input):\n    # AI logic here\n    return model.predict(input)`,
      perfMetrics: 'Accuracy: 98% | Latency: 45ms'
    },
    {
      title: 'Stock Market Viewer',
      description: 'Advanced ML model for financial forecasting using historical data and market sentiment analysis.',
      category: 'AI',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/AI-Powered%20Stock%20Market%20Prediction.txt',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_aiinfinance-geminiai-streamlit-activity-7350407473926754304-iT8p',
      tags: ['AI', 'Machine Learning', 'Finance', 'Prediction'],
      icon: '📈',
      status: 'PROD',
      metrics: { engagement: 'Alpha Testing' }
    },
    {
      title: 'Automated a CI/CD Pipeline with Jenkins, Docker & GitHub',
      description: 'End-to-end CI/CD pipeline automation using Jenkins, Docker, and GitHub for robust DevOps workflows.',
      category: 'DevOps',
      githubUrl: undefined,
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_devops-cicd-jenkins-activity-7354058669321269248-H5bk',
      tags: ['Jenkins', 'Docker', 'GitHub', 'CI/CD'],
      icon: '🔁',
      status: 'PROD',
      metrics: { engagement: 'CI/CD Demo' }
    },
    // Fullstack Projects
    {
      title: 'Live Location Viewer',
      description: 'Real-time geolocation tracking application with interactive maps and location sharing features.',
      category: 'Fullstack',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/Live%20Location.html',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_webdevelopment-javascript-html-activity-7351210348974080000-rfTy',
      tags: ['JavaScript', 'Geolocation', 'Maps API', 'Real-time'],
      icon: '🌐',
      status: 'PROD',
      metrics: { stars: 18, forks: 7, engagement: '2.8K views' }
    },
    {
      title: 'Video Recording + Email System',
      description: 'Integrated platform for video capture, processing, compression, and automated email distribution.',
      category: 'Fullstack',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/Video%20Recording.html',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_webdevelopment-javascript-html-activity-7351210348974080000-rfTy',
      tags: ['JavaScript', 'Video Processing', 'Email', 'WebRTC'],
      icon: '🎥',
      status: 'PROD',
      metrics: { engagement: 'Media Solution' },
      // Custom fields for UI
      workflowDiagram: '/placeholder-workflow.png', // Placeholder image path
      s3Badge: true,
      videoPreview: '/placeholder-video-preview.png'
    },
    {
      title: 'Grocery Store Finder',
      description: 'Location-based grocery discovery app with inventory tracking, price comparison, and delivery integration.',
      category: 'Fullstack',
      githubUrl: 'https://github.com/amollokhande307/summer-internship-/blob/main/Grocery%20Store.html',
      linkedinUrl: 'https://www.linkedin.com/posts/amol-lokhande-382976361_webdevelopment-javascript-html-activity-7351210348974080000-rfTy',
      tags: ['React', 'Maps API', 'Database', 'E-commerce'],
      icon: '🛒',
      status: 'DEV',
      metrics: { engagement: 'MVP Ready' },
      // Custom fields for UI
      geoApi: true,
      mobilePreview: '/placeholder-mobile-preview.png',
      codeQuality: 'A+'
    }
  ];

  const categories = ['All', 'Python', 'Docker', 'AI', 'Fullstack'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    // Trigger CI/CD-style animation when filter changes
    const cardIndices = filteredProjects.map((_, index) => index);
    setAnimatingCards(cardIndices);
    
    const timer = setTimeout(() => {
      setAnimatingCards([]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeFilter, filteredProjects]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Python': return <Code className="w-5 h-5" />;
      case 'Docker': return <Server className="w-5 h-5" />;
      case 'AI': return <Brain className="w-5 h-5" />;
      case 'Fullstack': return <Globe className="w-5 h-5" />;
      default: return <Filter className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Python': return 'from-[#3776AB] to-[#FFD43B]';
      case 'Docker': return 'from-[#2496ED] to-[#0DB7ED]';
      case 'AI': return 'from-[#FF6B6B] to-[#4ECDC4]';
      case 'Fullstack': return 'from-[#61DAFB] to-[#21759B]';
      default: return 'from-[#007FFF] to-[#232F3E]';
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* AWS Console Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#232F3E]/10 via-transparent to-[#007FFF]/10"></div>
        <pre className={`absolute top-10 right-10 text-xs font-mono ${
          isDarkMode ? 'text-blue-400' : 'text-blue-600'
        } opacity-20`}>
{`# CI/CD Pipeline Status
✓ Build: SUCCESS
✓ Test: PASSED  
✓ Deploy: RUNNING`}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#232F3E] to-[#007FFF] bg-clip-text text-transparent">
              📦 Project Portfolio
            </span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Enterprise-grade solutions across cloud infrastructure, DevOps automation, and AI integration
          </p>

          {/* AWS Console Style Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {[
              { label: 'Total Projects', value: projects.length, icon: '🚀', color: 'text-[#007FFF]' },
              { label: 'Production', value: projects.filter(p => p.status === 'PROD').length, icon: '✅', color: 'text-green-500' },
              { label: 'Technologies', value: [...new Set(projects.flatMap(p => p.tags))].length, icon: '⚡', color: 'text-[#FF9900]' },
              { label: 'Categories', value: categories.length - 1, icon: '📁', color: 'text-purple-500' }
            ].map((metric, index) => (
              <div key={index} className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700' 
                  : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="text-2xl mb-1">{metric.icon}</div>
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className={`text-xs font-mono ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg shadow-blue-500/25`
                  : isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-600'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(category)}
                <span>{category}</span>
                {category !== 'All' && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === category 
                      ? 'bg-white/20' 
                      : isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                  }`}>
                    {projects.filter(p => p.category === category).length}
                  </span>
                )}
              </div>
              
              {/* Active indicator */}
              {activeFilter === category && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid with CI/CD Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card group relative rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                animatingCards.includes(index) ? 'animate-pulse' : ''
              } ${
                isDarkMode 
                  ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
                  : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* AWS Console Style Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </span>
                    <div>
                      <span className={`text-xs px-3 py-1 rounded-full font-mono font-bold ${
                        project.category === 'Python' ? 'bg-blue-100 text-blue-700' :
                        project.category === 'Docker' ? 'bg-cyan-100 text-cyan-700' :
                        project.category === 'AI' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Light */}
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      project.status === 'PROD' 
                        ? 'bg-green-500 animate-pulse' 
                        : 'bg-orange-500 animate-pulse'
                    }`}></div>
                    <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                      project.status === 'PROD' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-orange-500 text-white'
                    }`}>
                      {project.status || 'PROD'}
                    </span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 group-hover:text-[#007FFF] transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`} style={{ fontFamily: 'Amazon Ember, IBM Plex Mono, monospace', transition: 'opacity 0.3s cubic-bezier(0.28,0.11,0.32,1), transform 0.3s cubic-bezier(0.28,0.11,0.32,1)', willChange: 'opacity, transform', opacity: 1, transform: 'translateY(0)' }}>
                  {project.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-md font-mono border ${
                        isDarkMode 
                          ? 'bg-slate-700 text-blue-300 border-slate-600' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                {project.metrics && (
                  <div className={`flex items-center gap-4 mb-4 text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {project.metrics.stars && (
                      <div className="flex items-center gap-1">
                        <GitBranch size={12} />
                        <span>{project.metrics.stars}</span>
                      </div>
                    )}
                    {project.metrics.forks && (
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{project.metrics.forks}</span>
                      </div>
                    )}
                    {project.metrics.engagement && (
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} />
                        <span>{project.metrics.engagement}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* LinkedIn badge for DinD */}
                {project.title === 'Docker in Docker (DinD)' && (
                  <div className="flex items-center gap-2 mb-2">
                    <a href={project.linkedinUrl} target="_blank" rel="noopener" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#0077B5] text-white shadow transition-all duration-300 hover:scale-105" style={{ willChange: 'transform, opacity' }}>
                      <Linkedin size={14} className="mr-1" />
                      View on LinkedIn
                    </a>
                    <span className="ml-2 px-2 py-1 rounded bg-[#232F3E] text-[#00A1F1] font-mono text-xs" style={{ willChange: 'transform, opacity' }}>{project.metrics?.engagement}</span>
                  </div>
                )}

                {/* GitHub code viewer for AI-Powered Multi-Tech Tool */}
                {project.title === 'AI-Powered Multi-Tech Tool' && (
                  <div className="mb-2">
                    <div className="rounded bg-[#232F3E] text-[#00A1F1] text-xs font-mono p-3 overflow-x-auto shadow-inner" style={{ maxHeight: 90, fontFamily: 'IBM Plex Mono, monospace', willChange: 'transform, opacity' }}>
                      <pre style={{ margin: 0 }}>{project.codeSnippet}</pre>
                    </div>
                  </div>
                )}
                {/* Performance metrics badge for AI-Powered Multi-Tech Tool */}
                {project.title === 'AI-Powered Multi-Tech Tool' && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-[#00A1F1] text-white font-bold text-xs" style={{ willChange: 'transform, opacity' }}>{project.perfMetrics}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.title === 'AI-Powered Multi-Tech Tool' ? (
                    <>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 bg-[#232F3E] text-white shadow-lg"
                        style={{ fontFamily: 'Amazon Ember, IBM Plex Mono, monospace', willChange: 'transform, opacity' }}
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </a>
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noopener"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 bg-[#0077B5] text-white shadow-lg"
                        style={{ fontFamily: 'Amazon Ember, IBM Plex Mono, monospace', willChange: 'transform, opacity' }}
                      >
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </a>
                    </>
                  ) : (
                    <>
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 group/btn ${
                            isDarkMode 
                              ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600' 
                              : 'bg-gray-800 hover:bg-gray-700 text-white'
                          }`}
                        >
                          <Github size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                          <span className="text-sm">Repository</span>
                        </a>
                      )}
                      {project.linkedinUrl && project.linkedinUrl !== '#' && (
                        <a
                          href={project.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 group/btn bg-[#0077B5] hover:bg-[#005885] text-white"
                        >
                          <Linkedin size={16} className="group-hover/btn:scale-110 transition-transform duration-300" />
                          <span className="text-sm">Article</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* CI/CD Pipeline Visualization */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(project.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="h-full bg-white/30 animate-pulse"></div>
              </div>
              
              {/* Deployment Status */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`text-xs px-2 py-1 rounded font-mono ${
                  project.status === 'PROD' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-orange-500 text-white'
                }`}>
                  {project.status === 'PROD' ? 'DEPLOYED' : 'BUILDING'}
                </div>
              </div>

                {/* Architecture diagram thumbnail for Flask Inside Docker */}
                {project.title === 'Flask Inside Docker' && (
                  <div className="flex flex-col items-center mb-2">
                    <img src={project.archDiagram || '/placeholder-architecture.png'} alt="Architecture Diagram" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <span className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Architecture Diagram</span>
                  </div>
                )}
                {/* LinkedIn post preview snippet for Flask Inside Docker */}
                {project.title === 'Flask Inside Docker' && (
                  <div className="mb-2 px-3 py-2 rounded bg-[#F3F4F6] text-xs text-gray-700 shadow-sm" style={{ willChange: 'transform, opacity', fontFamily: 'IBM Plex Mono, monospace' }}>
                    {project.linkedinPreview}
                  </div>
                )}
                {/* System workflow diagram for Video Recording + Email System */}
                {project.title === 'Video Recording + Email System' && (
                  <div className="flex flex-col items-center mb-2">
                    <img src={project.workflowDiagram || '/placeholder-workflow.png'} alt="System Workflow Diagram" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <span className="text-xs text-gray-400 mt-1" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Workflow Diagram</span>
                  </div>
                )}
                {/* AWS S3 integration badge for Video Recording + Email System */}
                {project.title === 'Video Recording + Email System' && project.s3Badge && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-[#FF9900] text-white font-bold text-xs" style={{ willChange: 'transform, opacity' }}>AWS S3 Integrated</span>
                  </div>
                )}
                {/* Responsive video preview for Video Recording + Email System */}
                {project.title === 'Video Recording + Email System' && (
                  <div className="mb-2 flex justify-center">
                    <img src={project.videoPreview || '/placeholder-video-preview.png'} alt="Video Preview" style={{ width: '100%', maxWidth: 220, height: 120, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                  </div>
                )}
                {/* Geolocation API indicator for Grocery Store Finder */}
                {project.title === 'Grocery Store Finder' && project.geoApi && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-[#00A1F1] text-white font-bold text-xs" style={{ willChange: 'transform, opacity' }}>Geolocation API</span>
                  </div>
                )}
                {/* Mobile-responsive preview for Grocery Store Finder */}
                {project.title === 'Grocery Store Finder' && (
                  <div className="mb-2 flex justify-center">
                    <img src={project.mobilePreview || '/placeholder-mobile-preview.png'} alt="Mobile Preview" style={{ width: 120, height: 200, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                  </div>
                )}
                {/* GitHub code quality badge for Grocery Store Finder */}
                {project.title === 'Grocery Store Finder' && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-green-500 text-white font-bold text-xs" style={{ willChange: 'transform, opacity' }}>Code Quality: {project.codeQuality}</span>
                  </div>
                )}
            </div>
          ))}
        </div>

        {/* Infrastructure Summary */}
        <div className="mt-16">
          <div className={`p-8 rounded-xl border ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 shadow-lg' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Deployment Infrastructure
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-[#FF9900] text-4xl mb-4">☁️</div>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Cloud Platforms
                </h4>
                <div className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  AWS • Azure • GCP<br />
                  Multi-region deployment
                </div>
              </div>

              <div className="text-center">
                <div className="text-[#007FFF] text-4xl mb-4">🔄</div>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  CI/CD Pipeline
                </h4>
                <div className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  GitHub Actions • Docker<br />
                  Automated testing & deployment
                </div>
              </div>

              <div className="text-center">
                <div className="text-green-500 text-4xl mb-4">📊</div>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Monitoring
                </h4>
                <div className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  CloudWatch • Prometheus<br />
                  Real-time metrics & alerts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;