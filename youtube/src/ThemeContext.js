import { createContext } from "react";
import { themes } from "./assets/themes";


// default state is dark
// creating context for theme
export const ThemeContext = createContext({theme: themes.dark, getTrendingVideos: () => {}, getVideosBasedOnSearch: () => {}, changeTheme: () => {},});