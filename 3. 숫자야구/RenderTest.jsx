import React, {PureComponent} from 'react';

class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [{ inside : [3]}],
    };

    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     if(this.state.count !== nextState.counter){
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        const obj = this.state.array[0].inside;
        obj.push(4);
        this.setState({
            array: [...this.state.object],
        });
    }

    render(){
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onCLick}>클릭!</button>        
            </div>
        )
    }
}

export default Test;