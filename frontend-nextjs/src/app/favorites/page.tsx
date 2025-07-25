'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'films' | 'sports'>('films')
  const scrollRefs = useRef<{[key: string]: HTMLDivElement | null}>({})

  useEffect(() => {
    // Add CSS to hide scrollbar
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const scrollTier = (tierId: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[tierId]
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const filmTiers = {
    'S-Tier (Masterpieces)': [
      { 
        title: 'The Shawshank Redemption', 
        year: 1994, 
        genre: 'Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
      },
      { 
        title: 'The Godfather', 
        year: 1972, 
        genre: 'Crime/Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
      },
      { 
        title: 'Pulp Fiction', 
        year: 1994, 
        genre: 'Crime/Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
      },
    ],
    'A-Tier (Excellent)': [
      { 
        title: 'Inception', 
        year: 2010, 
        genre: 'Sci-Fi/Thriller',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
      },
      { 
        title: 'The Dark Knight', 
        year: 2008, 
        genre: 'Action/Crime',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
      },
      { 
        title: 'Interstellar', 
        year: 2014, 
        genre: 'Sci-Fi/Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
      },
    ],
    'B-Tier (Great)': [
      { 
        title: 'Avengers: Endgame', 
        year: 2019, 
        genre: 'Action/Adventure',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'
      },
      { 
        title: 'Spider-Man: Into the Spider-Verse', 
        year: 2018, 
        genre: 'Animation/Action',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg'
      },
      { 
        title: 'Mad Max: Fury Road', 
        year: 2015, 
        genre: 'Action/Adventure',
        poster: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
      },
    ],
    'C-Tier (Good)': [
      { 
        title: 'Fast & Furious 6', 
        year: 2013, 
        genre: 'Action/Thriller',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg'
      },
      { 
        title: 'Transformers', 
        year: 2007, 
        genre: 'Action/Sci-Fi',
        poster: 'https://m.media-amazon.com/images/M/MV5BNDg1NTU2OWEtM2UzYi00ZWRmLWEwMTktZWQzOWYxYjA3MjJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
      },
      { 
        title: 'John Wick', 
        year: 2014, 
        genre: 'Action/Thriller',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg'
      },
    ],
  }

  const sportsTiers = {
    'S-Tier (Legends)': [
      { 
        name: 'Lionel Messi', 
        sport: 'Football', 
        achievement: '8 Ballon d\'Or winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/28003-1671435885.jpg?lm=1'
      },
      { 
        name: 'Lin Dan', 
        sport: 'Badminton', 
        achievement: '2x Olympic Champion',
        photo: 'https://bwfbadminton.com/wp-content/uploads/2019/07/Lin-Dan-1.jpg'
      },
      { 
        name: 'Cristiano Ronaldo', 
        sport: 'Football', 
        achievement: '5 Ballon d\'Or winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1'
      },
    ],
    'A-Tier (Elite)': [
      { 
        name: 'Kylian Mbappé', 
        sport: 'Football', 
        achievement: 'World Cup Winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/342229-1610365618.jpg?lm=1'
      },
      { 
        name: 'Lee Chong Wei', 
        sport: 'Badminton', 
        achievement: '3x Olympic Silver',
        photo: 'https://bwfbadminton.com/wp-content/uploads/2019/06/Lee-Chong-Wei-1.jpg'
      },
      { 
        name: 'Neymar Jr.', 
        sport: 'Football', 
        achievement: 'Champions League Winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/68290-1635334791.jpg?lm=1'
      },
    ],
    'B-Tier (Excellent)': [
      { 
        name: 'Erling Haaland', 
        sport: 'Football', 
        achievement: 'Premier League Top Scorer',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/418560-1671435885.jpg?lm=1'
      },
      { 
        name: 'Viktor Axelsen', 
        sport: 'Badminton', 
        achievement: 'Olympic Champion',
        photo: 'https://bwfbadminton.com/wp-content/uploads/2021/08/Viktor-Axelsen-1.jpg'
      },
      { 
        name: 'Pedri', 
        sport: 'Football', 
        achievement: 'Golden Boy Winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/757656-1668778742.jpg?lm=1'
      },
    ],
    'C-Tier (Very Good)': [
      { 
        name: 'Jamal Musiala', 
        sport: 'Football', 
        achievement: 'Bundesliga Champion',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/580195-1668778742.jpg?lm=1'
      },
      { 
        name: 'Chen Long', 
        sport: 'Badminton', 
        achievement: 'Olympic Champion',
        photo: 'https://bwfbadminton.com/wp-content/uploads/2019/07/Chen-Long-1.jpg'
      },
      { 
        name: 'Gavi', 
        sport: 'Football', 
        achievement: 'La Liga Winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/646478-1668778742.jpg?lm=1'
      },
    ],
  }

  const getTierColor = (tier: string) => {
    if (tier.includes('S-Tier')) return 'bg-black'
    if (tier.includes('A-Tier')) return 'bg-gray-800'
    if (tier.includes('B-Tier')) return 'bg-gray-600'
    if (tier.includes('C-Tier')) return 'bg-gray-400'
    return 'bg-gray-500'
  }

  const getTierTextColor = (tier: string) => {
    if (tier.includes('C-Tier')) return 'text-black'
    return 'text-white'
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
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-black mb-8 leading-tight">
              My Favorites
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Films and sports personalities that inspire me, organized by tiers of excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        <div className="flex justify-center mb-16">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('films')}
              className={`py-3 px-6 font-medium transition-colors ${
                activeTab === 'films'
                  ? 'bg-black text-white'
                  : 'border border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Films
            </button>
            <button
              onClick={() => setActiveTab('sports')}
              className={`py-3 px-6 font-medium transition-colors ${
                activeTab === 'sports'
                  ? 'bg-black text-white'
                  : 'border border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Sports
            </button>
          </div>
        </div>

        {/* Films Tab */}
        {activeTab === 'films' && (
          <div className="space-y-8 pb-16">
            {Object.entries(filmTiers).map(([tier, films]) => {
              const tierId = `films-${tier.replace(/\s+/g, '-').toLowerCase()}`
              const showSlider = films.length > 6
              return (
                <div key={tier} className="bg-white border border-gray-200 overflow-hidden mb-16">
                  <div className={`${getTierColor(tier)} px-6 py-4`}>
                    <h2 className={`text-lg font-bold ${getTierTextColor(tier)} tracking-wide`}>{tier}</h2>
                  </div>
                  <div className="p-6 relative">
                    {showSlider && (
                      <>
                        <button
                          onClick={() => scrollTier(tierId, 'left')}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => scrollTier(tierId, 'right')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </>
                    )}
                    <div 
                      ref={(el) => {
                        scrollRefs.current[tierId] = el;
                      }}
                      className={`${showSlider ? 'flex overflow-x-auto scrollbar-hide' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'} gap-3`}
                      style={showSlider ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
                    >
                      {films.map((film, index) => (
                        <div key={index} className={`bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 ${showSlider ? 'min-w-[120px] max-w-[120px]' : ''}`}>
                          <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                            <img
                              src={film.poster}
                              alt={`${film.title} poster`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                                  <div class="flex flex-col items-center justify-center h-full text-gray-500">
                                    <svg class="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 010-2h4zM6 6v12h12V6H6z"/>
                                    </svg>
                                    <span class="text-xs">No Poster</span>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                          <div className="p-2">
                            <h3 className="font-semibold text-gray-900 mb-1 text-xs line-clamp-2" title={film.title}>{film.title}</h3>
                            <div className="flex justify-between items-center text-xs text-gray-600">
                              <span className="text-xs">{film.year}</span>
                              <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                                {film.genre.split('/')[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Sports Tab */}
        {activeTab === 'sports' && (
          <div className="space-y-8 pb-16">
            {Object.entries(sportsTiers).map(([tier, athletes]) => {
              const tierId = `sports-${tier.replace(/\s+/g, '-').toLowerCase()}`
              const showSlider = athletes.length > 6
              return (
                <div key={tier} className="bg-white border border-gray-200 overflow-hidden mb-16">
                  <div className={`${getTierColor(tier)} px-6 py-4`}>
                    <h2 className={`text-lg font-bold ${getTierTextColor(tier)} tracking-wide`}>{tier}</h2>
                  </div>
                  <div className="p-6 relative">
                    {showSlider && (
                      <>
                        <button
                          onClick={() => scrollTier(tierId, 'left')}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => scrollTier(tierId, 'right')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                        </button>
                      </>
                    )}
                    <div 
                      ref={(el) => {
                        scrollRefs.current[tierId] = el;
                      }}
                      className={`${showSlider ? 'flex overflow-x-auto scrollbar-hide' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'} gap-3`}
                      style={showSlider ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
                    >
                      {athletes.map((athlete, index) => (
                        <div key={index} className={`bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 ${showSlider ? 'min-w-[120px] max-w-[120px]' : ''}`}>
                          <div className="aspect-square bg-gray-200 flex items-center justify-center">
                            <img
                              src={athlete.photo}
                              alt={`${athlete.name} photo`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                                  <div class="flex flex-col items-center justify-center h-full text-gray-500">
                                    <svg class="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    <span class="text-xs">No Photo</span>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                          <div className="p-2">
                            <h3 className="font-semibold text-gray-900 mb-1 text-xs line-clamp-1" title={athlete.name}>{athlete.name}</h3>
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex justify-start">
                                <span className={`px-1 py-0.5 rounded text-xs ${
                                  athlete.sport === 'Football' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {athlete.sport}
                                </span>
                              </div>
                              <div>
                                <p className="text-xs text-gray-700 line-clamp-2" title={athlete.achievement}>{athlete.achievement}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}