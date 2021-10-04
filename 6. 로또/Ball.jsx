import React, { memo } from 'react'
//제일 마지막에 있는 자식컴포넌트는 PureComponent를 많이 쓴다고 한다. 
// 데이터를 담기보단 화면 역할만 하기 때문이란다. 

//함수 컴포넌트. Hooks아님. high-order component 
const Ball = memo(({ number }) => {
    let background;
    if (number <= 10){
        background = 'red';
    } else if (number <= 20){
        background = 'orange';
    } else if (number <= 30){
        background = 'yellow';
    } else if (number <= 40){
        background = 'blue';
    } else{
        background = 'green';
    }
    return(
        <div className="ball" style={{background}}>{number}</div>
    )
});

export default Ball;