'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Category {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description?: string
    color?: string
  }
}

interface CategoryFilterProps {
  categories: Category[]
  currentCategory?: string
}

export default function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-jazz-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
            Browse by Category
          </h3>
          
          {/* Desktop view */}
          <div className="hidden md:flex flex-wrap gap-3">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !currentCategory
                  ? 'bg-gradient-to-r from-jazz-blue to-jazz-teal text-white shadow-sm'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Posts
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  currentCategory === category.slug
                    ? 'text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                style={
                  currentCategory === category.slug
                    ? { backgroundColor: category.metadata.color || '#6B7280' }
                    : {}
                }
              >
                <span className="flex items-center">
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: category.metadata.color || '#6B7280' }}
                  />
                  {category.metadata.name}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Mobile dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ 
                    backgroundColor: currentCategory 
                      ? categories.find(c => c.slug === currentCategory)?.metadata.color || '#6B7280'
                      : '#6B7280'
                  }}
                />
                {currentCategory 
                  ? categories.find(c => c.slug === currentCategory)?.metadata.name || 'All Posts'
                  : 'All Posts'
                }
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                <Link
                  href="/"
                  className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                    !currentCategory ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-3 bg-gray-400" />
                    All Posts
                  </span>
                </Link>
                
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className={`block px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                      currentCategory === category.slug
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                    style={
                      currentCategory === category.slug
                        ? { backgroundColor: category.metadata.color || '#6B7280' }
                        : {}
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: category.metadata.color || '#6B7280' }}
                      />
                      {category.metadata.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Category description */}
        {currentCategory && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            {(() => {
              const category = categories.find(c => c.slug === currentCategory)
              if (category?.metadata.description) {
                return (
                  <p className="text-gray-700 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2 text-jazz-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {category.metadata.description}
                  </p>
                )
              }
              return null
            })()}
          </div>
        )}
      </div>
    </div>
  )
}