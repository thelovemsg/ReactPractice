import React, {useState, memo, useRef} from 'react';
import Try from './Try';

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i =0; i < 4; i += 1){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseballHook = memo(() => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputEl = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런!')
            setTries((prevTries) => {
                return [...prevTries, {try: value, result:'홈런!'}]
            } )
            alert("게임을 다시 시작합니다.");
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9){
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
                alert("게임을 다시 시작합니다!");
                setValue('');
                setAnswer(getNumbers());
            }else{
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries((prevTries) => 
                    [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]
                )
            }
        };
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput}/>
                {/* 현재 구조에서는 value가 변할때마다 함수 component는 그 함수 자체가 통째로 다시 실행됨*/}
                { /*jsx는 주석이 이럼*/ }
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도`} tryInfo={v} /> 
                            // Component를 따로 뺌 => 가독성 업, 재사용성 업, 성능 최적화에 좋음
                            //기존 데이터를 props로 전달
                            //NubmerBaseball이 Try의 부모가 된다. 
                            // props! key는 unique하게 만들어야 한다. => 귀찮을지라도 어쩔수 없다!
                        )
                    }
                )}
            </ul>
        </>
    )
});

export default NumberBaseballHook;