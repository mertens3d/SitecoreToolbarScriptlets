//import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
//import { FrameElemJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
//import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
//import { DocReadyState } from "../../../../../../Shared/scripts/Enums/ReadyState";
//import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
//import { IBaseScProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
//import { IScFrameProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
//import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
//import { _BaseScProxy } from "../../../StateFullDocProxies/_BaseScProxy";
//import { _BaseStateFullDocProxy } from "./_BaseStateFullDocProxy";

//export abstract class _BaseStateFullFrameProxy<T extends IStateOf_> extends _BaseScProxy implements IScFrameProxy {




//  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
//    super(apiCore);

//    this.FrameJacket = frameJacket;
//  }


  
//  }
//  //async _base_InstantiateAsyncProperties(): Promise<void> {
//  //  //this.BaseFrameFactory = new SupportFrameFactory(this.ApiCore);
//  //  try {
//  //    await this.FrameJacket.WaitForCompleteNABFrameElement(this.FrameSelectorOnHost)
//  //      //.then(() => this.HostedDocProxy = this.FrameJacket.DocumentJacket)
//  //      .catch((err: any) => this.ErrorHand.HandleFatalError(this._base_InstantiateAsyncProperties.name, err));
//  //  } catch (err: any) {
//  //    this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
//  //  }
//  //}
//}