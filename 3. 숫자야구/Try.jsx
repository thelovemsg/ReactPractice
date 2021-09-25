import React, {PureComponent, memo, useState} from 'react';

// const Try = memo(({tryInfo}) => { // 구조분해하면 코드 줄어들음!
//     // props를 변경할 일이 있으면 직접 변경하기 말고 state을 만들어서 변경한다!
//     // 자식이 부모의 props를 변경하면 부모가 뜻하지 않게 바뀌면서 문제가 된다!
//     const [result, setResult] = useState(tryInfo.result); 

//     const onClick = () => {
//         setResult('1');
//     };

//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div onClick={onClick}>{tryInfo.result}</div>
//         </li>
//     )
// });

class Try extends PureComponent { // props나 state가 변경되는 순간 render링 한다. 
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         result: this.props.result,
    //         try: this.props.try,
    //     };
    // }
    render() {
        const {tryInfo} = this.props;
        return (//props를 보면 아! 부모가 있다고 받아들이면 된다. 
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

export default Try;