import React from 'react';
import { indexToHighlight } from '../App';

function TableDataItem(props) {
    function decideHighlight() {
        if(!JSON.stringify(indexToHighlight).includes(JSON.stringify([props.row, props.column]))) return false
        return true;
    }

    return (
        <td style={{background: decideHighlight() ? 'lightgreen' : 'white'}}>
            {props.content}
        </td>
    );
}

export default TableDataItem;