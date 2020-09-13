import { GenericEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/GenericEvent_Subject';
import { IGeneric_Observer } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataStateOfSnapShotSelect } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSnapShotSelect';
import { UiManager } from './UiManager';

export class UiSelectSnapshotChangeEvent_Observer extends GenericEvent_Observer<IDataStateOfSnapShotSelect> implements IGeneric_Observer<IDataStateOfSnapShotSelect> {
    private Owner: UiManager;

    constructor(logger: ILoggerAgent, owner: UiManager) {
        super(logger);
        this.Owner = owner;
        this.Friendly = UiSelectSnapshotChangeEvent_Observer.name;
    }

    UpdateAsync(payload: IDataStateOfSnapShotSelect) {
        this.Owner.RefreshUiUIManagerFromSnapShotSelect(payload);
    }
}
