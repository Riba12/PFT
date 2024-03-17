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

    
    useEffect(() =>{
        switch (props.mao[1]) {
            case 'c':
                switch (props.mao[3]) {
                    case 'c':
                        setHole([clubs[props.testemao[0]], clubs[props.testemao[1]]]);
                        break;
                    case 'd':
                        setHole([clubs[props.testemao[0]], diamonds[props.testemao[1]]]);
                        break;
                    case 'h':
                        setHole([clubs[props.testemao[0]], hearts[props.testemao[1]]]);
                        break;
                    case 's':
                        setHole([clubs[props.testemao[0]], spades[props.testemao[1]]]);
                        break;
                }
                break;
            case 'd':
                switch (props.mao[3]) {
                    case 'c':
                        setHole([diamonds[props.testemao[0]], clubs[props.testemao[1]]]);
                        break;
                    case 'd':
                        setHole([diamonds[props.testemao[0]], diamonds[props.testemao[1]]]);
                        break;
                    case 'h':
                        setHole([diamonds[props.testemao[0]], hearts[props.testemao[1]]]);
                        break;
                    case 's':
                        setHole([diamonds[props.testemao[0]], spades[props.testemao[1]]]);
                        break;
                }
                break;
            case 'h':
                switch (props.mao[3]) {
                    case 'c':
                        setHole([hearts[props.testemao[0]], clubs[props.testemao[1]]]);
                        break;
                    case 'd':
                        setHole([hearts[props.testemao[0]], diamonds[props.testemao[1]]]);
                        break;
                    case 'h':
                        setHole([hearts[props.testemao[0]], hearts[props.testemao[1]]]);
                        break;
                    case 's':
                        setHole([hearts[props.testemao[0]], spades[props.testemao[1]]]);
                        break;
                }
                break;
            case 's':
                switch (props.mao[3]) {
                    case 'c':
                        setHole([spades[props.testemao[0]], clubs[props.testemao[1]]]);
                        break;
                    case 'd':
                        setHole([spades[props.testemao[0]], diamonds[props.testemao[1]]]);
                        break;
                    case 'h':
                        setHole([spades[props.testemao[0]], hearts[props.testemao[1]]]);
                        break;
                    case 's':
                        setHole([spades[props.testemao[0]], spades[props.testemao[1]]]);
                        break;
                }
                break;
        }
    },[props.mao])

    
    return (
        <div className='cartas'>           
                <img src={hole[0]} className='carta1' />
                <img src={hole[1]} className='carta2' />
        </div>
    );
}

export default Cartas;