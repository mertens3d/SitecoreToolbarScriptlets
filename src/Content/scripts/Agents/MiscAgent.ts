﻿import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";

export class MiscAgent extends _HindeCoreBase {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
    this.Logger.FuncStart(MiscAgent.name);
    this.Logger.FuncEnd(MiscAgent.name);
  }

  NotNullOrUndefined(subjectAnyAr: any[], label?: string, iterationCheck?: number): boolean;
  NotNullOrUndefined(subjectAny: any, label?: string, iterationCheck?: number);
  NotNullOrUndefined(subjectAnyOrAr: any | any[], label: string = '', iterationCheck: number = null): boolean {
    var toReturn: boolean = false;

    if (!iterationCheck) {
      iterationCheck = ContentConst.Const.MaxNullOrUndefinedIter;
    }

    iterationCheck -= 1;

    if (iterationCheck > 0) {
      if (label === '') {
        label = this.NotNullOrUndefined.name + ' : no label provided';
      }

      if (subjectAnyOrAr === 'undefined') {
        this.ErrorHand.ErrorAndThrow(label, 'Is undefined');
      } else if (!subjectAnyOrAr) {
        this.ErrorHand.ErrorAndThrow(label, 'Is Null');
      } else {
        this.Logger.LogVal(label, 'Passed');
        toReturn = true;

        if (Array.isArray(subjectAnyOrAr)) {
          for (var idx = 0; idx < subjectAnyOrAr.length; idx++) {
            toReturn = toReturn && this.NotNullOrUndefined(subjectAnyOrAr[idx], (idx + 1) + ':' + subjectAnyOrAr.length + ' ' + label, iterationCheck);
          }
        }
      }
    } else {
      this.ErrorHand.ErrorAndThrow(this.NotNullOrUndefined.name, 'max iteration hit');
    }

    this.Logger.LogVal('toReturn', toReturn);
    return toReturn;
  }
}