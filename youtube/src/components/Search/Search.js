import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeContext } from '../../ThemeContext'
import Card from '../Card/Card';
import './Search.style.css';

const Search = () => {
  const { queryText } = useParams();
  const [videos, setVideos] = useState([])
  const { getVideosBasedOnSearch } = useContext(ThemeContext)
  
  useEffect(() => {
    
    async function fetchSearchVideos() {
      const response = await getVideosBasedOnSearch(queryText)
      setVideos(response);
      console.log(response);
    }
    fetchSearchVideos();
  }, [queryText])
  
  return (
    <div
      className="searchPageDiv"
    >
      {videos.map((video, index) => {
        return video != undefined ? <Card data={video} key={index} /> : null;
      })}
    </div>
  )
}
export default Search
