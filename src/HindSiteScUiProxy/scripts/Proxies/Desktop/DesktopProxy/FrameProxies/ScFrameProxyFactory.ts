﻿import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDiscriminatorMappingPair } from "../../../../../../Shared/scripts/Interfaces/IDiscriminatorMappingPair";
import { IScDocProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IScFrameProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { ScFrameToScDocDiscriminatorMapping } from "../../../../Collections/ScFrameToScDocDiscriminatorMapping";
import { ScDocProxyResolver } from "../../../ScDocProxyResolver";
import { BaseScFrameProxy } from "./BaseFrameProxy";

export class ScFrameProxyFactory extends _APICoreBase {
  private ScFrameProxy: IScFrameProxy = null;
  private FrameJacket: FrameJacket;
  private newScDocProxy: IScDocProxy = null;

  constructor(apiCore: IAPICore, frameJacket: FrameJacket) { // rawScFrameProxy: IScFrameProxy, newScDocProxy: IScDocProxy,
    super(apiCore);
    this.FrameJacket = frameJacket;
  }

  async Make(): Promise<IScFrameProxy> {
    return new Promise((resolve, reject) => {
    });
  }

  private GetFrameProxyDiscriminatorFromDocProxyDiscriminator(needleScDocProxyDiscriminator: ScProxyDisciminator): ScProxyDisciminator {
    let toReturn: ScProxyDisciminator = ScProxyDisciminator.Unknown;

    ScFrameToScDocDiscriminatorMapping.Mappings.forEach((mapping: IDiscriminatorMappingPair) => {
      if (needleScDocProxyDiscriminator === mapping.DocProxyDisciminator) { toReturn = mapping.FrameProxyDiscriminator }
    });

    return toReturn;
  }

  ProcessStep1DocProxy(): Promise<ScProxyDisciminator> {
    return new Promise(async (resolve, reject) => {

      this.Logger.FuncStart([ScFrameProxyFactory.name, this.ProcessStep1DocProxy.name]);

      let newFrameProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.Unknown;

      await this.FrameJacket.WaitForCompleteNABFrameElement(this.ProcessStep1DocProxy.name)
        .then(() => this.ProcessHostedScDocProxy())
        .then((scDocProxy: IScDocProxy) => {
          this.newScDocProxy = scDocProxy;
          newFrameProxyDisciminator = this.GetFrameProxyDiscriminatorFromDocProxyDiscriminator(this.newScDocProxy.ScProxyDisciminator);
        })
        .then(() => resolve(newFrameProxyDisciminator))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([ScFrameProxyFactory.name, this.ProcessStep1DocProxy.name], err)));

      this.Logger.FuncStart([ScFrameProxyFactory.name, this.ProcessStep1DocProxy.name]);
    })
  }

  ProcessStep2(scFrameProxy: IScFrameProxy): Promise<IScFrameProxy> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart([ScFrameProxyFactory.name, this.ProcessStep2.name]);
      scFrameProxy.HostedProxies.push(this.newScDocProxy)
      resolve(scFrameProxy);
      this.Logger.FuncEnd([ScFrameProxyFactory.name, this.ProcessStep2.name]);
    });
  }

  private async ProcessHostedScDocProxy(): Promise<IScDocProxy> {
    return new Promise(async (resolve, reject) => {
      let scDocProxyResolver: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
      await scDocProxyResolver.ScDocProxyFactoryMake(this.FrameJacket.DocumentJacket, null)
        .then((scDocProxy: IScDocProxy) => resolve(scDocProxy))
        .catch((err: any) => reject(this.ApiCore.ErrorHand.FormatRejectMessage([BaseScFrameProxy.name, this.ProcessHostedScDocProxy.name], err)));
    });
  }

  //public static async ProcessFrameProxy<T extends IStateOf_>(apiCore: IAPICore, frameElemJacket: FrameJacket, frameProxyDisciminator: ScProxyDisciminator, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy): Promise<IScFrameProxy> {
  //  return new Promise(async (resolve, reject) => {
  //    let scFrameProxy: IScFrameProxy = null;

  //      .then(() => scFrameProxy = (new BaseScFrameProxy<T>(apiCore, frameElemJacket, frameProxyDisciminator, jqueryModalDialogsFrameProxy)))
  //      .then(() => resolve(scFrameProxy))
  //      .catch((err: any) => reject(apiCore.ErrorHand.FormatRejectMessage([BaseScFrameProxy.name, this.ProcessFrameProxy.name], err)));
  //  });
  //}
}