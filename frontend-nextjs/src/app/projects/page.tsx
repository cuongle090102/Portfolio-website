'use client'

import { useState, useEffect, useRef } from 'react';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import BlockRenderer from '@/components/BlockRenderer';
import { apiClient } from '@/lib/api';

// Adaptive Image Component
interface AdaptiveImageProps {
  src: string;
  alt: string;
  className?: string;
  maxHeight?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

function AdaptiveImage({ src, alt, className = '', maxHeight = '80vh', onError }: AdaptiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[200px] text-gray-500 bg-gray-100 rounded-lg ${className}`}>
        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span className="text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mb-2"></div>
          <span className="text-sm text-gray-600">Loading image...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto object-contain bg-gray-100 rounded-lg transition-all duration-500 ${isLoading ? 'hidden' : 'block'} ${className}`}
        style={{ maxHeight }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

interface Block {
  id: string;
  type: 'text' | 'heading' | 'subheading' | 'image' | 'video';
  content: string;
  metadata?: any;
}

interface Project {
  id: number;
  title: string;
  description: string;
  content?: string;
  blocks?: Block[];
  technologies?: string;
  demo_url?: string;
  github_url?: string;
  image_url?: string;
  status: string;
  media?: Array<{
    type: string;
    url: string;
    caption: string;
  }>;
}

// Helper function to convert YouTube URLs to embeddable format
const getEmbedUrl = (url: string): string => {
  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

// Helper function to get a color for each technology
const getTechColor = (tech: string, index: number): string => {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-indigo-100 text-indigo-800',
    'bg-pink-100 text-pink-800',
    'bg-gray-100 text-gray-800',
    'bg-orange-100 text-orange-800',
    'bg-teal-100 text-teal-800',
    'bg-cyan-100 text-cyan-800',
    'bg-lime-100 text-lime-800',
    'bg-emerald-100 text-emerald-800',
    'bg-violet-100 text-violet-800',
    'bg-fuchsia-100 text-fuchsia-800',
    'bg-rose-100 text-rose-800',
    'bg-sky-100 text-sky-800',
    'bg-amber-100 text-amber-800',
    'bg-slate-100 text-slate-800',
    'bg-zinc-100 text-zinc-800'
  ];
  
  // Use a simple hash function to assign consistent colors based on tech name
  let hash = 0;
  for (let i = 0; i < tech.length; i++) {
    hash = ((hash << 5) - hash + tech.charCodeAt(i)) & 0xffffffff;
  }
  
  return colors[Math.abs(hash) % colors.length];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState({
    projects: false
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    fetchProjects();
  }, []);

  // Preload project images for faster switching
  useEffect(() => {
    if (projects.length > 0) {
      projects.forEach(project => {
        if (project.image_url) {
          const img = new Image();
          img.src = project.image_url;
        }
      });
    }
  }, [projects]);

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

    // Set projects as visible immediately
    setIsVisible(prev => ({ ...prev, projects: true }));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    // Add CSS to hide scrollbar
    const style = document.createElement('style');
    style.textContent = `
      .projects-slider::-webkit-scrollbar {
        display: none;
      }
      .projects-slider {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProjects();
      const publishedProjects = response.data.filter((project: Project) => 
        project.status === 'published' || project.status === 'completed'
      );
      setProjects(publishedProjects);
      // Set the first project as the initial preview
      if (publishedProjects.length > 0) {
        setPreviewProject(publishedProjects[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000305] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black page-transition">
      {/* Header Name */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          CUONG LE
        </h1>
      </div>

      {/* 3-Section Layout */}
      <main className="h-screen flex" data-section="projects">
        {projects.length === 0 ? (
          <div className="w-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <CodeBracketIcon className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No projects yet</h3>
              <p className="text-gray-600 mb-8">Projects will appear here once they are published</p>
              <Link
                href="/admin"
                className="inline-flex items-center bg-gray-900 text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                Add Your First Project
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Section 1: Selected Work List */}
            <div className="w-1/4 flex flex-col pl-6">
              <div className="flex-1 flex items-center justify-center">
                <div className="space-y-1">
                  <h2 className="text-xs md:text-sm font-medium text-gray-600 mb-2">
                    Selected work ({projects.length})
                  </h2>
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="cursor-pointer group transition-all duration-300"
                    onMouseEnter={() => setPreviewProject(project)}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative">
                      <h3 className={`text-xs md:text-sm font-medium transition-all duration-300 leading-tight ${
                        previewProject?.id === project.id 
                          ? 'text-gray-900' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <div className={`h-px bg-gray-900 transition-all duration-300 ${
                        previewProject?.id === project.id 
                          ? 'w-full' 
                          : 'w-0'
                      }`}></div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* Section 2: Project Display */}
            <div className="w-1/2 flex flex-col items-center justify-center pt-20">
              <div className="relative w-full min-h-[300px] bg-gray-100 border border-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                {previewProject ? (
                  previewProject.image_url ? (
                    <img
                      key={previewProject.id}
                      src={previewProject.image_url}
                      alt={previewProject.title}
                      className="w-full h-auto max-h-[70vh] object-contain transition-all duration-500 ease-out rounded-lg"
                      style={{ 
                        minHeight: '300px',
                        backgroundColor: '#f9fafb'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `
                            <div class="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-600">
                              <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <span class="text-lg">${previewProject.title}</span>
                              <span class="text-sm">Image not available</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-600">
                      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-lg">{previewProject.title}</span>
                      <span className="text-sm">No preview available</span>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-600">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span className="text-lg">Hover over a project title to preview</span>
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              {previewProject && (
                <div className="mt-6 space-y-4 text-center max-w-3xl">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {previewProject.description}
                  </p>
                  
                  {previewProject.technologies && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(typeof previewProject.technologies === 'string' 
                        ? previewProject.technologies.split(',') 
                        : previewProject.technologies
                      ).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-3 justify-center">
                    {previewProject.demo_url && (
                      <a
                        href={previewProject.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors duration-300"
                      >
                        <ArrowTopRightOnSquareIcon className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    )}
                    {previewProject.github_url && (
                      <a
                        href={previewProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-gray-900 text-gray-900 text-xs font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
                      >
                        <CodeBracketIcon className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Vertical Navigation */}
            <div className="w-1/4 flex flex-col pr-6">
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col space-y-6">
                  <Link 
                    href="/" 
                    className="text-gray-900 text-sm md:text-base font-medium hover:text-gray-600 transition-colors duration-300"
                  >
                    Index
                  </Link>
                <Link 
                  href="/projects" 
                  className="text-gray-900 text-sm md:text-base font-medium hover:text-gray-600 transition-colors duration-300 relative"
                >
                  Work
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
                </Link>
                <Link 
                  href="/favorites" 
                  className="text-gray-900 text-sm md:text-base font-medium hover:text-gray-600 transition-colors duration-300"
                >
                  Favorites
                </Link>
                <Link 
                  href="/admin" 
                  className="text-gray-900 text-sm md:text-base font-medium hover:text-gray-600 transition-colors duration-300"
                >
                  Admin
                </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative top-4 md:top-20 mx-auto p-6 lg:p-8 border border-gray-300 w-full md:w-11/12 lg:w-5/6 xl:w-4/5 2xl:w-3/4 h-full md:h-auto shadow-2xl bg-white text-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-xl md:text-3xl font-bold text-gray-900">{selectedProject.title}</h1>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-600 hover:text-gray-900 text-2xl md:text-3xl font-light ml-4 transition-colors duration-300"
                >
                  ×
                </button>
              </div>
              
              {/* Project Images Gallery */}
              {selectedProject.image_url || (selectedProject as any).media?.length > 0 ? (
                <div className="mb-6">
                  {(selectedProject as any).media?.length > 0 ? (
                    <div className="space-y-6">
                      {(selectedProject as any).media.map((mediaItem: any, index: number) => (
                        <div key={index} className="w-full">
                          {mediaItem.type === 'video' ? (
                            <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                              {mediaItem.url.includes('youtube.com') || mediaItem.url.includes('youtu.be') || mediaItem.url.includes('vimeo.com') ? (
                                <iframe
                                  src={getEmbedUrl(mediaItem.url)}
                                  title={`${selectedProject.title} - Video ${index + 1}`}
                                  className="w-full h-64 md:h-96"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <video
                                  controls
                                  className="w-full max-h-96"
                                  onError={(e) => {
                                    const target = e.target as HTMLVideoElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = `
                                      <div class="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                        </svg>
                                        <span class="text-sm">Video ${index + 1} not available</span>
                                      </div>
                                    `;
                                  }}
                                >
                                  <source src={mediaItem.url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                              {mediaItem.caption && (
                                <p className="text-sm text-gray-600 text-center mt-2 italic px-4 pb-2">{mediaItem.caption}</p>
                              )}
                            </div>
                          ) : (
                            <div className="w-full">
                              <div className="w-full flex justify-center rounded-lg overflow-hidden relative">
                                <img
                                  src={mediaItem.url}
                                  alt={`${selectedProject.title} - Image ${index + 1}`}
                                  className="h-auto object-contain max-h-[80vh] max-w-full rounded-lg"
                                  style={{ 
                                    minHeight: '200px',
                                    backgroundColor: 'transparent'
                                  }}
                                  loading="lazy"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    console.log('Modal image failed to load:', mediaItem.url);
                                    target.style.display = 'none';
                                    if (target.parentElement) {
                                      target.parentElement.innerHTML = `
                                        <div class="flex flex-col items-center justify-center h-64 text-gray-500 bg-white border border-gray-200 rounded-lg">
                                          <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                          </svg>
                                          <span class="text-sm">Image ${index + 1} not available</span>
                                          <span class="text-xs text-gray-400 mt-1">Check console for details</span>
                                        </div>
                                      `;
                                    }
                                  }}
                                />
                              </div>
                              {mediaItem.caption && (
                                <p className="text-sm text-gray-600 text-center mt-2 italic px-4">{mediaItem.caption}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full flex justify-center rounded-lg overflow-hidden relative">
                      <img
                        src={selectedProject.image_url}
                        alt={selectedProject.title}
                        className="h-auto object-contain max-h-[80vh] max-w-full rounded-lg"
                        style={{ 
                          minHeight: '200px',
                          backgroundColor: 'transparent'
                        }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.log('Project modal image failed to load:', selectedProject.image_url);
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `
                              <div class="flex flex-col items-center justify-center h-64 text-gray-500 bg-white border border-gray-200 rounded-lg">
                                <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span class="text-sm">Image not available</span>
                                <span class="text-xs text-gray-400 mt-1">Check console for details</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center rounded-lg mb-4 text-gray-500">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm">No images</span>
                </div>
              )}
              
              <div className="space-y-6">
                {selectedProject.blocks && selectedProject.blocks.length > 0 ? (
                  <div className="text-gray-900">
                    <BlockRenderer blocks={selectedProject.blocks} />
                  </div>
                ) : selectedProject.content ? (
                  <div className="prose max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                      {selectedProject.content}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-600 italic">No content available</div>
                )}
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  {selectedProject.demo_url && (
                    <a
                      href={selectedProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                      View Demo
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300"
                    >
                      <CodeBracketIcon className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}