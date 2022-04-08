import 'dotenv/config';
import { provider } from './provider.js';
import getLogger from './system/getLogger.js';
import TxTraceCallParser from './TxTraceCallParser.js';
import sendTx from './sendTx.js';
import getTransactionRequest from './getTransactionRequest.js';

const logger = getLogger('MAIN');

function startImitation() {
  let success = false;
  const transactionRequest = getTransactionRequest();

  provider.on('block', async (blockNumber) => {
    const callData = await TxTraceCallParser.parse(transactionRequest);
    if (callData.error || success) {
      logger.info(`Ошибка выполнения имитации, блок ${blockNumber}`);
      return;
    }
    success = true;
    provider.removeAllListeners();
    logger.warn(`Имитация успешно выполнена, блок ${blockNumber}`);

    sendTx(transactionRequest);
  });
}

startImitation();
