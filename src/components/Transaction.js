import '../App.css';
import '../dist/output.css';

function Transaction ({txId, txInProgress, txStatus, txStatusCode}) {

  if (txInProgress) {
        return (
            <article>
                {txStatus < 0 

                ?

                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '0%'}}></div>
                        </div>
                        <span>
                            Transaction Status: Initializing
                            <br/>
                            <small className="italic">You have the coin in your hands, ready to toss it into my waters!</small>
                    
                        </span>
                        <br/>           
                        
                    </div>

                : txStatus < 2

                ?


                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '25%'}}>25%</div>
                        </div>

                        <span>
                            Transaction Status: Pending
                        <br/>
                        <small className="italic">You have tossed the coin into the air towards my waters!</small>
                        </span>
                        <br/>
                        
                    </div> 

                :

                txStatus === 2     
                 
                ?
                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '50%'}}>50%</div>
                        </div>

                        <span>
                        Transaction Status: Finalized
                        <br/>
                        <small className="italic">The coin has hit my waters!</small>
                        </span>
                        <br/>
                        
                    </div> 

                : txStatus === 3

                ?

                    <div>
                         <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '75%'}}>75%</div>
                        </div>
                        <span>
                        Transaction Status: Executed
                            <br />
                            <small className="italic">The coin is now sinking towards the bottom of the waters.</small>
                        </span>
                        <br/>
                       
                    </div>

                : txStatus === 4

                ? 

                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '100%'}}>100%</div>
                        </div>

                        <span>
                        Transaction Status: Sealed
                        <span className="txId">
                            <a className="text-lime-500" href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank"><br></br>Transaction Details: {txId?.slice(0,8)}...</a>
                        </span>
                            <br />
                            <small className="italic">Please scroll to the Live Coin Result section. <br></br>The coin should reach the bottom of the waters within 25 seconds.</small>
                        </span>
                        <br/>
                        
                    </div>

                 : null}

            </article>
        )

    } else if (txStatusCode === 1) {

     return (
      <article>PROBLEM!!!!!!!!!! View problem here: <span className="txId">
      <a href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">{txId?.slice(0,8)}...</a>
    </span></article>

     ) 
     
      } else {
        
      }
    }



export default Transaction;