react는 
index.js에서 id 가 root 인 요소의 자식으로 app컴포넌트를 추가하면서 화면에 나타난다.


Lifecycle = 생애주기
react component도 lifecycle을 가진다.
탄생    => 변화    => 죽음
Mount     Update    UnMount

Mount : 화면에 나타나는 것  ex) 초기화 작업
Update : 업데이트(리렌더)  ex) 예외 처리 작업
UnMount : 화면에서 사라짐  ex) 메모리 정리 작업

lifecycle을 제어한다? 각각의 사이클에서 어떤 작업을 수행시킨다.


ComponentDidMount
ComponentDidUpdate
ComponentWillUnmount
class형 컴포넌트에서만 사용가능
=> 우리는 대부분 함수형 컴포넌트 들만 사용해왔음
state라는 기능도 원래는 함수형 컴포넌트에서 사용 불가
usestate
React Hooks
- 클래스형 컴포넌트들이 가지고있는 기능들을 use키워드를 통해 함수형 컴포넌트에서도 사용할 수 있도록 하는 기능
- ex) useState, useRef, uesEffect

왜 클래스형 컴포넌트를 사용하지않고 굳이 함수형 컴포넌트에서 react hooks를 이용해 사용할까?
클래스형 함수의 단점 때문에
- 함수형 컴포넌트에 비해 구현을 위한 코드가 길고 복잡하며
특히 중복 코드, 가독성 문제 등을 해결하기 위해 함수형 컴포넌트 사용한다.

useEffect( ()=>{} , [])
useEffect는 callBack함수, Dependency Array(의존성 배열) 이렇게 두개의 파라미터를 넘겨준다.
의존성 배열에 들어있는 값이 하나라도 변화하면 콜백함수가 실행된다.




React 연산 최적화
- Memoization
이미 계산 해 본 연산 결과를 기억해 두었다가
동일한 계산을 시키면, 다시 연산하지 않고 기억 해 두었던 데이터를 반환 시키케 하는 방법


useMemo( ()=>{} , [])
useMemo callBack함수, Dependency Array(의존성 배열) 이렇게 두개의 파라미터를 넘겨준다.
의존성 배열에 들어있는 값이 하나라도 변화하면 콜백함수가 실행된다.
useMemo는 콜백함수의 리턴값이 리턴되기때문에 
const getData = useMemo();
getData() 가 아니라 getData 이렇게 사용해줘야한다.



const CounterB = React.memo((obj) => {
    useEffect(() => {
        console.log(obj.count);
    })
});

<button onClick={() => {setObj({count: obj.count})}}>

이런 경우에 count에 obj.count가 그대로 들어가서 rerender가 안될거같지만 실행해보면 rerender된다.
객체를 비교할 때는 얕은 비교로 객체의 값이 아닌 객체의 주소를 통해 비교하므로 다른 props로 인식하기때문이다.

let a = { count: 1 }
let b = { count: 1 }
if (a === b) {
    console.log("EQUAL");
} else {
    console.log("NOT EQUAL");
}

결과는 NOT EQUAL

let a = { count: 1 }
let b = a;
if (a === b) {
    console.log("EQUAL");
} else {
    console.log("NOT EQUAL");
}

결과는 EQUAL

React.memo(MyComponent, areEqual)
React.memo에 두번째 인자로 props를 비교하는 함수를 넘겨줄 수 있다.
이것을 통해 비교하면 된다.


 const onCreate = useCallback((author, content, emotion) => {
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
  }, []);

위에처럼 setData([newItem, ...data]) 으로 
사용하면 Dependency 배열이 []으로 들어가 처음에 렌더 될때 한번만 콜백함수가 실행된다.
그렇게 되면 setData([newItem, ...data]) 에서 data 스테이트는 항상 처음 렌더될 때의 빈 배열만
가져오기때문에 데이터가 제대로 들어가지 않는다.
이걸 해결하기 위해서 setData()에 함수형으로 data 스테이트를 가져오도록해서 
항상 최신의 스테이트를 가져오게 된다.
밑에 처럼 사용해주면 된다.

 const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData((data)=> [newItem, ...data]);
  }, []);


useReducer => 컴포넌트 안에 함수같은 것들 다 넣으니까 길어져서 밖으로 뺄 수 있게 해줌
dispatch 상태변화를 발생시키는 함수에 {type: 1} 와 같은 Action 객체를 넘겨준다
Action 객체는 reducer 함수로 
상태변화 처리는 reducer 함수가 처리한다.
reducer가 리턴하는 값이 새로운 상태의 값이 된다.



Context
부모에서 자식으로 단방향으로만 데이터가 이동할 수 있는 react의 특성때문에
컴포넌트에서 사용하지 않고 그냥 거쳐가기만 하는 prop들이 있다.
=> props drilling


export default 는 파일 하나당 한개만 사용할 수 있다.
나머지는 export를 사용해야한다.
export default를 사용하면 이름을 변경해서 import 받을 수 도 있다.
export를 사용한 것은 비구조화할당을 통해서만 import를 받을 수 있고 이름을 변경할 수 없다.

Context provider를 통해 data처럼 dispatch를 전달해주면 될거같지만 그러면 안된다.
context.provider도 컴포넌트이기 때문에 prop이 바뀌면 재생성 된다.
provider 컴포넌트가 재생성 되면 그 밑에 컴포넌트들도 모두 재생성된다.
onRemove onCreate같은 dispatch들 value로 보내면 data state가 바뀔때마다 리렌더링 되어서 최적화가 소용없어진다.
이럴 땐 dispatch를 위한 context를 하나 더 생성해서 사용해주면 된다.


onCreate, onRemove, onEdit 같은 함수들을 변하지 않기 때문에 useMemo를 이용해서 항상 같은 값을 전달해줘서
재생성이 되지 않도록 해준다.
  const disaptches = {
    onCreate, onDelete, onEdit
  }; => 이렇게 하면 App컴포넌트가 재생성 될 때 이 dispatch들도 재생성 된다.

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onDelete, onEdit};
  }, []);
  => 이렇게 useMemo에 빈배열을 넣어줘서 재생성 되지 않도록 해준다.

  memoizedDispatches에서 3개의 함수를 객체로 넘겨주기 때문에
  const {onCreate} = useContext(DiaryDispatchContext); 이렇게 비구조화 할당으로 가져와야 한다.



react-router-dom의  BrowserRouter사용해서 보여준다.
Routes 컴포넌트 부분이 path 에 따라서 바뀌는 영역이다.
a태그 사용해서 페이지를 이동하면 spa가 아니라 mpa로 새로 페이지를 받아오기때문에
Link를 이용해서 전체 페이지 리로드가 아니라 컴포넌트가 바뀔 수 있도록 해준다.

url경로가 변경되면 컴포넌트를 바꿔줘서 페이지가 바뀌는 것 처럼 보여준다.
페이지 전환 시 깜빡임 없고 이동속도 빠르다


react가 제공하는 hook이 아닌 라이브러리가 제공하는 hook

React Router Dom의 기능
React Router v6
React 에서 CSR기반의 페이지 라우팅을 할 수 있게 해주는 라이브러리

1. PAth Variavle - useParams
useParams - path variable들을 객체로 전달해준다. 


2. Query String - useSearchParams
?뒤에 있는 것들이 url경로에 영향을 주지않는다
const [searchParams, setSearchParams] = useSearchParams();
배열 비구조화 할당으로 받고 setSearchParams을 통해 쿼리 스트링을 바꿔줄수도 있다.

3. Page Moving - useNavigate

