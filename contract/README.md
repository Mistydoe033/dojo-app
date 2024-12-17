![Dojo Starter](./assets/cover.png)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/mark-dark.svg">
  <img alt="Dojo logo" align="right" width="120" src=".github/mark-light.svg">
</picture>

<a href="https://twitter.com/dojostarknet">
<img src="https://img.shields.io/twitter/follow/dojostarknet?style=social"/>
</a>
<a href="https://github.com/dojoengine/dojo">
<img src="https://img.shields.io/github/stars/dojoengine/dojo?style=social"/>
</a>

[![discord](https://img.shields.io/badge/join-dojo-green?logo=discord&logoColor=white)](https://discord.gg/PwDa2mKhR4)
[![Telegram Chat][tg-badge]][tg-url]

[tg-badge]: https://img.shields.io/endpoint?color=neon&logo=telegram&label=chat&style=flat-square&url=https%3A%2F%2Ftg.sumanjay.workers.dev%2Fdojoengine
[tg-url]: https://t.me/dojoengine

# Dojo Starter: Official Guide

A quickstart guide to help you build and deploy your first Dojo provable game.

Read the full tutorial [here](https://dojoengine.org/tutorial/dojo-starter).

## Running Locally

#### Terminal one (Make sure this is running)

```bash
# Run Katana
katana --dev --dev.no-fee
```

#### Terminal two

```bash
# Build the example
sozo build

# Inspect the world
sozo inspect

# Migrate the example
sozo migrate

# Start Torii
# Replace <WORLD_ADDRESS> with the address of the deployed world from the previous step
torii --world <WORLD_ADDRESS> --http.cors_origins "*"
```

---

## Contribution

1. **Report a Bug**

    - If you think you have encountered a bug, and we should know about it, feel free to report it [here](https://github.com/dojoengine/dojo-starter/issues) and we will take care of it.

2. **Request a Feature**

    - You can also request for a feature [here](https://github.com/dojoengine/dojo-starter/issues), and if it's viable, it will be picked for development.

3. **Create a Pull Request**
    - It can't get better then this, your pull request will be appreciated by the community.

Happy coding!



# Seth Notes for Dojo Starter

## Steps for Development and Deployment

1. **Import Required Models**  
   Ensure you import all necessary models in the parent module of your function.

2. **Compile the Contract**  
   After making changes, compile the contract by running: `sozo build`

3. **Migrate and Deploy**  
   Update and deploy the contract using:  `sozo migrate`

4. **Start the Local Environment**  
   Run the local development environment with: `katana --dev`

5. **Execute Actions**  
   Execute your new action using: `sozo execute actions {function_name} -c {params}`
   
   - For `felt252` data types, format strings as `sstr:"string"`.

   - **Example**:  
     
     `sozo execute actions update_username -c 1,sstr:"misty" --wait --receipt`

     **Note**: Separate parameters with commas **without spaces**.

6. **Key Arguments for Execution**  
   - `--wait`: Waits for the transaction to complete before returning the transaction hash.  
   - `--receipt`: Provides a receipt of the transaction.

7. **Fetching Data**  
   To retrieve data from a deployed contract, use: `sozo model get {model_name} {key}`


    - **Example**:  
     
     `sozo model get Player 1`

