import type { SchemaType } from "@dojoengine/sdk";

import type { BigNumberish } from 'starknet';
// Type definition for `dojo_misty_app::models::AccountValue` struct
export interface AccountValue {
	fieldOrder: string[];
	player_age: BigNumberish;
}

// Type definition for `dojo_misty_app::models::Account` struct
export interface Account {
	fieldOrder: string[];
	wallet: string;
	username: BigNumberish;
	player_age: BigNumberish;
}

export interface DojoMistyAppSchemaType extends SchemaType {
	dojo_misty_app: {
		AccountValue: AccountValue,
		Account: Account,
		ERC__Balance: ERC__Balance,
		ERC__Token: ERC__Token,
		ERC__Transfer: ERC__Transfer,
	},
}
export const schema: DojoMistyAppSchemaType = {
	dojo_misty_app: {
		AccountValue: {
			fieldOrder: ['player_age'],
			player_age: 0,
		},
		Account: {
			fieldOrder: ['wallet', 'username', 'player_age'],
			wallet: "",
			username: 0,
			player_age: 0,
		},
		ERC__Balance: {
			fieldOrder: ['balance', 'type', 'tokenmetadata'],
			balance: '',
			type: 'ERC20',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
		},
		ERC__Token: {
			fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
			name: '',
			symbol: '',
			tokenId: '',
			decimals: '',
			contractAddress: '',
		},
		ERC__Transfer: {
			fieldOrder: ['from', 'to', 'amount', 'type', 'executed', 'tokenMetadata'],
			from: '',
			to: '',
			amount: '',
			type: 'ERC20',
			executedAt: '',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
			transactionHash: '',
		},

	},
};
// Type definition for ERC__Balance struct
export type ERC__Type = 'ERC20' | 'ERC721';
export interface ERC__Balance {
    fieldOrder: string[];
    balance: string;
    type: string;
    tokenMetadata: ERC__Token;
}
export interface ERC__Token {
    fieldOrder: string[];
    name: string;
    symbol: string;
    tokenId: string;
    decimals: string;
    contractAddress: string;
}
export interface ERC__Transfer {
    fieldOrder: string[];
    from: string;
    to: string;
    amount: string;
    type: string;
    executedAt: string;
    tokenMetadata: ERC__Token;
    transactionHash: string;
}