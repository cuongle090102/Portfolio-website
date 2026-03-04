'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState, useRef, useCallback } from 'react'
import { mockProjects } from '@/lib/mockData'

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    work: false,
    approach: false,
    contact: false
  });

  // Get featured projects with videos
  const finstockProject = mockProjects.find(project => project.title === "FINSTOCK");
  const finstockVideo = finstockProject?.blocks?.find(block => block.type === "video");

  const crossyProject = mockProjects.find(project => project.title === "CROSSY DUMMY CAT");
  const crossyVideo = crossyProject?.blocks?.find(block => block.type === "video");

  const spodelProject = mockProjects.find(project => project.title === "THESIS: SPODEL");
  const spodelVideo = spodelProject?.blocks?.find(block => block.type === "video");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setIsVisible(prev => ({
              ...prev,
              [sectionId]: true
            }));
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    // Set hero as visible immediately
    setIsVisible(prev => ({ ...prev, hero: true }));

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black page-transition">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-black hover:text-gray-600 transition-colors text-sm">
              Index
            </Link>
            <div className="w-px h-4 bg-gray-300"></div>
            <Link href="/projects" className="text-black hover:text-gray-600 transition-colors text-sm">
              Work
            </Link>
            <div className="w-px h-4 bg-gray-300"></div>
            <Link href="/favorites" className="text-black hover:text-gray-600 transition-colors text-sm">
              Favorites
            </Link>
            {isAuthenticated ? (
              <>
                <div className="w-px h-4 bg-gray-300"></div>
                <Link href="/admin" className="text-black hover:text-gray-600 transition-colors text-sm">
                  Admin
                </Link>
                <div className="w-px h-4 bg-gray-300"></div>
                <button
                  onClick={logout}
                  className="text-black hover:text-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="w-px h-4 bg-gray-300"></div>
                <Link href="/admin" className="text-black hover:text-gray-600 transition-colors text-sm">
                  Admin
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-screen bg-white relative overflow-hidden"
        data-section="hero"
      >
        {/* Header Name */}
        <div className="absolute top-6 left-6 z-10">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            CUONG LE
          </h1>
        </div>

        {/* About Link - Top Right */}
        <div className="absolute top-6 right-6 z-10">
          <Link href="/about" className="text-gray-900 hover:text-gray-600 transition-colors text-sm font-medium">
            ABOUT
          </Link>
        </div>

        {/* Full Width Hero Video */}
        <div className="absolute top-16 left-0 right-0">
          <div className="w-full h-[65vh] bg-black overflow-hidden">
            <video
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
              onLoadedData={(e) => e.currentTarget.play()}
              style={{ filter: 'grayscale(100%) contrast(1.1)' }}
            >
              <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="relative mt-[calc(4rem+65vh)]">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
            <div className={`${isVisible.hero ? '' : 'opacity-0'}`}>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed text-center mx-auto max-w-3xl word-reveal">
                {isVisible.hero && 'I believe in data science rooted in clear thinking, built on systems that adapt and challenge conventional approaches.'.split(' ').map((word, i) => (
                  <span key={i} style={{ animationDelay: `${0.3 + i * 0.05}s` }}>
                    {word}{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        
      </section>
      {/* Selected Work Preview */}
      <section className="py-32 bg-gray-900" data-section="work">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`mb-20 transition-all duration-1000 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Selected Work
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              Featured projects in data engineering, analytics, and software development.
            </p>
          </div>

          <div className="space-y-20">
            {/* SPODEL — Featured (full-width) */}
            {spodelProject && spodelVideo && (
              <div className={`transition-all duration-1000 delay-200 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="group relative rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-black">
                    <video
                      autoPlay loop muted playsInline
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      onLoadedData={(e) => e.currentTarget.play()}
                    >
                      <source src={spodelVideo.content} type="video/mp4" />
                    </video>
                  </div>
                  {/* Overlay info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-8 md:p-10 w-full">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{spodelProject.title}</h3>
                      <p className="text-gray-300 text-sm md:text-base max-w-2xl mb-4 line-clamp-2">{spodelProject.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {spodelProject.technologies?.split(',').slice(0, 5).map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/20">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{spodelProject.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Analytics &middot; Statistical Modeling &middot; Research</p>
                  </div>
                  <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group/link">
                    View Details
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            {/* Two-column: Finstock + Crossy Road */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Finstock */}
              {finstockProject && finstockVideo && (
                <div className={`transition-all duration-1000 delay-300 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="group relative rounded-2xl overflow-hidden">
                    <div className="aspect-video bg-black">
                      <video
                        autoPlay loop muted playsInline
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        onLoadedData={(e) => e.currentTarget.play()}
                      >
                        <source src={finstockVideo.content} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-white">{finstockProject.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Data Engineering &middot; Real-time Pipeline &middot; Monitoring</p>
                  </div>
                </div>
              )}

              {/* Crossy Dummy Cat */}
              {crossyProject && crossyVideo && (
                <div className={`transition-all duration-1000 delay-400 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="group relative rounded-2xl overflow-hidden">
                    <div className="aspect-video bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${crossyVideo.content.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&loop=1&playlist=${crossyVideo.content.split('v=')[1]?.split('&')[0]}&controls=0&showinfo=0&modestbranding=1`}
                        title={crossyProject.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-white">{crossyProject.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Game Development &middot; C++ &middot; SFML</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* View All */}
          <div className={`text-center mt-20 transition-all duration-1000 delay-600 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/projects" className="inline-flex items-center bg-white text-black px-8 py-4 font-medium rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105">
              View All Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-32 bg-white" data-section="approach">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-5xl font-bold text-black mb-8 leading-tight">
              My Approach
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Combining technical precision with creative problem-solving to deliver 
              data solutions that drive measurable business impact.
            </p>
          </div>
          
          <div className="space-y-16">
            <div 
              className={`border-l-2 border-gray-200 pl-8 hover:border-black transition-colors duration-300 transition-all duration-1000 delay-200 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h3 className="text-2xl font-bold text-black mb-4">01. Discovery & Strategy</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Every project begins with deep understanding of business objectives and data landscape. 
                I work closely with stakeholders to identify opportunities and define success metrics.
              </p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Research • Planning • Stakeholder Alignment</p>
            </div>
            
            <div 
              className={`border-l-2 border-gray-200 pl-8 hover:border-black transition-colors duration-300 transition-all duration-1000 delay-400 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h3 className="text-2xl font-bold text-black mb-4">02. Architecture & Design</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Designing scalable, maintainable systems that grow with your business. 
                Focus on clean code, robust pipelines, and production-ready solutions.
              </p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">System Design • Data Modeling • Infrastructure</p>
            </div>
            
            <div 
              className={`border-l-2 border-gray-200 pl-8 hover:border-black transition-colors duration-300 transition-all duration-1000 delay-600 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h3 className="text-2xl font-bold text-black mb-4">03. Implementation & Testing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Rigorous development process with continuous testing, validation, and optimization. 
                Ensuring models perform reliably in production environments.
              </p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Development • Testing • Optimization</p>
            </div>
            
            <div 
              className={`border-l-2 border-gray-200 pl-8 hover:border-black transition-colors duration-300 transition-all duration-1000 delay-800 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h3 className="text-2xl font-bold text-black mb-4">04. Deployment & Monitoring</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Seamless deployment with comprehensive monitoring and alerting. 
                Continuous improvement based on real-world performance and feedback.
              </p>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Deployment • Monitoring • Maintenance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-gray-50" data-section="contact">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 
            className={`text-5xl font-bold text-black mb-8 leading-tight transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Let's Build Something
            <span className="block">Extraordinary</span>
          </h2>
          <p 
            className={`text-xl text-gray-700 mb-16 leading-relaxed max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Ready to transform your data into a competitive advantage? 
            Let's discuss how we can unlock the potential in your business.
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-400 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Link
              href="/projects"
              className="bg-black text-white px-10 py-4 font-medium hover:bg-gray-900 transition-all duration-300 hover:scale-105"
            >
              View All Projects
            </Link>
            <Link
              href="/favorites"
              className="border border-black text-black px-10 py-4 font-medium hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
            >
              Explore Favorites
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-black font-bold text-xl mb-6 tracking-tight">CUONG LE</h3>
            <p className="text-gray-600 mb-12">Crafting intelligent solutions from complex data</p>
            <div className="flex justify-center gap-8">
              <a href="mailto:cle6565@gmail.com" className="text-gray-600 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100" title="Email">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/cle9.1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100" title="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100" title="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                © 2025 CUONG LE. Building the future with data.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}