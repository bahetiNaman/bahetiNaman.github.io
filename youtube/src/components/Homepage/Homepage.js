import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import Card from "../Card/Card";
import './Homepage.style.css';

const Homepage = () => {
    const [videos, setVideos] = useState([]);
    const { getTrendingVideos} = useContext(ThemeContext);
    
    // hook that fetch Trending videos when loading page
    useEffect(() => {   
        async function fetchTrendingVideos() {
            const response = await getTrendingVideos();
            console.log(response);
            setVideos(response);
        }
        fetchTrendingVideos(); 
    }, []);

    return (
        <div className="homepageDiv">
            {videos.map((video,index) => {
                return <Card data={video} key={index}/>
            })}
        </div> 
    )
}
export default Homepage;