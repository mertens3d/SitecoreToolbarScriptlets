import { FrameJacket } from "../../../../../../DOMJacket/FrameJacket";
import { ScUrlAgent } from "../../../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { DefaultStateOfDTFrame } from "../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTFrame";
import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { ReadyStateNAB } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { ScWindowType } from "../../../../../../Shared/scripts/Enums/scWindowType";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateofX";
import { IStateOfDTFrame } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfFrameStyling } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfFrameStyling";
import { ContentEditorSFProxy } from "../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { PackageDesignerProxy } from "../../../ContentEditor/ContentEditorProxy/PackageDesignerProxy";
import { ScDocumentFacade } from "../../../ScDocumentFacade";
import { ContentEditorProxyMutationEvent_Observer } from "../Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "../Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Subject } from "../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { IDTFrameProxyMutationEvent_Payload } from "../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";

export class DTFrameProxy extends _BaseScFrameProxy<IStateOfDTFrame> implements IStateFullProxy {
  Friendly: string = DTFrameProxy.name;
  StateFullProxyDisciminator = StateFullProxyDisciminator.DTFrameProxy;
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;
  FrameTypeDiscriminator = DTFrameProxy.name;
  Index: number = -1;
  private PackageDesignerProxy: PackageDesignerProxy;
  //public ContentEditorProxy: ContentEditorProxy;
  public DTFrameProxyMutationEvent_Subject: DTFrameProxyMutationEvent_Subject;
  public HostedStateFullProxy: IStateFullProxy;
  ScUrlAgent: ScUrlAgent;

  constructor(hindeCore: IHindeCore, frameJacket: FrameJacket) { //HTMLIFrameElement |
    super(hindeCore, frameJacket);

    this.ErrorHand.ThrowIfNullOrUndefined(DTFrameProxy.name, [frameJacket]);

    this.Friendly = 'DTFrameProxy_' + this.FrameJacket.GetNativeIframeId();

    this.InstantiateInstance();
  }

  InstantiateInstance(): void {

    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DTFrameProxy.name);

      this.ErrorHand.ThrowIfNullOrUndefined(this.InstantiateAsyncMembers.name, [this.FrameJacket]);

      await this.FrameJacket.WaitForCompleteNABHtmlIframeElement(this.Friendly)
        .then((result: ReadyStateNAB) => {
          if (!result.IsCompleteNAB()) {
            reject(result.DocumentReadtStateFriendly())
          }
        })
        .then(() => {
          let scWindowType: ScWindowType = this.ScDocumentProxy.ScUrlAgent.GetScWindowType();
          this.ScUrlAgent = new ScUrlAgent(this.HindeCore, this.FrameJacket.DocumentJacket.UrlJacket)
          switch (scWindowType) {
            case ScWindowType.ContentEditor:
              let contentEditorProxy = new ContentEditorSFProxy(this.HindeCore, this.ScDocumentProxy, this.Friendly);
              this.HostedStateFullProxy = contentEditorProxy;
              break;
            case ScWindowType.PackageDesigner:
              this.PackageDesignerProxy = new PackageDesignerProxy(this.HindeCore, this.ScDocumentProxy, this.Friendly)
              this.HostedStateFullProxy = this.PackageDesignerProxy;
              break;
            default:
              this.ErrorHand.WarningAndContinue(this.InstantiateAsyncMembers.name, 'un handled DTFrame type ' + ScWindowType[scWindowType]);
          }
        })
        .then(() => this.HostedStateFullProxy.InstantiateAsyncMembers())
        .then(() => {
          this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject(this.HindeCore);
          this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer(this.HindeCore, this);
        })

        .then(() => resolve())
        .catch((err) => reject(this.InstantiateAsyncMembers.name + ' | ' + err));

      this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, DTFrameProxy.name);
    });
  }

  async WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, DTFrameProxy.name);

    if (this.HostedStateFullProxy.StateFullProxyDisciminator === StateFullProxyDisciminator.ContentEditor) {
      (<ContentEditorSFProxy>this.HostedStateFullProxy).ContentEditorProxyMutationEvent_Subject.RegisterObserver(this.ContentEditorProxyMutationEvent_Observer);
    }

    this.HostedStateFullProxy.WireEvents();
    this.Logger.FuncEnd(this.WireEvents.name, DTFrameProxy.name);
  }

  async GetState(): Promise<IStateOfDTFrame> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, DTFrameProxy.name);
      let stateOfDTFrame: IStateOfDTFrame = new DefaultStateOfDTFrame();

      this.FrameJacket.GetState()
        .then((stateOfFrameStyling: IStateOfFrameStyling) => stateOfDTFrame.StateOfFrameStyling = stateOfFrameStyling)
        .catch((err) => reject(this.GetState.name + ' | ' + err));

      stateOfDTFrame.ZIndex = this.GetZindexAsInt();

      if (this.HostedStateFullProxy) {
        await this.HostedStateFullProxy.GetState()
          .then((statefullProxyState: IStateOf_) => stateOfDTFrame.StateOfHosted = statefullProxyState)
          .catch((err) => reject(this.GetState.name + ' | ' + err));
      }

      resolve(stateOfDTFrame);
      this.Logger.FuncEnd(this.GetState.name, DTFrameProxy.name);
    });
  }

  async SetState(stateOfDTFrame: IStateOfDTFrame): Promise<void> {
    try {
      this.Logger.FuncStart(this.SetState.name, DTFrameProxy.name);
      this.DTFrameProxyMutationEvent_Subject.DisableNotifications();

      await this.HostedStateFullProxy.SetState(stateOfDTFrame.StateOfHosted)
        .then(() => {
          this.SetFrameStyling(stateOfDTFrame)
          this.DTFrameProxyMutationEvent_Subject.EnableNotifications();
        });
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetState.name, err);
    }
    this.Logger.FuncEnd(this.SetState.name, DTFrameProxy.name);
  }

  TriggerEventsForInbound() {
    if (this.HostedStateFullProxy) {
      this.HostedStateFullProxy.TriggerInboundEventsAsync();
    }
  }

  TriggerInboundEventsAsync(): void {
  }

  //----------------------------------------------------------------------

  GetContentDoc(): ScDocumentFacade {
    return this.ScDocumentProxy;
    //return new FactoryHelper(this.HindeCore).DataOneContentDocFactoryFromIframe(this);
  }

  GetNativeFrameId(): string {
    return this.FrameJacket.GetNativeIframeId()
  }

  GetScWindowType(): ScWindowType {
    return (this.ScUrlAgent.GetScWindowType());
  }

  private SetFrameStyling(stateOfDTFrame: IStateOfDTFrame) {
    this.Logger.FuncStart(this.SetFrameStyling.name);

    this.FrameJacket.SetState(stateOfDTFrame.StateOfFrameStyling);

    this.Logger.FuncEnd(this.SetFrameStyling.name);
  }

  OnContentEditorProxyMutation(payload: IContentEditorProxyMutationEvent_Payload) {
    let dtFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
      FrameId: this.FrameJacket.GetNativeIframeId()
      //DTFrameProxy: this
    }
    this.DTFrameProxyMutationEvent_Subject.NotifyObserversAsync(dtFrameProxyMutationEvent_Payload);
  }
}