import React, { useRef, useEffect, memo, useMemo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], dispatch === ref.current[2], rowIndex === ref.current[3]);
        ref.current = [rowIndex, dispatch, rowIndex];
    }, [rowIndex, dispatch, rowIndex]);
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>
            ))}
        </tr>
    );
});

export default Tr;