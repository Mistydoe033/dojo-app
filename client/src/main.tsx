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
                toriiUrl: "https://api.cartridge.gg/x/henry-world/torii",
                relayUrl: dojoConfig.relayUrl,
                worldAddress: "0x0733bae0d1fb83a998b41081498a17d1e21efb906981c7a89709256af0143b74",
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
