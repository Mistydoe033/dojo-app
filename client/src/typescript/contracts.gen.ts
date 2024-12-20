import { DojoProvider } from "@dojoengine/core";
import { Account, BigNumberish } from "starknet";
import * as models from "./models.gen";

export async function setupWorld(provider: DojoProvider) {

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