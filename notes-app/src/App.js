import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import { ThemeContext, themes } from './ThemeContext';

function App() {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: theme.background, color: theme.foreground}}>
    <ThemeContext.Provider value={themes.dark}>
      <BrowserRouter>
        <h1 style={{ flex: '0.2'}}> Notes app</h1>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
    </div>
  );
}

export default App;
