# Waterfall of Luck

This was a project created for the first Flow Hackathon - Season 1.

- [Demo Video](https://youtu.be/GJkJO2IchmY)
- [Devfolio Submission](https://devfolio.co/projects/waterfall-of-luck-663d)
- [Submission Slides](https://docs.google.com/presentation/d/15qUIOs8MdhkjDtJD5joLTJi56ukoS7cRPNWS8XUPqRA/edit?usp=sharing)

This dapp allows a user to purchase a Coin(NFT) for 1 $FLOW which represents either Heads or Tails, and then the user can toss it into magical waters. If the random outcome(Heads or Tails) on-chain is the same as their Coin, then the user will receive 2 $FLOW, while losing will result in the user not receiving anything. The coin is destroyed whenever it is tossed into the magical waters.

# Technologies Used

- React
- Tailwind CSS
- Flow CLI
- Graffle(Flow Events monitoring)
- Pinata(IPFS)

# Contracts on Testnet

https://testnet.flowscan.org/account/0xf8568211504c7dcf

# Emulator Quick Start Guide
Use this to get started on the emulator and test the major functionality

 1. flow emulator start -v
 2. flow deploy project
 3. flow keys generate
 4. flow accounts create --key PublicKey
 5. update flow.json
 6. flow transactions send ./cadence/transactions/setup.cdc
 7. flow transactions send ./cadence/transactions/setup.cdc --signer=justin
 8. Run three times

 flow transactions send ./cadence/transactions/mint_nft.cdc f8d6e0586b0a20c7 0 0 QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio

9. Run for Tokens 0,1,2

flow transactions send ./cadence/transactions/list_for_sale.cdc 0 1.0
10. Expect tokens 0,1,2
flow scripts execute ./cadence/scripts/get_nft_details.cdc f8d6e0586b0a20c7
11. Expect token 0,1,2
flow scripts execute ./cadence/scripts/get_nft_listings.cdc f8d6e0586b0a20c7
12. flow transactions send ./cadence/utilities/fundEmulator.cdc f8d6e0586b0a20c7 1000.0
13. flow transactions send ./cadence/utilities/fundEmulator.cdc 01cf0e2f2f715450 1000.0
14. flow transactions send ./cadence/transactions/purchase.cdc f8d6e0586b0a20c7 0 --signer=justin
15. Expect tokens 1,2
flow scripts execute ./cadence/scripts/get_nft_details.cdc f8d6e0586b0a20c7
16. Expect token 0
flow scripts execute ./cadence/scripts/get_nft_details.cdc 01cf0e2f2f715450
17. Run for tokens 1,2
flow transactions send ./cadence/transactions/purchase.cdc f8d6e0586b0a20c7 1 --signer=justin
18. Play game
flow transactions send ./cadence/transactions/play_game.cdc 0 0xf8d6e0586b0a20c7 --signer=justin
19. Admin flips coin
flow transactions send ./cadence/transactions/flip_coin.cdc 0
20. Play the game for tokens 2,3
21. Admin flips coins

# Testnet Deployment

1. flow keys generate
2. Enter public key: https://testnet-faucet-v2.onflow.org/
3. Store these keys safely
4. Update flow.json testnet-account with the private key and address
5. Ensure flow.json has the right contracts to be deployed
6. Update hardcoded values in scripts/txns

    Hardcoded admin values

    flip_coin.cdc
    flip_coins.cdc
    coinmonitor.bat

7. Update flow.json aliases if needed
8. flow deploy project --network=testnet

9. Verify contracts are deployed https://testnet.flowscan.org/account/0xf8568211504c7dcf

10. Create a new email account for the storefront

11. Sign in to the dapp

12. Fund new storefront with some flow from the faucet https://testnet-faucet-v2.onflow.org/

13. Update all the js script imports for the coin/nftmarketplace contracts

14. Click the setup button for the storefront account

15. Mint a bunch of NFTs of different bronze coins, both heads and tails
flow transactions send ./cadence/transactions/mint_nft.cdc 0x7b2848088d45b449 0 0 QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio --signer=testnet-account --network=testnet

flow transactions send ./cadence/transactions/mint_nft.cdc 0x7b2848088d45b449 1 0 QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8 --signer=testnet-account --network=testnet

16. As the storefront, list all the NFTs

# Storage and Address References

Coin
Coin.CollectionStoragePath = /storage/CoinCollection
Coin.CollectionPublicPath = /public/CoinCollection
Coin.MinterStoragePath = /storage/CoinMinter
Coin.CollectionPrivatePath = /private/CoinCollection
Coin.CoinFlipperStoragePath = /storage/CoinFlipper

NFTMarketplace
/public/SaleCollection
/storage/SaleCollection

Admin: 0xf8568211504c7dcf
Storefront: 0x7b2848088d45b449

# Scripts Reference

get_nft_ids.cdc

    flow scripts execute ./cadence/scripts/get_nft_ids.cdc 0x7b2848088d45b449 
    flow scripts execute ./cadence/scripts/get_nft_ids.cdc 0x7b2848088d45b449 --network=testnet

get_collection_length.cdc

    flow scripts execute ./cadence/scripts/get_collection_length.cdc 0x7b2848088d45b449

get_nft_details.cdc

    flow scripts execute ./cadence/scripts/get_nft_details.cdc f8d6e0586b0a20c7
    flow scripts execute ./cadence/scripts/get_nft_details.cdc 0xb5d3705b4021c2ea --network=testnet

get_nft_listings.cdc

    flow scripts execute ./cadence/scripts/get_nft_listings.cdc 0x7b2848088d45b449
    flow scripts execute ./cadence/scripts/get_nft_listings.cdc 0xb5d3705b4021c2ea --network=testnet

get_nft_item_full.cdc

    flow scripts execute ./cadence/scripts/get_nft_item_full.cdc 0x7b2848088d45b449 0

get_metadata.cdc - Broken - To Fix

    flow scripts execute ./cadence/scripts/get_metadata.cdc 0x7b2848088d45b449 0

check_coincollection.cdc

    flow scripts execute ./cadence/scripts/check_coincollection.cdc 0x7b2848088d45b449
    flow scripts execute ./cadence/scripts/check_coincollection.cdc 0x7b2848088d45b449 --network=testnet

# NFT References

Heads CID: QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio
Tails CID: QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8

# Transactions Reference

setup_coin.cdc

    flow transactions send ./cadence/transactions/setup_coin.cdc
    flow transactions send ./cadence/transactions/setup_coin.cdc --signer=justin
    flow transactions send ./cadence/transactions/setup_coin.cdc --signer=testnet-account --network=testnet

setup_coingame.cdc

    flow transactions send ./cadence/transactions/setup_coingame.cdc
    flow transactions send ./cadence/transactions/setup_coingame.cdc --signer=justin

mint_nft.cdc

    flow transactions send ./cadence/transactions/mint_nft.cdc 0x7b2848088d45b449 0 0 QmZrieu9iKvaSQjt9YksnkxKxghCeLPVubhAcjZovBPrio --signer=testnet- account --network=testnet

    flow transactions send ./cadence/transactions/mint_nft.cdc 0x7b2848088d45b449 1 0 QmdKL3bdPWnh4M5HNsBoc9xTcTeUUiN4myUxmqKwVtnsL8 --signer=testnet-account --network=testnet

play_game.cdc

    flow transactions send ./cadence/transactions/play_game.cdc 0 0x7b2848088d45b449 
    flow transactions send ./cadence/transactions/play_game.cdc 0 0x7b2848088d45b449 --signer=justin

setup_sales.cdc

    flow transactions send ./cadence/transactions/setup_sales.cdc
    flow transactions send ./cadence/transactions/setup_sales.cdc --network=testnet --signer=testnet-account

flip_coin.cdc

    flow transactions send ./cadence/transactions/flip_coin.cdc f8d6e0586b0a20c7 0
    flow transactions send ./cadence/transactions/flip_coin.cdc f8d6e0586b0a20c7 0 --signer=justin
    flow transactions send ./cadence/transactions/flip_coin.cdc 01cf0e2f2f715450 0
    flow transactions send ./cadence/transactions/flip_coin.cdc 0x7b2848088d45b449 0 --network=testnet --signer=testnet-account

flip_coins.cdc

    flow transactions send ./cadence/transactions/flip_coins.cdc


add_coingame.cdc

    flow transactions send ./cadence/transactions/add_coingame.cdc 0 f8d6e0586b0a20c7
    flow transactions send ./cadence/transactions/add_coingame.cdc 0 f8d6e0586b0a20c7 --signer=justin

remove_coingame.cdc

    flow transactions send ./cadence/transactions/remove_coingame.cdc 0 
    flow transactions send ./cadence/transactions/remove_coingame.cdc 0 --signer=justin


list_for_sale.cdc

    flow transactions send ./cadence/transactions/list_for_sale.cdc 0 1.0
    flow transactions send ./cadence/transactions/list_for_sale.cdc 0 1.0 --signer=justin
    flow transactions send ./cadence/transactions/list_for_sale.cdc 0 1.0 --signer=testnet-account --network=testnet

unlist_from_sale.cdc

    flow transactions send ./cadence/transactions/unlist_from_sale.cdc 0
    flow transactions send ./cadence/transactions/unlist_from_sale.cdc 0 --signer=justin

setup.cdc

    flow transactions send ./cadence/transactions/setup.cdc
    flow transactions send ./cadence/transactions/setup.cdc --signer=Alice

purchase.cdc

    flow transactions send ./cadence/transactions/purchase.cdc f8d6e0586b0a20c7 0
    flow transactions send ./cadence/transactions/purchase.cdc f8d6e0586b0a20c7 0 --signer=justin

send_coin.cdc

    flow transactions send ./cadence/transactions/send_coin.cdc f8d6e0586b0a20c7 0 --signer=justin
    flow transactions send ./cadence/transactions/send_coin.cdc 01cf0e2f2f715450 1
    flow transactions send ./cadence/transactions/send_coin.cdc 0x7b2848088d45b449 1 --network=testnet --signer=testnet-account

# Other scripts/txns

Create emulator accounts

    flow keys generate
    flow accounts create --key PublicKey

    then update the flow.json

fundEmulator.cdc

    flow transactions send ./cadence/utilities/fundEmulator.cdc f8d6e0586b0a20c7 1000.0
    flow transactions send ./cadence/utilities/fundEmulator.cdc 01cf0e2f2f715450 1000.0

getBalance.cdc

    flow scripts execute ./cadence/utilities/get_balance.cdc f8d6e0586b0a20c7
    flow scripts execute ./cadence/utilities/get_balance.cdc 01cf0e2f2f715450

# IPFS

I no longer use the instructions below, I instead just use this service for hosting the image and pinning it.
https://app.pinata.cloud/

https://docs.ipfs.tech/how-to/command-line-quick-start/#take-your-node-online

Install and run 'ipfs init'
ipfs daemon
Goto localhost:5001/webui
Add the files

Goto https://natoboram.gitlab.io/public-gateway-cacher/
Paste the CID into IPFS and click Cache and then wait

# Building App

1. Download visual code studio
2. Sync settings
3. Download git
4. Install node
https://nodejs.org/en/download/
5. install react: npm install react-scripts npm start
6. Clone this repo
7. Install Flow CLI
8. run 'npm install'
9. run 'npm run start'
