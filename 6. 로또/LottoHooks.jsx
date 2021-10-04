import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber];
}


const Lotto = () => {
    //useMemo는 Hooks에서 값을 기억하는 방법이다.
    //값을 받아오는 함수가 오래 걸린다면 이렇게 해야 한다. 
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    //hooks에서 선언된 변수는 순서가 중요하다. 
    //실행순서는 항상 동일하게 지켜줘야 한다. 조건문 안에도 넣으면 안된다. 

    // useEffect(() => {
    //     //ajax
    // }, []); // componentDidMount만 하고 싶으면 이렇게

    // const mounted = useRef(false);
    // useEffect(() => {
    //     if(!mounted.current){
    //         mounted.current = true;
    //     } else{
    //         //ajax
    //     }
    // }, [바뀌는값]); // componentDidUpdate만 하고 싶으면 이렇게, componentDidMount x

    useEffect(() => {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length-1; i++){
            timeouts.current[i] =setTimeout(() => { // timeouts의 current의 요소에 넣어줌 => timeouts자체가 바뀌는게 아님
                setWinBalls((prevBalls) => {
                    return [...prevBalls, winNumbers[i]];
                })
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    }, [timeouts.current]); 

    useEffect(() => {
        console.log('로또 숫자를 생성합니다!');
    }, [winNumbers]);

    // inputs자리가 빈 배열이면 componentDidMount랑 똑같음
    // 배열에 요소가 있으면 componentDidMount, componentDidUpdate 둘 다 수행
    // timeouts.current가 변할때 까지 useEffect는 실행하지 않음

    //useCallback으로 감싸게 되면 함수 자체를 기억하게됨 => 
    //재실행해도 새로 생성되지가 않는다. 
    //함수를 재생성할때 비용이 너무 크면 이렇게 한다. 
    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; // timeouts자체가 바뀜
    }, [winNumbers]); //  inputs에 넣어준 값 따라서 언제 다시 실행해야 하는지 알려줌
    //winNumbers가 바뀌기 전까지 바뀌지 않는다. 

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                { winBalls && winBalls.map((v) => 
                    <Ball key={v} number={v} />) } 
                {/* Ball component를 따로 빼면 재사용성 증가 */}
            </div>
            <div>보너스!</div>
            {/* 자식 컴포넌트에 함수를 넘길때는 그 함수에 useCallback을 꼭 해줘야 함 */}
            {bonus && <Ball number={bonus} /> }
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
}

export default Lotto;