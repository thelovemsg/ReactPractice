import React, {useContext, useCallback, memo, useMemo} from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, halted } from './MineSearch';

const getTdStyle = (code) => {
    switch (code){
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background:'#444',
            }
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return{
                background: 'white',
            };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return{
                background: 'yellow',
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return{
                background:'red'
            };
        default: {
            return {
                background: 'white',
            }
        }
    }
};

const getTdText = (code) => {
    console.log('getTdText');
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑!';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
            case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?'
        default:
            return code || '';
    }
};

const Td = memo(({ rowIndex, cellIndex }) => {
  
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if(halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    console.log('td rendered');

    return <RealTd onClickT={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]}/>
});

const RealTd = memo ( ({ onClickTd, onRightClickTd, data}) => {
    console.log('real td rendering');
    return (
        <td
        style={getTdStyle(data)}
        onClick={onClickTd}
        onContextMenu={onRightClickTd}
    >{getTdText(data)}</td>
    )
});

//td라는 함수는 한칸 갯수마다 실행되지만 실제 중요한 부분은 
//클릭한 셀에 대해서만 실행이 된다. 

export default Td;