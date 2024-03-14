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
  const [streak, setStreak] = useState(0);

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
    //mudar de novo pra 8 
    while (stack < 16) {
      stack = Math.floor(Math.random() * 40);
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
    setTestemao([carta1, carta2, naipes[naipe1], naipes[naipe2]]);
    // setPosicaoAtual(posicoes[pos])
    setPosicaoAtual("EP");

  }
  // colocar uma acao em parametros da funcao
  function Score(pos, carta1, naipe1, carta2, naipe2, stack, mao, acao) {
    // console.log(pos, carta1, naipe1, carta2, naipe2, stack,mao)
    switch (pos) {
      case "EP":
        if (stack > 20) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K9", "KT", "KJ", "KQ", "Q9", "QT", "QJ", "J9", "JT", "T8", "T9", "98", "87", "76", "65", "54"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2,3") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
          else {
            let cartasCertas = ["22", "33", "44", "55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2,3") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
        } else if (stack <= 20 && stack > 15) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "KT", "KJ", "KQ", "Q8", "Q9", "QT", "QJ", "JT", "J9", "T9"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
          else {
            let cartasCertas = ["55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
        } else if (stack <= 15 && stack > 12) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "KT", "KJ", "KQ", "Q8", "Q9", "QT", "QJ", "JT", "J9", "T9"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
          else {
            let cartasCertas = ["55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
        } else if (stack <= 12 && stack > 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "Q8", "Q9", "J9", "T9"]
            let cartasCertasJam = ["KT", "QT", "JT", "QJ", "KJ", "KQ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else if (achou2 && acao == "AI") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
          else {
            let cartasCertasRaise = ["JJ", "QQ", "KK", "AA", "KJ", "AT"]
            let cartasCertasJam = ["AJ", "AQ", "AK", "KQ", "55", "66", "77", "88", "99", "TT"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else if (achou2 && acao == "AI") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
        } else if (stack <= 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["K9", "Q9", "J9"]
            let cartasCertasJam = ["A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK", "KT", "QT", "JT", "QJ", "KJ", "KQ", "T9"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else if (achou2 && acao == "AI") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
          else {
            let cartasCertasRaise = [ "QQ", "KK", "AA", "KJ"]
            let cartasCertasJam = ["AT", "AJ", "AQ", "AK", "KQ", "55", "66", "77", "88", "99", "TT","JJ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else if (achou && acao == "2") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            } else if (achou2 && acao == "AI") {
              console.log("certo");
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              setStreak(streak + 1);
              chooseHand();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              setStreak(0);
              console.log("errado");
              chooseHand();
            }
          }
        }

    }
  }
  function procurar(cartasCertas, carta1, carta2) {
    for (let i = 0; i < cartasCertas.length; i++) {
      if (carta1 + carta2 === cartasCertas[i] || carta2 + carta1 === cartasCertas[i]) {
        return true;
      }
    }
    return false;
  }

  function aumentarLista(novo) {
    setListaAcertos((prevListaAcertos) => [...prevListaAcertos, novo])
  }


  return (
    <><section className="bckg">
      <div className='container_botoes'>
        <Botao nome="Fold"
          score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "FOLD")} />
        <Botao nome="2 BB" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "2")} />
        <Botao nome="2.3 BB" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "2,3")} />
        <Botao nome="2.5 BB" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "2,5")} />
        <Botao nome="All in" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "AI")} />
      </div>
      <div className='acima_botao'>
        <div>
          {/* {listaAcertos} */}
        </div>
        <div className='div_pos'>
          Posição: {posicaoAtual}<br />
          Stack: {stack} BBs {mao}
        </div>
        <div className='streak'>
          Consecutivos:<br />
          {streak}
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
