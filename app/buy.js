import 'dotenv/config';
import sendTx from './sendTx.js';
import getTransactionRequest from './getTransactionRequest.js';

const transactionRequest = getTransactionRequest();
sendTx(transactionRequest);
