import './App.css';
import { useEffect, useState } from 'react';
import Botao from './components/Botao';
import Cartas from './components/Cartas';
import mesa from './assets/indiv/table/mesaps.png'
import deckBack from './assets/indiv/deck/back.png'

function App() {
  const cartas = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  const naipes = ["c", "d", "s", "h"];
  const posicoes = ["EP", "EP1", "MP", "LJ", "HJ", "CO", "BT", "SB"]
  const [mao, setMao] = useState([]);
  const [testemao, setTestemao] = useState([]);
  const [posicaoAtual, setPosicaoAtual] = useState();
  const [stack, setStack] = useState();

  useEffect(() => {
    chooseHand();
  }, []);

  function chooseHand() {

    let naipe1 = Math.floor(Math.random() * 4);
    let carta1 = Math.floor(Math.random() * 13);
    let naipe2 = Math.floor(Math.random() * 4);
    let carta2 = Math.floor(Math.random() * 13);
    let pos = Math.floor(Math.random() * 8);
    let stack = 0
    while (stack < 8) {
      stack = Math.floor(Math.random() * 25);
    }
    setStack(stack);
    while (carta1 == carta2 && naipe1 == naipe2) {
      carta2 = Math.floor(Math.random() * 12);
      naipe2 = Math.floor(Math.random() * 4);
    }

    let hand = [cartas[carta1], naipes[naipe1], cartas[carta2], naipes[naipe2]];
    setMao(hand);
    console.log(carta1, carta2)
    setTestemao([carta1, carta2])
    setPosicaoAtual(posicoes[pos])
  }
  // useEffect(() => {
  //   console.log(mao);
  // }, [mao]);

  return (
    <><section className="bckg">
      <div className='container_botoes'>
        <Botao nome="Fold" chooseHand={chooseHand} />
        <Botao nome="2 BB" chooseHand={chooseHand} />
        <Botao nome="2.3 BB" chooseHand={chooseHand} />
        <Botao nome="2.5 BB" chooseHand={chooseHand} />
        <Botao nome="All in" chooseHand={chooseHand} />
      </div>
      <div className='div_pos'>
        Posição: {posicaoAtual}
      </div>
        <div className='div_stack'>
          Stack: {stack} BBs
        </div>
      <section className='fundo'>

        <div className='bottomCards'>
          <div className='holecards'>
            <Cartas mao={mao} testemao={testemao} deckBack={deckBack} />
          </div>
        </div>
        <div className='middleCards'>
          <div>
            <img src={deckBack} />
            <img src={deckBack} />
          </div>
          <div>
            <img src={deckBack} />
            <img src={deckBack} />
          </div>
        </div>
        <div className='topcards'>
          <div>
            <img src={deckBack} />
            <img src={deckBack} />
          </div>
          <div>
            Pot :
          </div>
          <div>
            <img src={deckBack} />
            <img src={deckBack} />
          </div>
        </div>
        <div className='top'>
          <img src={deckBack} />
          <img src={deckBack} />
        </div>
      </section>
    </section></>
  );
}

export default App;
