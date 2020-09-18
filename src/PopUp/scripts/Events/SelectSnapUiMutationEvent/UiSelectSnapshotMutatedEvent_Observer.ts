import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { UiManager } from '../../Managers/UiManager/UiManager';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ISelectSnapUiMutationEvent_Payload } from './ISelectSnapUiMutationEvent_Payload';

export class UiSelectSnapshotMutationEvent_Observer extends HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> implements IHindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {
  private Owner: UiManager;

  constructor(logger: ILoggerAgent, owner: UiManager) {
    super(logger, UiSelectSnapshotMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: ISelectSnapUiMutationEvent_Payload) {
    this.Owner.RefreshUiUIManagerFromSnapShotSelect(payload);
  }
}