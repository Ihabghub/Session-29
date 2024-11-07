import { useState } from 'react';

interface UserEntryProps {
  onLogin: (name: string) => void;
}

const UserEntry: React.FC<UserEntryProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleEnter = () => {
    const usernamePattern = /^[a-z]+$/;
    if (usernamePattern.test(username)) {
      onLogin(username);
      setError('');
    } else {
      setError('Please enter a valid username (only lowercase letters).');
    }
  };

  return (
    <div className="bg-gray-300 p-6 rounded-lg flex flex-col items-center w-screen">
      <input
        type="text"
        placeholder="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded p-2 w-full"
      />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <button onClick={handleEnter} className="bg-green-500 text-white mt-4 px-4 py-2 rounded">
        Enter
      </button>
    </div>
  );
};

export default UserEntry;
