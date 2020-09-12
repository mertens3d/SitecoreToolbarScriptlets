import { LoggableBase } from '../../../../Content/scripts/Managers/LoggableBase';
import { IGeneric_Observer } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataStateOfSnapShotSelect } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSnapShotSelect';
import { UiManager } from './UiManager';

export class UiSelectSnapShot_Observer extends LoggableBase implements IGeneric_Observer<IDataStateOfSnapShotSelect> {
    private Owner: UiManager;

    constructor(logger: ILoggerAgent, owner: UiManager) {
        super(logger);
        this.Owner = owner;
        this.Friendly = UiSelectSnapShot_Observer.name;
    }
    Friendly: string;

    Update(payload: IDataStateOfSnapShotSelect) {
        this.Owner.RefreshUiUIManagerFromSnapShotSelect(payload);
    }
}
