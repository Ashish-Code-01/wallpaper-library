import React from 'react';
import {
  SignIn,
  SignUp,
  UserButton,
  useUser,
  useClerk,
  SignedIn,
  SignedOut
} from '@clerk/clerk-react';
import styled from 'styled-components';

// Styled components for auth
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 500px;
  margin: 2rem auto;
`;

const AuthButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  margin-left: 14px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AuthModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

// Login Button Component
export const LoginButton = ({ onClick }) => {
  return (
    <AuthButton onClick={onClick}>
      Sign In
    </AuthButton>
  );
};

// Login Modal Component
export const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AuthModal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </ModalContent>
    </AuthModal>
  );
};

// Sign Up Modal Component
export const SignUpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AuthModal>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </ModalContent>
    </AuthModal>
  );
};

// Auth Status Component
export const AuthStatus = () => {
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <AuthButton onClick={() => openSignIn()}>
          Sign In
        </AuthButton>
      </SignedOut>
    </>
  );
};

// Protected Content Component
export const ProtectedContent = ({ children, fallback }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        {fallback}
      </SignedOut>
    </>
  );
};

// Hook to get auth token for API requests
export const useAuthHeader = () => {
  const { getToken, session } = useClerk();

  const getAuthHeader = async () => {
    try {
      // Check if there's an active session
      if (!session) {
        console.warn('No active session found when trying to get auth token');
        return {};
      }

      const token = await getToken();

      if (!token) {
        console.warn('Failed to get token from Clerk');
        return {};
      }

      return {
        Authorization: `Bearer ${token}`
      };
    } catch (error) {
      console.error('Error getting auth token:', error);
      return {};
    }
  };

  return { getAuthHeader };
}; 