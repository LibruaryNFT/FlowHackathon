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
                            <div className="bg-gray-700 h-7 rounded-full" style={{width: '100%'}}>0% - Transaction Status: Initializing</div>
                        </div>
                        <span>
                            
                            <br/>

                            <div className="border bg-water rounded-l-full rounded-r-full w-full pl-3 pr-3 pt-1 pb-4 ml-auto text-wave text-center leading-4">    
                
                                <div className="italic">
                                <br></br>
                                You have the coin in your hands, ready to toss it into my waters!
                                </div>
              
                            </div>
                            
                    
                        </span>
                        <br/>           
                        
                    </div>

                : txStatus < 2

                ?


                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '25%'}}>25% - Pending</div>
                        </div>

                        <span>
                            
                        <br/>

                        <div className="border bg-water rounded-l-full rounded-r-full w-full pl-3 pr-3 pt-1 pb-4 ml-auto text-wave text-center leading-4">    
                                <div>Waterfall of Luck</div>
                                <div className="italic">
                                <br></br>
                                
                                You have tossed the coin into the air towards my waters!
                                </div>
              
                            </div>
                        
                        </span>
                        <br/>
                        
                    </div> 

                :

                txStatus === 2     
                 
                ?
                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '50%'}}>50% - Finalized</div>
                        </div>

                        <span>
                        
                        <br/>

                        <div className="border bg-water rounded-l-full rounded-r-full w-full pl-3 pr-3 pt-1 pb-4 ml-auto text-wave text-center leading-4">    
                                <div>Waterfall of Luck</div>
                                <div className="italic">
                                <br></br>
                                
                                The coin has hit my waters!<br></br>The coin should reach the bottom of the waters within 25 seconds.
                                </div>
              
                            </div>
                        
                        </span>
                        <br/>
                        
                    </div> 

                : txStatus === 3

                ?

                    <div>
                         <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '75%'}}>75% - Executed</div>
                        </div>
                        <span>
                        
                            <br />
                            <div className="border bg-water rounded-l-full rounded-r-full w-full pl-3 pr-3 pt-1 pb-4 ml-auto text-wave text-center leading-4">    
                                <div>Waterfall of Luck</div>
                                <div className="italic">
                                <br></br>
                                
                                The coin is now sinking towards the bottom of the waters.<br></br>The coin should reach the bottom of the waters within 25 seconds.
                                </div>
              
                            </div>
                           
                        </span>
                        <br/>
                       
                    </div>

                : txStatus === 4

                ? 

                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-15 dark:bg-gray-700">
                            <div className="bg-green-600 h-7 rounded-full" style={{width: '100%'}}><a className="text-purple-600" href={`https://testnet.flowscan.org/transaction/${txId}`} target="_blank">100% - Transaction Sealed</a></div>
                        </div>

                        <span>
                        
        
                        <br />
                        <div className="border bg-water rounded-l-full rounded-r-full w-full pl-3 pr-3 pt-1 pb-4 ml-auto text-wave text-center leading-4">    
                                <div>Waterfall of Luck</div>
                                <div className="italic">
                                <br></br>
                                
                                Make sure you are checking the under the Waterfall of Luck to see your results. <br></br>The coin should reach the bottom of the waters within 25 seconds.
                                </div>
              
                            </div>

                            
                
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