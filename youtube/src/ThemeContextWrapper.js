import { themes } from './assets/themes'
import { ThemeContext } from './ThemeContext'
import { useEffect, useState } from 'react'

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);
  const API_KEY = 'AIzaSyCI-gyiaWzA3ossj-M-lwIS-_k9CRKgvlA'

  async function getTrendingVideos() {
    const res = await fetch(
      'https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&regionCode=CH&maxResults=50&key=' +
        API_KEY +
        '&part=snippet,contentDetails,statistics',
    )
    const data = await res.json()
    return data.items
  }


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme == "dark" ? themes.dark : themes.light);

  }, [theme]);

  // function to get details of youtube video by videoId
  async function getDetailsOfYTVideoByVideoID(videoID) {
    const res = await fetch(
      'https://www.googleapis.com/youtube/v3/videos?regionCode=CH&id=' +
        videoID +
        '&key=' +
        API_KEY +
        '&part=snippet,contentDetails,statistics',
    )
    const dataForVideo = await res.json()
    console.log(dataForVideo.items)
    return dataForVideo.items[0]
  }

  // function to get videos based on search text
  async function getVideosBasedOnSearch(searchText) {
    const res = await fetch(
      'https://www.googleapis.com/youtube/v3/search?regionCode=CH&maxResults=10&key=' +
        API_KEY +
        '&q=' +
        searchText +
        '&part=snippet',
    )
    const data = await res.json()
    const videosWithoutContentDetails = data.items

    var videosWithContentDetails = []
    for (var video of videosWithoutContentDetails) {
      var videoWithContentDetails = await getDetailsOfYTVideoByVideoID(
        video.id.videoId,
      )
      videosWithContentDetails.push(videoWithContentDetails)
    }

    return videosWithContentDetails
  }

  function changeTheme(theme) {
    setTheme(theme)
    localStorage.setItem("theme", theme == themes.dark ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        changeTheme: changeTheme,
        getTrendingVideos: getTrendingVideos,
        getVideosBasedOnSearch: getVideosBasedOnSearch,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}
