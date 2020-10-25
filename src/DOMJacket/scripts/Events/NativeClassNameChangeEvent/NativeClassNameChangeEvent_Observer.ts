import { HindsiteEventHandler_Type } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { _HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { INativeClassNameChangeEvent_Payload } from './INativeClassNameChangeEvent_Payload';
import { TypeDiscriminator } from '../../../../Shared/scripts/Enums/70 - TypeDiscriminator';

export class NativeClassNameChangeEvent_Observer extends _HindSiteEvent_Observer<INativeClassNameChangeEvent_Payload> implements IHindSiteEvent_Observer<INativeClassNameChangeEvent_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.NativeClassNameChangeEvent_Observer;

  constructor(commonCore: ICommonCore, callback: HindsiteEventHandler_Type) {
    super(commonCore, NativeClassNameChangeEvent_Observer.name, callback);
  }
}