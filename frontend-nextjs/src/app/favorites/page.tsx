'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { apiClient } from '@/lib/api'

interface Film {
  title: string
  year: number
  genre: string
  poster: string
}

interface Athlete {
  name: string
  sport: string
  achievement: string
  photo: string
}

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'films' | 'sports'>('films')
  const [selectedTier, setSelectedTier] = useState<string>('S-Tier (Masterpieces)')
  const [selectedSportsTier, setSelectedSportsTier] = useState<string>('S-Tier (Legends)')
  const [filmTiers, setFilmTiers] = useState<Record<string, Film[]>>({})
  const [athleteTiers, setAthleteTiers] = useState<Record<string, Athlete[]>>({})
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const loadFilmTiers = () => {
      setFilmTiers({
    'S-Tier (Masterpieces)': [
      { 
        title: 'Oldboy', 
        year: 2003, 
        genre: 'Thriller/Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg'
      },
      { 
        title: 'Eternal Sunshine of the Spotless Mind', 
        year: 2004, 
        genre: 'Romance/Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg'
      },
      { 
        title: 'Mother', 
        year: 2009, 
        genre: 'Mystery/Crime',
        poster: 'https://m.media-amazon.com/images/I/91Cuue1duOL._SL1500_.jpg'
      },
      { 
        title: 'Mouse', 
        year: 2021, 
        genre: 'Thriller/Crime',
        poster: 'https://m.media-amazon.com/images/I/51pL4ROwmgS._SX300_SY300_QL70_FMwebp_.jpg'
      },
      { 
        title: 'Inception', 
        year: 2010, 
        genre: 'Sci-Fi/Thriller',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
      },
      { 
        title: 'Spirited Away', 
        year: 2001, 
        genre: 'Animation/Adventure',
        poster: 'https://m.media-amazon.com/images/I/712aNdEk6-L._SY679_.jpg'
      },
    ],
    'A-Tier (Excellent)': [
      { 
        title: 'Bin-jip', 
        year: 2004, 
        genre: 'Drama/Romance',
        poster: 'https://m.media-amazon.com/images/I/71pmAwGSg-L._SL1200_.jpg'
      },
      { 
        title: 'Parasite', 
        year: 2019, 
        genre: 'Thriller/Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
      },
      { 
        title: 'Memento', 
        year: 2000, 
        genre: 'Thriller/Mystery',
        poster: 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
      },
      { 
        title: 'Avengers: Endgame', 
        year: 2019, 
        genre: 'Action/Adventure',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'
      },
      { 
        title: 'How to Make Millions Before Grandma Dies', 
        year: 2024, 
        genre: 'Family/Drama',
        poster: 'https://m.media-amazon.com/images/I/71ZIFQYfO2L._SL1499_.jpg'
      },
      { 
        title: 'Forgotten', 
        year: 2017, 
        genre: 'Thriller/Mystery',
        poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTurFDPPf2q7Cp5b7UYpnITBICrLGoKMIuBVrJfJnkU8SWwjuJp'
      },
    ],
    'B-Tier (Great)': [
      { 
        title: 'Princess Mononoke', 
        year: 1997, 
        genre: 'Animation/Adventure',
        poster: 'https://m.media-amazon.com/images/M/MV5BNGIzY2IzODQtNThmMi00ZDE4LWI5YzAtNzNlZTM1ZjYyYjUyXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_SX300.jpg'
      },
      { 
        title: 'Memories of Murder', 
        year: 2003, 
        genre: 'Crime/Drama',
        poster: 'https://m.media-amazon.com/images/I/81R9AcrUi9L._SX385_.jpg'
      },
      { 
        title: 'Train to Busan', 
        year: 2016, 
        genre: 'Horror/Action',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTkwOTQ4OTg0OV5BMl5BanBnXkFtZTgwMzQyOTM0OTE@._V1_SX300.jpg'
      },
      { 
        title: 'Before Sunrise', 
        year: 1995, 
        genre: 'Drama/Romance',
        poster: 'https://m.media-amazon.com/images/M/MV5BZDdiZTAwYzAtMDI3Ni00OTRjLTkzN2UtMGE3MDMyZmU4NTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
      },
      { 
        title: 'Our Beloved Summer', 
        year: 2021, 
        genre: 'Romance/Drama',
        poster: 'https://m.media-amazon.com/images/I/51-JUE2EDkL._SX300_SY300_QL70_FMwebp_.jpg'
      },
    ],
    'C-Tier (Good)': [
      { 
        title: 'The Chaser', 
        year: 2008, 
        genre: 'Thriller/Crime',
        poster: 'https://upload.wikimedia.org/wikipedia/vi/8/8a/%C3%81p_ph%C3%ADch_phim_K%E1%BA%BB_%C4%91i_s%C4%83n.jpg'
      },
      { 
        title: 'I Saw the Devil', 
        year: 2010, 
        genre: 'Thriller/Horror',
        poster: 'https://upload.wikimedia.org/wikipedia/en/9/91/I_Saw_the_Devil_film_poster.jpg'
      },
      { 
        title: 'Silence', 
        year: 2016, 
        genre: 'Social/Drama',
        poster: 'https://upload.wikimedia.org/wikipedia/en/7/7c/The_Crucible-poster.jpg'
      },
      { 
        title: 'Anatomy of a Fall', 
        year: 2023, 
        genre: 'Drama/Crime',
        poster: 'https://upload.wikimedia.org/wikipedia/en/8/88/Anatomy_of_a_Fall_%282023%29_film_poster.jpg'
      },
    ],
    'D-Tier (Decent)': [
      { 
        title: 'Microhabitat', 
        year: 2018, 
        genre: 'Romance/Comedy',
        poster: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Microhabitat_poster.jpg'
      },
      { 
        title: 'Love & Other Drugs', 
        year: 2010, 
        genre: 'Drama/Romance',
        poster: 'https://upload.wikimedia.org/wikipedia/en/4/43/Love_%26_Other_Drugs_Poster.jpg'
      },
      { 
        title: 'Mr. Bean\'s Holiday', 
        year: 2007, 
        genre: 'Comedy/Family',
        poster: 'https://upload.wikimedia.org/wikipedia/en/8/87/Mr_beans_holiday_ver7.jpg'
      },
      { 
        title: 'Life of Pi', 
        year: 2012, 
        genre: 'Adventure/Drama',
        poster: 'https://m.media-amazon.com/images/M/MV5BNTg2OTY2ODg5OF5BMl5BanBnXkFtZTcwODM5MTYxOA@@._V1_SX300.jpg'
      },
    ],
      })
    }

    const loadSportsTiers = () => {
      setAthleteTiers({
    'S-Tier (Legends)': [
      { 
        name: 'Lionel Messi', 
        sport: 'Football', 
        achievement: '8 Ballon d\'Or winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/28003-1671435885.jpg?lm=1'
      },
      { 
        name: 'Lee Chong Wei', 
        sport: 'Badminton', 
        achievement: '3x Olympic Silver',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1604895100/assets/players/thumbnail/50152.png'
      },
      { 
        name: 'Cristiano Ronaldo', 
        sport: 'Football', 
        achievement: '5 Ballon d\'Or winner',
        photo: 'https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1'
      },
      { 
        name: 'Lin Dan', 
        sport: 'Badminton', 
        achievement: '2x Olympic Champion',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1604895106/assets/players/thumbnail/50906.png'
      },
    ],
    'A-Tier (Elite)': [
      { 
        name: 'Nguyen Tien Minh', 
        sport: 'Badminton', 
        achievement: 'SEA Games Champion',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1604896891/assets/players/thumbnail/14107.png'
      },
      { 
        name: 'Neymar Jr.', 
        sport: 'Football', 
        achievement: 'Champions League Winner',
        photo: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRry02aJ6e3ChWpxpEk4kEjROP2LUyKtB8FhBdMLFlJOZWS_6MkAJLA90HnAfXe8w29WvfsbRu81O05L0aK4kW-fpcpwVpjIkWWeofD5KWdLA'
      },
      { 
        name: 'An Se Young', 
        sport: 'Badminton', 
        achievement: 'World Champion',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1748582728/assets/players/thumbnail/87442.png'
      },
      { 
        name: 'Akane Yamaguchi', 
        sport: 'Badminton', 
        achievement: 'World Championship Medalist',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1748583585/assets/players/thumbnail/96312.png'
      },
    ],
    'B-Tier (Excellent)': [
      { 
        name: 'Kevin De Bruyne', 
        sport: 'Football', 
        achievement: 'Premier League Champion',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kevin_De_Bruyne_201807092.jpg/500px-Kevin_De_Bruyne_201807092.jpg'
      },
      { 
        name: 'Robin van Persie', 
        sport: 'Football', 
        achievement: 'Premier League Winner',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazRnXdYMAE5LqiYs5TUpy3S_23P0jNm2AON2YFeNq5dDFl2LapfcA-TDJ_lTYJeP2DS5rXuml7GeBt70EHHa3vi4ksl33ZO1mviJ3AOc'
      },
      { 
        name: 'Kento Momota', 
        sport: 'Badminton', 
        achievement: 'Former World No. 1',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1658823118/assets/players/thumbnail/89785.png'
      },
      { 
        name: 'Anthony Ginting', 
        sport: 'Badminton', 
        achievement: 'Asian Games Champion',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1689644313/assets/players/thumbnail/95661.png'
      },
    ],
    'C-Tier (Very Good)': [
      { 
        name: 'Lee Zii Jia', 
        sport: 'Badminton', 
        achievement: 'All England Champion',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1616738532/assets/players/thumbnail/81561.png'
      },
      { 
        name: 'Chou Tien Chen', 
        sport: 'Badminton', 
        achievement: 'Olympic Medalist',
        photo: 'https://img.bwfbadminton.com/image/upload/t_96_player_profile/v1658715713/assets/players/thumbnail/34810.png'
      },
      { 
        name: 'Toni Kroos', 
        sport: 'Football', 
        achievement: 'World Cup Winner',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Toni_Kroos_Real_Madrid_2021.jpg/500px-Toni_Kroos_Real_Madrid_2021.jpg'
      },
      { 
        name: 'Wayne Rooney', 
        sport: 'Football', 
        achievement: 'Manchester United Legend',
        photo: 'data:image/jpeg;base64,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'
      },
    ],
      })
    }

    loadFilmTiers()
    loadSportsTiers()
    setLoading(false)
  }, [])

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
          <div className="relative">
            {/* Sidebar */}
            <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-1 rounded-full shadow-lg">
                <div className="flex flex-col space-y-0">
                  {Object.keys(filmTiers).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`w-10 h-10 text-center rounded-full text-sm font-bold transition-all duration-200 ${
                        selectedTier === tier
                          ? 'bg-black text-white shadow-md scale-110'
                          : 'hover:bg-gray-100 text-gray-700 hover:scale-105'
                      }`}
                      title={tier}
                    >
                      {tier.split('-')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {selectedTier && filmTiers[selectedTier] && (
                <div className="bg-white border border-gray-200 overflow-hidden">
                  <div className={`${getTierColor(selectedTier)} px-6 py-4`}>
                    <h2 className={`text-2xl font-bold ${getTierTextColor(selectedTier)} tracking-wide`}>{selectedTier}</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {filmTiers[selectedTier].map((film, index) => (
                        <div key={index} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
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
                          <div className="p-3">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2" title={film.title}>{film.title}</h3>
                            <div className="flex justify-between items-center text-xs text-gray-600">
                              <span className="text-xs">{film.year}</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {film.genre.split('/')[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sports Tab */}
        {activeTab === 'sports' && (
          <div className="relative">
            {/* Sidebar */}
            <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-1 rounded-full shadow-lg">
                <div className="flex flex-col space-y-0">
                  {Object.keys(athleteTiers).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedSportsTier(tier)}
                      className={`w-10 h-10 text-center rounded-full text-sm font-bold transition-all duration-200 ${
                        selectedSportsTier === tier
                          ? 'bg-black text-white shadow-md scale-110'
                          : 'hover:bg-gray-100 text-gray-700 hover:scale-105'
                      }`}
                      title={tier}
                    >
                      {tier.split('-')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {selectedSportsTier && athleteTiers[selectedSportsTier] && (
                <div className="bg-white border border-gray-200 overflow-hidden">
                  <div className={`${getTierColor(selectedSportsTier)} px-6 py-4`}>
                    <h2 className={`text-2xl font-bold ${getTierTextColor(selectedSportsTier)} tracking-wide`}>{selectedSportsTier}</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {athleteTiers[selectedSportsTier].map((athlete, index) => (
                        <div key={index} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
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
                          <div className="p-3">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-1" title={athlete.name}>{athlete.name}</h3>
                            <div className="space-y-2 text-xs text-gray-600">
                              <div className="flex justify-start">
                                <span className={`px-2 py-1 rounded text-xs ${
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}