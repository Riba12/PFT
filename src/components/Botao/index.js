import './botao.css';

function Botao(props){

return(
    <button className='botao' onClick={props.score}>
        {props.nome}
    </button>
);
}
export default Botao;