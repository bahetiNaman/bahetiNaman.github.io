import React, { useEffect, useState } from 'react';
import Card from './Card';

function GameBoard(props) {
    // console.log(props);
    const [cards, setCards] = useState(props.cards);
    useEffect(() => {
        setCards(props.cards);
    }, [props.cards]);
    useEffect(() => {
        isMatch();
        if (cards.every(card => card.found)) {
            props.won();
        }
    }, [cards])
    useEffect(() => {
        setTimeout(() => {
            const newCards = cards.map(card => {
                return {...card, flipped: false};
            })
            setCards(newCards);
        }, 2000);
    }, []);
    const flipCard = id => {
        const newCards = cards.map(card => {
            if (card.id == id) {
                return { ...card, flipped: true };
            }
            return card;
        })
        setCards(newCards);
    }
    const handleFlip = id => {
        console.log(id);
        console.log("Flipped Cards are: ", countFlippedCard())
        switch (countFlippedCard()) {
            case 0:
                flipCard(id);
                break;
            case 1:
                props.click();
                flipCard(id);
                break;
            default:
                break;
        }
        // isMatch();
    }
    const countFlippedCard = () => {
        return cards.filter(card => card.flipped && !card.found).length;
    }
    const isMatch = () => {
        const flippedCards = cards.filter(card => card.flipped && !card.found);
        console.log(flippedCards);
        if (flippedCards.length === 2) {
            if (flippedCards[0].matchesId === flippedCards[1].id || flippedCards[0].id === flippedCards[1].matchesId) {
                var newCards = cards.map(card => {
                    switch (card.id) {
                        case flippedCards[0].id:
                        case flippedCards[1].id:
                            return { ...card, found: true };
                        default:
                            return card;
                    }
                });
                setCards(newCards);
            }
            else {
                setTimeout(() => {
                var newCards = cards.map(card => {
                    switch (card.id) {
                        case flippedCards[0].id:
                        case flippedCards[1].id:
                            return { ...card, flipped: false };
                        default:
                            return card;
                    }
                });
                setCards(newCards);}, 1000);
            }
        }
    }
    const createBoard = () => {
        var rows = 4;
        var cols = 6;
        var allRows = []
        for (var i = 0; i < rows; i++) {
            var elements = []
            for (var j = i * cols; j < (i + 1) * cols; j++) {
                var card = cards[j];
                var currElement = <Card key={card.id} flipped={card.flipped} found={card.found} id={card.id} imageUrl={card.url} flip={handleFlip} />;
                elements.push(currElement);
            }

            var currRow = React.createElement('div', { style: { display: 'flex', flexDirection: 'row', flex: '0.25' }, key: 'div' + i }, elements);
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