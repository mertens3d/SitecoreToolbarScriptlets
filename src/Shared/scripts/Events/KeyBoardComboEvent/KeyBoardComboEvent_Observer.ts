import { _HindSiteEvent_Observer } from '../_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../_HindSiteEvent/IHindSiteEvent_Observer';
import { IKeyBoardComboEvent_Payload } from "./IKeyBoardComboEvent_Payload";
import { HindsiteEventHandler_Type } from '../_HindSiteEvent/HindsiteEventHandler_Type';
import { ICommonCore } from '../../Interfaces/Agents/ICommonCore';

export class KeyBoardComboEvent_Observer extends _HindSiteEvent_Observer<IKeyBoardComboEvent_Payload> implements IHindSiteEvent_Observer<IKeyBoardComboEvent_Payload> {

  constructor(commonCore: ICommonCore, callback: HindsiteEventHandler_Type) {
    super(commonCore, KeyBoardComboEvent_Observer.name, callback);
  }
}
