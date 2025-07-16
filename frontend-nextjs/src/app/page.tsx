'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">My Portfolio</h1>
            </div>
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/projects" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Projects
              </Link>
              <Link href="/favorites" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Favorites
              </Link>
              {isAuthenticated ? (
                <div className="flex space-x-4">
                  <Link href="/admin" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-red-600 px-3 py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/admin" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Welcome to My Portfolio
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
              I'm a passionate developer creating amazing web experiences. 
              Explore my projects and see what I've been working on.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/projects"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View My Projects
              </Link>
              {isAuthenticated ? (
                <Link
                  href="/admin"
                  className="bg-white text-gray-700 px-8 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  href="/admin"
                  className="bg-white text-gray-700 px-8 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">About Me</h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
              I'm a full-stack developer with experience in modern web technologies. 
              I love building applications that solve real-world problems and provide 
              great user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Technologies I Work With</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚛️</span>
                </div>
                <h3 className="font-medium text-gray-900">React</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📗</span>
                </div>
                <h3 className="font-medium text-gray-900">Node.js</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🐍</span>
                </div>
                <h3 className="font-medium text-gray-900">Python</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💾</span>
                </div>
                <h3 className="font-medium text-gray-900">Database</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to work together?</h2>
            <p className="mt-4 text-xl text-blue-100">
              Let's create something amazing together.
            </p>
            <div className="mt-8">
              <Link
                href="/projects"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Explore My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-white font-medium">My Portfolio</h3>
            <p className="mt-2 text-gray-400">Built with Next.js and passion</p>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="/projects" className="text-gray-400 hover:text-white">Projects</Link>
              <Link href="/admin" className="text-gray-400 hover:text-white">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}