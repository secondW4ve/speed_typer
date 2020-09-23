import React, {useEffect, useState} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const QuoteDisplay = (props) => {
  
  const [rerender, setRerender] = useState(false);
  
  const {quote, statuses} = props;



  useEffect(() => {
    if (statuses !== undefined){
      setRerender(true);
    }
  }, [statuses])

  return (
    <div>
      {quote === undefined ? 
        <Loader
         type="Oval"
         color="#00BFFF"
         height={50}
         width={50}
        /> 
        :
        <div>
          {quote.map((character, index) => {
            if (statuses === undefined){
              return <span>{character}</span>
            } else if (statuses[index] === -1){
              return <span className = "incorrect">{character}</span>
            } else if (statuses[index] === 1){
              return <span className = "correct">{character}</span>
            } else {
              return <span>{character}</span>
            }
          }
          )}
        </div> 
      }
    </div>
  )
}

export default QuoteDisplay
