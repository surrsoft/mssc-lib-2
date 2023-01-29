import LogT from "logt";

const LOG_TAG = "mssc-log";

let msscLogger: any = {};
if (process.env.NODE_ENV === "production") {
  msscLogger = new LogT("none");
} else {
  msscLogger = new LogT("info");
}

export { msscLogger, LOG_TAG };
