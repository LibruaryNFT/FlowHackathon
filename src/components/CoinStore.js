import '../App.css';
import '../dist/output.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import {getNFTListings} from "../cadence/scripts/get_nft_listings.js";
import {purchaseTx} from "../cadence/transactions/purchase.js";
import SaleTransaction from "./SaleTransaction.js";
import ToggleVisibility from "./ToggleVisibility.js";

function CoinStore(props) {
  const [nfts, setNFTs] = useState([]);
  const [coins, setCoins] = useState([]);
  const [randomCoins, setRandomCoins] = useState([]);
  const[txId, setTxId] = useState();
  const[txInProgress, setTxInProgress] = useState(false);
  const[txStatus, setTxStatus] = useState(-1);

  useEffect(() => {

    getUserSaleNFTs();

  }, [])

  useEffect(() => {
    setTimeout(() => {
      randomCoin();
    }, 500);
  }, [nfts]);

  const getUserSaleNFTs = async () => {
    const result = await fcl.send([
        fcl.script(getNFTListings),
        fcl.args([
            fcl.arg(props.address, t.Address)
        ])
    ]).then(fcl.decode);
    setNFTs(result);
    console.log('getUserSaleNFTs', result);
  }

  

  const purchase = async (id) => {
    setTxInProgress(true);
    setTxStatus(-1);
    const transactionId = await fcl.send([
      fcl.transaction(purchaseTx),
      fcl.args([
        fcl.arg(props.address, t.Address),
        fcl.arg(parseInt(id), t.UInt64)
      ]),
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(transactionId);

    setTxId(transactionId);
      fcl.tx(transactionId).subscribe(res => {

        setTxStatus(res.status);

        console.log(res);
      })

    return fcl.tx(transactionId).onceSealed();
  }

  //console.log(['nfts',nfts]);

  // commented this block out because it explodes with react and react is a piece of shit
  //* //*/
  //let coins = []; // group by coin kinds, 0 (heads) and 1 (tails)

  function coinArray() {
    //getUserSaleNFTs();
    Object.keys(nfts).forEach(nftID => {
      let kind = nfts[nftID].nftRef.kind.rawValue;
      coins[kind] = coins[kind] ?? []; // declare undefined array if necessary
      coins[kind].push(nfts[nftID]); // add nft to coin group
    });
    
    
    //console.log('coins[0].length', coins[0].length);
    //console.log('coins[1].length', coins[1].length);

  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)

  }

  function randomCoin() {
    coinArray();
    console.log(['coinArray',coins]);
    console.log('coins[0].length', coins[0].length);
    console.log('coins[1].length', coins[1].length);
    let rnd_0 = randomIntFromInterval(0, coins[0].length - 1);
    let rnd_1 = randomIntFromInterval(0, coins[1].length - 1);
    let nfts_rnd = [
      coins[0][rnd_0],
      coins[1][rnd_1]
    ];
    console.log(['randomCoin', nfts_rnd]);
    setRandomCoins(nfts_rnd);
  }
    
  

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex flex-col text-center font-bold text-white">
          <h1 className="text-4xl pb-1">Shop of Curiosity</h1>

          <div className="bg-fuchsia-400 border rounded-l-full rounded-r-full w-full pl-3 pr-3 pt-1 pb-2 ml-auto text-white text-center leading-4">    
              <div className="text-white">
                <div className="text-lg underline">Shopkeeper
                </div>
                <div className="italic">
                <br></br>Welcome to my shop! Take a look around, I sell only the finest goods! <br></br><br></br>When you purchase, I'll provide a receipt of the transaction right here. <br></br><br></br></div>
                </div>
          </div>
          { txInProgress == true
          ?
          <div className="bg-fuchsia-400 border rounded-l-full rounded-r-full w-full pl-1 pr-1 pt-1 pb-1 ml-auto text-white text-center leading-4">    
              <div className="text-white">
                <div className="text-lg underline">Shopkeeper
                </div>
                <div className="italic">
                <br></br><SaleTransaction txId={txId} txInProgress={txInProgress} txStatus={txStatus}/><br></br></div>
                </div>
          </div>
          :
          null}

          
      </div>
      <div className="flex flex-col text-center font-bold">
        <table className="text-left table-fixed border-collapse text-white">
          <tbody>      

            {Object.keys(randomCoins).map(id => (
              <tr key={randomCoins[id].nftRef.id} className="">
                <td className="relative ">
                  
                  <img className="cursor-pointer border rounded-full w-64 h-64 mx-auto" src={`https://gateway.pinata.cloud/ipfs/${randomCoins[id].nftRef.ipfsHash}`} onClick={() => purchase(randomCoins[id].nftRef.id)}/>
                
                  
                  <button className="absolute border bg-gradient-to-r from-zinc-500 to-neutral-400 rounded-l-full rounded-r-full bottom-0 left-0 px-1 py-1 text-white md:py-1 bg-slate-700 text-center font-bold cursor-default">
                    Type: {randomCoins[id].nftRef.kind.rawValue == 0 ? 'Heads' : 'Tails'}<br></br>Price: {Math.round(randomCoins[id].price)} $FLOW<br></br>TokenID: {randomCoins[id].nftRef.id}
                  </button>
                </td>      
                 
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
  );
}

export default CoinStore;
 