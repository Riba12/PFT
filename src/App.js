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
  const [listaAcertos, setListaAcertos] = useState([]);
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
    //let hand = [cartas[carta1], "s", cartas[carta2], "s"];
    setMao(hand);
    console.log(cartas[carta1] + cartas[carta2]);
    setTestemao([carta1, carta2,naipes[naipe1],naipes[naipe2]]);
    // setPosicaoAtual(posicoes[pos])
    setPosicaoAtual("EP");
  }
  // colocar uma acao em parametros da funcao
  function Score(pos, carta1, naipe1, carta2, naipe2, stack) {
    console.log(pos, carta1, naipe1, carta2, naipe2, stack)
    switch (pos) {
      case "EP":
        if (stack >= 20) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K9", "KT", "KJ", "KQ", "Q9", "QT", "QJ", "J9", "JT", "T8", "T9", "98", "87", "76", "65", "54"]
          procurar(cartasCertas,carta1,carta2);     
          }
          else{
            let cartasCertas = ["22","33","44","55","66","77","88","99","TT","JJ","QQ","KK","AA",
          "AT","AJ","AQ","AK","KQ"]
          procurar(cartasCertas,carta1,carta2);
          }
        }
    }
    
  }

  function procurar(cartasCertas, carta1, carta2) {
    for (let i = 0; i < cartasCertas.length; i++) {
      if (carta1 + carta2 === cartasCertas[i] || carta2 + carta1 === cartasCertas[i]) {
        console.log("certo");
        aumentarLista("c");
        chooseHand();
        return;
      }
    }

    aumentarLista("e");
    console.log("errado");
    chooseHand();
    return;
  }

  function aumentarLista(novo){
    setListaAcertos((prevListaAcertos) => [...prevListaAcertos, novo])
  }
  

  return (
    <><section className="bckg">
      <div className='container_botoes'>
        <Botao nome="Fold" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack)} />
        <Botao nome="2 BB" chooseHand={chooseHand} />
        <Botao nome="2.3 BB" chooseHand={chooseHand} />
        <Botao nome="2.5 BB" chooseHand={chooseHand} />
        <Botao nome="All in" chooseHand={chooseHand} />
      </div>
      <div className='acima_botao'>
        <div>
          {listaAcertos}
        </div>
      <div className='div_pos'>
        Posição: {posicaoAtual}<br />
        Stack: {stack} BBs {mao}
      </div>
      <div>
        streak
      </div>
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
