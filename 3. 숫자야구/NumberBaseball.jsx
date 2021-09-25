import React, {Component, createRef} from 'react';
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

class NumberBaseball extends Component{

    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex : [1,3,5,7] 
        tries: [], // push 쓰면 안됌!
    };

    onSubmitForm = (e) => {
        const {result, value, tries, answer} = this.state;
        e.preventDefault();
        if(value === answer.join('')){
            this.setState( (prevState) => { // 현재 값을 변경하는 경우에는 함수 형으로 사용해야 한다고 한다.
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: value, result:'홈런!'}],
                }
            });
            this.inputRef.current.focus();
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){
                this.setState({
                    result:`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                alert("게임을 다시 시작합니다!");
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            }else{
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState( (prevState) => {
                    return {
                        value: '',
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}]
                    }
                });
            }
            this.inputRef.current.focus();
        };
        console.log(value);
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    inputRef = createRef();

    // onInputRef = (c) => {
    //     console.log("testing onInputRef");
    //     this.inputRef = c;
    // }

    render(){
        const {result, value, tries} = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/> 
                    { /*jsx는 주석이 이럼*/ }
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {(() => {
                        const array;
                        for (let i = 0; i < tries.length; i++){
                            array.push(<Try key={`${i + 1}차 시도`} tryInfo={v} /> );
                        }
                        return array;
                    })()}
{/* 
                    {tries.map((v, i) => {
                            return (
                                <Try key={`${i + 1}차 시도`} tryInfo={v} /> 
                                // Component를 따로 뺌 => 가독성 업, 재사용성 업, 성능 최적화에 좋음
                                //기존 데이터를 props로 전달
                                //NubmerBaseball이 Try의 부모가 된다. 
                                // props! key는 unique하게 만들어야 한다. => 귀찮을지라도 어쩔수 없다!
                            )
                        }
                    )} */}
                </ul>
            </>
        )
    }
}

export default NumberBaseball;