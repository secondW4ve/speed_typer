import React from 'react'

const ResultTable = (props) => {

  const { results } = props;

  return (
    <div>
      <table>
        <tr>
          <th>The number of letters in the quote</th>
          <th>Time spent</th>
        </tr>
        {results.map(result => 
          <tr>
            <th>{result.countOfLetters}</th>
            <th>{result.timeSpent}</th>
          </tr>
        )}
      </table>
    </div>
  )
}

export default ResultTable;
