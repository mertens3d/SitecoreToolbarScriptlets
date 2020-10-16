import { IStateLessDocProxy } from "./IStateLessDocProxy";

export interface IStateLessDTFrameProxy {
    InstantiateAsyncMembers(): Promise<void>;
    //HostedDocProxy: IStateLessDocProxy;
}
