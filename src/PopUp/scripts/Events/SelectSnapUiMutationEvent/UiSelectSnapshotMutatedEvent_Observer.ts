﻿import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { UiModulesManager } from '../../Managers/UiManager/UiModulesManager';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ISelectSnapUiMutationEvent_Payload } from './ISelectSnapUiMutationEvent_Payload';
import { EventManager } from '../../Managers/EventManager';

export class UiSelectSnapshotMutationEvent_Observer extends HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> implements IHindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {
  private Owner: UiModulesManager;

  constructor(logger: ILoggerAgent, owner: UiModulesManager) {
    super(logger, UiSelectSnapshotMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: ISelectSnapUiMutationEvent_Payload) {
    this.Owner.RefreshUiUIManagerFromSnapShotSelect(payload);
  }
}