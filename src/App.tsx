import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import LandingPage from './components/LandingPage';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import RoleSelection from './components/RoleSelection';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import VendorDashboard from './components/VendorDashboard';
import { User, UserRole } from './types';

type AppView = 'landing' | 'signin' | 'signup' | 'roleselection';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleSignUp = (email: string, username: string, password: string) => {
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      toast.error('Username already exists');
      return;
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
      toast.error('Email already registered');
      return;
    }

    // Create new user
    const newUser: User = {
      username,
      email,
      password,
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    toast.success('Account created successfully! 🎉');
    setCurrentView('roleselection');
  };

  const handleSignIn = (username: string, password: string) => {
    // Find user by username
    const user = users.find(u => u.username === username);

    if (!user) {
      toast.error('Username not found. Please create an account.');
      return;
    }

    if (user.password !== password) {
      toast.error('Incorrect password. Please try again.');
      return;
    }

    setCurrentUser(user);
    toast.success(`Welcome back, ${user.username}! 👋`);
    setCurrentView('roleselection');
  };

  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    setCurrentView('landing');
    toast.success('Signed out successfully');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage 
          onShowSignIn={() => setCurrentView('signin')}
          onShowSignUp={() => setCurrentView('signup')}
        />
      )}
      
      {currentView === 'signin' && (
        <SignInForm
          onSignIn={handleSignIn}
          onBack={handleBackToLanding}
          onSwitchToSignUp={() => setCurrentView('signup')}
        />
      )}
      
      {currentView === 'signup' && (
        <SignUpForm
          onSignUp={handleSignUp}
          onBack={handleBackToLanding}
          onSwitchToSignIn={() => setCurrentView('signin')}
        />
      )}
      
      {currentView === 'roleselection' && currentUser && (
        <RoleSelection
          username={currentUser.username}
          onSelectRole={handleSelectRole}
          onSignOut={handleSignOut}
        />
      )}

      {currentRole === 'buyer' && <BuyerDashboard onSignOut={handleSignOut} />}
      {currentRole === 'seller' && <SellerDashboard onSignOut={handleSignOut} />}
      {currentRole === 'vendor' && <VendorDashboard onSignOut={handleSignOut} />}
      
      <Toaster />
    </>
  );
}