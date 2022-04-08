import pinoms from 'pino-multi-stream';

const LOG_TO_CONSOLE = true;
const logLevelByEnv = {
  // 'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'.
  PRODUCTION: 'info',
  DEVELOPMENT: 'debug',
};
const LOG_LEVEL_TO_CONSOLE = logLevelByEnv[process.env.NODE_ENV] ?? 'debug';
const PRETTY_CONSOLE_LOGS = true;
const SHOW_MILLISECONDS = true;

const getLocalTimeWithMs = () => {
  const date = new Date(Date.now());
  const ms = String(date.getMilliseconds()).padStart(3, '0');
  const dateStr = `${date.toLocaleString().replace(',', '')}.${ms}`;
  return `,"time": ${dateStr}"`; // кавычка убрана из-за бага - появляется лишняя
};

const getLocalTime = () => `,"time":"${new Date(Date.now()).toLocaleString().replace(',', '')}"`;

// const getISOTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`;

const { multistream } = pinoms;

const streams = [];

if (LOG_TO_CONSOLE) {
  streams.push({
    level: LOG_LEVEL_TO_CONSOLE,
    stream: PRETTY_CONSOLE_LOGS ? pinoms.prettyStream() : process.stdout,
  });
}

export default function getLogger(name) {
  return pinoms({
    name,
    level: 'debug', // в конфигурации с multistream здесь указывается самый низкий level, реально принимаются из конфига streams
    base: undefined,
    timestamp: SHOW_MILLISECONDS ? getLocalTimeWithMs : getLocalTime,
  }, multistream(streams));
}
