import { ethers } from 'ethers';
import TRANSACTION_DATA from '../config/config.js';

export default function getTransactionRequest() {
  return {
    from: TRANSACTION_DATA.from,
    to: TRANSACTION_DATA.to,
    value: ethers.utils.parseEther(TRANSACTION_DATA.value),
    gasPrice: ethers.utils.parseUnits(TRANSACTION_DATA.gasPrice, 'gwei'),
    gasLimit: ethers.BigNumber.from(TRANSACTION_DATA.gasLimit),
    data: TRANSACTION_DATA.data,
  };
}
