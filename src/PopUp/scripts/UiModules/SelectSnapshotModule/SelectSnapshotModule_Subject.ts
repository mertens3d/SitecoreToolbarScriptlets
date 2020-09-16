import { IDataStateOfSnapShotSelect } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSnapShotSelect";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindeSiteEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class SelectSnapshotModule_Subject extends HindeSiteEvent_Subject<IDataStateOfSnapShotSelect> {
    constructor(logger: ILoggerAgent) {
        super(logger, SelectSnapshotModule_Subject.name);
    }
}
