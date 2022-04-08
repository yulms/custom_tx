import { ethers } from 'ethers';
import { provider } from './provider.js';
import getLogger from './system/getLogger.js';

export default class TxTraceCallParser {
  static logger = getLogger('TxTraceCallParser');

  static async parse(tx, block = 'latest') {
    const { from, to, value, gasLimit, data } = tx;
    const transactionData = {
      from,
      to,
      value: ethers.utils.hexValue(value),
      gas: ethers.utils.hexValue(gasLimit),
      data,
    };

    const callTree = await provider.send('debug_traceCall', [
      transactionData,
      block,
      { tracer: 'callTracer' },
    ]);

    return callTree;
  }
}
