import '../App.css'
import Icon from './Icon'
import { useContext, useState } from 'react'

import { themes } from '../assets/themes'
import { FaSearch } from 'react-icons/fa'
import Switch from 'react-switch'
import { Colors } from '../assets/colors'
import { ThemeContext } from '../ThemeContext'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const { theme, changeTheme } = useContext(ThemeContext)
  const [queryText, setQueryText] = useState('')

  // function to toggle the theme
  const handleToggle = () => {
    changeTheme(theme == themes.light ? themes.dark : themes.light)
  }

  const goToSearch = (event) => {
    event.preventDefault();
    navigate('/search/' + queryText);
  }
  return (
    <nav className="navbar">
      <div className="youtubeIcon">
        <Link to="/">
          <Icon color={theme.foreground} />
        </Link>
      </div>

      <form className="searchForm" onSubmit={goToSearch}>
        <input
          placeholder="Search"
          className="searchInput"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        ></input>
        <div className="searchButtonDiv">
          <button type="submit" className="searchButton" disabled={queryText == ''}>
            <FaSearch color={theme.foreground} />
          </button>
        </div>
      </form>

      <div className="themeToggler">
        <Switch
          onColor={Colors.white}
          offColor={Colors.black}
          onHandleColor={Colors.black}
          offHandleColor={Colors.white}
          checked={theme === themes.dark}
          onChange={handleToggle}
          className="toggleSwitch"
        />
        <p className="themeName">{theme === themes.dark ? 'Dark' : 'Light'}</p>
      </div>
    </nav>
  )
}

export default Navbar
