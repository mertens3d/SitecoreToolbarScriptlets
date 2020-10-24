import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateOfCEFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateOfCEFrameProxy";
import { IScFrameProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { BaseScFrameProxy } from "./BaseFrameProxy";

export class CEFrameProxy extends BaseScFrameProxy<IStateOfCEFrameProxy> implements IScFrameProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.CEFrame;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.CEFrame];
  FrameTypeDiscriminator = CEFrameProxy.name;

}