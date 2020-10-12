import { SharedConst } from "../../SharedConst";

export class LoggerTimer {
  TimeLast: number;
  private TimeStart: Date;
  private TimeMarkStart: number;

  constructor() {
    this.TimeStart = new Date();
    this.TimeLast = this.TimeStart.getTime();
    this.TimeMarkStart = this.TimeLast;
  }

  GetTimeDiff(): string {
    let toReturn: string = '';
    let timeNow = new Date().getTime();

    let timeDiffSinceLastMs = timeNow - this.TimeLast;
    let timeDiffOVerAll = timeNow - this.TimeMarkStart;

    let toReturnSinceLast: string;
    let toReturnSinceStart: string;
    let padLength = 5;

    if (timeDiffSinceLastMs >= SharedConst.Const.Logger.MinTimeDiffMs) {
      toReturnSinceLast = this.padFront(timeDiffSinceLastMs, padLength);
    }
    else {
      toReturnSinceLast = this.padFront(' ', padLength, ' ');
    };

    toReturnSinceStart = this.padFront(timeDiffOVerAll, padLength, '0');

    toReturn = toReturnSinceStart + ' ' + toReturnSinceLast;

    this.TimeLast = timeNow;

    return toReturn;
  }

  private padFront(input: any, desiredLength = 2, padChar = '0') {
    let toReturn: string = input.toString();
    let maxIter = 10;

    while ((toReturn.length < desiredLength) && maxIter > 0) {
      maxIter--;
      toReturn = padChar + toReturn;
    }

    return toReturn;
  }

  LogTimeStamp() {
    var result = this.padFront(this.TimeStart.getDate()) + "/" + this.padFront(this.TimeStart.getMonth() + 1) + "/" + this.TimeStart.getFullYear() + " " + this.padFront(this.TimeStart.getHours()) + ":" + this.padFront(this.TimeStart.getMinutes());
    return result;
  }
}