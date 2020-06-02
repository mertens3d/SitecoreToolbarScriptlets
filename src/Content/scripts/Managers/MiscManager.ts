﻿import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';


export class MiscManager extends ContentManagerBase {
  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(MiscManager.name);
    this.AllAgents.Logger.FuncEnd(MiscManager.name);
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
        this.AllAgents.Logger.ErrorAndThrow(label, 'Is undefined');
      } else if (!subjectAnyOrAr) {
        this.AllAgents.Logger.ErrorAndThrow(label, 'Is Null');
      } else {
        this.AllAgents.Logger.LogVal(label, 'Passed');
        toReturn = true;

        if (Array.isArray(subjectAnyOrAr)) {
          for (var idx = 0; idx < subjectAnyOrAr.length; idx++) {
            toReturn = toReturn && this.NotNullOrUndefined(subjectAnyOrAr[idx], (idx + 1) + ':' + subjectAnyOrAr.length + ' ' +  label, iterationCheck);
          }
        }
      }
    } else {
      this.AllAgents.Logger.ErrorAndThrow(this.NotNullOrUndefined.name, 'max iteration hit');
    }

    this.AllAgents.Logger.LogVal('toReturn', toReturn);
    return toReturn;
  }
}