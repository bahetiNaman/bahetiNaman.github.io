import React from "react";
import ReactCardFlip from "react-card-flip";
function Card(props) {
    const flipCard = e => {
        console.log(e.target.id);
        if (props.found || props.flipped) return;
        props.flip(e.target.id);
    }
    const CardStyleFront = {
        border: "1px solid black",
        padding: "5px",
        backgroundColor: 'lightblue',
        margin: "5px",
        width: "100%",
        height: "100%",
    };
    // console.log(props);
    const CardStyleBack = {
        backgroundColor: props.found ? 'green' : 'gray',
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

        cursor: props.found ? '' : 'pointer',
        border: "1px solid black",
        padding: "5px",
        margin: "5px",
        width: "100%",
        height: "100%"
    };
    return (
        <div style={{ minHeight: '22%', height: 'auto', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <ReactCardFlip isFlipped={props.flipped} flipDirection="horizontal" containerStyle={{
                width: '100%',
                height: '100%'
            }}>
                <div id={props.id} className="CardFront"
                    onClick={flipCard}
                    style={CardStyleFront}
                    key="front" ></div>
                <div className="CardBack" onClick={flipCard} style={CardStyleBack} key="back"></div>
            </ReactCardFlip>
        </div>
    );
}



export default Card;