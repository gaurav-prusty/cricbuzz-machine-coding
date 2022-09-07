import { useState } from 'react';
import './App.css';
import TableDataItem from './components/TableDataItem';

const wordsToFind =['BOWLING', 'STUMPED', 'FIELDER', 'BATSMAN', 'RUNOUT', 'CATCH', 'UMPIRE', 'INNING', 'APPEAL', 'BATTING', 'SPIN', 'TEA', 'RUNS', 'STUMPS', 'BOUNDARY'];
const alphabetMatrixRows = ['OUMBAMRUNOUTFHWNT', 'SZIKQRWHZZTMATITE', 'THERUNSHXILNNHGUA', 'UDWZMQFBYWRPOSNFO', 'MTIYICENJGBOWLING', 'PUGBNAOCRRAXAYEPQ', 'EYBONNPSPPTQWFUJR', 'DLTCICZTPISTGKKCE', 'KQSONZAUVIMSJBFAI', 'LNFQGUYMIPASFAFTE', 'OISQSKSPFHNYZTNCV', 'QHHKASVSYXUHBTHHB', 'HCMXJCXAMIVHOIPSJ', 'SUMPIREWOTVEVNTPH', 'SQHTYSVNOQSYFGJOZ', 'HBOUNDARYAZWRIFYO', 'QSGEDMKSLNOVDEJED', 'TDCJEFIELDERJHDDM', 'YARWXAFYNQSMZHDDV', 'URJLWZGXZWSVFUXAG', 'HSPINTAGVCVISDZUJ', 'VNHUEVFRVAPPEALHE' ];
const alphabetMatrix = alphabetMatrixRows.map(row=> {return row.split('')});
export let indexToHighlight = [];

// Rows and columns in the given grid
let R = alphabetMatrix.length; 
let C = alphabetMatrix[0].length;
 
// For searching in all 8 direction
let x=[-1, -1, -1, 0, 0, 1, 1, 1];
let y=[-1, 0, 1, -1, 1, -1, 0, 1];

function App() {
  const [query, setQuery] = useState(''); 

  function changeHandler(event) {
    setQuery(event.target.value);
  }

  function clickHandler() {
    // console.log(patternSearch(alphabetMatrix, query.toUpperCase()));
    if(patternSearch(alphabetMatrix, query.toUpperCase())) {
      indexToHighlight.push(patternSearch(alphabetMatrix, query));
      console.log('indixes to highlight', indexToHighlight);
    } 
    setQuery('');
  }

  function search2D(grid,row,col,word) {
  // If first character of word doesn't match with given starting point in grid.
  if (grid[row][col] != word[0])
    return false;

  let len = word.length;

  // Search word in all 8 directions starting from (row, col)
  for (let dir = 0; dir < 8; dir++) {
    // Initialize starting point for current direction
    let k, rd = row + x[dir], cd = col + y[dir];
    //  console.log('from first for loop', rd, cd);

    // First character is already checked, match remaining characters
    for (k = 1; k < len; k++) {
      // If out of bound break
      if (rd >= R || rd < 0 || cd >= C || cd < 0)
          break;

      // If not matched, break
      if (grid[rd][cd] != word[k])
          break;

      // Moving in particular direction
      // console.log(rd, cd);
      rd += x[dir];
      cd += y[dir];
    }
      // If all character matched, then value of must be equal to length of word
      if (k == len)
        return true;
  }
        return false;
}

// Searches given word in a given matrix in all 8 directions
function patternSearch(grid,word) {
    // Consider every point as starting point and search given word
    for (let row = 0; row < R; row++) {
        for (let col = 0; col < C; col++) {
            if (search2D(grid, row, col, word)) return [row, col];
        }
    }
}

  return (
    <div className="App">
      <div className='left-pane'>
        <h2>Find the Words</h2>
        {wordsToFind.map(word=> <li className='word'>{word}</li>)}
      </div>
      <div className='right-pane'>
        <input type='text' placeholder='Enter Word Here' value={query} onChange={(event)=> changeHandler(event)}/>
        <button onClick={()=> clickHandler()} type='submit'> SUBMIT </button>
        <table>
          <tbody>
            {alphabetMatrix.map((row, i)=> <tr id={i}>{row.map((alphabet, j)=> <TableDataItem key= {i+j} row={i} column={j} content={alphabet} />)}</tr>)}
            {/* {displayAlphabetMatrix(alphabetMatrix)} */}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;
