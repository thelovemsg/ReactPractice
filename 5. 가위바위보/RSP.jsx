import React, { Component } from 'react';

// 작동 순서 보기
// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount 
// -> (setState / props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
// 부모가 나르 없앨 때 -> componentWillUnmount -> 소멸

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

class RSP extends Component { 
    state = {
        result: '',
        imgCoord: rspCoord.바위,
        score: 0,
    };

    interval;

    //컴포턴크가 첫 렌더링에 성공해서 실행되면 componentDidMount가 실행된다. 
    //setState를 쓰고 싶은에 어디서 써야할지 모를 때 componentDidMount에서 쓸 수 있음
    componentDidMount() {
        this.interval = setInterval(this.changeHand, 200);
    };

    changeHand = () => {
        const {imgCoord} = this.state;
        if(imgCoord === rspCoord.바위){
            this.setState({
                imgCoord: rspCoord.가위,
            });
        } else if (imgCoord === rspCoord.가위){
            this.setState({
                imgCoord: rspCoord.보,
            });
        } else if (imgCoord === rspCoord.보){
            this.setState({
                imgCoord: rspCoord.바위,
            });
        }
    }

    //state나 props가 변경될 때 rerendering이 발생
    //리렌더링 후에 실행된다.
    //짱깬보에서는 사용 안할거임
    // componentDidUpdate() { 

    // }

    //컴포넌트가 제거되기 직전에 실행된다. 
    //componentDidMount에서 한 작업들을 제거하는 용도
    //비동기 요청 정리를 많이 함
    //비동기 처리가 남아있다면 conponentDidMount안에 일들을 여기 안에서 내가 직접 처리해줘야함. 
    componentWillUnmount() {
        clearInterval(this.interval);
    };

    // onClickBtn = (choice) => {
    onClickBtn = (choice) => () => {
        const {imgCoord} = this.state; 
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[ComputerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result: '비겼습니다!',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 200);
        }, 2000)
    }

    render() {//setState가 render안에는 들어가면 안된다.
        const {result, score, imgCoord} = this.state;
        return ( 
            <>
                {imgCoord}
                <div id="computer" style={{ background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    {/* <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button> */}
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>결과 {result}</div>
                <div>현재 {score} 점</div>
            </>
        );
    }
}

export default RSP;

// 순서 예시
// 1. class가 client.jsx에서 선언되는 순간
//      constructor 부분이랑 method 들이 class에 붙어서 처음 rendering함
// 2. 첫 렌더링이 끝나면 componentDidMount가 실행됨
// 3.  shouldComponentUpdate(nextProps, nextState, nextContext){} 의 return 값이 true 라면
//      rerendering이 일어남. 그 후 componentDidUpdate가 실행됨 (false면 rerendering 안함)
// 4. 부모가 나를 없앨 때 -> componentWillUnmount 해서 화면에서 rendering한게 사라짐

