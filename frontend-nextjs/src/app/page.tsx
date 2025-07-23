'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const [isVisible, setIsVisible] = useState({
    hero: false,
    work: false,
    approach: false,
    contact: false
  });

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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black page-transition">
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

        {/* Full Width Hero Video */}
        <div className="absolute top-16 left-0 right-0">
          <div className="w-full h-[60vh] bg-black overflow-hidden">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover filter grayscale"
              onLoadedData={(e) => e.currentTarget.play()}
              style={{ filter: 'grayscale(100%) contrast(1.2)' }}
            >
              <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-8 4h8M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">Landscape Video</p>
                </div>
              </div>
            </video>
          </div>
        </div>

        <div className="relative mt-[calc(4rem+60vh)]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
            {/* Mission Statement */}
            <div 
              className={`mb-16 transition-all duration-1200 delay-300 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <p className="text-2xl lg:text-3xl text-gray-900 leading-tight max-w-4xl font-light text-center mx-auto">
                I believe in data science rooted in clear thinking, 
                built on systems that <em>adapt</em> and challenge conventional approaches.
              </p>
            </div>

          {/* Skills Tags */}
          <div 
            className={`mb-16 transition-all duration-1200 delay-500 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex flex-wrap gap-6 text-lg text-gray-600 font-medium">
              <span>Machine Learning</span>
              <span>•</span>
              <span>Data Analytics</span>
              <span>•</span>
              <span>Predictive Modeling</span>
              <span>•</span>
              <span>Automation</span>
            </div>
          </div>

          {/* Call to Action */}
          <div 
            className={`transition-all duration-1200 delay-700 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Link
              href="/projects"
              className="inline-flex items-center group text-gray-900 text-lg font-medium hover:text-gray-600 transition-colors duration-300"
            >
              View My Work
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          </div>
        </div>
        
      </section>

      {/* Selected Work Preview */}
      <section className="py-32 bg-gray-900" data-section="work">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className={`mb-20 transition-all duration-1000 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-6xl font-bold text-white mb-8 leading-tight">
              Selected Work
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              A curated collection of data science projects that showcase expertise 
              in machine learning, analytics, and intelligent automation.
            </p>
          </div>
          
          {/* Clean project grid */}
          <div className="space-y-24">
            
            <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-200 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="group">
                <div className="aspect-video bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm">Machine Learning Model</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Predictive Analytics Platform</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Developed an end-to-end machine learning platform that processes real-time 
                  customer data to predict churn with 94% accuracy, resulting in $2.3M 
                  revenue retention for enterprise clients.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 transition-colors">Python</span>
                  <span className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 transition-colors">TensorFlow</span>
                  <span className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 transition-colors">AWS</span>
                </div>
                <Link href="/projects" className="inline-flex items-center text-white hover:text-gray-300 transition-all duration-300 group">
                  View Project 
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-400 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="md:order-2 group">
                <div className="aspect-video bg-gradient-to-br from-green-800 to-blue-800 rounded-lg mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm">Data Visualization</p>
                  </div>
                </div>
              </div>
              <div className="md:order-1">
                <h3 className="text-3xl font-bold text-white mb-4">Real-time Analytics Dashboard</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Built an intelligent dashboard that processes 500k+ daily events, 
                  automatically detecting anomalies and generating insights that reduced 
                  incident response time by 80%.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 transition-colors">React</span>
                  <span className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 transition-colors">D3.js</span>
                  <span className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-200 text-sm hover:bg-gray-700 transition-colors">Apache Kafka</span>
                </div>
                <Link href="/projects" className="inline-flex items-center text-white hover:text-gray-300 transition-all duration-300 group">
                  View Project 
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
          </div>
          
          <div className={`text-center mt-24 transition-all duration-1000 delay-600 ${isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/projects" className="inline-flex items-center bg-white text-black px-8 py-4 font-medium hover:bg-gray-200 transition-all duration-300 hover:scale-105">
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
            <h3 className="text-black font-bold text-xl mb-6 tracking-tight">Data Artisan</h3>
            <p className="text-gray-600 mb-12">Crafting intelligent solutions from complex data</p>
            <div className="flex justify-center gap-12">
              <Link href="/projects" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                Work
              </Link>
              <Link href="/favorites" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                Favorites
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-black transition-colors text-sm font-medium">
                Admin
              </Link>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                © 2024 Data Artisan. Building the future with data.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}