import { HindsiteEventHandler_Type } from '../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { HindSiteEvent_Observer } from '../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { INativeClassNameChangeEvent_Payload } from './INativeClassNameChangeEvent_Payload';

export class NativeClassNameChangeEvent_Observer extends HindSiteEvent_Observer<INativeClassNameChangeEvent_Payload> implements IHindSiteEvent_Observer<INativeClassNameChangeEvent_Payload> {
  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, NativeClassNameChangeEvent_Observer.name, callback);
  }
}