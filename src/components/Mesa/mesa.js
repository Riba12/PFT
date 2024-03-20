import './mesa.css';
import bt from '../../assets/dealer.png';
import { useEffect, useState } from 'react';

const Mesa = (props) => {

    const [lugarBTtop, setLugarBTtop] = useState();
    const [lugarBTleft, setLugarBTleft] = useState();

    function posicionarBT(posicao) {
        switch (posicao) {
            case 'EP':
                setLugarBTtop("25%");
                setLugarBTleft("75%");
                break;
            case 'EP1':
                setLugarBTtop("30%");
                setLugarBTleft("0%");
                break;
            case 'MP':
                setLugarBTtop("40%");
                setLugarBTleft("0%");
                break;
            case 'LJ':
                setLugarBTtop("50%");
                setLugarBTleft("0%");
                break;
            case 'HJ':
                setLugarBTtop("60%");
                setLugarBTleft("50%");
                break;
            case 'CO':
                setLugarBTtop("70%");
                setLugarBTleft("0%");
                break;
            case 'BT':
                setLugarBTtop("60%");
                setLugarBTleft("50%");
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