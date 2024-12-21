import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useEffect, useState } from 'react';
import ControllerConnector from '@cartridge/connector/controller';
import {
    Box,
    Button,
    Container,
    Typography,
    Alert,
} from '@mui/material';

export function ConnectWallet() {
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();
    const controller = connectors[0] as ControllerConnector;
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        if (!address) return;
        controller.username()?.then((n) => setUsername(n));
    }, [address, controller]);

    return (
        <Container>
            <Box mt={4} p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
                {address ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Connected Account
                        </Typography>
                        <Alert severity="info" sx={{ mb: 2 }}>
                            <strong>Account:</strong> {address}
                        </Alert>
                        {username && (
                            <Typography variant="body1">
                                <strong>Username:</strong> {username}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => disconnect()}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Disconnect
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Connect Your Wallet
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => connect({ connector: controller })}
                            fullWidth
                        >
                            Connect
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
}
