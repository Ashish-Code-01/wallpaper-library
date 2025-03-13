import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

import WallpaperCard from '../components/WallpaperCard';
import { dummyWallpapers, dummyCategories } from '../utils/dummyData';

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 300px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border-radius: 50px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.lightText};
`;

const FiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-right: 2rem;
  }
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterSelect = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  min-width: 150px;
  background-color: white;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(108, 99, 255, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.9rem;
  
  svg {
    margin-left: 0.5rem;
    cursor: pointer;
    transition: color ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ClearFilters = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const WallpaperGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: ${({ active, theme }) => active ? theme.colors.primary : 'white'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text};
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ active, theme }) => active ? 'white' : theme.colors.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 1.1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

function Categories() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [wallpapers, setWallpapers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useDummyData, setUseDummyData] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || '');
  const [sortBy, setSortBy] = useState(queryParams.get('sort') || 'newest');
  
  useEffect(() => {
    // Update URL with current filters
    const params = new URLSearchParams();
    if (currentPage > 1) params.set('page', currentPage);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchTerm) params.set('search', searchTerm);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(newUrl, { replace: true });
    
    // Fetch wallpapers with filters
    fetchWallpapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory, sortBy]);
  
  useEffect(() => {
    // Fetch categories for filter dropdown
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Use dummy categories if API fails
        setCategories(dummyCategories);
        setUseDummyData(true);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Update category from URL params
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);
  
  const fetchWallpapers = async () => {
    try {
      setLoading(true);
      
      // If we're already using dummy data, filter it client-side
      if (useDummyData) {
        let filteredWallpapers = [...dummyWallpapers];
        
        // Apply category filter
        if (selectedCategory && selectedCategory !== 'all') {
          filteredWallpapers = filteredWallpapers.filter(
            wallpaper => wallpaper.category === selectedCategory
          );
        }
        
        // Apply search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredWallpapers = filteredWallpapers.filter(
            wallpaper => 
              wallpaper.title.toLowerCase().includes(searchLower) ||
              wallpaper.description.toLowerCase().includes(searchLower) ||
              wallpaper.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }
        
        // Apply sorting
        if (sortBy === 'newest') {
          filteredWallpapers.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        } else if (sortBy === 'oldest') {
          filteredWallpapers.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));
        } else if (sortBy === 'downloads') {
          filteredWallpapers.sort((a, b) => b.downloads - a.downloads);
        } else if (sortBy === 'alphabetical') {
          filteredWallpapers.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        // Apply pagination
        const itemsPerPage = 12;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedWallpapers = filteredWallpapers.slice(startIndex, startIndex + itemsPerPage);
        
        setWallpapers(paginatedWallpapers);
        setTotalPages(Math.ceil(filteredWallpapers.length / itemsPerPage));
        setLoading(false);
        return;
      }
      
      // Otherwise, fetch from API
      let url = `/wallpapers?page=${currentPage}&limit=12`;
      
      if (selectedCategory && selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }
      
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }
      
      if (sortBy) {
        url += `&sort=${sortBy}`;
      }
      
      const res = await axios.get(url);
      
      setWallpapers(res.data.wallpapers);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching wallpapers:', err);
      
      // Use dummy data if API fails
      setUseDummyData(true);
      
      // Filter dummy data based on current filters
      let filteredWallpapers = [...dummyWallpapers];
      
      if (selectedCategory && selectedCategory !== 'all') {
        filteredWallpapers = filteredWallpapers.filter(
          wallpaper => wallpaper.category === selectedCategory
        );
      }
      
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredWallpapers = filteredWallpapers.filter(
          wallpaper => 
            wallpaper.title.toLowerCase().includes(searchLower) ||
            wallpaper.description.toLowerCase().includes(searchLower) ||
            wallpaper.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply sorting
      if (sortBy === 'newest') {
        filteredWallpapers.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
      } else if (sortBy === 'oldest') {
        filteredWallpapers.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));
      } else if (sortBy === 'downloads') {
        filteredWallpapers.sort((a, b) => b.downloads - a.downloads);
      } else if (sortBy === 'alphabetical') {
        filteredWallpapers.sort((a, b) => a.title.localeCompare(b.title));
      }
      
      // Apply pagination
      const itemsPerPage = 12;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedWallpapers = filteredWallpapers.slice(startIndex, startIndex + itemsPerPage);
      
      setWallpapers(paginatedWallpapers);
      setTotalPages(Math.ceil(filteredWallpapers.length / itemsPerPage));
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchWallpapers();
  };
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };
  
  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('newest');
    setCurrentPage(1);
  };
  
  const clearSearchTerm = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setTimeout(() => fetchWallpapers(), 0);
  };
  
  const getPageTitle = () => {
    if (searchTerm) {
      return `Search results for "${searchTerm}"`;
    }
    
    if (selectedCategory !== 'all') {
      return `${selectedCategory} Wallpapers`;
    }
    
    return 'All Wallpapers';
  };
  
  if (loading && currentPage === 1) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <CategoriesContainer>
      <PageHeader>
        <PageTitle>{getPageTitle()}</PageTitle>
        
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search wallpapers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </SearchContainer>
      </PageHeader>
      
      <FiltersSection>
        <FilterGroup>
          <FilterLabel>
            <FaFilter /> Category
          </FilterLabel>
          <FilterSelect value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>
            <FaFilter /> Sort By
          </FilterLabel>
          <FilterSelect value={sortBy} onChange={handleSortChange}>
            <option value="newest">Newest First</option>
            <option value="downloads">Most Downloaded</option>
          </FilterSelect>
        </FilterGroup>
        
        {(selectedCategory !== 'all' || searchTerm || sortBy !== 'newest') && (
          <ClearFilters onClick={clearFilters}>
            Clear All Filters
          </ClearFilters>
        )}
        
        {(selectedCategory !== 'all' || searchTerm) && (
          <ActiveFilters>
            {selectedCategory !== 'all' && (
              <FilterTag>
                Category: {selectedCategory}
                <FaTimes onClick={() => setSelectedCategory('all')} />
              </FilterTag>
            )}
            
            {searchTerm && (
              <FilterTag>
                Search: {searchTerm}
                <FaTimes onClick={clearSearchTerm} />
              </FilterTag>
            )}
          </ActiveFilters>
        )}
      </FiltersSection>
      
      {wallpapers.length > 0 ? (
        <>
          <WallpaperGrid>
            {wallpapers.map(wallpaper => (
              <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
            ))}
          </WallpaperGrid>
          
          {totalPages > 1 && (
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </PageButton>
              
              {[...Array(totalPages).keys()].map(num => (
                <PageButton
                  key={num + 1}
                  active={currentPage === num + 1}
                  onClick={() => setCurrentPage(num + 1)}
                >
                  {num + 1}
                </PageButton>
              ))}
              
              <PageButton
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </PageButton>
            </Pagination>
          )}
        </>
      ) : (
        <NoResults>
          <p>No wallpapers found matching your criteria.</p>
          <p>Try adjusting your filters or search term.</p>
        </NoResults>
      )}
    </CategoriesContainer>
  );
}

export default Categories; 