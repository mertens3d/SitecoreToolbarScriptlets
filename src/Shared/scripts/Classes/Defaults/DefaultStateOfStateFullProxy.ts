﻿import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";
import { ScProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export class DefaultStateOfStateFullProxy implements IStateOf_ {
  DisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.Unknown];
  Disciminator: ScProxyDisciminator = ScProxyDisciminator.Unknown;
}