// contexts/SearchContext.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Zap, Cpu, Smartphone, BookOpen, Clock } from 'lucide-react';
import { SearchContext, useSearch } from '../hooks/useSearch';

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Move this to a separate file in production to avoid Fast Refresh issues
  const searchData = [
    {
      id: 'device-1',
      name: 'Samsung Galaxy S24 Ultra',
      category: 'smartphones',
      brand: 'Samsung',
      description: 'Latest flagship smartphone with advanced AI features, exceptional camera system, and S Pen functionality',
      price: '$974',
      originalPrice: '$1299',
      features: ['AI Camera', 'S Pen', '200MP Camera', '5G', 'Wireless Charging'],
      inStock: true,
      type: 'device',
      source: 'OurDevices'
    },
    {
      id: 'device-2',
      name: 'iPhone 15 Pro Max',
      category: 'smartphones',
      brand: 'Apple',
      description: 'Premium iPhone with titanium design, A17 Pro chip, and professional camera system',
      price: '$1199',
      features: ['A17 Pro Chip', 'Titanium Design', 'Pro Camera', 'Action Button'],
      inStock: true,
      type: 'device',
      source: 'OurDevices'
    },
    {
      id: 'device-3',
      name: 'MacBook Pro M3',
      category: 'laptops',
      brand: 'Apple',
      description: 'Professional laptop with M3 chip for creators and developers',
      price: '$1599',
      features: ['M3 Chip', 'Liquid Retina Display', '18-hour battery', 'Thunderbolt'],
      inStock: false,
      type: 'device',
      source: 'OurDevices'
    },
    {
      id: 'learn-1',
      title: 'Introduction to Electronics',
      category: 'basics',
      level: 'beginner',
      description: 'Learn the fundamental concepts of electronics including voltage, current, and resistance',
      duration: '2 hours',
      topics: ['Ohms Law', 'Basic Components', 'Circuit Analysis'],
      type: 'learning',
      source: 'LearnElectronics'
    },
    {
      id: 'learn-2',
      title: 'Arduino Programming Basics',
      category: 'programming',
      level: 'beginner',
      description: 'Get started with Arduino programming and create your first projects',
      duration: '3 hours',
      topics: ['Arduino IDE', 'C++ Basics', 'Digital I/O', 'Sensors'],
      type: 'learning',
      source: 'LearnElectronics'
    },
    {
      id: 'learn-3',
      title: 'PCB Design with KiCad',
      category: 'design',
      level: 'intermediate',
      description: 'Master PCB design using KiCad software for professional circuits',
      duration: '4 hours',
      topics: ['Schematic Design', 'PCB Layout', 'Design Rules', 'Manufacturing'],
      type: 'learning',
      source: 'LearnElectronics'
    }
  ];
  

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const terms = lowerQuery.split(' ').filter(term => term.length > 0);

      const results = searchData
        .map(item => {
          let score = 0;
          const searchableText = [
            item.name || item.title,
            item.description,
            item.category,
            item.brand || '',
            item.level || '',
            ...(item.features || []),
            ...(item.topics || [])
          ].join(' ').toLowerCase();

          terms.forEach(term => {
            if ((item.name || item.title).toLowerCase().includes(term)) score += 10;
            if (item.category.toLowerCase().includes(term)) score += 8;
            if (item.description.toLowerCase().includes(term)) score += 5;
            if (searchableText.includes(term)) score += 3;
          });

          return score > 0 ? { ...item, relevanceScore: score } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 8);

      setSearchResults(results);
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 200);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
    setSelectedIndex(-1);
  };

  const value = {
    searchQuery,
    searchResults,
    isSearchOpen,
    isLoading,
    selectedIndex,
    setSearchQuery,
    setSearchResults,
    setIsSearchOpen,
    setSelectedIndex,
    handleSearch,
    clearSearch,
    performSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Search Modal Component
export const SearchModal = () => {
  const {
    searchQuery,
    searchResults,
    isSearchOpen,
    isLoading,
    selectedIndex,
    setIsSearchOpen,
    handleSearch,
    clearSearch,
    setSelectedIndex
  } = useSearch();

  const inputRef = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSearchOpen) return;

      if (e.key === 'Escape') {
        clearSearch();
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      }
      
      if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const selectedResult = searchResults[selectedIndex];
        handleResultClick(selectedResult);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex, clearSearch, setSelectedIndex, handleResultClick]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [setIsSearchOpen]);

  // Auto focus input
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleResultClick = React.useCallback((result) => {
    console.log('Navigate to:', result);
    // Add your navigation logic here
    clearSearch();
  }, [clearSearch]);

  const getResultIcon = (result) => {
    if (result.type === 'device') {
      if (result.category === 'smartphones') return <Smartphone className="w-5 h-5 text-blue-400" />;
      if (result.category === 'laptops') return <Cpu className="w-5 h-5 text-green-400" />;
      return <Zap className="w-5 h-5 text-blue-400" />;
    }
    return <BookOpen className="w-5 h-5 text-purple-400" />;
  };

  const getSourceBadge = (source) => {
    const badges = {
      'OurDevices': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'LearnElectronics': 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    };
    return badges[source] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 mt-20">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          
          {/* Search Header */}
          <div className="relative p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search devices and learning content..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg outline-none"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            
            {/* Search Tips */}
            {!searchQuery && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Try:</span>
                <button
                  onClick={() => handleSearch('Samsung')}
                  className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full hover:bg-blue-500/30 transition-colors"
                >
                  Samsung
                </button>
                <button
                  onClick={() => handleSearch('Arduino')}
                  className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full hover:bg-purple-500/30 transition-colors"
                >
                  Arduino
                </button>
                <button
                  onClick={() => handleSearch('programming')}
                  className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full hover:bg-green-500/30 transition-colors"
                >
                  programming
                </button>
              </div>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center gap-2 text-gray-400">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              </div>
            ) : searchQuery && searchResults.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm mt-1">Try different keywords or browse our categories</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="p-2">
                {searchResults.map((result, index) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className={`p-3 m-2 rounded-xl transition-all duration-200 cursor-pointer border group ${
                      selectedIndex === index
                        ? 'bg-white/10 border-blue-500/50'
                        : 'border-transparent hover:border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/15 transition-colors">
                        {getResultIcon(result)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold truncate">
                            {result.name || result.title}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getSourceBadge(result.source)}`}>
                            {result.source}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          {result.price && (
                            <span className="flex items-center gap-1 text-green-400">
                              <Zap className="w-3 h-3" />
                              {result.price}
                            </span>
                          )}
                          {result.level && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {result.level}
                            </span>
                          )}
                          <span className="capitalize">{result.category}</span>
                        </div>
                      </div>
                      
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          {searchQuery && (
            <div className="px-4 py-3 border-t border-white/10 bg-white/5">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Press ESC to close • ↑↓ to navigate • Enter to select</span>
                <span>{searchResults.length} results found</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Search Button Component for Navbar
export const SearchButton = () => {
  const { setIsSearchOpen } = useSearch();

  return (
    <button
      onClick={() => setIsSearchOpen(true)}
      className="relative group p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
      aria-label="Search"
    >
      <Search className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      
      {/* Keyboard shortcut hint */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className="bg-black/90 text-white text-xs px-2 py-1 rounded border border-white/20 whitespace-nowrap">
          ⌘K
        </div>
      </div>
    </button>
  );
};