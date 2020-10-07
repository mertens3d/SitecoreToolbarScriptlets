import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfLaunchPad } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfLaunchPad";
import { _BaseStateFullProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";

export class LaunchPadProxy extends _BaseStateFullProxy<IStateOfLaunchPad> implements IStateFullProxy {
    StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.LaunchPad;
    async GetState(): Promise<any> {
        //empty
    }
    async SetState(state: any) {
        //empty
    }
    WireEvents() {
        //empty
    }
    InstantiateAsyncMembers() {
        //empty
    }
    TriggerInboundEventsAsync(): void {
        //empty
    }
}
