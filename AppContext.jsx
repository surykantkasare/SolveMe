import React, {useState} from 'react';

const AppContext = React.createContext();

export function AppProvider({children}) {
  const baseUrl =
    'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';

  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [result, setResult] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });

  return (
    <AppContext.Provider
      value={{
        baseUrl,
        url,
        setUrl,
        category,
        setCategory,
        difficulty,
        setDifficulty,
        result,
        setResult,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
