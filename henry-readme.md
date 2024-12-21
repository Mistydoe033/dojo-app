# Dojo Setup and Deployment Guide

This guide provides step-by-step instructions for setting up Dojo, deploying a world to Sepolia, and running Torii and the client locally.

## Prerequisites

1. Install the latest Dojo:

```bash
asdf plugin add dojo https://github.com/dojoengine/asdf-dojo
asdf install dojo latest
asdf global dojo latest
```

2. Verify that Torii is working:

```bash
torii --version
```

If Torii is working, proceed to update all references to the namespace (currently `dojo_misty_app`).

## Deploying Your World to Sepolia

1. Navigate to the `contract` directory:

```bash
cd contract
```

2. Update the `.env` file with the following:
   - A deployed StarkNet/Braavos account address (an account that is deployed has made at least one send transaction).
   - Its private key from either the Braavos wallet or from your account at [https://snaps.consensys.io/starknet](https://snaps.consensys.io/starknet).


3. In the `dojo_sepolia.toml` file, comment out everything under `[env]` for the first deployment.

4. Deploy your world:

```bash
./deploy_sepolia.sh
```

5. Add the world address returned by the script to the `dojo_sepolia.toml` file.

6. Locate the world block for the deployment on StarkScan:

[https://sepolia.starkscan.co/](https://sepolia.starkscan.co/)

7. Add the world block to the `dojo_sepolia.toml` file.

8. After all values are updated, use the following command to update deployments on the testnet:

```bash
sozo --profile sepolia migrate
```

## Running Torii and the Client Locally

1. Open a new terminal and run Torii:

```bash
torii -w {world_address} \
      --rpc https://api.cartridge.gg/x/starknet/sepolia \
      --indexing.world_block 402610 \
      --http.cors_origins '*' \
      --http.addr 0.0.0.0
```

   - Replace `{world_address}` with your world address returned from `./deploy_sepolia.sh`.
   - For `--indexing.world_block`, round down to the nearest 10 from the world block added in `dojo_sepolia.toml`. This ensures Torii indexes only current data.
   - `--http.addr 0.0.0.0` exposes Torii locally for the React app to connect to or setup Torii persistently(steps below).



## Updating Torii to slot and Running the Client

1. To deploy Torii persistently (so data is not wiped on terminal close), follow the guide at [https://docs.cartridge.gg/slot/getting-started](https://docs.cartridge.gg/slot/getting-started).

2. Navigate to the `client` directory:

```bash
cd client
```

3. Update `main.tsx` with the following:
   - Set the world address to match `dojo_sepolia.toml`.
   - Set the Torii URL to:`https://api.cartridge.gg/x/{name-of-project}/torii`
   - Replace `{name-of-project}` with the name from your Slot Torii deployment.

3.1. Go to `ActionsTx.tsx` and add the deployed contract address as the `ACTIONS_CONTRACT`.

4. Install dependencies and Start the React app:

```bash
npm i
```

```bash
npm run dev
```