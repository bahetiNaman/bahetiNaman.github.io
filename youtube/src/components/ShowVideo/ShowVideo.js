import { useParams } from "react-router-dom"
import './ShowVideo.style.css';
const ShowVideo = () => {
    const { videoId } = useParams();

    return (
        <div className="videoContainer">
            <iframe
                src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media"
                frameBorder='none'
                allowFullScreen
                title="video"
                />
        </div>
    )
}
export default ShowVideo;