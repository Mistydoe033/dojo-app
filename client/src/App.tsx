import { QueryBuilder, SDK, createDojoStore } from "@dojoengine/sdk";
import { Models, Schema } from "./bindings";
import { StarknetProvider } from './context/StarknetProvider'
import { ConnectWallet } from './context/ConnectWallet'

/**
 * Global store for managing Dojo game state.
 */
export const useDojoStore = createDojoStore<Schema>();

/**
 * Main application component that provides game functionality and UI.
 * Handles entity subscriptions, state management, and user interactions.
 *
 * @param props.sdk - The Dojo SDK instance configured with the game schema
 */
function App({ sdk }: { sdk: SDK<Schema> }) {

    return (
        <StarknetProvider>
            <ConnectWallet />
            
        </StarknetProvider>
    )
}

export default App;
