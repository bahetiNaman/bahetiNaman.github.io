import React, { useEffect, useState } from 'react';
import Card from './Card';

function GameBoard(props) {
    console.log(props);
    const [cards, setCards] = useState(props.cards);
    useEffect(() => {
        setCards(props.cards);
    }, [props.cards]);
    const flipCard = id => {
        const previousCards = cards;
        for (var card of previousCards) {
            if (card.id == id) {
                card.flipped = true;
            }
        }
        setCards(previousCards);

    }
    const handleFlip = id => {
        switch (countFlippedCard()) {
            case 0:
                flipCard(id);
                break;
            case 1:
                props.click();
                flipCard(id);
                isMatch();
                break;
            default:
                break;
        }
    }
    const countFlippedCard = () => {
        return cards.filter(card => card.flipped && !card.found).length;
    }
    const isMatch = () => {
        const flippedCards = cards.filter(card => card.flipped && !card.found);
        if (flippedCards[0].matchesId === flippedCards[1].id) {
            var previousCards = cards;
            for (var card of previousCards) {
                switch (card.id) {
                    case flippedCards[0].id:
                    case flippedCards[1].id:
                        card.found = true;
                        break;
                    default:
                        break;
                }
            }
            setCards(previousCards);
            if (cards.every(card => card.found)) {
                props.won();
            }
        }
        else {
            setTimeout(() => {
                var previousCards = cards;
                for (var card of previousCards) {
                    switch (card.id) {
                        case flippedCards[0].id:
                        case flippedCards[1].id:
                            card.flipped = false;
                    }
                }
            }, 1000);
        }
    }
    const createBoard = () => {
        var rows = 4;
        var cols = 6;
        var allRows = []
        for(var i = 0;i<rows;i++)
        {
            var elements = []
            for(var j = i*cols;j<(i+1)*cols;j++)
            {
                var card = cards[j];
                var currElement = <Card key={card.id} flipped={card.flipped} found={card.found} id={card.id} imageUrl={card.url} flip={handleFlip} />;
                elements.push(currElement);
            }

            var currRow = React.createElement('div', { style: { display: 'flex', flexDirection: 'row', flex: '0.25'}, key: 'div' + i}, elements);
            allRows.push(currRow);
        }
        return (
            <>
                {allRows.map(row => {
                    return row;
                })}
            </>
        )
    };
    return (
        <div className='cards' style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            minHeight: '80%'
        }}>
            {createBoard()}
        </div>
    );
}

export default GameBoard;