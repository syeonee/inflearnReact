import logo from './logo.svg';
import './App.css';
import DiaryEdiotr from './DiaryEditor';
import DiaryList from './DiaryList';
import { useMemo, useState, useRef, useEffect } from 'react';
import OptimizeTest from './OptimizeTest';



function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0,20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random()*5) + 1,
        id : dataId.current++
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  },[]);

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

  const dataAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion > 3).length;
    const bedCount = data.length-goodCount;
    const goodRatio = (goodCount/data.length) * 100;
    return {goodCount, bedCount, goodRatio};
  }, [data.length]);

  const {goodCount, bedCount, goodRatio} = dataAnalysis;

  return (
    <div className="App">
      <OptimizeTest />
      <DiaryEdiotr onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {bedCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
