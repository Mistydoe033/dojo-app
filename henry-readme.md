you will need to install latest dojo

`asdf plugin add dojo https://github.com/dojoengine/asdf-dojo`

`asdf install dojo latest `

`asdf global dojo latest`

see if torii is working 

`torii --version`

if it is then change all references to the namespace, its currently `dojo_misty_app`

then to deploy your own world to sepolia 

`cd contract`

change the .env file to contain a deployed starknet/braavos account address and its private key `https://snaps.consensys.io/starknet` 

in the `dojo_sepolia.toml` comment everything under [env] out for first time deployments

then run

`./deploy_sepolia.sh`

add world address that the script returns to the toml 

look for the world block on starkscan `https://sepolia.starkscan.co/`

add world block to toml 

after all values are added back you can use `sozo --profile sepolia migrate` to update deployments on the testnet

to run torii and the client locally open a new terminal and run `torii -w {world_address} --rpc https://api.cartridge.gg/x/starknet/sepolia --indexing.world_block 402610 --http.cors_origins '*' --http.addr 0.0.0.0` 


for the `--indexing.world_block 402610` round down to the nearest 10 from the wolrd block you added into `dojo_sepolia.toml` so torii does not need to index all historical data, only current data 

`--http.addr 0.0.0.0` is just exposing torii locally for the react app to connect to 

to deploy torii so data does not get wiped on terminal close follow `https://docs.cartridge.gg/slot/getting-started`



`cd client` 

go into `main.tsx` change world address to the same as `dojo_sepolia.toml`

and torii url to `https://api.cartridge.gg/x/{name-of-project}/torii` name-of-project would come from slot torii deployment

then run `npm run dev` to start react



