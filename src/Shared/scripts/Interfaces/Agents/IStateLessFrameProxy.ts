import { IStateLessDocProxy } from "./IStateLessDocProxy";

export interface IStateLessFrameProxy {
    InstantiateAsyncMembers(): Promise<void>;
    //HostedDocProxy: IStateLessDocProxy;
}
