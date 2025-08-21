'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const [isVisible, setIsVisible] = useState({
    hero: false,
    skills: false,
    education: false,
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

      {/* Skills Section */}
      <section className="py-32 bg-gray-50" data-section="skills">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className={`mb-20 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-6xl font-bold text-black mb-8 leading-tight">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
              A comprehensive toolkit for building robust data solutions and scalable applications.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {/* Programming Languages with star ratings */}
            {[
              { name: 'Python', stars: 3, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { name: 'C++', stars: 2, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
              { name: 'SQL', stars: 3, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
              { name: 'JavaScript', stars: 2, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
              { name: 'HTML', stars: 1, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
              { name: 'CSS', stars: 1, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
              { name: 'PySpark', stars: 3, logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' },
            ].map((skill, index) => (
              <div key={skill.name} className={`group relative transition-all duration-1000 delay-${200 + index * 50} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-white p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  <div className="flex flex-col items-center">
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-12 h-12 object-contain mb-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzk3QTNBRiIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjw/PC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                    <span className="text-xs font-medium text-gray-700 text-center">{skill.name}</span>
                  </div>
                  
                  {/* Star rating overlay - appears on hover */}
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="flex justify-center gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className={`w-3 h-3 ${star <= skill.stars ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-white text-xs">{skill.stars}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Storage & Databases */}
            {[
              { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
              { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
              { name: 'Amazon S3', logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlQMBEQACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAACAAEEBgMHCAX/xABKEAABAgMCBgwKBwgDAQAAAAABAAIDBAUGEQcSITFRcxMUIjVBVGFxgZOxwRUXMjZVkZKhstEWIyZSYnLCNEJFU2OC0uIkQ4Mz/8QAGQEBAQADAQAAAAAAAAAAAAAAAAEDBAUC/8QALREAAgECBgEDAwQDAQAAAAAAAAECAxEEEhQhMVEyEzNSQWHwImKBsVORoSP/2gAMAwEAAhEDEQA/AN4OIaCSbgM5QEbwjI8cl+tb815zR7JmXY/hCS45L9a35pmj2My7F4RkeOS/Wt+aZo9jMuxeEJLjkv1rfmmaPYzLsXhCS45L9a35pmj2MyF4QkuNy/Wt+aZo9jMhbfkuNy/Wt+aZo9i6Ft+T43L9a35pnj2LrsW35PjcDrW/NM8exmXYtvyfG4HWt+aZ49i67H2/J8agdY35pnj2LrsW3pPjUDrG/NM8exddi29J8agdYEzx7F12Lb0pxqB1gUzx7GZdi29KcagdYE9SPYzLsW3pTjUDrAnqR7GZBQ5qXiuxIUeE92hrwSqpJ8MXRmXopGqW981qX9hXmXiyPhmgIYGI3IM2hcJJWOUZAG/dHqUFkEGt+6EsLIK4aAlijgDQEsgGANAUsAgBoCWQHAGgJZAIAaAlkLBADQFLItkFcNASyFkELtASyFkELtASyFkEANAUAQA0BQDgDQEKWKw130gh3fynrbwXvGah5myF2TdI1R3vmtS/sK8z8WR8HP7DuG8y4S4OUuDICqAgVAEChRwgCBUAYKAIG9AODcgCChQgUAV6gCBQBAoAr0A6gLFYU/aGGP6T1t4L3TNQ8zZK7BvEapb3TWpf2FeZcMj4OfYfkN5lw1wcpcBhAGCgCB0qAnU+l1CpEbRko8YH95rNz7RyL1GnOfirnuMJS4RYJWwNZigOjOlpcfjiEn3C73rYWDqPmyMqw8/qTPoTJy4vna/LQ+ho7XL1pIrymevQS5kN9HLMsyPtPBv5IsNT0KH+T/qJ6VP6yH+jlmneRaaD0xYaejh/8n9D0qXy/oMWLk4w/wCFXpeJoyNd2OV0cX4zL6EXxIjzFhqvBGNBdLRx+CIQfeO9eJYOouNyPDz+h4k7TZ+QJ27JxoI0ubufWMi150pw8kYnCUeURgVjPIQKAIFAEFAWGwnnFD1T1t4L3TNh/M2WuwbxGqW901qX9hXmXDI+DnuGdw3mC4a4OUuDIFQSafJzFQnIUpKMx40U3Nb3nkVjFydkeoxcnZF3NPs5ZJjfCp8JVK4HYGi8NPMcgHK7LyLbyUqHnvI2ctOl5bsgVC31VmL2SLIUlBzAMbjOu5zk9QWOeLqPjY8SxEnstivzNSnpxxdNzkxGJ4HxCR6swWvKc5O7ZhcpPlkcAA5gvFkQIFAGCgHAF99wUsgS5Wozsob5WcmIX5IhA9WZe4znHhs9KUlwywSFt6lBAZOthTkI5CHtxXesZPctiGMmtpbmWNeX13J7ZGg2mY40w+D6hdfsLhcHdGY84WRQo1/DZnvLTqeOzKnOSsaSmoktMsxIsM3OC0ZxcJOLNeScXZmMFeSBAoCx2E84Yeqf2LawXvGah5my12DeI1S3umtS/sK8y4ZHwc8wzuG8wXDXByVwZAVSlpwbRhCtXBabvrYMRnuv/StjC7VTNh3/AOhJtbZGpSs/MTssyJOS0Z5iFzd09l5vuIznnCtfDzUnJK6Z6q0ZJtrcqTTlIBzZCNC1TXDCgCBQDhChAqAMIAggEDlAPDkA0qFLZZay9QmJ6BOTLHysCE8RAXZHvuOYDOByn3rbw+GnKSk9kjPSpSbvwYbdxREtLGaP+uGxh57r+9ecY71SV3eZ4C1TCECgLHYLzih6p628F7pmoeZs1dc3iNUt7prUv7CvMuGR8HPEPyG8y4a4OSuAwVSnsWSmBL2mpkQm4bYa0/3bnvWSk7VIs90naaLLaau1Wz1rZsSUyTAi4kQwIgxmZWgZNGY5rlnrVZ06rszNUnKE3Yf6Y0WqgC0FCaX8MWEQ49xHrKainP3Il9aEvNCElYSe/Z6hMSTj+68uF3S8HtUUcLLh2/PuTLQfDsP9DqPGyydp5fkxwxx+IK6WD3U/6L6EXxIMYP8AGyw65KvGnY/9lNH+5fn8k0/7heL/ABcsSuSzRp2L/ZNG/l+f7Lp/3CFkKPB/a7SwLhnxAxp97immgvKp+f8AR6MFzIfadiJLJHn484fusc439LQO1RxwsVvK/wCfYWor6hi1lIpoIoVFa1+bZItzT3k+tXVU4bU4j1oR8UPZys1Ku2olRNxzsMMPibCwYrBc0jpykZ0o1Z1ayzPYU6kp1Fc8G0cbZ6/PxL7747gOYZB2LWrO9STMVR3m2eeCsR4CUBZLAn7RQ9U9beD90zUPM2cuubxGqW901qX9hXmXBHwc7Qv/AJt5lxFwclcBgqlM0rFMCZgxhnhxGvHQQe5Fs0wuS54VIYFak5lvkx5W4cuK4/5BbWMX60/sbOJ8kymA6FqGsPflUAQuOe5AT6RRpuszDoMhLiK9ovcTcA0cpKsKTqO0Ue4wc3ZD1OkzNImtrT8uIUS7GbdcQ4aQQpOi6btJCUXF2ZFHIoebBA8qgCBQFywawx4SnJl2aDAuJ0Xn/VbuCSzNmxh+WyqRIpjRnxnZ4ji89JvWk3fcwN3dxgVAECgLJYDzjh6p62sH7pmoeZtBdc3iNU97prUv+ErzLgj4ZznCO4bzBcVHIXBlBQ9D5wQo0LF9t67blmbOVHhfCDSdGMwH9K3MR+qnCRs1t4RkUYFaZrBBAOFAWuwtpZegx5lk7DeYEcNOPDbeWkX8GjKtnD1o0r5vqZ6NRQbue/UazZa1UQQJ2JHlYkK8QZiJcwXH1jg/eWadShWdpbP6GWU6VXZni1WxFSlG7NIObPyxF7XQju7vy8PQsNTCTjvHdGKVCS8dysvY+G8siMcx4yOa5pBbzgrVML2ECoC72JZEh2arszCY50R7djYGNJJuYcwH5lvYVNUpysbNHwkymDNcRcRkyrRNYIFAEFCllwfn7SQ9S/uW1g/dM1DzNorrm8RqnvbNal/wleZcEfDOcoZ3DeYLio5C4DBuQoQKFL7Pf8zBTIxBlMpMAHoc5vY4Lblvhl9jZlvQX2KMMi0zWCBQBIBwcqhQweVCHpUmt1KkvBkJt8NnDDJvYf7TkXuFSdPxZ7jUlHhloh2tpNXY2FaWlML8wmILb8X34w6CVsrE057VY/yZ1WjLaaE+x9OqbDFs3V4UXh2GM4HF5LxlHSFNNTnvTkHRjLwZ7ElL1SzNkHiDLCNPiPjbGxpiAguF+bLdigrNFVKNDZbmSKlTp7Lcg1ORlLS0qYqcrKRJKpS7S6NCezFD7hfoy5BkPQV4nCNeGdKzR5lFVI5krMo944FzzUHBQFlwfG+0sPVP7ls4P3TPh/M2muubxFqm9s3qX/CVJcMkuGc4w/IbzBcRHIXAYKFCBQF9s07beDWuyxF5l3uiAcmK13aCtqlvQmujap70ZIoy1TVCvUKECgCCAcFQBgoAgVAGyI6G4PY4scMzmm4jpRNrdFuzY1XrdQodl6K+DGx5qMwGI6OMcuGLeb78uchdCpVnSpQs9zcnOUIK3JXZ+2tYn5V8tEMvCZEGK4wYZDiOEXkla0sVVkrbGGVeclYr7StcwhhAWXB55ywx/Sf3LawfumfD+ZtRdY3iLVN7ZvUv+EqS4ZJcM5uhH6tvMFxEchcGQFChAoC/4Li2Zl65T3Zo0uDdzhze9bmE3zRNrD7qUSiNvAAdkcMh51pI1ggVQECoAgUASAcG5QBgoAgC/cNyudkA5TkUtfYpdsJrhDmqXJtO5gQHe8gfpW7jeYro2MTykUwLSNcIFQBA8qAs+Dzzmh6l/ctrB+6Z8P5m1V1jeItT3tm9S/4SvMuCS4ObYZ+rZ+ULjHHXAYKFCQpc8FUxsVqjCJyRpZ7btJBa4e4FbGFdqljPhnaZXKxBMtWZ+AcmxTMRnqcVgmrSa+5imrSaIoK8kCBQBXqAIFAEEA4KgPTs7B2zXafB+9MMPqN/cvdNZpxX3PdNXmkexhFmNmtTGYDeIMOGzpuxv1LLi5XqsyYh/rK2CtYwjoAgVAWjB2b7TQ9TE7ltYP3TPh/M2susbxFqm9s3qX/CV5lwSXDOa4R+rZzBcY464QYQoQKAsFhZna9raY8m4Oi7Gf7gR2kLLQdqiMtF2qIzYQJV8pa+fxmlrI7hFZeM4LReR03piI2qstZWqMr4KwmIIIUIFAECoAgUASAsuDyVdMWqlXhjiyXD4jyBkG5IF/SQs2GjeqvsZqCvURCtRMbZtHUot94MdwB5BuR2LxXd6kmeajvNnmgrEYwgUKOgLRg5854epf3LZwnumfD+ZthdY3iLVN7ZvUv+ErzLgkuGc0wT9UzmC45x48IyKFHBQBse5jmua4tc0gtcDcQRmIQF9kLdSVQk2SVraaychtzTDGgu5yMlx5WnoW1HEKSy1Fc2o11JWqIymgWKqhDqZXzJvOaFGeLvU+4+9X0qE/GQ9OlPxkC/BpNOGNJVeTjNObGBF/SL1NHL6SGmf0Zgdg1r4O5iU9w07M//AAXnSVPsTT1PsOzBtXyd1Ep7f/Z5/QmkqfYmmqX+hKh4N5lgvnatKQWjysVpN3SSF6WDf1kZNM1yw20SxlLJdUa2Z1wzw4TwR6mXn3qelh4eUr/n2J6dGPk7mKoW1gS0m6RsvINkYRyGMWgO5wBw8pJUliUo5aSsHXSVoKxTr8q1DWCBQBAqAIFClowcn7UQx/Ridy2cJ7pmw/mbZXWN8i1Teyb1D/hKkuGSXBzPCP1beYLjHHXCMgKFCUA4QBA3IAuBRq5Q4T3QjfDcWHS03ItuAtuCUyoTrPInZpo/DHcO9XNLtlzS7CM/Ov8AKnZp3PGce9M0u2M0uzC9zopviOLz+I3qPfkPccKAIFAEgHCgDB5UAQKgLTg486Yepidy2cJ7pnw/mbaXWN8i1Xeyb1D/AISpLhklwzmWEfq28wXHOOuDICoUIFAEoBwUAQKAIIUIFQBDOgCBQoQKAIFQBAoAgUA4KgDBQFpwbn7Uw9TE7lsYT3f4M+H8zbi6xvmGcgmYlI8FpAMSG5gJ4Lxco90R7o1M3BFU2tA8LSmQfynLS0j7NHSS7C8UlT9KynVOTSS7LpJfIfxS1L0rKdU5NJLsaSXyHGCep+lZTqnKaOXY0kux/FPUvSkp1blNHLsaSXY/ioqXpSU6tyaOXY0kux/FVUvSkp1bk0cvkNLLscYK6l6TlOrcmjl8i6V9jjBZUR/E5Tq3KaKXyGlfY4wW1EfxKU9hyaKXyGlfY/ivqPpKV9hyuil8hpX2F4r6h6RlfYcmil8hpX2LxYVH0jK+w5NFL5DSvsIYMqh6RlfYcpopfIaV9jjBnUPSMr7Dk0UvkNK+xxg0qA/iEr7Dk0UvkXSvs9iyti5uiVhk9Gm4MVjWObisaQcqy0MM6c8zZkpUXCV7l2W4bAkAkAkAkAkAkAkAkAkAkAkAkAkAkAkAkAkAkAkB/9k=' },
            ].map((tech, index) => (
              <div key={tech.name} className={`group transition-all duration-1000 delay-${400 + index * 50} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-white p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center">
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className="w-12 h-12 object-contain mb-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzk3QTNBRiIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjw/PC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                    <span className="text-xs font-medium text-gray-700 text-center">{tech.name}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Data Tools */}
            {[
              { name: 'Kafka', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
              { name: 'Airflow', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/AirflowLogo.svg/1200px-AirflowLogo.svg.png' },
              { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
              { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
              { name: 'Jupyter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
              { name: 'Tableau', logo: 'https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png' },
            ].map((tool, index) => (
              <div key={tool.name} className={`group transition-all duration-1000 delay-${600 + index * 50} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-white p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center">
                    <img 
                      src={tool.logo} 
                      alt={tool.name}
                      className="w-12 h-12 object-contain mb-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzk3QTNBRiIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjw/PC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                    <span className="text-xs font-medium text-gray-700 text-center">{tool.name}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Frameworks */}
            {[
              { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
              { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
              { name: 'Scikit-learn', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
              { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
              { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
              { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
            ].map((framework, index) => (
              <div key={framework.name} className={`group transition-all duration-1000 delay-${800 + index * 50} ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="bg-white p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col items-center">
                    <img 
                      src={framework.logo} 
                      alt={framework.name}
                      className="w-12 h-12 object-contain mb-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzk3QTNBRiIvPgo8dGV4dCB4PSIyNCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjw/PC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                    <span className="text-xs font-medium text-gray-700 text-center">{framework.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section className="py-32 bg-white" data-section="education">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-gray-50 border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-2">Education</h3>
                    <div className="bg-white border border-gray-200 p-6 rounded-lg">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        Advanced Program in Computer Science (APCS)
                      </h4>
                      <p className="text-lg text-blue-600 font-medium mb-3">
                        Ho Chi Minh City University of Science (HCMUS)
                      </p>
                      <div className="flex items-center text-gray-600 mb-2">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Ho Chi Minh City, Vietnam</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Specialized program focusing on advanced computer science concepts, data structures, algorithms, 
                        and theoretical principles. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-gray-50 border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-6">
                  <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-2">Certifications</h3>
                    <div className="bg-white border border-gray-200 p-6 rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">
                            IELTS Academic
                          </h4>
                          <p className="text-lg text-green-600 font-medium mb-2">
                            Overall Band Score: 6.0
                          </p>
                          <div className="flex items-center text-gray-600 mb-3">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>February 2025 • IDP Education</span>
                          </div>
                        </div>
                        
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        International English Language Testing System certification demonstrating 
                        competent English proficiency for academic and professional communication 
                        in global environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
            <a href="mailto:cle6565@gmail.com" className="inline-flex items-center bg-white text-black px-8 py-4 font-medium hover:bg-gray-200 transition-all duration-300 hover:scale-105">
              Contact with me
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l4 4m0 0l4-4m-4 4v11" />
              </svg>
            </a>
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
            <a
              href="mailto:cle6565@gmail.com"
              className="bg-black text-white px-10 py-4 font-medium hover:bg-gray-900 transition-all duration-300 hover:scale-105"
            >
              Contact with me
            </a>
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