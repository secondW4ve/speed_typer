import React from 'react'

const ResultTable = (props) => {

  const { results } = props;

  return (
    <div>
      {results.length === 0 ? 
        <span></span> 
      : 
        <table>
          <tr>
            <th>The number of letters in the quote</th>
            <th>The number of mistakes made</th>
            <th>Time spent</th>
          </tr>
          {results.map(result => 
            <tr>
              <th>{result.countOfLetters}</th>
              <th>{result.countOfMistakes}</th>
              <th>{result.timeSpent}</th>
            </tr>
          )}
        </table>
      }
      
    </div>
  )
}

export default ResultTable;
