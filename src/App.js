import './App.css';

const wordsToFind =['BOWLING', 'STUMPED', 'FIELDER', 'BATSMAN', 'RUNOUT', 'CATCH', 'UMPIRE', 'INNING', 'APPEAL', 'BATTING', 'SPIN', 'TEA', 'RUNS', 'STUMPS', 'BOUNDARY'];
const alphabetMatrixRows = ['OUMBAMRUNOUTFHWNT', 'SZIKQRWHZZTMATITE', 'THERUNSHXILNNHGUA', 'UDWZMQFBYWRPOSNFO', 'MTIYICENJGBOWLING', 'PUGBNAOCRRAXAYEPQ', 'EYBONNPSPPTQWFUJR', 'DLTCICZTPISTGKKCE', 'KQSONZAUVIMSJBFAI', 'LNFQGUYMIPASFAFTE', 'OISQSKSPFHNYZTNCV', 'QHHKASVSYXUHBTHHB', 'HCMXJCXAMIVHOIPSJ', 'SUMPIREWOTVEVNTPH', 'SQHTYSVNOQSYFGJOZ', 'HBOUNDARYAZWRIFYO', 'QSGEDMKSLNOVDEJED', 'TDCJEFIELDERJHDDM', 'YARWXAFYNQSMZHDDV', 'URJLWZGXZWSVFUXAG', 'HSPINTAGVCVISDZUJ', 'VNHUEVFRVAPPEALHE' ];

const alphabetMatrix = alphabetMatrixRows.map(row=> {return row.split('')});

function App() {
  return (
    <div className="App">
      <div className='left-pane'>
        <h2>Find the Words</h2>
        {wordsToFind.map(word=> <li className='word'>{word}</li>)}
      </div>
      <div className='right-pane'>
        <input type='text' placeholder='Enter Word Here' />
        <button type='submit'> SUBMIT </button>
        <table>
          <tbody>
            {alphabetMatrix.map(row=> <tr>{row.map(alphabet=> <td>{alphabet}</td>)}</tr>)}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;
