'use client';

import { useRouter } from 'next/navigation';

const LoginButton: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/api/auth/login');
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: '10px 20px',
        backgroundColor: '#1DB954',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Login with Spotify
    </button>
  );
};

export default LoginButton;
