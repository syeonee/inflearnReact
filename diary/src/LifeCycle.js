import React,{useEffect,useState} from 'react';

const LifeCycle = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    return (
        <div>
            <div>
                {count}
                <button onClick={() => setCount(count+1)}>+</button>
            </div>
            <div>
                <input value={count} onChange={(e) => setText(e.target.value)} />
            </div>
        </div>
    );
}

export default LifeCycle;