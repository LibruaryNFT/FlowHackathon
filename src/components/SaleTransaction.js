import '../App.css';
import '../dist/output.css';

function SaleTransaction ({txId, txInProgress, txStatus, txStatusCode}) {

  if (txInProgress) {
        return (
            <article>
                {txStatus < 0 

                ?

                    <div>
                        Do you want the coin? It's a great deal!
                        <br/>           
                        
                    </div>

                : txStatus < 2

                ?


                    <div>
                      Fantastic choice! 
                        
                    </div> 

                :

                txStatus === 2     
                 
                ?
                    <div>
                        I'll wrap this coin up for you.
                        
                    </div> 

                : txStatus === 3

                ?

                    <div>
                       
                      Let me get you a receipt!
                        
                    </div>

                : txStatus === 4

                ? 

                    <div>
                        
                        
                        Thank you for your business! Check your Coin Satchel to see your new purchase. You may need to click Refresh Results.<br></br>
                        <span className="txId">
                            <a className="text-purple-600" href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">Here's your receipt: {txId?.slice(0,8)}...</a>
                        </span>
                        
                        
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