﻿import { NativeIframeProxy } from "../../../../NativeScIframeProxy";

export interface INativeIFrameAddRemoveEvent_Payload {
  RemovedIFrameIds: string[];
  AddedNativeIFrameProxies: NativeIframeProxy[];
}