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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { toast } from 'react-toastify';

import ControllerConnector from '@cartridge/connector/controller';
import Web3 from 'web3';

const ACTIONS_CONTRACT =
    '0x049eb0b7a071807f227d2795aaa92da88b3e110048d5396ba32c7e8fb4daecad';

export const Tx = () => {
    const { connectors } = useConnect();
    const { account, address } = useAccount();

    const [submitted, setSubmitted] = useState<boolean>(false);
    const [txnHash, setTxnHash] = useState<string>();
    const [newUserUsername, setNewUserUsername] = useState<string>(''); // Username for account creation
    const [username, setUsername] = useState<string>(''); // Username for fetching account details
    const [playerAge, setPlayerAge] = useState<number>(0);
    const [accountDetails, setAccountDetails] = useState<any>(null);

    // Dialog state and dialog username
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogUsername, setDialogUsername] = useState<string>(''); // Username for dialog input

    const controller = connectors[0] as ControllerConnector;
    const explorer = useExplorer();

    const web3 = new Web3(window.ethereum);

    const execute = useCallback(async () => {
        if (!account || !newUserUsername || !playerAge) return;
        setSubmitted(true);
        setTxnHash(undefined);
        try {
            const result = await account.execute([
                {
                    contractAddress: ACTIONS_CONTRACT,
                    entrypoint: 'new_account',
                    calldata: [
                        account.address,
                        newUserUsername, // Use newUserUsername for account creation
                        playerAge,
                    ],
                },
            ]);
            setTxnHash(result.transaction_hash);
            toast.success('Account created successfully!');
        } catch (e) {
            console.error(e);
            toast.error('Error creating account.');
        } finally {
            setSubmitted(false);
        }
    }, [account, newUserUsername, playerAge]);

    const fetchAccountDetails = useCallback(async () => {
        if (!account || !dialogUsername) return; // Use dialogUsername for fetching account details
        try {
            const result = await account.callContract({
                contractAddress: ACTIONS_CONTRACT,
                entrypoint: 'get_account_for_wallet',
                calldata: [account.address, dialogUsername], // Pass dialogUsername here
            });

            // Convert the hex username to a string
            const hexToString = (hex: any) => {
                return web3.utils.hexToUtf8(hex);
            };

            const playerAge = parseInt(result[2], 16);
            console.log('Age:', playerAge);
           

            if (playerAge === 0) {
                console.log('Player age is 0, triggering error toast.');
                toast.error('Account does not exist or invalid data (Player age is 0).');
                return; // Exit early since the account is invalid
            }
            console.log('Full result:', result);

            setAccountDetails({
                wallet: result[0],
                username: hexToString(result[1]), // Convert the hex username to string
                playerAge: playerAge,
            });
            toast.success('Account details fetched successfully!');
        } catch (e) {
            console.error('Error fetching account details:', e);
            toast.error('Error fetching account details.');
        }
    }, [account, dialogUsername]); // Watch dialogUsername

    useEffect(() => {
        setAccountDetails({
            wallet: null,
            username: null, // Convert the hex username to string
            playerAge: null,
        });
        if (!account || !address) return;
        controller.username()?.then((n) => setNewUserUsername(n)); // Set the initial value for newUserUsername
    }, [address, controller, account]);

    if (!account) return null;

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDialogSubmit = () => {
        fetchAccountDetails();
        handleDialogClose();
    };

    return (
        <Container>
            <Box mt={4} p={5} boxShadow={3} borderRadius={2} bgcolor="background.paper">
                <Typography variant="h4" gutterBottom>
                    Create New Account
                </Typography>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={newUserUsername} // Use newUserUsername for account creation
                        onChange={(e) => setNewUserUsername(e.target.value)}
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
                    disabled={submitted || !newUserUsername || !playerAge}
                    fullWidth
                >
                    {submitted ? <CircularProgress size={24} /> : 'Create Account'}
                </Button>
                <Box mt={2}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setDialogOpen(true)}
                        fullWidth
                    >
                        Fetch Account Details from Chain
                    </Button>
                </Box>

                {/* Dialog for username input */}
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Enter Username</DialogTitle>
                    <DialogContent>
                        <TextField
                            sx={{mt:3}}
                            fullWidth
                            label="Username"
                            variant="outlined"
                            value={dialogUsername} // Use dialogUsername here
                            onChange={(e) => setDialogUsername(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDialogSubmit} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                {accountDetails && (
                    <Box mt={2}>
                        <Typography variant="h6">On Chain Account Details:</Typography>
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
