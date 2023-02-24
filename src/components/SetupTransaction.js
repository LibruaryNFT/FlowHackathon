import '../App.css';
import '../dist/output.css';

function SetupTransaction ({txId, txInProgress, txStatus, txStatusCode}) {

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
                            <small className="italic">Waiting for Waterfall of Luck's to hand over the contract to be signed.</small>
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
                        <small className="italic">You are now reading over the contract carefully.</small>
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
                        <small className="italic">You are still reading over the contract carefully.</small>
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
                            <small className="italic">You have read the contract and have signed your name, agreeing to not jump into the water to steal my treasures.</small>
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
                            <a className="text-lime-500" href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">{txId?.slice(0,8)}...</a>
                        </span>
                            
                            <br />
                            <small className="italic">Thank you for signing the contract, I won't ask you to do that again. Please refresh this page and then we can start the fun!</small>
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
        return <></>
      }
    }



export default SetupTransaction;