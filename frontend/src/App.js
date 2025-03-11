import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';

// Pages
import Home from './pages/Home';
import WallpaperDetail from './pages/WallpaperDetail';
import Categories from './pages/Categories';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Theme
const theme = {
  colors: {
    primary: '#6C63FF',
    secondary: '#FF6584',
    accent: '#43CBFF',
    background: '#F5F5F5',
    text: '#333333',
    lightText: '#777777',
    white: '#FFFFFF',
    black: '#000000',
    error: '#FF5252',
    success: '#4CAF50'
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    desktop: '1200px'
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)'
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease'
  }
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const AuthContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.lightText};
`;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return (
      <LoadingContainer>
        <div>Loading authentication...</div>
      </LoadingContainer>
    );
  }
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in?redirect=upload" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallpaper/:id" element={<WallpaperDetail />} />
            <Route path="/categories/:category?" element={<Categories />} />
            
            {/* Protected route */}
            <Route path="/upload" element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } />
            
            {/* Auth routes */}
            <Route path="/sign-in/*" element={
              <AuthContainer>
                <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/upload" />
              </AuthContainer>
            } />
            <Route path="/sign-up/*" element={
              <AuthContainer>
                <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/upload" />
              </AuthContainer>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App; 