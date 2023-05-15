﻿import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { FrameJacket } from "../../../../DOMJacket/scripts/Elements/FrameElemJacket";


export interface IBaseScFrameProxy {

    readonly ScProxyDisciminator: ScProxyDisciminator;
    readonly ScProxyDisciminatorFriendly: string;
    TriggerInboundEventsAsync(): Promise<void>;
    InstantiateAsyncMembers(): Promise<void>;
    WireEvents(): Promise<void>;
    FrameElemJacket: FrameJacket;
}