import { useState, useEffect } from 'react';
import UserEntry from '../src/components/UseEntry';
import Notes from './components/Notes';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUsername(name);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      {username ? (
        <Notes username={username} onLogout={handleLogout} />
      ) : (
        <UserEntry onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
