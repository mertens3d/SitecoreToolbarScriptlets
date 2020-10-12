import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { UiModulesManager } from '../../Managers/UiManager/UiModulesManager';
import { ISelectSnapUiMutationEvent_Payload } from './ISelectSnapUiMutationEvent_Payload';
import { TypeDiscriminator } from '../../../../Shared/scripts/Enums/70 - TypeDiscriminator';

export class SelectSnapshotUiMutationEvent_Observer extends HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> implements IHindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {
  private Owner: UiModulesManager;
  readonly TypeDiscriminator = TypeDiscriminator.SelectSnapshotUiMutationEvent_Observer;

  constructor(hindeCore: IHindeCore, owner: UiModulesManager) {
    super(hindeCore, SelectSnapshotUiMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: ISelectSnapUiMutationEvent_Payload) {
    this.Owner.OnRefreshUiUIManagerFromSnapShotSelect(payload);
  }
}