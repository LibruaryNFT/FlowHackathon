import '../App.css';
import '../dist/output.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import {getNFTDetails} from "../cadence/scripts/get_nft_details.js";
import {getUserTotal} from "../cadence/scripts/get_collection_length.js";

import {useEffect, useState, useRef} from 'react';
import GraffleSDK from '@graffle/flow-livestream-sdk';
import {playGame} from "../cadence/transactions/play_game.js";
import axios from "axios";

import Transaction from "./Transaction.js";
import ToggleVisibility from "./ToggleVisibility.js";

function CoinCollection(props) {
  const[nfts, setNFTs] = useState([]);
  const[usersupply, setUserSupply] = useState('');
  const[txId, setTxId] = useState();
  const[txInProgress, setTxInProgress] = useState(false);
  const[txStatus, setTxStatus] = useState(-1);

  // graffle
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  useEffect(() => {
      
      getTheNFTDetails();
      getTheUserTotal();

  }, [props.address]);

  const clientConfig = {
    projectId: '041706f7-3ded-4e39-9697-87544103a856',
    apiKey: 'dd6325db33b24f21bb99ae520485cd41'
  };

  // or `const streamSDK = new GraffleSDK(clientConfig);` for main net
  const streamSDK = new GraffleSDK(clientConfig, true);

  latestChat.current = chat;

  const foo = (message) => {
    console.log(message);
    const updatedChat = [...latestChat.current];
    updatedChat.push(message);

    setChat(updatedChat);
  };

  useEffect(() => {
    streamSDK.stream(foo);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      streamSDK.disconnect();
      streamSDK.stream(foo);
    }
      , 10000);
  }, []);

  const getTheNFTDetails = async () => {
      const result = await fcl.send([
          fcl.script(getNFTDetails),
          fcl.args([
              fcl.arg(props.address, t.Address)
          ])
      ]).then(fcl.decode);
      
      setNFTs(result);
      console.log("getTheNFTDetails", result);
  }
  const getTheUserTotal = async () => {
    const result = await fcl.send([
      fcl.script(getUserTotal),
      fcl.args([fcl.currentUser])
    ]).then(fcl.decode);
    setUserSupply(result)
    console.log("getTheUserTotal", result);
  }

  const play = async (id) => {
    setTxInProgress(true);
    setTxStatus(-1);
    const transactionId = await fcl.send([
        fcl.transaction(playGame),
        fcl.args([
          fcl.arg(parseInt(id), t.UInt64),
          fcl.arg("0xf8568211504c7dcf", t.Address)
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
      ]).then(fcl.decode);
      
      setTxId(transactionId);
      fcl.tx(transactionId).subscribe(res => {

        setTxStatus(res.status);
        
        console.log('CoinCollection play', res);
      })

      window.scrollTo(0, 500);

    }

  return (
        
    <div>
      <div className="flex flex-col text-white font-bold text-center bg-land">
        <div className="border bg-water rounded-l-lg rounded-r-lg w-full pl-3 pr-3 pt-1 pb-4 ml-auto text-wave text-center leading-4">    
              
                <div className="text-lg underline">Waterfall of Luck 
                </div>
                <div className="italic">
                  <br></br>Feeling lucky today?<br></br><br></br>
                  My waters are magical ... simply predict whether a coin you throw in will be heads or tails when it lands at the bottom of my waters. <br></br><br></br> If you’re right.. treasures await you!
                  <br></br><br></br>
                  If you don't have any coins, visit the Shop of Curiosity which sells them.

                </div>
              
        </div>
        <div className="border bg-water rounded-l-lg rounded-r-lg w-full pl-3 pr-3 pt-1 pb-4 ml-auto text-wave text-center leading-4">    
                
                <div className="italic">
                  <br></br>
                I almost forgot to mention that once you toss a coin in, check back here to see the results! If you'd like to see other travelers results, you can check out the Stone Wall of Results.
                </div>
              
        </div>
          

               
        
        <div className="fixed left-0 right-0 bottom-0 z-50 overflow-auto bg-gray-700 opacity-90 flex flex-col items-center justify-center">
	        <h2 className="text-center text-white text-xl font-semibold">

          { txInProgress == true
          ?
          <ToggleVisibility>
            <Transaction txId={txId} txInProgress={txInProgress} txStatus={txStatus}/>
          </ToggleVisibility>
          :
          null
          }

          
          </h2>
        </div>
          
        <div className="flex flex-col font-bold text-center">    
          <table className="italic table-fixed">
          <tbody>
            
            {chat.map((item, id) => (
              <tr key={id} className="border bg-water rounded-lg pl-1 pr-1 pt-1 pb-4 text-wave text-center leading-4">
                <td className="">{item.blockEventData.id && item.blockEventData.kind == null? 'Your coin landed in my waters! This should only take another 15 seconds or so to see the outcome here!' : ''}</td>                       
              </tr>
             ))}
            </tbody>
          </table>
        </div>
          
        <div className="flex flex-col text-white font-bold text-center">  
          <table className="text-left table-fixed border-collapse">
          <tbody>
    

            {chat.map((item, id) => (
              <tr key={id} className="border bg-water rounded-lg pl-1 pr-1 pt-1 pb-4 text-wave text-center leading-4">
                <td className=""><a href={`https://testnet.flowscan.org/transaction/${item.flowTransactionId}`} target="_blank">{item.blockEventData.coinresult == null ? '' : (item.blockEventData.coinresult == 0 ? <button className="px-2 py-2 text-white rounded-full md:py-1 bg-lime-500 hover:bg-brightRedLight font-bold">You Won 2 $FLOW!</button> : <button className="px-4 py-2 text-white rounded-lg md:py-1 bg-red-700 hover:bg-brightRedLight font-bold">You didn't win this time</button>)}</a></td>                       
                <td className="">{item.blockEventData.kind == null ? '' : (item.blockEventData.kind == 0 ? <div>Your Prediction <img className="rounded-full h-24 w-24" src="https://gateway.pinata.cloud/ipfs/QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio"/></div> : <div>Your prediction was <img className="rounded-full h-24 w-24" src="https://gateway.pinata.cloud/ipfs/QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8"/></div>)}</td>
                <td className="">{item.blockEventData.coinFlip == null ? '' : (item.blockEventData.coinFlip == 0 ? <div>Outcome<img className="rounded-full h-24 w-24" src="https://gateway.pinata.cloud/ipfs/QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio"/></div> : <div>The outcome was <img className="rounded-full h-24 w-24" src="https://gateway.pinata.cloud/ipfs/QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8"/></div>)}</td>
                
              </tr>
             ))}
            </tbody>
          </table>
        </div>
            
    </div>
   
          
    <div className="flex flex-col text-center font-bold bg-gradient-to-r from-yellow-900 to-yellow-700 text-white">
      <h1 className="text-white text-4xl pb-1">Your Coin Satchel</h1>
      { usersupply <1
        ?
        <div className="">You do not currently have any coins.</div>
        :
        <div className="">Touch a coin to toss it into the Waterfall of Luck.</div>
      
      }
        <button onClick={() => { getTheNFTDetails(); getTheUserTotal()}} className="border w-32 mx-auto text-white rounded-full bg-purple-600 hover:bg-brightRedLight">Refresh Results</button><br></br>

        
    </div>
    

    <div className="flex flex-col text-center font-bold bg-gradient-to-r from-yellow-900 to-yellow-700">    
      <table className="text-left table-fixed border-collapse text-white">
        <tbody>
                
        {nfts.map(nft => (
          <tr key={nft.id} className="">
            <div className="relative">
              <div className="">
                <img className="border cursor-pointer rounded-full w-64 h-64 mx-auto" src={`https://gateway.pinata.cloud/ipfs/${nft.ipfsHash}`} onClick={() => {play(nft.id)}}/>
              </div>
              <button className="absolute border rounded-l-lg rounded-r-lg bottom-0 left-0 px-1 py-1 text-white text-center md:py-1 bg-gradient-to-r from-zinc-500 to-neutral-400 font-bold cursor-default">Type: {nft.kind.rawValue == 0 ? 'Heads' : 'Tails'}<br></br>TokenID: {nft.id}
              </button>
              <br></br>
            </div>                                    
              
          </tr>
          ))}
        </tbody>
      </table>
      

    </div>
          
  </div>
);

  
}

export default CoinCollection;
 