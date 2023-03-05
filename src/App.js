import "./dist/output.css"

import CoinCollection from "./components/CoinCollection.js";
import CoinStore from "./components/CoinStore.js";
import AdminStore from "./components/AdminStore.js"
import PreviousCoinFlips from "./components/PreviousCoinFlips.js"
import SetupAccount from "./components/SetupAccount.js"
import Footer from "./components/Footer.js"

import * as fcl from "@onflow/fcl";

import {checkCoinCollection} from "./cadence/scripts/check_coincollection.js";
import {getBalance} from "./cadence/scripts/get_balance.js";
import {useState, useEffect} from 'react';

fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

document.title = 'Waterfall of Luck';


function App() {

  const[user, setUser] = useState({loggedIn: false});
  const[balance, setBalance] = useState(0);
  const[coincollectioncheck, setCheckCoinCollection] = useState();

  useEffect(() => {
    
    fcl.currentUser.subscribe(setUser);

  }, [])

  useEffect(() => {
    
    if (user.loggedIn == true){
      getTheBalance();
      checkTheCoinCollection();
    } else {
      setBalance("");
    }

  }, [user])
    
  const getTheBalance = async () => {
      const result = await fcl.send([
        fcl.script(getBalance),
        fcl.args([fcl.currentUser])
      ]).then(fcl.decode);
      setBalance(result);
      console.log("Balance", result);
  }

  const checkTheCoinCollection = async () => {
      const result = await fcl.send([
        fcl.script(checkCoinCollection),
        fcl.args([fcl.currentUser])
      ]).then(fcl.decode);
      setCheckCoinCollection(result);
      console.log("checkcoincollection", result);
  }


  return (
    
    <div className="min-h-screen">
      <header className="flex flex-col mx-auto md:flex-row bg-gradient-to-r from-sky-500 to-indigo-500">
        
        <div className=" flex flex-col mb-auto md:w-1/2">
          <div className="flex flex-col">
            <div className="rounded-l-full bg-gradient-to-r from-zinc-500 to-neutral-400">
              <div className="flex items-center space-x-2">
                { user.loggedIn == true
                ?
                <div className="border px-4 py-2 text-white rounded-full md:py-1 bg-purple-600 hover:bg-brightRedLight font-bold">
                  <button onClick={() => fcl.unauthenticate()}>Leave this Realm</button>  
                </div>
                :
                <div className="border px-4 py-2 text-white rounded-full md:py-1 bg-purple-600 hover:bg-brightRedLight font-bold">
                  <button onClick={() => fcl.logIn()}>Identify Myself</button>
                </div>     
                }
        
                <div className="text-white">
                  <h2 className="font-bold">Name: {user.loggedIn == true ? user.addr : ''}</h2>
                  <h2 className="font-bold">FLOW Balance: {balance}
                  { user.loggedIn == true
                  ?
                    <button onClick={getTheBalance} className="border w-32 mx-auto text-white rounded-full bg-purple-600 hover:bg-brightRedLight">Refresh Balance</button>
                  :
                  null
}
                  </h2>

                  { user.loggedIn ==true && balance < 1
                  ?
                  <div>Important Notice: For Testnet Flow Balance, copy your Name and then go to the <a className="font-bold text-indigo-600" href="https://testnet-faucet-v2.onflow.org/fund-account">TestNet Faucet</a> and load your account with 1000 $FLOW. </div>
                  :
                  null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>        
      
      <main>
        
        <div className="flex flex-col font-bold text-white bg-land">
      
          { user.loggedIn == true && coincollectioncheck == false
          ?
        
          <div className="mx-auto">
            <div className="mx-auto">
              <img src="https://raw.githubusercontent.com/LibruaryNFT/WaterfallOfLuck/main/assets/waterfallofluck.gif"/>
            </div>
        
            <div className="border bg-water rounded-l-lg rounded-r-lg w-full pl-1 pr-1 pt-2 pb-2 ml-auto top-1 text-wave text-center leading-4">    
              <div className="text-lg underline">Waterfall of Luck</div>
              <br></br>
              <div className="italic"><br></br>Oh great, I now know who you are!
              <br></br><br></br>
              I hold the power to change your destiny. <br></br><br></br>But before I reveal my secrets, you must first agree to something. You must promise to use my powers for good, to help others and bring happiness to those around you. <br></br><br></br>Will you make this promise to me?
              
              <br></br><br></br></div>
              <SetupAccount/>
            </div>
          </div>
          :
          null
          }

          { user.loggedIn == null
          ?
          <div className="mx-auto">
            <div className="mx-auto">
              <img src="https://raw.githubusercontent.com/LibruaryNFT/WaterfallOfLuck/main/assets/waterfallofluck.gif"/>
            </div>
            <div className="border bg-water rounded-l-lg rounded-r-lg w-full pl-3 pr-3 pt-2 pb-2 ml-auto top-1 text-wave text-center leading-4">
              <div className="text-lg underline">Waterfall of Luck</div>
              <br></br>
              <div className="italic">Welcome, traveler!<br></br>I am the Waterfall of Luck, and I hold the power to make you rich beyond your wildest dreams. <br></br><br></br>But before I reveal the magic of my waters, I must know who you are. <br></br><br></br>What is your name and why have you come to me? <br></br>Only those with pure intentions may benefit from my powers.<br></br></div>
            </div>

          </div>
          :
          null
          }

          { user.loggedIn == true && coincollectioncheck == true
          ?
       
          <div className="mx-auto">
            <div className="relative mx-auto">
              <img src="https://raw.githubusercontent.com/LibruaryNFT/WaterfallOfLuck/main/assets/waterfallofluck.gif"/>
            </div>
            <div>
              <CoinCollection address={user.addr}/>
            </div>
          </div>
          :
          null
          }

        { user.loggedIn == true && coincollectioncheck == true
        ?
        <CoinStore address="0x7b2848088d45b449" parentBalance={getTheBalance}/>
          
        :
        null
        }

        { user.loggedIn == true && coincollectioncheck == true
        ?
        <PreviousCoinFlips/>
          
        :
        null
        }


        </div>

        
        
      </main>

      <footer className="bg-veryDarkBlue text-[10px]">
        <Footer/>
      </footer>

    </div>
    
  );

}

export default App;
 