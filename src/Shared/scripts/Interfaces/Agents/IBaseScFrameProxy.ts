﻿import { ScProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { FrameElemJacket } from "../../../../DOMJacket/Elements/FrameElemJacket";


export interface IBaseScFrameProxy {

    readonly ScProxyDisciminator: ScProxyDisciminator;
    readonly ScProxyDisciminatorFriendly: string;
    TriggerInboundEventsAsync();
    InstantiateAsyncMembers(): Promise<void>;
    WireEvents();
    FrameElemJacket: FrameElemJacket;
}
