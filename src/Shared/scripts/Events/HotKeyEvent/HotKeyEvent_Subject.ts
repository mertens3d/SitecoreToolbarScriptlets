import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { _HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { IHotKeyEvent_Payload } from "./IHotKeyEvent_Payload";

export class HotKeyEvent_Subject extends _HindeSiteEvent_Subject<IHotKeyEvent_Payload> {
    readonly TypeDiscriminator = TypeDiscriminator.HotKeyEvent_Subject;
    ShowLogActions = true;
}
