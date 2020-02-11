﻿import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';


export class MiscManager extends ContentManagerBase {
  constructor(hub: ContentHub) {
    hub.debug.FuncStart(MiscManager.name);
    super(hub);
    hub.debug.FuncEnd(MiscManager.name);
  }

  NotNullOrUndefined(subjectAnyAr: any[], label?: string, iterationCheck?: number): boolean;
  NotNullOrUndefined(subjectAny: any, label?: string, iterationCheck?: number);
  NotNullOrUndefined(subjectAnyOrAr: any | any[], label: string = '', iterationCheck: number = null): boolean {
    var toReturn: boolean = false;

    if (!iterationCheck) {
      iterationCheck = this.Const().MaxNullOrUndefinedIter;
    }

    iterationCheck -= 1;

    if (iterationCheck > 0) {
      if (label === '') {
        label = this.NotNullOrUndefined.name + ' : no labelprovided';
      }

      if (subjectAnyOrAr === 'undefined') {
        this.debug().Error(label, 'Is undefined');
      } else if (!subjectAnyOrAr) {
        this.debug().Error(label, 'Is Null');
      } else {
        this.debug().LogVal(label, 'Passed');
        toReturn = true;

        if (Array.isArray(subjectAnyOrAr)) {
          for (var idx = 0; idx < subjectAnyOrAr.length; idx++) {
            toReturn = toReturn && this.NotNullOrUndefined(subjectAnyOrAr[idx], (idx + 1) + ':' + subjectAnyOrAr.length + ' ' +  label, iterationCheck);
          }
        }
      }
    } else {
      this.debug().Error(this.NotNullOrUndefined.name, 'max iteration hit');
    }

    return toReturn;
  }
}