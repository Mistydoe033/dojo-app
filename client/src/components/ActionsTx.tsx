import { useAccount, useConnect, useExplorer } from '@starknet-react/core';
import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
    Link,
    Alert,
} from '@mui/material';

import ControllerConnector from '@cartridge/connector/controller';
import Web3 from 'web3';

const ACTIONS_CONTRACT =
    '0x049eb0b7a071807f227d2795aaa92da88b3e110048d5396ba32c7e8fb4daecad';

export const Tx = () => {
    const { connectors } = useConnect();
    const { account, address } = useAccount();

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [txnHash, setTxnHash] = useState<string>();
    const [username, setUsername] = useState<string>('');
    const [playerAge, setPlayerAge] = useState<number>(0);
    const [accountDetails, setAccountDetails] = useState<any>(null);

    const controller = connectors[0] as ControllerConnector;
    const explorer = useExplorer();

    const web3 = new Web3(window.ethereum);

    const execute = useCallback(async () => {
        if (!account || !username || !playerAge) return;
        setSubmitted(true);
        setTxnHash(undefined);
        try {
            const result = await account.execute([
                {
                    contractAddress: ACTIONS_CONTRACT,
                    entrypoint: 'new_account',
                    calldata: [
                        account.address, 
                        username, 
                        playerAge, 
                    ],
                },
            ]);
            setTxnHash(result.transaction_hash);
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitted(false);
        }
    }, [account, username, playerAge]);

    const fetchAccountDetails = useCallback(async () => {
        if (!account || !username) return;
        try {
            const result = await account.callContract({
                contractAddress: ACTIONS_CONTRACT,
                entrypoint: 'get_account_for_wallet',
                calldata: [account.address, username],
            });

            // Convert the hex username to a string
            const hexToString = (hex:any) => {
                return web3.utils.hexToUtf8(hex);
            };
            console.log('Full result:', result);

            setAccountDetails({
                wallet: result[0],
                username: hexToString(result[1]), // Convert the hex username to string
                playerAge: parseInt(result[2], 16),
            });
        } catch (e) {
            console.error('Error fetching account details:', e);
        }
    }, [account, username]);

    useEffect(() => {
        if (!account || !address) return;
        controller.username()?.then((n) => setUsername(n));
    }, [address, controller, account]);

    if (!account) return null;

    return (
        <Container >
            <Box mt={4} p={5} boxShadow={3} borderRadius={2} bgcolor="background.paper">
                <Typography variant="h4" gutterBottom>
                    Create New Account
                </Typography>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={submitted}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Player Age"
                        type="number"
                        variant="outlined"
                        value={playerAge}
                        onChange={(e) => setPlayerAge(Number(e.target.value))}
                        disabled={submitted}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={execute}
                    disabled={submitted || !username || !playerAge}
                    fullWidth
                >
                    {submitted ? <CircularProgress size={24} /> : 'Create Account'}
                </Button>
                <Box mt={2}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={fetchAccountDetails}
                        fullWidth
                    >
                        Fetch Account Details from Chain
                    </Button>
                </Box>
                {accountDetails && (
                    <Box mt={2}>
                        <Typography variant="h6">Account Details:</Typography>
                        <Typography>Wallet: {accountDetails.wallet}</Typography>
                        <Typography>Username: {accountDetails.username}</Typography>
                        <Typography>Player Age: {accountDetails.playerAge}</Typography>
                    </Box>
                )}
                {txnHash && (
                    <Box mt={2}>
                        <Alert severity="success">
                            Transaction hash:{' '}
                            <Link
                                href={explorer.transaction(txnHash)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {txnHash}
                            </Link>
                        </Alert>
                    </Box>
                )}
            </Box>
        </Container>
    );
};
