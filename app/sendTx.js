import { wallet } from './provider.js';
import getLogger from './system/getLogger.js';

const logger = getLogger('SEND_TX');

export default async function sendTx(transactionRequest) {
  logger.info('Отправка транзакции');

  const tx = await wallet.sendTransaction(transactionRequest);
  logger.info(`~
    🡆 Транзакция отправлена
    https://bscscan.com/tx/${tx.hash}`.replace(/ +/g, ' ').trim());

  const receipt = await tx.wait();
  logger.info(`✅ Транзакция подтверждена, блок: ${receipt.blockNumber}\nhttps://bscscan.com/tx/${receipt.transactionHash}`);

  process.exit();
}
