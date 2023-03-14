import logo from './logo.svg';
import './App.css';
import DiaryEdiotr from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useRef } from 'react';
import LifeCycle from './LifeCycle';

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    const newDiaryLlist = data.filter((it) => it.id !== targetId);
    setData(newDiaryLlist);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map( (it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <LifeCycle />
      <DiaryEdiotr onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
