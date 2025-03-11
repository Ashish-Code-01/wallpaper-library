import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  min-height: 60vh;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 6rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 1rem 0 2rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.lightText};
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    margin-right: 0.5rem;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  
  &:hover {
    background-color: rgba(108, 99, 255, 0.1);
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        Oops! The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable. Let's get you back on track.
      </ErrorMessage>
      
      <ButtonsContainer>
        <PrimaryButton to="/">
          <FaHome /> Back to Home
        </PrimaryButton>
        <SecondaryButton to="/categories">
          <FaSearch /> Browse Wallpapers
        </SecondaryButton>
      </ButtonsContainer>
    </NotFoundContainer>
  );
}

export default NotFound; 