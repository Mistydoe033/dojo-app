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
                toriiUrl: "https://api.cartridge.gg/x/dojo-misty-app/torii",
                relayUrl: dojoConfig.relayUrl,
                worldAddress: "0x006502dbe1c5627f9120731e161dd4d9b7d02897b5ff719",
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
