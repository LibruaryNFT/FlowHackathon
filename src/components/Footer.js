import "../dist/output.css"

const Footer = () => {
    return (

        <footer class=" bg-slate-700 flex items-center justify-center">
        <div class="text-white flex items-center justify-between">
          <div class="flex flex-col px-4">
            <a href="https://flow.com/" aria-label="flow logo">
                <img src="https://nbatopshot.com/static/img/flow.svg" alt=""/>
            </a>
          </div>
          <div> 
             Created by 
            <a class="text-lime-500" href="http://www.twitter.com/Libruary_NFT" aria-label="twitter logo">
            &nbsp;Libruary 
            </a> for the 2023 Flow Hackathon<br/>

            Artwork by 
            <a class="text-lime-500" href="https://www.instagram.com/ryaneaid.art/">
            &nbsp;Ryan
            </a>
          </div>

                    
        </div>
            
    </footer>


    )
}
  
export default Footer