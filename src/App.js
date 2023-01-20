import './App.css';
import Part from './components/Part';

function App() {

  const colors = ((Hue) => [`hsl(${Hue}, 80%, 50%)`, `hsl(${Hue + 90}, 80%, 50%)`, `hsl(${Hue + 180}, 80%, 50%)`, `hsl(${Hue + 270}, 80%, 50%)`])(Math.floor(Math.random() * 360));

  const parts3x3 = [[0, 1, 2, 3], [2, 3, 1, 0], [1, 3, 0, 2], [2, 3, 0, 1], [3, 1, 2, 0], [3, 2, 1, 0], [1, 0, 2, 3], [1, 0, 3, 2], [3, 0, 1, 2]]

  return (
    <div className='App'>
      <header>
        <div>
          <button>3x3</button>
        </div>
        <h1>Rubik's Tangle</h1>
        <div>
          <button>?</button>
        </div>
      </header>
      <main>
        <div className='boardParts'>
          {
            parts3x3.map((e, i) => (
              <Part color={e.map(ee => colors[ee])} width={`${90 / 5}vmin`} height={`${90 / 5}vmin`} key={i} />
            ))
          }
        </div>
        <section/>
      </main>
    </div>
  );
}

export default App;
