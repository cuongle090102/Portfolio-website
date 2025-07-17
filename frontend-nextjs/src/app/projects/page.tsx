'use client'

import { useState, useEffect, useRef } from 'react';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import BlockRenderer from '@/components/BlockRenderer';
import { apiClient } from '@/lib/api';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    fetchProjects();
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-full px-6 py-3 shadow-lg">
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
            <div className="w-px h-4 bg-gray-300"></div>
            <Link href="/admin" className="text-black hover:text-gray-600 transition-colors text-sm">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-black mb-8 leading-tight">
              Selected Work
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A curated collection of data science projects showcasing expertise in 
              machine learning, analytics, and intelligent automation.
            </p>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-6xl mx-auto px-6 lg:px-8 pb-32">
        {projects.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <CodeBracketIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">No projects yet</h3>
            <p className="text-gray-600 mb-8">Projects will appear here once they are published</p>
            <Link
              href="/admin"
              className="inline-flex items-center bg-black text-white px-8 py-3 font-medium hover:bg-gray-900 transition-colors"
            >
              Add Your First Project
            </Link>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Buttons */}
            {projects.length > 3 && (
              <>
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                </button>
              </>
            )}

            {/* Projects Container */}
            <div 
              ref={scrollContainerRef}
              className={`flex ${projects.length > 3 ? 'overflow-x-auto projects-slider' : 'justify-center'} gap-8 pb-4`}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    projects.length > 3 ? 'min-w-[350px] max-w-[350px]' : 'w-full max-w-[350px]'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  {project.image_url ? (
                    <div className="relative h-96 overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="flex flex-col items-center justify-center h-full text-gray-500">
                              <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <span class="text-sm">Image not available</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  ) : (
                    <div className="relative h-96 overflow-hidden bg-gray-200 flex flex-col items-center justify-center text-gray-500">
                      <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                
                  <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h2>
                    <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                    
                    {project.technologies && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {(typeof project.technologies === 'string' 
                            ? project.technologies.split(',') 
                            : project.technologies
                          ).map((tech, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs rounded-full ${getTechColor(tech.trim(), index)}`}
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                          Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CodeBracketIcon className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 text-center">
                  <h1 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h1>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold ml-4"
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
                            <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
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
                            <div className="w-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                              <img
                                src={mediaItem.url}
                                alt={`${selectedProject.title} - Image ${index + 1}`}
                                className="w-full max-h-96 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.parentElement!.innerHTML = `
                                    <div class="flex flex-col items-center justify-center h-64 text-gray-500">
                                      <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                      <span class="text-sm">Image ${index + 1} not available</span>
                                    </div>
                                  `;
                                }}
                              />
                              {mediaItem.caption && (
                                <p className="text-sm text-gray-600 text-center mt-2 italic">{mediaItem.caption}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                      <img
                        src={selectedProject.image_url}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="flex flex-col items-center justify-center h-full text-gray-500">
                              <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <span class="text-sm">Image not available</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-200 flex flex-col items-center justify-center rounded-lg mb-4 text-gray-500">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-sm">No images</span>
                </div>
              )}
              
              <div className="space-y-4">
                {selectedProject.blocks && selectedProject.blocks.length > 0 ? (
                  <div>
                    <BlockRenderer blocks={selectedProject.blocks} />
                  </div>
                ) : selectedProject.content ? (
                  <div className="prose prose-gray max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                      {selectedProject.content}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No content available</div>
                )}
                
                <div className="flex space-x-3 pt-4">
                  {selectedProject.demo_url && (
                    <a
                      href={selectedProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
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
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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