import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 1.5rem;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  color: ${({ theme }) => theme.colors.lightText};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
  
  svg {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0 0.2rem;
  }
`;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>WallpaperHub</FooterTitle>
          <FooterText>
            A creative wallpaper library with high-quality wallpapers for your desktop, mobile, and tablet devices.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/categories">Categories</FooterLink>
          <FooterLink to="/upload">Upload</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Categories</FooterTitle>
          <FooterLink to="/categories/nature">Nature</FooterLink>
          <FooterLink to="/categories/abstract">Abstract</FooterLink>
          <FooterLink to="/categories/minimalist">Minimalist</FooterLink>
          <FooterLink to="/categories/space">Space</FooterLink>
          <FooterLink to="/categories/animals">Animals</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterText>Have questions or suggestions?</FooterText>
          <FooterText>Email: contact@wallpaperhub.com</FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>
          © {currentYear} WallpaperHub. All rights reserved. Made with <FaHeart /> by <a href="https://github.com" target="_blank" rel="noopener noreferrer">YourName</a>
        </p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer; 