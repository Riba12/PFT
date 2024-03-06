import './cartas.css';
// import deck from '../assets/hole.jpeg';

function Cartas (props){


    return(
        <div>
            {props.mao}
            {/* <img src={deck}/> */}
        </div>
    );
}

export default Cartas;