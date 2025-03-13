import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaDownload, FaArrowLeft, FaEye, FaCalendarAlt, FaTags } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useAuthHeader } from '../components/AuthComponents';
import WallpaperCard from '../components/WallpaperCard';
import { dummyWallpapers } from '../utils/dummyData';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const WallpaperSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background-color: ${({ theme }) => theme.colors.white};
`;

const WallpaperImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const WallpaperInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  flex-direction: column;
`;

const WallpaperTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const WallpaperDescription = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.lightText};
`;

const CategoryLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  background-color: rgba(108, 99, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: rgba(108, 99, 255, 0.2);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled(Link)`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.lightText};
  background-color: #f0f0f0;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.fast},
              color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: auto;
  transition: background-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const RelatedSection = styled.section`
  margin-top: 3rem;
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

const WallpaperGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.error};
`;

const BaseURL = "https://wallpaper-library.onrender.com/"

function WallpaperDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState(null);
  const [relatedWallpapers, setRelatedWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const { getAuthHeader } = useAuthHeader();

  useEffect(() => {
    const fetchWallpaper = async () => {
      try {
        setLoading(true);

        // Fetch wallpaper details
        const res = await axios.get(`${BaseURL}/api/wallpapers/${id}`);
        setWallpaper(res.data);

        // Fetch related wallpapers (same category)
        const relatedRes = await axios.get(`${BaseURL}/api/wallpapers?category=${res.data.category}&limit=4`);
        // Filter out the current wallpaper from related
        setRelatedWallpapers(relatedRes.data.wallpapers.filter(w => w._id !== id));

        setLoading(false);
      } catch (err) {
        console.error('Error fetching wallpaper:', err);

        // Use dummy data if API fails
        const dummyWallpaper = dummyWallpapers.find(w => w._id === id);

        if (dummyWallpaper) {
          setWallpaper(dummyWallpaper);

          // Get related wallpapers from the same category
          const related = dummyWallpapers
            .filter(w => w.category === dummyWallpaper.category && w._id !== id)
            .slice(0, 4);

          setRelatedWallpapers(related);
          setLoading(false);
        } else {
          setError('Wallpaper not found. Please try another one.');
          setLoading(false);
        }
      }
    };

    fetchWallpaper();
  }, [id]);

  const handleDownload = async () => {
    try {
      if (!wallpaper) return;

      // Check if Clerk has loaded yet
      if (!isLoaded) {
        console.log('Authentication is still loading...');
        return;
      }

      // If user is not signed in, show login modal
      if (!isSignedIn) {
        openSignIn();
        return;
      }

      // Get auth header
      const headers = await getAuthHeader();

      // Try to increment download count via API with auth header
      try {
        await axios.put(`${BaseURL}/api/wallpapers/${id}/download`, {}, { headers });

        // Update the wallpaper state to reflect the download count increase
        setWallpaper(prev => ({
          ...prev,
          downloads: prev.downloads + 1
        }));
      } catch (err) {
        console.error('Error updating download count:', err);
        // For dummy data, we'll just update the UI without persisting
        setWallpaper(prev => ({
          ...prev,
          downloads: prev.downloads + 1
        }));
      }

      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = wallpaper.imageUrl;
      link.download = wallpaper.title.replace(/\s+/g, '-').toLowerCase() + '.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
    }
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (error || !wallpaper) {
    return (
      <ErrorContainer>
        <p>{error || 'Wallpaper not found'}</p>
        <BackButton to="/">
          <FaArrowLeft /> Go back to home
        </BackButton>
      </ErrorContainer>
    );
  }

  const { title, description, category, tags, resolution, imageUrl, downloads, uploadedAt } = wallpaper;
  const formattedDate = new Date(uploadedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <DetailContainer>
        <div>
          <BackButton to="/">
            <FaArrowLeft /> Back to Home
          </BackButton>

          <WallpaperSection>
            <ImageContainer>
              <WallpaperImage src={imageUrl} alt={title} />
            </ImageContainer>

            <WallpaperInfo>
              <WallpaperTitle>{title}</WallpaperTitle>

              {description && (
                <WallpaperDescription>{description}</WallpaperDescription>
              )}

              <InfoItem>
                <InfoLabel>Category:</InfoLabel>
                <CategoryLink to={`/categories/${category}`}>{category}</CategoryLink>
              </InfoItem>

              <InfoItem>
                <InfoLabel>Resolution:</InfoLabel>
                <InfoValue>{resolution}</InfoValue>
              </InfoItem>

              <InfoItem>
                <FaEye />
                <InfoLabel>Downloads:</InfoLabel>
                <InfoValue>{downloads}</InfoValue>
              </InfoItem>

              <InfoItem>
                <FaCalendarAlt />
                <InfoLabel>Uploaded:</InfoLabel>
                <InfoValue>{formattedDate}</InfoValue>
              </InfoItem>

              {tags && tags.length > 0 && (
                <InfoItem>
                  <FaTags />
                  <InfoLabel>Tags:</InfoLabel>
                  <TagsContainer>
                    {tags.map(tag => (
                      <Tag key={tag} to={`/categories?search=${tag}`}>
                        {tag}
                      </Tag>
                    ))}
                  </TagsContainer>
                </InfoItem>
              )}

              <DownloadButton onClick={handleDownload}>
                <FaDownload /> Download Wallpaper
              </DownloadButton>
            </WallpaperInfo>
          </WallpaperSection>
        </div>

        {relatedWallpapers.length > 0 && (
          <RelatedSection>
            <SectionTitle>
              <FaEye /> Related Wallpapers
            </SectionTitle>

            <WallpaperGrid>
              {relatedWallpapers.map(wallpaper => (
                <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
              ))}
            </WallpaperGrid>
          </RelatedSection>
        )}
      </DetailContainer>
    </>
  );
}

export default WallpaperDetail; 