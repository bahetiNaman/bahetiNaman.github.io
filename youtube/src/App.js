import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage'
import { ThemeContext } from './ThemeContext'
import Search from './components/Search/Search'
import ShowVideo from './components/ShowVideo/ShowVideo'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const { theme } = useContext(ThemeContext)

  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          '--background': theme.background,
          '--foreground': theme.foreground,
          '--navbarBackground': theme.navbarBackground,
          '--searchButtonBackground': theme.searchButtonBackground,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search/:queryText" element={<Search />} />
          <Route path="/show/:videoId" element={<ShowVideo />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
