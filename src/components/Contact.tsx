import React, { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, Send, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setStatusType(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage('Please fill out all required fields.');
      setStatusType('error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatusMessage('Please enter a valid email address.');
      setStatusType('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service is not configured.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        { publicKey }
      );

      setStatusMessage("Thank you! Your message has been sent.");
      setStatusType('success');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatusMessage('Sorry, something went wrong. Please try again later.');
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <Github size={24} />,
      url: 'https://github.com/amollokhande307',
      label: 'GitHub',
      color: 'hover:bg-gray-800'
    },
    {
      icon: <Linkedin size={24} />,
      url: 'https://www.linkedin.com/in/amol-lokhande-382976361',
      label: 'LinkedIn',
      color: 'hover:bg-[#0077B5]'
    },
    {
      icon: <Instagram size={24} />,
      url: 'https://www.instagram.com/amol_lokhande_02',
      label: 'Instagram',
      color: 'hover:bg-gradient-to-r from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📩 Get In Touch
            </span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let's discuss opportunities, collaborations, or just have a chat about technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`p-8 rounded-xl ${
            isDarkMode 
              ? 'bg-slate-800 border border-slate-700 shadow-lg' 
              : 'bg-white border border-blue-100 shadow-lg'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Send me a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {statusMessage && (
                <div className={`p-3 rounded-md text-sm ${
                  statusType === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {statusMessage}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 peer ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-transparent' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-transparent'
                    }`}
                    placeholder="Your Name"
                  />
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    formData.name 
                      ? 'top-1 text-xs text-blue-500' 
                      : 'top-3 text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500'
                  } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 peer ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white placeholder-transparent' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-transparent'
                    }`}
                    placeholder="Your Email"
                  />
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    formData.email 
                      ? 'top-1 text-xs text-blue-500' 
                      : 'top-3 text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500'
                  } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Your Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 peer ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-transparent' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-transparent'
                  }`}
                  placeholder="Subject"
                />
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  formData.subject 
                    ? 'top-1 text-xs text-blue-500' 
                    : 'top-3 text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500'
                } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 peer resize-none ${
                    isDarkMode 
                      ? 'bg-slate-700 border-slate-600 text-white placeholder-transparent' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-transparent'
                  }`}
                  placeholder="Your Message"
                ></textarea>
                <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  formData.message 
                    ? 'top-1 text-xs text-blue-500' 
                    : 'top-3 text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500'
                } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-70 ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } shadow-lg hover:shadow-xl`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className={`p-8 rounded-xl ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700 shadow-lg' 
                : 'bg-white border border-blue-100 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-slate-700' : 'bg-blue-50'
                  }`}>
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Email
                    </div>
                    <a 
                      href="mailto:amollokhande8999@gmail.com"
                      className={`text-sm hover:text-blue-600 transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      amollokhande8999@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-slate-700' : 'bg-blue-50'
                  }`}>
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Location
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Chh. Sambhaji Nagar, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={`p-8 rounded-xl ${
              isDarkMode 
                ? 'bg-slate-800 border border-slate-700 shadow-lg' 
                : 'bg-white border border-blue-100 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Follow Me
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                    } ${social.color}`}
                  >
                    <div className="text-blue-600">
                      {social.icon}
                    </div>
                    <div>
                      <div className="font-medium">{social.label}</div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Connect with me
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            {/* Removed: 24h response time and 100% satisfaction guarantee */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;