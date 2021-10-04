import React, { useEffect , useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell: [-1,-1]
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL'; 
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

//reducer안에서 state가 어떻게 바뀔지 적어주면 된다.
const reducer = (state, action) => {
    switch (action.type){
        case SET_WINNER:
            // state.winnner = action.winner; 이렇게 하면 안됨!
            return {
                ...state, //기존 객체에서 바뀔 부분만 바꿔줘야 한다. 
                winner: action.winner, 
            }
        case CLICK_CELL:{
            const tableData = [...state.tableData];
            // 불변성 지키는게 좀 까다롭다.
            // immer라는 라이브러리로 가독성 해결
            tableData[action.row] = [...tableData[action.row]]; 
            tableData[action.row][action.cell] = state.turn; 
            return {
                ...state, 
                tableData,
                recentCell: [action.row, action.cell], 
            }
        }
        case CHANGE_TURN: {
            console.log("changeTurn!!!");
            console.log('state.turn ":: ' + state.turn);
            return{
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell: [-1,-1]
            }
        }
        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
    // 실제 클릭하는 애들은 Td임
    // state는 현재 가장 부모님 TicTacToe.jsx에서 관리하는데 그것을 Td까지 데이터를 전달해주려면
    // TicTacToe에서 Table로, Table 에서 Tr로, Tr에서 Td로 전해줘야 하는데
    // 값이 생길때마다 winner, turn, tableData를 일일이 다 전달해줘야한다 => what the hell ㅠㅠ 
    // 이것을 좀 편하게 사용하는 것이 ContextAPI! 지뢰찾기 강좌에서 다룰 예정이란다
    // 여기서는 useReducer만 이용한다고 한다. 

    const onClickTable = useCallback(() => { // component에 넣는 함수들은 다 useCallback => 불필요한 rerendering방지
        dispatch({ type: SET_WINNER, winner: 'O'}); // action.type 과 action.winner설정
        //action을 해석해서 state를 직접 바꿔주는 역할을 하는 것이 reducer다!
        //action을 dispatch할 때마다 reducer 실행
    }, []);
    
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0){
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }
        console.log("turn :: " + turn);
        console.log("win :: " + win);
        if (win){
            dispatch({ type: SET_WINNER, winner: turn }); 
            dispatch({ type: RESET_GAME }); 
        } else {
            console.log('no winner');
            let all = true; // => 무승부라는 뜻
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell){
                        all = false;
                    }
                });
            });
            console.log(all);
            if (all) {
                dispatch({ type: RESET_GAME}); 
            }else {
                console.log("change turn");
                dispatch({ type: CHANGE_TURN})
                console.log(turn);
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner  && <div>{winner}님의 승리!</div>}
        </>
    )
};

export default TicTacToe;