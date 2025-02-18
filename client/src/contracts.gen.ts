// Generated by dojo-bindgen on Thu, 22 Aug 2024 20:04:33 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript`
import { DojoProvider } from "@dojoengine/core";
import { Account, BigNumberish } from "starknet";

export type IClient = Awaited<ReturnType<typeof client>>;

export function client(provider: DojoProvider) {
    // System definitions for `dojo_misty_app-actions` contract
    function actions() {
        const contract_name = "actions";

        // Call the `spawn` system with the specified Account and calldata
       	const actions_newAccount = async (snAccount: Account, wallet: string, username: BigNumberish, playerAge: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "new_account",
					calldata: [wallet, username, playerAge],
				},
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_getAccountsForWallet = async (snAccount: Account, wallet: string) => {
		try {
			return await provider.execute(
				snAccount,
				{
					contractName: "actions",
					entrypoint: "get_accounts_for_wallet",
					calldata: [wallet],
				},
				"dojo_starter",
			);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		actions: {
			newAccount: actions_newAccount,
			getAccountsForWallet: actions_getAccountsForWallet,
		},
	};
    }

    return {
        actions: actions(),
    };
}
