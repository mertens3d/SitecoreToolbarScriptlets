//import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
//import { FrameElemJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
//import { ReadyStateNAB } from "../../../../../Shared/scripts/Classes/ReadyStateNAB";
//import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
//import { DocReadyState } from "../../../../../Shared/scripts/Enums/ReadyState";
//import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
//import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
//import { IBaseScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
//import { IBaseScProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
//import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
//import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
//import { _BaseElemProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseElemProxy";
//import { _BaseStateFullDocProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";
//import { ScDocProxyResolver } from "../../ScDocProxyResolver";

//export abstract class _BaseFrameProxyOfTypeT<T extends IStateOf_> extends _BaseElemProxy<T> implements IScFrameProxy {
//  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.GenericStateLessFrameProxy;
//  readonly ScProxyDisciminatorFriendly: string;
//  FrameSelectorOnHost: string;



//  private constructor(apiCore: IAPICore, frameJacket: IJacketOfType) {
//    super(apiCore, frameJacket);
//  }





//  //async GetState(): Promise<T> {
//  //  //empty by default
//  //  let stateOf: IStateOf_ = {
//  //    Disciminator: ScProxyDisciminator.Unknown,
//  //    DisciminatorFriendly: ScProxyDisciminator[ScProxyDisciminator.Unknown],
//  //    StateOfHostedProxies: []
//  //  };

//  //  return Promise.resolve(<T>stateOf);
//  //}








//}