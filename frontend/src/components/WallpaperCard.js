import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaDownload, FaEye } from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useAuthHeader, LoginModal } from './AuthComponents';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform ${({ theme }) => theme.transitions.medium}, 
              box-shadow ${({ theme }) => theme.transitions.medium};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%);
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.medium};
  }
  
  ${Card}:hover &::after {
    opacity: 1;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.medium};
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Category = styled(Link)`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  background-color: rgba(108, 99, 255, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  margin-bottom: 0.8rem;
  text-decoration: none;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: rgba(108, 99, 255, 0.2);
  }
`;

const Resolution = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: 0.8rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid #f0f0f0;
`;

const Downloads = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.lightText};
  
  svg {
    margin-right: 0.3rem;
  }
`;

const ViewButton = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: 0.3rem;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HoverActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.medium};
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: background-color ${({ theme }) => theme.transitions.fast},
              color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

function WallpaperCard({ wallpaper }) {
  const { _id, title, category, resolution, imageUrl, downloads } = wallpaper;
  const { isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const { getAuthHeader } = useAuthHeader();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    
    try {
      // Get auth header
      const headers = await getAuthHeader();
      
      // Increment download count with auth header
      await fetch(`/api/wallpapers/${_id}/download`, {
        method: 'PUT',
        headers
      });
      
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = title.replace(/\s+/g, '-').toLowerCase() + '.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
    }
  };
  
  return (
    <>
      <Card>
        <ImageContainer>
          <Image src={imageUrl} alt={title} loading="lazy" />
          <HoverActions>
            <DownloadButton href="#" onClick={handleDownload}>
              <FaDownload />
            </DownloadButton>
          </HoverActions>
        </ImageContainer>
        
        <CardContent>
          <Title>{title}</Title>
          <Category to={`/categories/${category}`}>{category}</Category>
          <Resolution>{resolution}</Resolution>
          
          <CardFooter>
            <Downloads>
              <FaDownload /> {downloads}
            </Downloads>
            <ViewButton to={`/wallpaper/${_id}`}>
              <FaEye /> View
            </ViewButton>
          </CardFooter>
        </CardContent>
      </Card>
      
      {/* Auth Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}

export default WallpaperCard; 