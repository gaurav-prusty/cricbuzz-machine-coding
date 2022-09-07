import { useEffect, useState } from 'react';
import './App.css';
import TableDataItem from './components/TableDataItem';

const wordsToFind =['BOWLING', 'STUMPED', 'FIELDER', 'BATSMAN', 'RUNOUT', 'CATCH', 'UMPIRE', 'INNING', 'APPEAL', 'BATTING', 'SPIN', 'TEA', 'RUNS', 'STUMPS', 'BOUNDARY', 'AOQZ']
const alphabetMatrixRows = ['OUMBAMRUNOUTFHWNT', 'SZIKQRWHZZTMATITE', 'THERUNSHXILNNHGUA', 'UDWZMQFBYWRPOSNFO', 'MTIYICENJGBOWLING', 'PUGBNAOCRRAXAYEPQ', 'EYBONNPSPPTQWFUJR', 'DLTCICZTPISTGKKCE', 'KQSONZAUVIMSJBFAI', 'LNFQGUYMIPASFAFTE', 'OISQSKSPFHNYZTNCV', 'QHHKASVSYXUHBTHHB', 'HCMXJCXAMIVHOIPSJ', 'SUMPIREWOTVEVNTPH', 'SQHTYSVNOQSYFGJOZ', 'HBOUNDARYAZWRIFYO', 'QSGEDMKSLNOVDEJED', 'TDCJEFIELDERJHDDM', 'YARWXAFYNQSMZHDDV', 'URJLWZGXZWSVFUXAG', 'HSPINTAGVCVISDZUJ', 'VNHUEVFRVAPPEALHE' ];
const alphabetMatrix = alphabetMatrixRows.map(row=> {return row.split('')});
console.log(alphabetMatrix);
export let indexToHighlight = [];
let wordsFound = [];

// Rows and columns in the given grid
let R = alphabetMatrix.length; 
let C = alphabetMatrix[0].length;
 
// For searching in all 8 direction
let x=[-1, -1, -1, 0, 0, 1, 1, 1];
let y=[-1, 0, 1, -1, 1, -1, 0, 1];


function App() {
  const [query, setQuery] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('hidden');

  useEffect(()=> {
    setTimeout(()=> {
      setErrorMessage('hidden')
    }, 3000)
  }, [errorMessage]);

  function changeHandler(event) {
    setQuery(event.target.value);
  }

  function clickHandler() {
    let queryItem = query.toUpperCase();
    if (queryItem === '') {
      alert('Enter a word before submitting!')
      return;
    }
    if(patternSearch(alphabetMatrix, queryItem) && wordsToFind.includes(queryItem)) {
      console.log(patternSearch(alphabetMatrix, queryItem));
      indexToHighlight = [...indexToHighlight, ...patternSearch(alphabetMatrix, queryItem)];
      wordsFound.push(queryItem);
      console.log('indixes to highlight', indexToHighlight);
    } else {
      setErrorMessage('visible')
    }
    setQuery('');

    let sortedWordsToFind = wordsToFind.slice();
    if(wordsFound.sort().join(',') === sortedWordsToFind.sort().join(',')) alert("Hurray!! Well played !!")

    return;
  }

  function search2D(grid,row,col,word) {
 
  if (grid[row][col] !== word[0])
    return [];

  let len = word.length;
  let res = []
  

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
      if (grid[rd][cd] !== word[k])
          break;

      // Moving in particular direction
      // console.log(rd, cd);
      rd += x[dir];
      cd += y[dir];
    }
      // If all character matched, then value of must be equal to length of word
      if (k === len) res.push(dir)
  }
  return res;
}

// Searches given word in a given matrix in all 8 directions
function patternSearch(grid,word) {
    let indices = [];
    // Consider every point as starting point and search given word
    for (let row = 0; row < R; row++) {
        for (let col = 0; col < C; col++) {
          let directions = search2D(grid, row, col, word)
          indices = [...indices, ...findIndices(row, col, word, directions)]
        }
    }
    return indices;
}

function findIndices(row, col, word, directions) {
  if (directions.length === 0) return []; 
  let indices = [[row, col]];
  console.log('dir', directions);
  for (let dir of directions) {
      for (let i = 1; i < word.length; i++) {
          indices.push([row + (i*x[dir]), col + (i*y[dir])])
      }
  }
  return indices;
}

function isFound(array1, array2, str) {
  let filteredArray = array1.filter(value => array2.includes(value));
  // console.log('filtered Array', filteredArray);
  if (!filteredArray.includes(str)) return false
  return true
}

  return (
    <div className="App">
      <div className='left-pane'>
        <h2>Find the Words</h2>
        <div className='words-box'>
          {wordsToFind.map((word, idx)=> <li key={idx} className='search-word' style={{textDecoration: isFound(wordsFound, wordsToFind, word) ? 'line-through' : 'none', color: isFound(wordsFound, wordsToFind, word) ? 'grey' : 'black'}} >{word}</li>)}
        </div>
      </div>
      <div className='right-pane'>
        <input className='query-input' type='text' placeholder='Enter the Word' value={query} onChange={(event)=> changeHandler(event)}/>
        <button className='query-button' onClick={()=> clickHandler()} type='submit'> SUBMIT </button>
        <table>
          <tbody>
            {alphabetMatrix.map((row, i)=> <tr key={i} id={i}>{row.map((alphabet, j)=> <TableDataItem key= {i+j} row={i} column={j} content={alphabet} />)}</tr>)}
            {/* {displayAlphabetMatrix(alphabetMatrix)} */}
          </tbody>
        </table>
        <h4 className='error-message' style={{visibility: errorMessage, color: 'red'}}>The Word you entered doesn't exist!</h4>
      </div>
    </div>
  );
}

export default App;
