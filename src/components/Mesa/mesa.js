import './mesa.css';
import bt from '../../assets/dealer.png';
import ficha from '../../assets/ficha.png';
import { useEffect, useState } from 'react';

const Mesa = (props) => {

    const [lugarBTtop, setLugarBTtop] = useState();
    const [lugarBTleft, setLugarBTleft] = useState();
    const [lugarSBtop, setLugarSBtop] = useState();
    const [lugarSBleft, setLugarSBleft] = useState();
    const [lugarBBtop, setLugarBBtop] = useState();
    const [lugarBBleft, setLugarBBleft] = useState();

    function posicionarBT(posicao) {
        switch (posicao) {
            case 'EP':
                setLugarBTtop("30%");
                setLugarBTleft("75%");
                setLugarSBtop("50%");
                setLugarSBleft("85%");
                setLugarBBtop("70%");
                setLugarBBleft("75%");
                break;
            case 'EP1':
                setLugarBTtop("20%");
                setLugarBTleft("48%");
                setLugarSBtop("30%");
                setLugarSBleft("75%");
                setLugarBBtop("50%");
                setLugarBBleft("85%");
                break;
            case 'MP':
                setLugarBTtop("30%");
                setLugarBTleft("22%");
                setLugarSBtop("20%");
                setLugarSBleft("50%");
                setLugarBBtop("30%");
                setLugarBBleft("75%");
                break;
            case 'HJ':
                setLugarBTtop("50%");
                setLugarBTleft("10%");
                setLugarSBtop("30%");
                setLugarSBleft("23%");
                setLugarBBtop("20%");
                setLugarBBleft("48%");
                break;
            case 'CO':
                setLugarBTtop("65%");
                setLugarBTleft("21%");
                setLugarSBtop("50%");
                setLugarSBleft("10%");
                setLugarBBtop("30%");
                setLugarBBleft("23%");
                break;
            case 'BT':
                setLugarBTtop("75%");
                setLugarBTleft("50%");
                setLugarSBtop("70%");
                setLugarSBleft("23%");
                setLugarBBtop("50%");
                setLugarBBleft("10%");
                break;

        }
    }

    useEffect(() => {
        posicionarBT(props.posicaoAtual)
    }, [props.posicaoAtual])

    return (
        <div className="table-background">
            {/* Table border */}
            <div className="table-border">
                {/* Table surface */}
                <div className="table-surface">
                    <img src={bt} style={{ top: lugarBTtop, left: lugarBTleft, position: 'absolute', zIndex: '2'}} />
                    <img src={ficha} style={{ top: lugarSBtop, left: lugarSBleft, position: 'absolute', zIndex: '2'}} />
                    <img src={ficha} style={{ top: lugarBBtop, left: lugarBBleft, position: 'absolute', zIndex: '2'}} />
                    <img src={ficha} style={{ top: lugarBBtop, left: `calc(${lugarBBleft} + 2%)`, position: 'absolute', zIndex: '2'}} />
                    {/* Table elements (e.g., cards, chips, etc.) can be added here */}
                    <div className='meio_mesa'>
                        THE DEAL POKER TEAM
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mesa;