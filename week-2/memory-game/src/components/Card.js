import React from "react";
import ReactCardFlip from "react-card-flip";
function Card(props) {
    const flipCard = e => {
        if(props.found || props.flipped) return;
        props.flip(e.target.id);
    }
    return (
        <div style={{ minHeight: '20%', height: 'auto',width:'100%'}}>
        <ReactCardFlip isFlipped={props.flipped} flipDirection="horizontal" containerStyle={{
            minHeight: '100%',
            width: '100%',
            }}
            cardStyles={{
                front: {
                    backgroundColor: 'lightblue',
                    width: '100%',
                    minHeight: '100%'
                },
                back: {
                    backgroundImage: `${props.imageUrl}`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: props.found ? 'green': 'gray',
                    cursor: props.found ? '': 'pointer', 
                    width: '100%',
                    minHeight: '100%'
                }
            }}>
            <div id={props.id} className="card front"
            onClick={flipCard}
            key="front" />
            <div className="card back" onClick={flipCard} key="back"></div>
        </ReactCardFlip>
        </div>
    );
}



export default Card;