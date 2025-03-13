import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaBars, FaTimes, FaUpload } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import { AuthStatus } from './AuthComponents';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 40%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'block' : 'none'};
    width: 100%;
    margin: 1rem 0;
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

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
`;

const NavLink = styled(Link)`
  margin-left: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0.5rem 0;
    margin-left: 0;
  }
`;

const UploadLink = styled(NavLink)`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'flex' : 'none'};
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
    margin-left: 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
  }
`;

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchTerm)}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          Wallpaper<span>Library</span>
        </Logo>

        <SearchContainer mobileMenuOpen={mobileMenuOpen}>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search wallpapers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch />
            </SearchButton>
          </form>
        </SearchContainer>

        <NavContainer mobileMenuOpen={mobileMenuOpen}>
          <NavLink to="/categories">Categories</NavLink>
          {isSignedIn && (
            <UploadLink to="/upload">
              <FaUpload /> Upload
            </UploadLink>
          )}
          <AuthContainer mobileMenuOpen={mobileMenuOpen}>
            <AuthStatus />
          </AuthContainer>
        </NavContainer>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header; 