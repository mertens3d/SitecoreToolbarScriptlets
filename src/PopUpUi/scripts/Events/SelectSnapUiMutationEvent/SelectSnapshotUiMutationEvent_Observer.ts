import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { UiModulesManager } from '../../Managers/UiManager/UiModulesManager';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ISelectSnapUiMutationEvent_Payload } from './ISelectSnapUiMutationEvent_Payload';
import { UiEventManager } from '../../Managers/UiEventManager';

export class SelectSnapshotUiMutationEvent_Observer extends HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> implements IHindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {
  private Owner: UiModulesManager;

  constructor(logger: ILoggerAgent, owner: UiModulesManager) {
    super(logger, SelectSnapshotUiMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: ISelectSnapUiMutationEvent_Payload) {
    this.Owner.OnRefreshUiUIManagerFromSnapShotSelect(payload);
  }
}