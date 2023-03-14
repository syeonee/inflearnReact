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