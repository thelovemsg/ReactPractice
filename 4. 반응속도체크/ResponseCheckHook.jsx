import React,{useState, useRef} from 'react';

const ResponseCheckHook = () => {

    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]); // Hooks에서는 class의 this 속성을 ref로 표현한다. 
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef(); //값이 변하더라고 렌더링이 되지 않으면 하는 부분은 ref로 작성 - 화면에는 영향을 주지 않는다. 

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
        } else if (state === 'ready'){ // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('성급하시군요! 초록색이 된 후에 클릭해주세요!');
        } else if (state === 'now') { //반응 속도 체크 
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0 
            ? null : 
            <>
                <div>평균 시간 : {result.reduce((a,c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
    };

    return (
        <>
            <div 
                id="screen" 
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {(() => { // if 사용법 1. 즉시 실행 함수를 생생해서 만들어준다.
                if(result.length === 0){
                    return null;
                } else {
                    return (
                    <>
                        <div>평균 시간 : {result.reduce((a,c) => a + c) / result.length}ms</div>
                        <button onClick={onReset}>리셋</button>
                    </>
                    )
                }
               
             })()}
            {/* {renderAverage()} */}
        </>
    );
}


export default ResponseCheckHook;