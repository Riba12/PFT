import './botao.css';

function Botao(props){


return(
    <button className='botao' onClick={props.chooseHand}>
        {props.nome}
    </button>
);
}
export default Botao;