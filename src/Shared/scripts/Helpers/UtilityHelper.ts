import { HelperBase } from '../Classes/HelperBase';

export class UtilityHelper extends HelperBase {
  MakeSelectorFromId(TabId: string): any {
    return '[id=' + TabId + ']';
  }

  
}