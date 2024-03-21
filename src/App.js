import './App.css';
import { useEffect, useRef, useState } from 'react';
import Botao from './components/Botao';
import Cartas from './components/Cartas';
import Mesa from './components/Mesa/mesa';
import deckBack from './assets/indiv/deck/back.png';
import certo from './assets/v.png';
import errado from './assets/x.png';

function App() {
  const cartas = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  const naipes = ["c", "d", "s", "h"];
  // add Sb depois
  const posicoes = ["EP", "EP1", "MP", "HJ", "CO", "BT"]
  const [listaAcertos, setListaAcertos] = useState([]);
  const [mao, setMao] = useState([]);
  const [listaAcertosIMG, setListaAcertosIMG] = useState([]);
  const [testemao, setTestemao] = useState([]);
  const [posicaoAtual, setPosicaoAtual] = useState();
  const [stack, setStack] = useState();
  const [streak, setStreak] = useState(0);
  const [erros, setErros] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [animacao,setAnimacao] = useState(true);
  const barralista = useRef(null);


  useEffect(() => {
    chooseHand();
  }, []);

  useEffect(() => {
    if (barralista.current) {
      barralista.current.scrollLeft = barralista.current.scrollWidth;
    }
  }, [listaAcertos])

  function chooseHand() {
    
    let naipe1 = Math.floor(Math.random() * 4);
    let carta1 = Math.floor(Math.random() * 13);
    let naipe2 = Math.floor(Math.random() * 4);
    let carta2 = Math.floor(Math.random() * 13);
    // 6 pq ta sem SB ainda
    let pos = Math.floor(Math.random() * 6);
    let stack = 0
    while (stack < 8) {
      stack = Math.floor(Math.random() * 40);
    }
    setStack(stack);
    while (carta1 == carta2 && naipe1 == naipe2) {
      carta2 = Math.floor(Math.random() * 12);
      naipe2 = Math.floor(Math.random() * 4);
    }

    let hand = [cartas[carta1], naipes[naipe1], cartas[carta2], naipes[naipe2]];
    setMao(hand);
    console.log(cartas[carta1], naipes[naipe1], cartas[carta2], naipes[naipe2] + " " + stack + " " + posicaoAtual);
    setTestemao([carta1, carta2, naipes[naipe1], naipes[naipe2]]);
    setPosicaoAtual(posicoes[pos])
    setAnimacao(true);
    
    setTimeout(()=>{
      setAnimacao(false);
    },200)

  }

  function Score(pos, carta1, naipe1, carta2, naipe2, stack, mao, acao) {
    console.log(acao)
    switch (pos) {
      case "EP":
      case "EP1":
        if (stack > 20) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K9", "KT", "KJ", "KQ", "Q9", "QT", "QJ", "J9", "JT", "T8", "T9", "98", "87", "76", "65", "54"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertas = ["22", "33", "44", "55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 20 && stack > 16) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "KT", "KJ", "KQ", "Q8", "Q9", "QT", "QJ", "JT", "J9", "T9"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertas = ["55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 16 && stack > 13) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "KT", "KJ", "KQ", "Q8", "Q9", "QT", "QJ", "JT", "J9", "T9"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertas = ["55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 13 && stack > 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "Q8", "Q9", "J9", "T9"]
            let cartasCertasJam = ["KT", "QT", "JT", "QJ", "KJ", "KQ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["JJ", "QQ", "KK", "AA", "KJ", "AT"]
            let cartasCertasJam = ["AJ", "AQ", "AK", "KQ", "55", "66", "77", "88", "99", "TT"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["K9", "Q9", "J9"]
            let cartasCertasJam = ["A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK", "KT", "QT", "JT", "QJ", "KJ", "KQ", "T9"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["QQ", "KK", "AA", "KJ"]
            let cartasCertasJam = ["AT", "AJ", "AQ", "AK", "KQ", "55", "66", "77", "88", "99", "TT", "JJ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        break;
      case "MP":
      case "MP1":
      case "LJ":
      case "HJ":
        if (stack > 20) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K9", "KT", "KJ", "KQ", "Q9", "QT", "QJ", "J9", "JT", "T8", "T9", "98", "87", "76", "65", "54",
              "86", "97", "T7", "J8", "Q8", "K4", "K5", "K6", "K7", "K8"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertas = ["22", "33", "44", "55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ", "KT", "QJ", "QT", "JT"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 20 && stack > 16) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "KT", "KJ", "KQ", "Q8", "Q9", "QT", "QJ", "JT", "J9", "T9",
              "K7", "K6", "Q7", "J8", "T8"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertas = ["22", "33", "44", "55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ", "KT", "QJ"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 16 && stack > 13) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "Q8", "Q9", "J9", "T9", "K7", "K6", "K5", "Q7", "Q6", "J8", "T8", "98"]
            let cartasCertasJam = ["KT", "QT", "JT", "QJ", "KJ", "KQ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["A8", "A9", "AT", "AJ", "AQ", "AK",
              "KJ", "KT", "QJ", "QT", "JT", "99", "TT", "JJ", "QQ", "KK", "AA"]
            let cartasCertasJam = ["55", "66", "77", "88", "KQ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 13 && stack > 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["AT", "AJ", "AQ", "AK", "K8", "K7", "K6", "K5", "Q8", "Q7", "J8", "T8"]
            let cartasCertasJam = ["KT", "QT", "JT", "QJ", "KJ", "KQ", "K9", "Q9", "J9", "T9", "A2", "A3",
              "A4", "A5", "A6", "A7", "A8", "A9"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["JJ", "QQ", "KK", "AA", "KT", "QT", "QJ", "JT"]
            let cartasCertasJam = ["A8", "A9", "AT", "AJ", "AQ", "AK", "KQ", "KJ", "22", "33", "44", "55", "66", "77", "88", "99", "TT"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["K8", "Q8", "J8", "K7", "K6"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "KT", "QT", "JT", "QJ", "KJ", "KQ", "T9", "K9", "Q9", "J9"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["QQ", "KK", "AA", "KT"]
            let cartasCertasJam = ["A8", "A9", "AT", "AJ", "AQ", "AK", "KQ", "KJ",
              "22", "33", "44", "55", "66", "77", "88", "99", "TT", "JJ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        break;
      case "CO":
        if (stack > 20) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K9", "KT", "KJ", "KQ", "Q9", "QT", "QJ", "J9", "JT", "T8", "T9", "98", "87", "76", "65", "54",
              "86", "97", "T7", "J8", "Q8", "K4", "K5", "K6", "K7", "K8",
              "K3", "K2", "Q7", "Q6", "Q5", "Q4", "Q3", "J6", "J7", "75", "64", "53"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertas = ["22", "33", "44", "55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ", "KT", "QJ", "QT", "JT",
              "A7", "A6", "A5", "A4", "A3", "A2", "K8", "K9", "Q9", "J9", "T9"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 20 && stack > 16) {
          if (naipe1 == naipe2) {
            let cartasCertas = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "K8", "K9", "KT", "KJ", "KQ", "Q8", "Q9", "QT", "QJ", "JT", "J9", "T9",
              "K7", "K6", "Q7", "J8", "T8",
              "K5", "K4", "K3", "K2", "Q6", "Q5", "Q4", "Q3", "Q2", "J8", "J7", "J6", "J5", "J4", "J3", "J2",
              "T7", "T6", "98", "97", "87"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertas = ["22", "33", "44", "55", "66", "77", "88", "99", "TT", "JJ", "QQ", "KK", "AA",
              "AT", "AJ", "AQ", "AK", "KQ", "KJ", "KT", "QJ",
              "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "K8", "K9", "Q9", "QT", "JT"]
            let achou = procurar(cartasCertas, carta1, carta2, mao);
            if (!achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 16 && stack > 13) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["AT", "AJ", "AQ", "AK", "K8", "K9", "Q8", "Q9", "J9", "T9",
              "K7", "K6", "K5", "Q7", "Q6", "J8", "T8", "98",
              "K4", "K3", "K2", "Q5", "Q4", "J7", "T7", "97", "87", "76"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "KT", "QT", "JT", "QJ", "KJ", "KQ", "T9"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["AK", "A3", "A4", "A5", "A6", "A7", "K9", "KT", "QJ", "QT", "Q9", "JT", "J9", "T9",
              "88", "99", "TT", "JJ", "QQ", "KK", "AA"]
            let cartasCertasJam = ["A8", "A9", "AT", "AJ", "AQ", "22", "33", "44", "55", "66", "77", "KQ", "KJ"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 13 && stack > 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["AT", "AJ", "AQ", "AK", "K8", "K7", "K6", "K5", "Q8", "Q7", "J7", "T7",
              "K4", "K3", "K2", "Q6", "Q5", "97", "87"]
            let cartasCertasJam = ["KT", "QT", "JT", "QJ", "KJ", "KQ", "K9", "Q9", "J9", "T9", "J8", "T8", "98",
              "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["88", "99", "TT", "JJ", "QQ", "KK", "AA", "K9", "Q9", "A3", "A2"]
            let cartasCertasJam = ["A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK", "KQ", "KJ", "KT", "JQ", "QT", "JT",
              "22", "33", "44", "55", "66", "77", "88", "99", "TT"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["K5", "K6", "87"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "KT", "QT", "JT", "QJ", "KJ", "KQ", "T9", "K9", "Q9", "J9", "K8", "Q8", "J8", "T8", "98", "K7"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["JJ", "QQ", "KK", "AA", "KT"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK", "KQ", "KJ",
              "22", "33", "44", "55", "66", "77", "88", "99", "TT", "QJ", "KT", "QT", "JT"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        break;
      case "BT":
        if (stack > 20) {
          if (naipe1 == naipe2) {
            if (acao == "2,5") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasErradas = ["32", "42", "52", "62", "72", "82", "92", "T2", "J2",
              "Q2", "53", "63", "73", "83", "93", "T3", "J3", "64", "74", "84", "94", "T4", "J4", "85", "95", "T5", "J5"]
            let achou = procurar(cartasErradas, carta1, carta2, mao);
            if (!achou && acao == "2,5") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 20 && stack > 16) {
          if (naipe1 == naipe2) {
            let cartasErradas = ["92", "82", "72", "62", "52", "42", "32"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "QT", "JT"]
            let achou = procurar(cartasErradas, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (!achou && !achou2 && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasErradas = ["32", "42", "52", "62", "72", "82", "92", "T2", "J2", "Q2", "K2",
              "43", "53", "63", "73", "83", "93", "T3", "J3", "Q3", "K3", "76", "86", "96",
              "54", "64", "74", "84", "94", "T4", "J4", "Q4", "K4", "65", "75", "85", "95", "T5", "J5"]
            let cartasCertasJam = ["A7", "A8", "KQ", "KJ", "22", "33", "44", "55", "66", "77"]
            let achou = procurar(cartasErradas, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (!achou && !achou2 && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 16 && stack > 13) {
          if (naipe1 == naipe2) {
            let cartasErradas = ["92", "82", "72", "62", "52", "42", "32", "63", "73", "83", "93", "74", "84", "94"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "QT", "JT", "KT", "QJ", "KJ", "KQ",
              "K9", "Q9", "J9", "T9", "T8", "98"]
            let achou = procurar(cartasErradas, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (!achou && !achou2 && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasErradas = ["32", "42", "52", "62", "72", "82", "92", "T2", "J2", "Q2", "K2",
              "43", "53", "63", "73", "83", "93", "T3", "J3", "Q3", "76", "86", "96", "T6",
              "54", "64", "74", "84", "94", "T4", "J4", "65", "75", "85", "95", "T5", "J5"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ",
              "KQ", "KJ", "KT", "QJ", "QT", "JT", "22", "33", "44", "55", "66", "77"]
            let achou = procurar(cartasErradas, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (!achou && !achou2 && acao == "2,3") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 13 && stack > 10) {
          if (naipe1 == naipe2) {
            let cartasErradas = ["92", "82", "72", "62", "52", "42", "32", "63", "73", "83", "93"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "QT", "JT", "KT", "QJ", "KJ", "KQ",
              "K9", "Q9", "J9", "T9", "T8", "98", "J8", "Q8", "K8", "87", "97", "T7", "J7", "Q7", "K7",
              "Q6", "K6", "K5", "K4", "K3"]
            let achou = procurar(cartasErradas, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (!achou && !achou2 && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasErradas = ["32", "42", "52", "62", "72", "82", "92", "T2", "J2", "Q2", "K2",
              "43", "53", "63", "73", "83", "93", "T3", "J3", "Q3", "76", "86", "96", "T6", "J6",
              "54", "64", "74", "84", "94", "T4", "J4", "Q4", "65", "75", "85", "95", "T5", "J5"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "KQ", "KJ", "KT", "K9", "QJ", "QT", "JT", "J9", "22", "33", "44", "55", "66", "77", "88", "99"]
            let achou = procurar(cartasErradas, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (achou && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (!achou && !achou2 && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        else if (stack <= 10) {
          if (naipe1 == naipe2) {
            let cartasCertasRaise = ["K2", "Q2", "Q3", "Q4", "Q5"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK",
              "QT", "JT", "KT", "QJ", "KJ", "KQ",
              "K9", "Q9", "J9", "T9", "T8", "98", "J8", "Q8", "K8", "87", "97", "T7", "J7", "Q7", "K7",
              "Q6", "K6", "K5", "K4", "K3"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
          else {
            let cartasCertasRaise = ["JJ", "QQ", "KK", "AA", "K8", "K7", "K6", "K5", "Q9", "Q8", "Q7", "J8", "T8", "98"]
            let cartasCertasJam = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AT", "AJ", "AQ", "AK", "KQ", "KJ", "KT", "K9",
              "22", "33", "44", "55", "66", "77", "88", "99", "TT", "QJ", "QT", "JT", "J9"]
            let achou = procurar(cartasCertasRaise, carta1, carta2, mao);
            let achou2 = procurar(cartasCertasJam, carta1, carta2, mao);
            if (!achou && !achou2 && acao == "FOLD") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else if (achou && acao == "2") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            } else if (achou2 && acao == "AI") {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " C ");
              aumentarListaIMG(certo);
              acertou();
            }
            else {
              aumentarLista(mao[0] + mao[1] + mao[2] + mao[3] + " E ");
              aumentarListaIMG(errado);
              errou();
            }
          }
        }
        break;
    }
    chooseHand();
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
  function aumentarListaIMG(novo) {
    setListaAcertosIMG((prevListaAcertos) => [...prevListaAcertos, novo])
  }
  function acertou() {
    setAcertos(acertos + 1);
    setSaldo(saldo + 1);
    setStreak(streak + 1);
  }
  function errou() {
    setErros(erros + 1);
    setSaldo(saldo - 1);
    setStreak(0);
  }

  return (
    <section className="bckg">
      <div className='container_botoes'>
        <Botao nome="Fold"
          score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "FOLD")} />
        <Botao nome="2 BB" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "2")} />
        <Botao nome="2.3 BB" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "2,3")} />
        <Botao nome="2.5 BB" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "2,5")} />
        <Botao nome="All in" score={() => Score(posicaoAtual, cartas[testemao[0]], testemao[2], cartas[testemao[1]], testemao[3], stack, mao, "AI")} />
      </div>
      <div className='acima_botao'>
        <div className='cointeinerListas' ref={barralista}>
          <div className='caixaLista'>
            {listaAcertos}
          </div>
          <div className='listaIMG'>
            {listaAcertosIMG.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
        <div className='div_pos'>
          Posição: {posicaoAtual}<br />
          Stack: {stack} BBs
        </div>
        <div className='streak'>
          Consecutivos:<br />
          {streak}<br />
          E / C / S<br />
          {erros} / {acertos} / {saldo}
        </div>
      </div>
      <section className='fundo'>
        <Mesa posicaoAtual={posicaoAtual} />

        <Cartas mao={mao} testemao={testemao} deckBack={deckBack} animacao={animacao}/>

        <div className='secondCards'>
          <div>
            <img src={deckBack} />
            <img src={deckBack} />
          </div>
          <div>
            <img src={deckBack} />
            <img src={deckBack} />
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
            Pot : 2,5bb
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
    </section>
  );
}

export default App;
