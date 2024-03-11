import './App.css';
import { useEffect, useState } from 'react';
import Botao from './components/Botao';
import Cartas from './components/Cartas';
import mesa from './assets/indiv/table/mesaps.png'

function App() {
  const cartas = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  const naipes = ["c", "d", "s", "h"];
  const posicoes = ["EP","EP1","MP","LJ","HJ","CO","BT","SB","BB"]
  const [mao, setMao] = useState([]);
  const [testemao,setTestemao] = useState([])

  useEffect(() => {
    chooseHand();
  }, []);

  function chooseHand() {

    let naipe1 = Math.floor(Math.random() * 4);
    let carta1 = Math.floor(Math.random() * 12);
    let naipe2 = Math.floor(Math.random() * 4);
    let carta2 = Math.floor(Math.random() * 12);

    while (carta1 == carta2 && naipe1 == naipe2) {
      carta2 = Math.floor(Math.random() * 12);
      naipe2 = Math.floor(Math.random() * 4);
    }

    let hand = [cartas[carta1], naipes[naipe1], cartas[carta2], naipes[naipe2]];
    setMao(hand);
    console.log(carta1,carta2)
    setTestemao([carta1,carta2])
  }
  // useEffect(() => {
  //   console.log(mao);
  // }, [mao]);

  return (
    <><section className="bckg">
      <div>
        <Botao nome="Fold" chooseHand={chooseHand} />
        <Botao nome="2bb" chooseHand={chooseHand} />
        <Botao nome="2.3bb" chooseHand={chooseHand} />
        <Botao nome="2.5bb" chooseHand={chooseHand} />
        <Botao nome="All in" chooseHand={chooseHand} />
      </div>
      <div>
        <div className='holecards'>
        <Cartas mao={mao} testemao={testemao} />
        </div>
      </div>
    </section></>
  );
}

export default App;
