import { ethers } from 'ethers';
import { NonceManager } from '@ethersproject/experimental';

const provider = (process.env.MAINNET_WS_URL)
  ? new ethers.providers.WebSocketProvider(process.env.MAINNET_WS_URL)
  : new ethers.providers.JsonRpcProvider(process.env.MAINNET_HTTP_URL);

const wallet = new NonceManager(new ethers.Wallet(process.env.PRIVATE_KEY, provider));

export { provider, wallet };
