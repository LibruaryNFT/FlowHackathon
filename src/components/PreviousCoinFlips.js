import '../App.css';
import '../dist/output.css';


import {useEffect, useState, useRef} from 'react';
import GraffleSDK from '@graffle/flow-livestream-sdk';
import axios from "axios";


function PreviousCoinFlips() {

  // graffle
  const [eventsData, setEventsData] = useState([]);
  
  const clientConfig = {
    projectId: '041706f7-3ded-4e39-9697-87544103a856',
    apiKey: 'dd6325db33b24f21bb99ae520485cd41'
  };

  // or `const streamSDK = new GraffleSDK(clientConfig);` for main net
  const streamSDK = new GraffleSDK(clientConfig, true);

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = async () => {
    let data
    let res = await axios
        .get("https://prod-test-net-dashboard-api.azurewebsites.net/api/company/6fc17a55-6975-4586-b5b5-d39e7a1bec52/search?eventType=A.f8568211504c7dcf.Coin.CoinFlipGame")
    data = res.data
    setEventsData(data)
    console.log('PreviousCoinFlips eventsData', eventsData);
}

  return (
        
        <div>
          <div className="flex flex-col text-white font-bold bg-gradient-to-r from-gray-400 to-gray-500">
            <h1 className="text-4xl text-center">Stone Wall of Results</h1>
            <button onClick={getEvents}>Refresh Results</button>
            <div className="bg-gray-800 rounded-l-full rounded-r-full opacity-70 w-full pl-1 pr-1 pt-1 pb-2 ml-auto text-white text-xs text-center leading-4">    
              <p className="text-sm text-white italic"><br></br>Waterfall of Luck: <br></br>I etch all of the coin results onto a stone wall for everyone to see.<br></br></p>
      
            </div>
            <table className="table-auto text-left border text-sm">
                <tbody>
                  <tr className="border">
                    <th className="border">Date</th>
                    <th className="border">Name</th>
                    <th className="border">ID</th>
                    <th className="border">Prediction</th>
                    <th className="border">Outcome</th>
                    <th className="border">Result</th>              
                  </tr>

                  {eventsData.map((item, id) => (
                    <tr key={id} className="border">
                      <td className="border">{item.eventDate.slice(5, 19).replace('T',' ')}</td>
                      <td className="border">{item.blockEventData.player.slice(0,7)}</td>
                      <td className="border">{item.blockEventData.id}</td>
                      <td className="border">{item.blockEventData.kind == 0 ? <div><img className="rounded-full h-16 w-16" src="https://gateway.pinata.cloud/ipfs/QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio"/></div> : <div><img className="rounded-full h-16 w-16" src="https://gateway.pinata.cloud/ipfs/QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8"/></div>}</td>
                      <td className="border">{item.blockEventData.coinFlip == 0 ? <div><img className="rounded-full h-16 w-16" src="https://gateway.pinata.cloud/ipfs/QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio"/></div> : <div><img className="rounded-full h-16 w-16" src="https://gateway.pinata.cloud/ipfs/QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8"/></div>}</td>
                      <td className="border"><a href={`https://testnet.flowscan.org/transaction/${item.flowTransactionId}`} target="_blank">{item.blockEventData.coinresult == 0 ? <button className="px-4 py-2 text-white rounded-full md:py-1 bg-lime-500 hover:bg-brightRedLight font-bold">Won 2 $FLOW!</button> : <button className="px-4 py-2 text-white rounded-full md:py-1 bg-red-700 hover:bg-brightRedLight font-bold">Lost</button>}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>


              
              
          </div>
          
          
          
          

          
          
        </div>
);

  
}

export default PreviousCoinFlips;
 