import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./index.css";
import { init } from "@dojoengine/sdk";
import { Schema, schema } from "./bindings";
import { dojoConfig } from "../dojoConfig";



/**
 * Initializes and bootstraps the Dojo application.
 * Sets up the SDK, burner manager, and renders the root component.
 *
 * @throws {Error} If initialization fails
 */


async function main() {
    const sdk = await init<Schema>(
        {
            client: {
                rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
                toriiUrl: "https://api.cartridge.gg/x/misty-world/torii",
                relayUrl: dojoConfig.relayUrl,
                worldAddress: "0x01f0bfb923b688e9fb7e8177867c5dd22ff6e89a5471f18d8c45158fa8a4c717",
            },
            domain: {
                name: "WORLD_NAME",
                version: "1.0",
                chainId: "KATANA",
                revision: "1",
            },
        },
        schema
    );

    createRoot(document.getElementById("root")!).render(
        <StrictMode>      
                    <App sdk={sdk} />
        </StrictMode>
    );
}

main().catch((error) => {
    console.error("Failed to initialize the application:", error);
});
