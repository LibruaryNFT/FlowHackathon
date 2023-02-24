import '../App.css';
import '../dist/output.css';

function SaleTransaction ({txId, txInProgress, txStatus, txStatusCode}) {

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
                            <small className="italic">Waiting for transaction approval.</small>
                    
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
                        <small className="italic">The purchase transaction is currently pending.</small>
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
                        <small className="italic">The transaction to purchase this coin is currently executing.</small>
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
                            <small className="italic">The purchase transaction is currently sealing.</small>
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
                        Transaction Status: Sealed<br></br>
                        <span className="txId">
                            <a className="text-lime-500" href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">Transaction Details: {txId?.slice(0,8)}...</a>
                        </span>
                            <br />
                            <small>Transaction Complete. <br></br>
                            <div className="italic">Please refresh the page to see the coin appear in your Coin Satchel.</div></small>
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



export default SaleTransaction;