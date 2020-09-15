import { ILoggerAgent } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataStateOfSnapShotSelect } from '../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSnapShotSelect';
import { UiManager } from '../../../../../../../PopUp/scripts/Managers/UiManager/UiManager';
import { HindSiteEvent_Observer } from '../_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../_HindSiteEvent/IHindSiteEvent_Observer';

export class UiSelectSnapshotMutationEvent_Observer extends HindSiteEvent_Observer<IDataStateOfSnapShotSelect> implements IHindSiteEvent_Observer<IDataStateOfSnapShotSelect> {
  private Owner: UiManager;

  constructor(logger: ILoggerAgent, owner: UiManager) {
    super(logger, UiSelectSnapshotMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: IDataStateOfSnapShotSelect) {
    this.Owner.RefreshUiUIManagerFromSnapShotSelect(payload);
  }
}