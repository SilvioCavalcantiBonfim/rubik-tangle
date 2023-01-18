import './App.css';
import Part from './components/Part';

function App() {

  const colors = [`#${Math.floor(Math.random()*16777215).toString(16)}`,`#${Math.floor(Math.random()*16777215).toString(16)}`,`#${Math.floor(Math.random()*16777215).toString(16)}`, `#${Math.floor(Math.random()*16777215).toString(16)}`];

  const parts = [[0,1,2,3], [2,3,1,0], [1,3,0,2], [2,3,0,1], [3,1,2,0], [3,2,1,0], [1,0,2,3], [1,0,3,2],[3,0,1,2]]

  return (
    <div className='App'>
        {
          parts.map((e,i) => (
            <Part color={e.map(ee => colors[ee])} width='30vmin' height='30vmin' key={i}/>
          ))
        }
    </div>
  );
}

export default App;
