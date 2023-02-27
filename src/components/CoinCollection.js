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
import PreviousCoinFlips from "./PreviousCoinFlips.js";

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
      <div className="flex flex-col text-white font-bold text-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <h1 className="flex flex-col text-4xl">Live Waterfall Chat</h1>
        <div className="bg-gray-800 rounded-l-full rounded-r-full opacity-70 w-full pl-1 pr-1 pt-1 pb-1 ml-auto text-white text-xs text-center leading-4">    
              <div className="text-sm text-white italic"><br></br>Waterfall of Luck: <br></br>I will show you the results of your coin throw here. If you want to see all previous results across everyone I've met, check out the Stone Wall of Results.<br></br></div>

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
          
        <div className="">    
          <table className="text-left table-fixed border-collapse text-sm italic">
          <tbody>
            
            {chat.map((item, id) => (
              <tr key={id} className="bg-gray-800 rounded-l-full rounded-r-full opacity-70 w-full pl-1 pr-1 pt-1 pb-1 ml-auto text-white text-xs text-center leading-4">
                <td className="">{item.blockEventData.id && item.blockEventData.kind == null? 'Waterfall of Luck: Your coin landed in my waters!' : ''}</td>                       
              </tr>
             ))}
            </tbody>
          </table>
        </div>
          
        <div className="">  
          <table className="text-left table-fixed border-collapse text-sm">
          <tbody>
    

            {chat.map((item, id) => (
              <tr key={id} className="bg-gray-800 rounded-l-full rounded-r-full opacity-70 w-full pl-1 pr-1 pt-1 pb-1 ml-auto text-white text-xs text-center leading-4">
                <td className=""><a href={`https://testnet.flowscan.org/transaction/${item.flowTransactionId}`} target="_blank">{item.blockEventData.coinresult == null ? '' : (item.blockEventData.coinresult == 0 ? <button className="px-4 py-2 text-white rounded-full md:py-1 bg-lime-500 hover:bg-brightRedLight font-bold">Congratulations! You Won 2 $FLOW!</button> : <button className="px-4 py-2 text-white rounded-full md:py-1 bg-red-700 hover:bg-brightRedLight font-bold">Unfortunately you didn't win this time!</button>)}</a></td>                       
                <td className="">{item.blockEventData.kind == null ? '' : (item.blockEventData.kind == 0 ? <div>Your coin was marked like this <img className="rounded-full h-32 w-32" src="https://gateway.pinata.cloud/ipfs/QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio"/></div> : <div>Your prediction was <img className="rounded-full h-32 w-32" src="https://gateway.pinata.cloud/ipfs/QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8"/></div>)}</td>
                <td className="">{item.blockEventData.coinFlip == null ? '' : (item.blockEventData.coinFlip == 0 ? <div>Which marked coin would win<img className="rounded-full h-32 w-32" src="https://gateway.pinata.cloud/ipfs/QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio"/></div> : <div>The outcome was <img className="rounded-full h-32 w-32" src="https://gateway.pinata.cloud/ipfs/QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8"/></div>)}</td>
                
              </tr>
             ))}
            </tbody>
          </table>
        </div>
            
    </div>
   
    <PreviousCoinFlips/>
          
    <div className="flex flex-col text-center font-bold bg-gradient-to-r from-yellow-900 to-yellow-700 text-white">
      <h1 className="text-white text-4xl pb-4">Your Coin Satchel</h1>
        <button onClick={() => { getTheNFTDetails(); getTheUserTotal()}}>Refresh Results</button>

        { usersupply <1
        ?
        <div className="">You do not currently have any coins.</div>
        :
        <div className="">Touch a coin to toss it into the Waterfall of Luck.</div>
      
      }
    </div>
    

    <div className="flex flex-col text-center font-bold bg-yellow-900">    
      <table className="text-left table-fixed border-collapse text-white">
        <tbody>
                
        {nfts.map(nft => (
          <tr key={nft.id} className="border">
            <div className="relative">
              <div className="">
                <img className="border cursor-pointer rounded-full w-64 h-64 mx-auto" src={`https://gateway.pinata.cloud/ipfs/${nft.ipfsHash}`} onClick={() => {play(nft.id)}}/>
              </div>
              <button className="absolute top-0 px-4 py-2 text-white md:py-1 bg-purple-600 font-bold cursor-default">Touch Coin to Toss into my Waters</button><button className="absolute bottom-0 right-0 px-4 py-2 text-white md:py-1 bg-purple-600 font-bold cursor-default">TokenID: {nft.id}<br></br>Type: {nft.kind.rawValue == 0 ? 'Heads' : 'Tails'}
              </button>
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
 