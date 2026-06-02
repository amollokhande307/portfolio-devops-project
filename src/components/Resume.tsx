import React from 'react';
import { Download, MapPin, Calendar, Award, Book, ExternalLink } from 'lucide-react';

interface ResumeProps {
  isDarkMode: boolean;
}

const Resume: React.FC<ResumeProps> = ({ isDarkMode }) => {
  const handleResumeDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      e.preventDefault();
      const candidatePaths = [
        '/AMOL-Lokhande-FlowCV-Resume-20250907 (1).pdf',
        '/resume.pdf'
      ];

      let response: Response | null = null;
      for (const path of candidatePaths) {
        const res = await fetch(encodeURI(path), { cache: 'no-store' });
        if (res.ok) {
          response = res;
          break;
        }
      }

      if (!response) throw new Error('Resume file not found');

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'AMOL-Lokhande-FlowCV-Resume-20250907 (1).pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback to default anchor behavior if fetch fails
      window.location.href = '/resume.pdf';
    }
  };
  const education = {
    degree: 'Bachelor of Computer Science (BCS)',
    university: 'MGM University',
    location: 'Chh. Sambhaji Nagar',
    year: '3rd Year',
    status: 'Currently Pursuing'
  };

  const portfolioProjects = [
    {
      title: 'Enterprise Cloud Solutions',
      period: '', // Remove date
      description: 'Developed containerized applications using Docker and Kubernetes with AWS cloud infrastructure.',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'Linux']
    },
    {
      title: 'AI & Automation Tools',
      period: '',
      description: 'Built AI-powered banking assistant and automation tools for communication platforms.',
      technologies: ['Python', 'AI/ML', 'APIs', 'Automation']
    },
    {
      title: 'Full Stack Web Applications',
      period: '', // Remove date
      description: 'Created responsive web applications with real-time features and modern JavaScript.',
      technologies: ['JavaScript', 'HTML/CSS', 'Flask', 'Streamlit']
    }
  ];

  const technicalSkills = [
    { category: 'Languages', skills: ['Python', 'JavaScript'] },
    { category: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'Linux'] },
    { category: 'Frameworks', skills: ['Flask', 'Streamlit'] },
    { category: 'Tools & Others', skills: ['Git', 'HTML/CSS', 'APIs'] }
  ];

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📄 Professional Resume
            </span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Educational background, technical expertise, and project portfolio
          </p>
          
          {/* Download Button */}
          <a
            href="/resume.pdf"
            download="Amol-Lokhande-Resume.pdf"
            onClick={handleResumeDownload}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 group ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/25' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/25'
            }`}
          >
            <Download size={20} className="group-hover:animate-bounce" />
            <span>Download Resume</span>
            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Education & Projects */}
          <div className="space-y-8">
            {/* Education */}
            <div className={`p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
                : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Book className="text-blue-600" size={28} />
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Education
                </h3>
              </div>

              <div className={`p-6 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-blue-50 border border-blue-100'
              }`}>
                <h4 className={`text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {education.degree}
                </h4>
                <div className={`text-lg font-medium mb-3 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {education.university}
                </div>
                <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{education.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{education.year} - {education.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Experience */}
            <div className={`p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
                : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-blue-600" size={28} />
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Project Portfolio
                </h3>
              </div>

              <div className="space-y-8">
                {portfolioProjects.map((project, index) => (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index < portfolioProjects.length - 1 && (
                      <div className={`absolute left-4 top-16 w-0.5 h-20 ${
                        isDarkMode ? 'bg-slate-600' : 'bg-blue-200'
                      }`}></div>
                    )}
                    
                    <div className="flex gap-6">
                      <div className={`w-8 h-8 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'bg-blue-600 border-blue-600 text-white'
                      }`}>
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {project.title}
                        </h4>
                        <div className={`text-sm font-medium mb-3 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} style={{
                          maxHeight: project.period ? 40 : 0,
                          opacity: project.period ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'max-height 0.4s cubic-bezier(0.28,0.11,0.32,1), opacity 0.4s cubic-bezier(0.28,0.11,0.32,1)',
                          willChange: 'height, opacity'
                        }}>
                          {project.period}
                        </div>
                        <p className={`text-sm leading-relaxed mb-4 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`text-xs px-2 py-1 rounded-md font-mono ${
                                isDarkMode 
                                  ? 'bg-slate-700 text-blue-300 border border-slate-600' 
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Contact */}
          <div className="space-y-8">
            {/* Technical Skills */}
            <div className={`p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
                : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Technical Skills
              </h3>

              <div className="space-y-6">
                {technicalSkills.map((skillGroup, index) => (
                  <div key={index} className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <h4 className={`text-sm font-bold mb-3 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {skillGroup.category}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className={`flex items-center text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                          }`}></div>
                          <span className="font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className={`p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
                : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Email
                  </div>
                  <a 
                    href="mailto:amollokhande8999@gmail.com"
                    className={`text-sm hover:text-blue-600 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    amollokhande8999@gmail.com
                  </a>
                </div>

                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Location
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Chh. Sambhaji Nagar, India
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    LinkedIn
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/amol-lokhande-382976361"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm hover:text-blue-600 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    /in/amol-lokhande-382976361
                  </a>
                </div>

                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    GitHub
                  </div>
                  <a 
                    href="https://github.com/amollokhande307"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm hover:text-blue-600 transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    /amollokhande307
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className={`p-8 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
                : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Professional Summary
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Passionate Cloud & DevOps Engineer with expertise in containerization, 
                automation, and AI integration. Currently pursuing BCS while building 
                enterprise-grade solutions using Python, Docker, Kubernetes, and AWS. 
                Proven track record of delivering scalable applications and technical 
                content that drives industry insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;