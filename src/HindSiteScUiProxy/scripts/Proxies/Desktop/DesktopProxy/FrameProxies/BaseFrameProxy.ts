﻿import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScWindowTypeResolver } from "../../../../../../Shared/scripts/Agents/UrlAgent/ScWindowTypeResolver";
import { DefaultStateOfDTFrame } from "../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTFrame";
import { ReadyStateNAB } from "../../../../../../Shared/scripts/Classes/ReadyStateNAB";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../../../../../Shared/scripts/Enums/50 - scWindowType";
import { DocReadyState } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScDocProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IBaseScProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
import { IScFrameProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOfContentTreeBasedProxies } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTreeBasedProxies";
import { IStateOfDTFrame } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTFrame";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _ContentTreeBasedDocProxy } from "../../../ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";
import { ScDocProxyResolver } from "../../../ScDocProxyResolver";
import { JqueryModalDialogsFrameProxy } from "../../../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { _ContentTreeBasedProxyMutationEvent_Observer } from "../Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "../Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Subject } from "../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { IDTFrameProxyMutationEvent_Payload } from "../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { _ScDocProxyOfTypeT } from "./ScDocProxyOfTypeT";
import { ScFrameProxyFactory } from "./ScFrameProxyFactory";
import { _BaseElemProxy } from "./_BaseElemProxy";

