import { useEffect, useState } from 'react';
import './cartas.css';


function Cartas(props) {

    const [hole, setHole] = useState([]);
    const hearts = importAll(require.context('../../assets/indiv/hearts', false, /\.(png)$/));
    const spades = importAll(require.context('../../assets/indiv/spades', false, /\.(png)$/));
    const diamonds = importAll(require.context('../../assets/indiv/diamonds', false, /\.(png)$/));
    const clubs = importAll(require.context('../../assets/indiv/clubs', false, /\.(png)$/));

    function importAll(r) {
        return r.keys().map(r);
    }

    useEffect()

    switch (props.mao[1]) {
        case 'c':
            switch (props.mao[3]) {
                case 'c':
                    setHole(clubs[props.mao[0], clubs[props.mao[2]]]);
                    break;
                case 'd':
                    setHole(clubs[props.mao[0], diamonds[props.mao[2]]]);
                    break;
                case 'h':
                    setHole(clubs[props.mao[0], hearts[props.mao[2]]]);
                    break;
                case 's':
                    setHole(clubs[props.mao[0], spades[props.mao[2]]]);
                    break;
            }
        case 'd':
            switch (props.mao[3]) {
                case 'c':
                    setHole(diamonds[props.mao[0], clubs[props.mao[2]]]);
                    break;
                case 'd':
                    setHole(diamonds[props.mao[0], diamonds[props.mao[2]]]);
                    break;
                case 'h':
                    setHole(diamonds[props.mao[0], hearts[props.mao[2]]]);
                    break;
                case 's':
                    setHole(diamonds[props.mao[0], spades[props.mao[2]]]);
                    break;
            }
        case 'h':
            switch (props.mao[3]) {
                case 'c':
                    setHole(hearts[props.mao[0], clubs[props.mao[2]]]);
                case 'd':
                    setHole(hearts[props.mao[0], diamonds[props.mao[2]]]);
                case 'h':
                    setHole(hearts[props.mao[0], hearts[props.mao[2]]]);
                case 's':
                    setHole(hearts[props.mao[0], spades[props.mao[2]]]);
            }
        case 's':
            switch (props.mao[3]) {
                case 'c':
                    setHole(spades[props.mao[0], clubs[props.mao[2]]]);
                case 'd':
                    setHole(spades[props.mao[0], diamonds[props.mao[2]]]);
                case 'h':
                    setHole(spades[props.mao[0], hearts[props.mao[2]]]);
                case 's':
                    setHole(spades[props.mao[0], spades[props.mao[2]]]);
            }
    }
    return (
        <div className='cartas'>
            {/* {props.mao} */}
            <div>
                bla
                {/* <img src={hole[0]} className='carta1' /> */}
            </div>
            <div>
                {/* <img src={hole[1]} className='carta2' /> */}
            </div>
        </div>
    );
}

export default Cartas;