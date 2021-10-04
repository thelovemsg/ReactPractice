import React, { useState, useRef, useEffect, memo, useLayoutEffect } from 'react';

// 작동 순서 보기
// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount 
// -> (setState / props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나를 없앨 때 -> componentWillUnmount -> 소멸

const rspCoord ={
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const ComputerChoice = (imgCoord) => {
    return Object.entries(rspCoord).find(function(v){
        return v[1] === imgCoord;
    })[0];
};

//                      result, imgCoord, score
// componentDidmount
// componentDidUpdate
// componentWillUnmount
// 

const RSPHooks = memo(() => {

    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoord.바위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect (() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님). useEffect를 여러번 사용할 수도 있음
        interval.current = setInterval(changeHand(),100);
        return () => { // componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]); //useEffect를 실행하고 싶은 state 를 배열 안에 넣어줘야 한다.  

    const changeHand = () => {
        if(imgCoord === rspCoord.바위){
            setImgCoord(rspCoord.가위);
        } else if (imgCoord === rspCoord.가위){
            setImgCoord(rspCoord.보);
        } else if (imgCoord === rspCoord.보){
            setImgCoord(rspCoord.바위);
        }
    }

    const onClickBtn = (choice) => () => {
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[ComputerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            setResult('비겻습니다!');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + -1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 200);
        }, 2000)
    }
    
    return ( 
        <>
            {imgCoord}
            <div id="computer" style={{ background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                {/* <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button> */}
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>결과 {result}</div>
            <div>현재 {score} 점</div>
        </>
    );
});

export default RSPHooks;

