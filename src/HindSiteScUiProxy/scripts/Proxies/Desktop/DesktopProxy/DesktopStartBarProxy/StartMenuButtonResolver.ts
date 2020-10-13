import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { ScWindowType } from '../../../../../../Shared/scripts/Enums/50 - scWindowType';
import { IButtonSelectors } from "./IButtonSelectors";
import { AllStartMenuButtonSelectors } from './AllStartMenuButtonSelectos';

export class StartMenuButtonResolver extends _APICoreBase {
  GetButtonSelectors(scWindowType: ScWindowType): IButtonSelectors {
    let allWindowTypes: IButtonSelectors[] = AllStartMenuButtonSelectors.AllWindowTypes;
    let toReturn: IButtonSelectors = null;

    allWindowTypes.forEach((selectorSet: IButtonSelectors) => {
      if (selectorSet.ScWindowTypeX === scWindowType) {
        toReturn = selectorSet;
      }
    })

    if (!toReturn) {
      toReturn = {
        Pop1Selector: '',
        Pop2Selector: '',
        Pop3Selector: '',
        ScWindowTypeX: ScWindowType.Unknown,
      }
    }

    return toReturn;
  }
}