export class BaseScFrameProxy<T extends IStateOf_> extends _BaseElemProxy<T> implements IScFrameProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.DTFrameProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.DTFrameProxy];

  private _ContentTreeBasedProxyMutationEvent_Observer: _ContentTreeBasedProxyMutationEvent_Observer;
  private ScDocProxyResolver: ScDocProxyResolver;
  public DTFrameProxyMutationEvent_Subject: DTFrameProxyMutationEvent_Subject;
  Id: string = null;
  public readonly JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, frameJacket: FrameJacket, frameProxyDisciminator: ScProxyDisciminator, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, frameJacket);

    //this.ScProxyDisciminator = P;
    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;
    if (frameProxyDisciminator === ScProxyDisciminator.Unknown) {
      this.ErrorHand.HandleFatalError([BaseScFrameProxy.name, 'ctor'], 'ScProxyDisciminator.Unknown');
    }
    this.ScProxyDisciminator = frameProxyDisciminator;
    this.ScProxyDisciminatorFriendly = ScProxyDisciminator[frameProxyDisciminator];

    //this.ErrorHand.ThrowIfNullOrUndefined(BaseScFrameProxy.name, [frameJacket, this.JqueryModalDialogsFrameProxy]);

    this.InstantiateInstance();
  }

  InstantiateInstance(): void {
    this.ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
  }

  async InstantiateAwaitElementsSelf(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([BaseScFrameProxy.name, this.InstantiateAwaitElementsSelf.name, this.ScProxyDisciminatorFriendly]);

      this.ErrorHand.ThrowIfNullOrUndefined(this.InstantiateAwaitElementsSelf.name, [this.ContainerElemJacket]);

      let frameJacket: FrameJacket = this.ContainerJacketAsFrameJacket();

      if (frameJacket) {
        await frameJacket.WaitForCompleteNABFrameElement(this.ScProxyDisciminatorFriendly)
          .then((result: ReadyStateNAB) => {
            if (!result.IsCompleteNAB()) {
              reject(result.DocumentReadtStateFriendly());
            }
          })
          .then(() => this.ScDocProxyResolver.ScDocProxyFactoryMake(frameJacket.DocumentJacket, this.JqueryModalDialogsFrameProxy))
          .then((scDocProxy: IScDocProxy) => this.HostedProxies.push(scDocProxy))
          .then(() => {
            this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject(this.ApiCore);
            this._ContentTreeBasedProxyMutationEvent_Observer = new _ContentTreeBasedProxyMutationEvent_Observer(this.ApiCore, this);
          })

          .then(() => resolve())
          .catch((err: any) => reject(this.InstantiateAwaitElementsSelf.name + ' | ' + err));
      }
      this.Logger.FuncEnd([BaseScFrameProxy.name, this.InstantiateAwaitElementsSelf.name, this.ScProxyDisciminatorFriendly]);
    });
  }

   WireEventsSelf():void {
    this.Logger.FuncStart([BaseScFrameProxy.name, this.WireEventsSelf.name, this.ScProxyDisciminatorFriendly]);

    let hostedDocProxy: IScDocProxy = this.GetHostedDocProxy();
    if (hostedDocProxy) {
      if (hostedDocProxy instanceof _ContentTreeBasedDocProxy) {

        (<_ContentTreeBasedDocProxy<IStateOfContentTreeBasedProxies>>hostedDocProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);


      }

      //if (hostedDocProxy.ScProxyDisciminator === ScProxyDisciminator.ContentEditor) {
      //  (<ContentEditorDocProxy>hostedDocProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
      //} else if (hostedDocProxy.ScProxyDisciminator === ScProxyDisciminator.MediaLibrary) {
      //  (<MediaLibraryProxy>hostedDocProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
      //} else if (hostedDocProxy.ScProxyDisciminator === ScProxyDisciminator.TemplateManager) {
      //  (<TemplateManagerProxy>hostedDocProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
      //} else if (hostedDocProxy.ScProxyDisciminator === ScProxyDisciminator.MarketingControlPanel) {
      //  (<MarketingControlPanelDocProxy>hostedDocProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
      //}
    } else {
      this.ErrorHand.HandleFatalError([BaseScFrameProxy.name, this.WireEventsSelf.name, this.ScProxyDisciminatorFriendly], 'No hosted doc found');
    }

    this.Logger.FuncEnd([BaseScFrameProxy.name, this.WireEventsSelf.name, this.ScProxyDisciminatorFriendly]);
  }

  async GetStateOfSelf(): Promise<IStateOfDTFrame> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([BaseScFrameProxy.name, this.GetStateOfSelf.name]);
      let stateOfDTFrame: IStateOfDTFrame = new DefaultStateOfDTFrame();

      let frameJacket: FrameJacket = this.ContainerJacketAsFrameJacket();
      if (frameJacket) {
        stateOfDTFrame.FrameStyling = stateOfDTFrame.FrameStyling = frameJacket.GetFrameStyling();

        stateOfDTFrame.ZIndex = this.GetZindexAsInt();

        await this.GetStateOfHosted()
          .then((stateOfHosted: IStateOf_[]) => stateOfDTFrame.StateOfHostedProxies = stateOfHosted)
          .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([BaseScFrameProxy.name, this.GetStateOfSelf.name, this.ScProxyDisciminatorFriendly], err)));
      }

      resolve(stateOfDTFrame);
      this.Logger.FuncEnd([BaseScFrameProxy.name, this.GetStateOfSelf.name]);
    });
  }

  async SetStateSelf(stateOfDTFrame: IStateOfDTFrame): Promise<void> {
    try {
      this.Logger.FuncStart(this.SetStateSelf.name, BaseScFrameProxy.name);
      this.DTFrameProxyMutationEvent_Subject.DisableNotifications();

      this.SetFrameStyling(stateOfDTFrame);
      await this.SetStateOfHosted(stateOfDTFrame.StateOfHostedProxies)
        .then(() => this.DTFrameProxyMutationEvent_Subject.EnableNotifications())
        .catch((err) => this.ErrorHand.HandleFatalError([BaseScFrameProxy.name, this.SetStateSelf.name], err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SetStateSelf.name, err);
    }
    this.Logger.FuncEnd(this.SetStateSelf.name, BaseScFrameProxy.name);
  }

  TriggerEventsForInboundSelf(): void {
    this.TriggerEventsForInboundHosted();
  }

  //----------------------------------------------------------------------
  GetHostedAsDocumentJacket(): DocumentJacket {
    let toReturn: DocumentJacket = null;

    let firstHosted: IBaseScProxy = this.GetHostedDocProxy();

    let frameElemJacket: FrameJacket = this.ContainerJacketAsFrameJacket();
    if (frameElemJacket) {
      toReturn = frameElemJacket.DocumentJacket;
    }

    return toReturn;
  }
  protected ContainerJacketAsFrameJacket(): FrameJacket {
    let toReturn: FrameJacket = null;

    if (this.ContainerElemJacket) {
      toReturn = <FrameJacket>this.ContainerElemJacket;
    }
    return toReturn;
  }

  GetNativeFrameId(): string {
    return this.ContainerJacketAsFrameJacket().GetNativeIframeId();
  }

  GetScWindowType(): ScWindowType {
    let scPageTypeResolver = new ScWindowTypeResolver(this.ApiCore);
    return scPageTypeResolver.GetScWindowType(this.ContainerJacketAsFrameJacket().DocumentJacket.UrlJacket);
  }

  private SetFrameStyling(stateOfDTFrame: IStateOfDTFrame): void {
    this.Logger.FuncStart(this.SetFrameStyling.name);

    this.ContainerJacketAsFrameJacket().SetFrameStyling(stateOfDTFrame.FrameStyling);

    this.Logger.FuncEnd(this.SetFrameStyling.name);
  }

  OnContentEditorProxyMutation(payload: I_ContentTreeBasedProxyMutationEvent_Payload): void {
    let dtFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
      FrameId: this.ContainerJacketAsFrameJacket().GetNativeIframeId()
      //DTFrameProxy: this
    };
    this.DTFrameProxyMutationEvent_Subject.NotifyObserversAsync(dtFrameProxyMutationEvent_Payload);
  }

  GetHostedDocProxy(): IScDocProxy {
    this.Logger.FuncStart([BaseScFrameProxy.name, this.GetHostedDocProxy.name, this.ScProxyDisciminatorFriendly], 'Hosted Count: ' + this.HostedProxies.length);
    let toReturn: IScDocProxy = null;

    //let firstHosted: IBaseScProxy = null;

    this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => {
      if (hostedProxy instanceof _ScDocProxyOfTypeT) {
        toReturn = <IScDocProxy>hostedProxy;
      }
    });

    if (!toReturn) {
      this.Logger.LogAsJsonPretty('did not find hosted doc proxy', this.HostedProxies);
    }


    this.Logger.FuncEnd([BaseScFrameProxy.name, this.GetHostedDocProxy.name, this.ScProxyDisciminatorFriendly], (toReturn !== null).toString());
    return toReturn;
  }

  public static async ScFrameProxyFactory(apiCore: IAPICore, frameElemJacket: FrameJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy): Promise<IScFrameProxy> {
    return new Promise(async (resolve, reject) => {
      apiCore.Logger.FuncStart([BaseScFrameProxy.name, this.ScFrameProxyFactory.name]);

      let scFrameProxyFactory: ScFrameProxyFactory = new ScFrameProxyFactory(apiCore, frameElemJacket);

      await scFrameProxyFactory.ProcessStep1DocProxy()
        .then((scProxyDiscriminator: ScProxyDisciminator) => scFrameProxyFactory.ProcessStep2(new BaseScFrameProxy<IStateOf_>(apiCore, frameElemJacket, scProxyDiscriminator, jqueryModalDialogsFrameProxy)))
        .then((scFrameProxy: IScFrameProxy) => resolve(scFrameProxy))
        .catch((err: any) => reject(apiCore.ErrorHand.FormatRejectMessage([BaseScFrameProxy.name, this.ScFrameProxyFactory.name], err)));

      apiCore.Logger.FuncEnd([BaseScFrameProxy.name, this.ScFrameProxyFactory.name]);
    });
  }

  public async WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABFrameProxyOrReject.name, this.ScProxyDisciminatorFriendly);

      let frameJacket: FrameJacket = this.ContainerJacketAsFrameJacket();

      if (frameJacket) {
        await frameJacket.WaitForCompleteNABFrameElement(this.ScProxyDisciminatorFriendly)
          .then((result: ReadyStateNAB) => {
            if (result.IsCompleteNAB()) {
              resolve(result.DocumentReadyState());
            }
            else {
              reject(result.DocumentReadtStateFriendly);
            }
          })
          .catch((err: any) => reject(this.WaitForCompleteNABFrameProxyOrReject.name + ' | ' + err));
      }

      this.Logger.FuncEnd(this.WaitForCompleteNABFrameProxyOrReject.name, this.ScProxyDisciminatorFriendly);
    });
  }
}