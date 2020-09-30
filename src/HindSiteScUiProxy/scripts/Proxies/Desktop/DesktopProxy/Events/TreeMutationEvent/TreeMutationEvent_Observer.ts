import { HindsiteEventHandler_Type } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { HindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ILoggerAgent } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ITreeProxyMutationEvent_Payload } from './ITreeMutationEvent_Payload';
import { INativeClassNameChangeEvent_Payload } from '../NativeClassNameChangeEvent/INativeClassNameChangeEvent_Payload';

export class NativeClassNameChangeEvent_Observer extends HindSiteEvent_Observer<INativeClassNameChangeEvent_Payload> implements IHindSiteEvent_Observer<INativeClassNameChangeEvent_Payload> {
  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, NativeClassNameChangeEvent_Observer.name, callback);
  }

}
export class TreeMutationEvent_Observer extends HindSiteEvent_Observer<ITreeProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<ITreeProxyMutationEvent_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, TreeMutationEvent_Observer.name, callback);
  }

}