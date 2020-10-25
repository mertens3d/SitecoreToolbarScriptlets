import { _HindSiteEvent_Observer } from '../_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../_HindSiteEvent/HindsiteEventHandler_Type';
import { ICommonCore } from '../../Interfaces/Agents/ICommonCore';
import { IHotKeyEvent_Payload } from './IHotKeyEvent_Payload';

export class HotKeyEvent_Observer extends _HindSiteEvent_Observer<IHotKeyEvent_Payload> implements IHindSiteEvent_Observer<IHotKeyEvent_Payload> {
    constructor(commonCore: ICommonCore, callback: HindsiteEventHandler_Type) {
        super(commonCore, HotKeyEvent_Observer.name, callback);
    }

}
