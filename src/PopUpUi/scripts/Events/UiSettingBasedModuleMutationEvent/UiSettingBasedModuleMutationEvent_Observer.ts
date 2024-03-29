﻿import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiSettingBasedModuleMutationEven_Payload } from './IUiSettingBasedModuleMutationEvent_Payload';
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class UiSettingBasedModuleMutationEvent_Observer extends HindSiteEvent_Observer<IUiSettingBasedModuleMutationEven_Payload> implements IHindSiteEvent_Observer<IUiSettingBasedModuleMutationEven_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.UiSettingBasedModuleMutationEvent_Observer;

  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, UiSettingBasedModuleMutationEvent_Observer.name, callback);

    }
}
