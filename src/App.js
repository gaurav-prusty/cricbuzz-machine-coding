import { useEffect, useState } from 'react';
import './App.css';
import TableDataItem from './components/TableDataItem';

const wordsToFind =['BOWLING', 'STUMPED', 'FIELDER', 'BATSMAN', 'RUNOUT', 'CATCH', 'UMPIRE', 'INNING', 'APPEAL', 'BATTING', 'SPIN', 'TEA', 'RUNS', 'STUMPS', 'BOUNDARY']
const alphabetMatrixRows = ['OUMBAMRUNOUTFHWNT', 'SZIKQRWHZZTMATITE', 'THERUNSHXILNNHGUA', 'UDWZMQFBYWRPOSNFO', 'MTIYICENJGBOWLING', 'PUGBNAOCRRAXAYEPQ', 'EYBONNPSPPTQWFUJR', 'DLTCICZTPISTGKKCE', 'KQSONZAUVIMSJBFAI', 'LNFQGUYMIPASFAFTE', 'OISQSKSPFHNYZTNCV', 'QHHKASVSYXUHBTHHB', 'HCMXJCXAMIVHOIPSJ', 'SUMPIREWOTVEVNTPH', 'SQHTYSVNOQSYFGJOZ', 'HBOUNDARYAZWRIFYO', 'QSGEDMKSLNOVDEJED', 'TDCJEFIELDERJHDDM', 'YARWXAFYNQSMZHDDV', 'URJLWZGXZWSVFUXAG', 'HSPINTAGVCVISDZUJ', 'VNHUEVFRVAPPEALHE' ];


const alphabetMatrix = alphabetMatrixRows.map(row=> row.split(''));
export let indexToHighlight = [];
let wordsFound = [];

// Rows and columns in the given matrix
let ROWS = alphabetMatrix.length; 
let COLUMNS = alphabetMatrix[0].length;
 
// For searching in all 8 direction
let x_direction = [-1, -1, -1, 0, 0, 1, 1, 1];
let y_direction = [-1, 0, 1, -1, 1, -1, 0, 1];


function App() {
  const [query, setQuery] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('hidden');

  useEffect(()=> {
    setTimeout(()=> {
      setErrorMessage('hidden')
    }, 3000)
  }, [errorMessage]);

  function clickHandler() {
    let queryItem = query.toUpperCase();
    if (queryItem === '') {
      alert('Enter a word before submitting!')
      return;
    }
    if(findIndices(alphabetMatrix, queryItem) && wordsToFind.includes(queryItem)) {
      indexToHighlight = [...indexToHighlight, ...findIndices(alphabetMatrix, queryItem)];
      wordsFound.push(queryItem);
    } else {
      setErrorMessage('visible')
    }
    setQuery('');

    let sortedWordsToFind = wordsToFind.slice();
    if(wordsFound.sort().join(',') === sortedWordsToFind.sort().join(',')) alert("Hurray!! Well played !!")

    return;
  }

  // to find direction of the word and whether it exists or not in the matrix
  function searchDirection(matrix, row, col, word) {
 
  if (matrix[row][col] !== word[0])
    return [];

  let len = word.length;
  let res = []
  
  for (let direction = 0; direction < 8; direction++) {
    let k, rd = row + x_direction[direction], cd = col + y_direction[direction];

    // Check for first character
    for (k = 1; k < len; k++) {
      if (rd >= ROWS || rd < 0 || cd >= COLUMNS || cd < 0)
          break  

      if (matrix[rd][cd] !== word[k])
          break;

      rd += x_direction[direction];
      cd += y_direction[direction];
    }
      // Final check
      if (k === len) res.push(direction)
  }
  return res;
}

//Traverse in the given direction and form index array
function directionTraversal(row, col, word, directions) {
  if (directions.length === 0) return []; 
  let indices = [[row, col]];
  for (let dir of directions) {
      for (let i = 1; i < word.length; i++) {
          indices.push([row + (i*x_direction[dir]), col + (i*y_direction[dir])])
      }
  }
  return indices;
}


function findIndices(matrix,word) {
    let indices = [];
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
          let directions = searchDirection(matrix, row, col, word)
          indices = [...indices, ...directionTraversal(row, col, word, directions)]
        }
    }
    return indices;
}


function isFound(array1, array2, str) {
  let filteredArray = array1.filter(value => array2.includes(value));
  if (!filteredArray.includes(str)) return false
  return true
}

  //markup
  return (
    <div className="App">
      <div className='left-pane'>
        <h2>Find the Words</h2>
        <div className='words-box'>
          {wordsToFind.map((word, idx)=> <li key={idx} className='search-word' style={{textDecoration: isFound(wordsFound, wordsToFind, word) ? 'line-through' : 'none', color: isFound(wordsFound, wordsToFind, word) ? 'grey' : 'black'}} >{word}</li>)}
        </div>
      </div>
      <div className='right-pane'>
        <input className='query-input' type='text' placeholder='Enter the Word' value={query} onChange={(event)=> setQuery(event.target.value)} />
        <button className='query-button' onClick={()=> clickHandler()} type='submit'> SUBMIT </button>
        <table>
          <tbody>
            {alphabetMatrix.map((row, i)=> <tr key={i} id={i}>{row.map((alphabet, j)=> <TableDataItem key= {i+j} row={i} column={j} content={alphabet} />)}</tr>)}
          </tbody>
        </table>
        <h4 className='error-message' style={{visibility: errorMessage, color: 'red'}}>The Word you entered doesn't exist!</h4>
      </div>
    </div>
  );
}

export default App;
