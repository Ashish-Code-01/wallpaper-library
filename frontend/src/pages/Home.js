import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaArrowRight, FaImage } from 'react-icons/fa';

import WallpaperCard from '../components/WallpaperCard';
import { dummyWallpapers, dummyCategories, categoryImages } from '../utils/dummyData';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  border-radius: 20px;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 6rem 2rem;
  }
`;

const HeroPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%);
  background-size: 50px 50px;
  opacity: 0.4;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: transform ${({ theme }) => theme.transitions.fast}, 
              box-shadow ${({ theme }) => theme.transitions.fast};
  position: relative;
  z-index: 1;
  
  svg {
    margin-left: 0.5rem;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.8rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-left: 0.5rem;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const WallpaperGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const CategorySection = styled.section`
  margin-bottom: 2rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const CategoryCard = styled(Link)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform ${({ theme }) => theme.transitions.medium},
              box-shadow ${({ theme }) => theme.transitions.medium};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
    
    img {
      transform: scale(1.1);
    }
  }
`;

const CategoryImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.medium};
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryName = styled.span`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  z-index: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
`;


const BaseURL ="https://wallpaper-library.onrender.com/"

function Home() {
  const [featuredWallpapers, setFeaturedWallpapers] = useState([]);
  const [recentWallpapers, setRecentWallpapers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useDummyData, setUseDummyData] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured wallpapers (most downloaded)
        const featuredRes = await axios.get(`${BaseURL}/api/wallpapers?limit=6&sort=downloads`);
        setFeaturedWallpapers(featuredRes.data.wallpapers);
        
        // Fetch recent wallpapers
        const recentRes = await axios.get(`${BaseURL}/api/wallpapers?limit=8`);
        setRecentWallpapers(recentRes.data.wallpapers);
        
        // Fetch categories
        const categoriesRes = await axios.get(`${BaseURL}/api/categories`);
        setCategories(categoriesRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        console.log('Using dummy data instead');
        
        // Use dummy data if API fails
        setUseDummyData(true);
        
        // Sort dummy wallpapers by downloads for featured section
        const sortedByDownloads = [...dummyWallpapers].sort((a, b) => b.downloads - a.downloads);
        setFeaturedWallpapers(sortedByDownloads.slice(0, 6));
        
        // Use all dummy wallpapers for recent section
        setRecentWallpapers(dummyWallpapers);
        
        // Use dummy categories
        setCategories(dummyCategories);
        
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }
  
  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroPattern />
        <HeroTitle>Discover Beautiful Wallpapers</HeroTitle>
        <HeroSubtitle>
          Explore our collection of high-quality wallpapers for your desktop, mobile, and tablet devices.
          Download for free and customize your screens.
        </HeroSubtitle>
        <HeroButton to="/categories">
          Browse Collection <FaArrowRight />
        </HeroButton>
      </HeroSection>
      
      <section>
        <SectionHeader>
          <SectionTitle>
            <FaImage /> Featured Wallpapers
          </SectionTitle>
          <ViewAllLink to="/categories?sort=downloads">
            View All <FaArrowRight />
          </ViewAllLink>
        </SectionHeader>
        
        <WallpaperGrid>
          {featuredWallpapers.length > 0 ? (
            featuredWallpapers.map(wallpaper => (
              <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
            ))
          ) : (
            <p>No featured wallpapers available.</p>
          )}
        </WallpaperGrid>
      </section>
      
      <CategorySection>
        <SectionHeader>
          <SectionTitle>
            <FaImage /> Categories
          </SectionTitle>
          <ViewAllLink to="/categories">
            View All <FaArrowRight />
          </ViewAllLink>
        </SectionHeader>
        
        <CategoryGrid>
          {categories.length > 0 ? (
            categories.slice(0, 6).map(category => (
              <CategoryCard key={category} to={`/categories/${category}`}>
                <CategoryImage 
                  src={categoryImages[category] || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'} 
                  alt={category} 
                />
                <CategoryOverlay>
                  <CategoryName>{category}</CategoryName>
                </CategoryOverlay>
              </CategoryCard>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </CategoryGrid>
      </CategorySection>
      
      <section>
        <SectionHeader>
          <SectionTitle>
            <FaImage /> Recent Wallpapers
          </SectionTitle>
          <ViewAllLink to="/categories">
            View All <FaArrowRight />
          </ViewAllLink>
        </SectionHeader>
        
        <WallpaperGrid>
          {recentWallpapers.length > 0 ? (
            recentWallpapers.map(wallpaper => (
              <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
            ))
          ) : (
            <p>No recent wallpapers available.</p>
          )}
        </WallpaperGrid>
      </section>
    </HomeContainer>
  );
}

export default Home; 