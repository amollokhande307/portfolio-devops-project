import React, { useState, useEffect, useRef } from 'react';
import { Cloud, Container, Settings, Code, Database, Server, Monitor, Globe } from 'lucide-react';

interface SkillProps {
  name: string;
  percentage: number;
  icon: React.ReactNode;
  category: string;
  description: string;
}

interface SkillsProps {
  isDarkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills: SkillProps[] = [
    { 
      name: 'AWS', 
      percentage: 85, 
      icon: <Cloud size={24} />, 
      category: 'Cloud',
      description: 'EC2, S3, Lambda, VPC, CloudFormation'
    },
    { 
      name: 'Docker', 
      percentage: 90, 
      icon: <Container size={24} />, 
      category: 'DevOps',
      description: 'Containerization, Multi-stage builds, Compose'
    },
    { 
      name: 'Kubernetes', 
      percentage: 80, 
      icon: <Settings size={24} />, 
      category: 'Orchestration',
      description: 'Pods, Services, Deployments, Helm'
    },
    { 
      name: 'Python', 
      percentage: 95, 
      icon: <Code size={24} />, 
      category: 'Programming',
      description: 'Flask, FastAPI, Automation, AI/ML'
    },
    { 
      name: 'Linux', 
      percentage: 88, 
      icon: <Monitor size={24} />, 
      category: 'Systems',
      description: 'Ubuntu, CentOS, Shell scripting, System admin'
    },
    { 
      name: 'JavaScript', 
      percentage: 85, 
      icon: <Globe size={24} />, 
      category: 'Frontend',
      description: 'React, Node.js, TypeScript, APIs'
    },
    { 
      name: 'Flask', 
      percentage: 88, 
      icon: <Server size={24} />, 
      category: 'Backend',
      description: 'REST APIs, Authentication, Database integration'
    },
    { 
      name: 'Git', 
      percentage: 92, 
      icon: <Database size={24} />, 
      category: 'Version Control',
      description: 'Branching, Merging, CI/CD workflows'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSkillColor = (category: string) => {
    switch (category) {
      case 'Cloud': return 'from-[#FF9900] to-[#FF9900]/70';
      case 'DevOps': return 'from-[#007FFF] to-[#007FFF]/70';
      case 'Orchestration': return 'from-[#326CE5] to-[#326CE5]/70';
      case 'Programming': return 'from-[#3776AB] to-[#3776AB]/70';
      case 'Systems': return 'from-[#FCC624] to-[#FCC624]/70';
      case 'Frontend': return 'from-[#F7DF1E] to-[#F7DF1E]/70';
      case 'Backend': return 'from-[#000000] to-[#000000]/70';
      case 'Version Control': return 'from-[#F05032] to-[#F05032]/70';
      default: return 'from-[#007FFF] to-[#007FFF]/70';
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Terraform-style Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#232F3E]/10 via-transparent to-[#007FFF]/10"></div>
        <pre className={`absolute top-10 left-10 text-xs font-mono ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        } opacity-20`}>
{`# terraform plan
+ aws_instance.web_server
+ docker_container.app
+ kubernetes_deployment.api`}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#232F3E] to-[#007FFF] bg-clip-text text-transparent">
              🛠️ Infrastructure
            </span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Enterprise-grade technologies powering scalable cloud solutions
          </p>
        </div>

        {/* Skills Grid with CloudWatch-style Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-card group relative p-6 rounded-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20' 
                  : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* AWS Console Style Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                }`}>
                  <div className={`text-[#007FFF] group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-mono ${
                  isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {skill.category}
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 group-hover:text-[#007FFF] transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {skill.name}
              </h3>
              <div className={`text-xs leading-relaxed transition-all duration-300 ${
                hoveredSkill === skill.name ? 'opacity-100 max-h-20' : 'opacity-70 max-h-12'
              } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} overflow-hidden`}>
                {skill.description}
              </div>
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getSkillColor(skill.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Architecture Overview */}
        <div className="mt-16">
          <div className={`p-8 rounded-xl border ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 shadow-lg' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Technology Architecture
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cloud Layer */}
              <div className={`text-center p-6 rounded-lg border ${
                isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="text-[#FF9900] text-3xl mb-4">☁️</div>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Cloud Infrastructure
                </h4>
                <div className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  AWS • EC2 • S3 • Lambda<br />
                  VPC • CloudFormation
                </div>
              </div>

              {/* Container Layer */}
              <div className={`text-center p-6 rounded-lg border ${
                isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="text-[#007FFF] text-3xl mb-4">🐳</div>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Container Platform
                </h4>
                <div className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Docker • Kubernetes<br />
                  Helm • Container Registry
                </div>
              </div>

              {/* Application Layer */}
              <div className={`text-center p-6 rounded-lg border ${
                isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-green-50 border-green-200'
              }`}>
                <div className="text-green-500 text-3xl mb-4">⚡</div>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Application Stack
                </h4>
                <div className={`text-sm font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Python • Flask • JavaScript<br />
                  React • APIs • Databases
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;