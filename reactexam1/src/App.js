import logo from './logo.svg';
import './App.css';
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import Counter from './Counter';

function App() {

  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    init: 5
  };


  return (
    <div className="App">
      <MyHeader />
      <Counter {...counterProps} />
    </div>
  );
}

export default App;
