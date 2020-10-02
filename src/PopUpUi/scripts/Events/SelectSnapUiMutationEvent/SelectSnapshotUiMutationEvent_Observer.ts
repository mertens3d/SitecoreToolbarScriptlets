import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { IHindeCore } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { UiModulesManager } from '../../Managers/UiManager/UiModulesManager';
import { ISelectSnapUiMutationEvent_Payload } from './ISelectSnapUiMutationEvent_Payload';

export class SelectSnapshotUiMutationEvent_Observer extends HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> implements IHindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {
  private Owner: UiModulesManager;

  constructor(hindeCore: IHindeCore, owner: UiModulesManager) {
    super(hindeCore, SelectSnapshotUiMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: ISelectSnapUiMutationEvent_Payload) {
    this.Owner.OnRefreshUiUIManagerFromSnapShotSelect(payload);
  }
}