import '../App.css';
import '../dist/output.css';

function SetupTransaction ({txId, txInProgress, txStatus, txStatusCode}) {

  if (txInProgress) {
        return (
            <article>
                {txStatus < 0 

                ?

                    <div>
                        
                        <span>
            
                            <br/>
                            <small className="italic">I am waiting for you to make the promise! After you make the promise, I will reveal some of my secrets.</small>
                        </span>
                        <br/>           
                        
                    </div>

                : txStatus < 2

                ?


                    <div>
                        
                        <span>
                            T
                        <br/>
                        <small className="italic">You have now given your response.</small>
                        </span>
                        <br/>
                        
                    </div> 

                :

                txStatus === 2     
                 
                ?
                    <div>
                        
                        <span>
                        
                        <br/>
                        <small className="italic">I am just taking a mental note of your response to keep track of who is worthy to learn of my magical abilities.</small>
                        </span>
                        <br/>
                        
                    </div> 

                : txStatus === 3

                ?

                    <div>
                        
                        <span>
                        
                            <br />
                            <small className="italic">I am just taking a mental note of your response to keep track of who is worthy to learn of my magical abilities.</small>
                        </span>
                        <br/>
                        
                    </div>

                : txStatus === 4

                ? 

                    <div>
                        
                        <span>
                        
                        <span className="txId">
                            <a className="text-purple-600" href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">Receipt of Promise</a>
                        </span>
                            
                            <br />
                            <small className="italic">Thank you for making that promise, I won't ask you to do that again. 

Please refresh this page and then I will explain how my waters are magical!
</small>
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