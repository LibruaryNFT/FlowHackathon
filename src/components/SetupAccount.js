import '../App.css';
import "../dist/output.css"

import * as fcl from "@onflow/fcl";

import SetupTransaction from "./SetupTransaction.js";

import {setup} from  "../cadence/transactions/setup.js";
import {useState, useEffect} from 'react';

fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function SetupAccount() {

  const[txId, setTxId] = useState();
  const[txInProgress, setTxInProgress] = useState(false);
  const[txStatus, setTxStatus] = useState(-1);

  useEffect(() => {

  }, [])



  const setupTheAccount = async () => {
    setTxInProgress(true);
    setTxStatus(-1);
    const transactionId = await fcl.send([
      fcl.transaction(setup),
      fcl.payer(fcl.currentUser),
      fcl.proposer(fcl.currentUser),
      fcl.authorizations([fcl.currentUser]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    setTxId(transactionId);
      fcl.tx(transactionId).subscribe(res => {

        setTxStatus(res.status);

        console.log(res);
      })

  }


  return (
    
      <div>
        
        <button className="border rounded-full w-32 mx-auto text-white bg-purple-600 hover:bg-brightRedLight" onClick={() => setupTheAccount()}>I promise!</button>
        <br></br><br></br>
        <SetupTransaction txId={txId} txInProgress={txInProgress} txStatus={txStatus}/>     
      </div>
    
  );

}

export default SetupAccount;
