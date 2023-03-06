import logo from './logo.svg';
import './App.css';
import DiaryEdiotr from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "syeon",
    content: "Hi~~~",
    emotion: 3,
    created_date: new Date().getTime()
  },
  {
    id: 2,
    author: "syeon",
    content: "Lucy~",
    emotion: 5,
    created_date: new Date().getTime()
  },
  {
    id: 3,
    author: "syeon",
    content: "~~~~~",
    emotion: 2,
    created_date: new Date().getTime()
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEdiotr />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
