import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import './Card.style.css';
import { convertToStandardSystem } from '../Helper';
const Card = (props) => {
  const { data } = props
  const navigate = useNavigate()
  
  // function to navigate to showVideo page
  const showVideo = () => {
    console.log(data)
    navigate('/show/' + data.id)
  }

  return (
    <div onClick={showVideo} className="cardDiv">
      <div className="videoThumbnail">
        <img src={data.snippet.thumbnails.medium.url}></img>
      </div>
      <div className="videoContent">
        <div className="videoTitle">{data.snippet.title}</div>
        <div className="videoStatistics">
          <div className="channelTitle">{data.snippet.channelTitle} •</div>
          <div className="videoViewCount">
            {convertToStandardSystem(data.statistics.viewCount)}{' '}
            Views •
          </div>
          <div className="videoPublishedAt">
            {DateTime.fromISO(data.snippet.publishedAt).toRelative()}
          </div>
        </div>
        <div
          className="videoDescription"
        >
          {data.snippet.description}
        </div>
      </div>
    </div>
  )
}

export default Card
