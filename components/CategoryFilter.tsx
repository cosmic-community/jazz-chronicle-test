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
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Categories:</h3>
        
        {/* Desktop view */}
        <div className="hidden md:flex flex-wrap gap-3">
          <Link
            href="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              !currentCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Posts
          </Link>
          
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                currentCategory === category.slug
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={
                currentCategory === category.slug
                  ? { backgroundColor: category.metadata.color || '#6B7280' }
                  : {}
              }
            >
              {category.metadata.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <span className="mr-2">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <Link
                href="/"
                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                  !currentCategory ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                All Posts
              </Link>
              
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
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
                  {category.metadata.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Category descriptions */}
      {currentCategory && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          {(() => {
            const category = categories.find(c => c.slug === currentCategory)
            if (category?.metadata.description) {
              return (
                <p className="text-gray-600 text-sm">
                  {category.metadata.description}
                </p>
              )
            }
            return null
          })()}
        </div>
      )}
    </div>
  )
}