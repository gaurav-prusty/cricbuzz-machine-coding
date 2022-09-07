import React from 'react';
import { indexToHighlight } from '../App';

function TableDataItem(props) {


    function decideHighlight() {
        // indexToHighlight.map(index=> {
        //     if(index[0] !== props.row && index[1] !== props.column) return false
        //     return true;
        // })
        if(!JSON.stringify(indexToHighlight).includes(JSON.stringify([props.row, props.column]))) return false
        return true;
    }
    
    return (
        <td style={{background: decideHighlight() ? 'green' : 'white'}}>
            {props.content}
        </td>
    );
}

export default TableDataItem;