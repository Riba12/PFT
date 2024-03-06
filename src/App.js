import logo from './logo.svg';
import './App.css';

function App() {
  const [cartas, setCartas] = useState(["2", "3", "4", "5", "6", "7", "9", "T", "J", "K", "Q", "A"]);
  const [naipes, setNaipes] = useState(["c", "d", "s", "h"]);

  function chooseHand() {

    let naipe1 = Math.floor(Math.random() * 4);
    let carta1 = Math.floor(Math.random() * 12);
    let hand = [cartas[carta1],naipes[naipe1]];

    console.log(naipe1, carta1)
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
