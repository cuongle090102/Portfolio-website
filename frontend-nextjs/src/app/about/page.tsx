'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'

const fallbackIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzk3QTNBRiIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjw/PC90ZXh0Pgo8L3N2Zz4K';

const skillCategories = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PySpark', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' },
    ],
  },
  {
    title: 'Databases & Storage',
    items: [
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
      { name: 'MinIO', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/minio/minio-original.svg' },
    ],
  },
  {
    title: 'Data Tools',
    items: [
      { name: 'Kafka', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
      { name: 'Airflow', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/AirflowLogo.svg/1200px-AirflowLogo.svg.png' },
      { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    ],
  },
  {
    title: 'Frameworks & DevOps',
    items: [
      { name: 'Scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
      { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg' },
    ],
  },
];

const certifications = [
  {
    title: 'Fabric Data Engineer Associate',
    subtitle: 'Microsoft Certified • DP-700',
    issuer: 'Microsoft',
    description: 'Expertise in designing and implementing data engineering solutions using Microsoft Fabric, including data warehousing, data lakes, and analytics pipelines.',
    link: 'https://learn.microsoft.com/api/credentials/share/vi-vn/LQUCCNG-0824/6516F66FDA081293?sharingId=9C787339E0CA5CBD',
    linkText: 'View Credential',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg',
  },
  {
    title: 'Advanced SQL',
    subtitle: 'HackerRank Certified',
    issuer: 'HackerRank',
    description: 'Proficiency in complex queries, joins, aggregations, subqueries, and database optimization techniques.',
    link: 'https://drive.google.com/file/d/1QkvDI5RuE1kfNIkVV31gNvCsNT-FnS8t/view?usp=sharing',
    linkText: 'View Certificate',
  },
  {
    title: 'IELTS Academic',
    subtitle: 'Overall Band Score: 6.0',
    issuer: 'February 2025 • IDP Education',
    description: 'International English Language Testing System certification demonstrating competent English proficiency for academic and professional communication.',
    link: 'https://drive.google.com/file/d/169857IW8aP8s6MhUVP462Gz39RGw4ypb/view?usp=sharing',
    linkText: 'View Certificate',
  },
];

export default function AboutPage() {
  const { isAuthenticated, logout } = useAuth();
  const [isVisible, setIsVisible] = useState({
    intro: false,
    skills: false,
    education: false,
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

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    setIsVisible(prev => ({ ...prev, intro: true }));

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

      {/* Header Name */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          CUONG LE
        </h1>
      </div>

      {/* About Link - Top Right (Active State) */}
      <div className="absolute top-6 right-6 z-10">
        <span className="text-gray-900 text-sm font-medium relative">
          ABOUT
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
        </span>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-16">
        {/* About Me */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-24" data-section="intro">
          <div className={`transition-all duration-1000 ${isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-12 leading-tight">
              About Me
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Computer Science graduate passionate about data engineering and analytics, with experience building scalable data infrastructure and translating complex datasets into clear, actionable business insights. Skilled in designing ETL pipelines, automating data workflows, and optimizing databases — while delivering BI dashboards and analytics that support data-driven decision-making and business growth.
            </p>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-24 bg-gray-50" data-section="education">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className={`mb-16 transition-all duration-1000 ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-4xl font-bold text-black mb-4">Education & Certifications</h2>
            </div>

            {/* Education */}
            <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Education</h3>
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* University Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                      <img
                        src="https://en.hcmus.edu.vn/wp-content/uploads/2023/08/Logo-TA.png"
                        alt="HCMUS"
                        className="w-11 h-11 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = fallbackIcon; }}
                      />
                    </div>
                  </div>
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold text-gray-900">
                        Advanced Program in Computer Science (APCS)
                      </h4>
                      <span className="text-sm text-gray-400 font-medium whitespace-nowrap">2020 — 2024</span>
                    </div>
                    <p className="text-blue-600 font-semibold mb-1">
                      Ho Chi Minh City University of Science (HCMUS)
                    </p>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Ho Chi Minh City, Vietnam
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Specialized program focusing on advanced computer science concepts, data structures, algorithms,
                      and theoretical principles.
                    </p>
                    {/* Coursework Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['Data Structures & Algorithms', 'Machine Learning', 'Database Systems', 'Software Engineering', 'Computer Networks', 'Statistics'].map((course) => (
                        <span key={course} className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Certifications</h3>
              <div className="grid md:grid-cols-3 gap-5">
                {certifications.map((cert) => (
                  <a
                    key={cert.title}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center mb-4">
                      {cert.icon ? (
                        <img src={cert.icon} alt="" className="w-6 h-6 object-contain" />
                      ) : (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )}
                    </div>
                    {/* Content */}
                    <h4 className="font-bold text-gray-900 mb-1">{cert.title}</h4>
                    <p className="text-sm text-green-600 font-medium mb-1">{cert.subtitle}</p>
                    <p className="text-xs text-gray-400 mb-3">{cert.issuer}</p>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{cert.description}</p>
                    {/* Link indicator */}
                    <div className="flex items-center text-sm text-blue-600 font-medium mt-4 group-hover:text-blue-800 transition-colors">
                      {cert.linkText}
                      <svg className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="py-24 bg-white" data-section="skills">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className={`mb-16 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-4xl font-bold text-black mb-4">Technical Skills</h2>
              <p className="text-lg text-gray-600">
                A comprehensive toolkit for building robust data solutions and scalable applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {skillCategories.map((category, catIndex) => (
                <div
                  key={category.title}
                  className={`transition-all duration-1000 delay-${200 + catIndex * 150} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                      >
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackIcon;
                          }}
                        />
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Let's Connect */}
        <section className="py-24 bg-gray-50" data-section="contact">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-3xl font-bold text-black mb-8">Let's Connect</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                I'm always interested in discussing data science challenges, software architecture,
                or potential collaborations. Whether you have a project in mind or just want to chat
                about the latest in ML and analytics, feel free to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:cle6565@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-medium hover:bg-gray-900 transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
                >
                  View My Work
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 mt-12">
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
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-black font-bold text-xl mb-6 tracking-tight">CUONG LE</h3>
            <p className="text-gray-600 mb-12">Crafting intelligent solutions from complex data</p>
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
