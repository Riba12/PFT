import './App.css';
import { useState } from 'react';

function App() {
  const [cartas, setCartas] = useState(["2", "3", "4", "5", "6", "7", "9", "T", "J", "K", "Q", "A"]);
  const [naipes, setNaipes] = useState(["c", "d", "s", "h"]);

  function chooseHand() {

    let naipe1 = Math.floor(Math.random() * 4);
    let carta1 = Math.floor(Math.random() * 12);
    let naipe2 = Math.floor(Math.random() * 4);
    let carta2 = Math.floor(Math.random() * 12);

    while(carta1 == carta2 && naipe1 == naipe2){
      carta2 = Math.floor(Math.random() * 12);
      naipe2 = Math.floor(Math.random() * 4);
    }

    let hand = [cartas[carta1], naipes[naipe1],cartas[carta2],naipes[naipe2]];

    
    console.log(hand)
    return hand
  }

  let mao = chooseHand();
  return (
    <div className="bckg">

      {mao}
    </div>
  );
}

export default App;
