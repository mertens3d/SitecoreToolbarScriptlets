import { DefaultStateOfDTFrame } from "../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTFrame";
import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { ReadyStateNAB } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { ScWindowType } from "../../../../../../Shared/scripts/Enums/scWindowType";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ReportResultsInitDTFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfContentEditor } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDTFrame } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { ContentEditorProxy } from "../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { PackageDesignerProxy } from "../../../ContentEditor/ContentEditorProxy/PackageDesignerProxy";
import { NativeIframeProxy } from "../../../NativeScIframeProxy";
import { ScDocumentProxy } from "../../../ScDocumentProxy";
import { ContentEditorProxyMutationEvent_Observer } from "../Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "../Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Subject } from "../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { IDTFrameProxyMutationEvent_Payload } from "../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";
import { IStateOfFrameStyling } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfFrameStyling";

export class DTFrameProxy extends _BaseScFrameProxy<IStateOfDTFrame> implements IStateFullProxy<IStateOfDTFrame> {
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;
  FrameTypeDiscriminator = DTFrameProxy.name;
  Index: number = -1;
  private PackageDesignerProxy: PackageDesignerProxy;
  public ContentEditorProxy: ContentEditorProxy;
  public DTFrameProxyMutationEvent_Subject: DTFrameProxyMutationEvent_Subject;
  public initReportFrameProxy: ReportResultsInitDTFrameProxy;

  //constructor(hindeCore: IHindeCore, argIframe: HTMLIFrameElement)
  //constructor(hindeCore: IHindeCore, argIframe: NativeIframeProxy)
  constructor(hindeCore: IHindeCore, argIframe: NativeIframeProxy) { //HTMLIFrameElement |
    super(hindeCore, argIframe);

    this.ErrorHand.ThrowIfNullOrUndefined(DTFrameProxy.name, [argIframe]);

    if (argIframe) {
      this.Friendly = 'DTFrameProxy_' + this.NativeIFrameProxy.GetNativeIframeId();
    } else {
      this.ErrorHand.ErrorAndThrow(DTFrameProxy.name, ' null check');
    }

    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  async Instantiate(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.Instantiate.name, DTFrameProxy.name);
      this.Instantiate_BaseScFrameProxy();

      this.initReportFrameProxy = new ReportResultsInitDTFrameProxy();

      await this.NativeIFrameProxy.WaitForCompleteNABHtmlIframeElement(this.Friendly)
        .then((result: ReadyStateNAB) => {
          if (!result.IsCompleteNAB()) {
            reject(result.DocumentReadtStateFriendly())
          }
        })
        .then(() => {
          let scWindowType: ScWindowType = this.NativeIFrameProxy.GetScWindowType();
          switch (scWindowType) {
            case ScWindowType.ContentEditor:
              this.ContentEditorProxy = new ContentEditorProxy(this.HindeCore, this.NativeIFrameProxy.ScDocumentProxy, this.Friendly)
              break;
            case ScWindowType.XmlControlPackageDesigner:
              this.PackageDesignerProxy = new PackageDesignerProxy(this.HindeCore, this.NativeIFrameProxy.ScDocumentProxy, this.Friendly)
            default:
              this.ErrorHand.WarningAndContinue(this.Instantiate.name, 'un handled DTFrame type ' + ScWindowType[scWindowType]);
          }
        })
        .then(() => this.ContentEditorProxy.Instantiate())
        .then(() => {
          this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject(this.HindeCore);
          this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer(this.HindeCore, this);
          this.initReportFrameProxy.DTFrameProxyInitialized = true;
        })

        .then(() => resolve())
        .catch((err) => reject(this.Instantiate.name + ' | ' + err));

      this.Logger.FuncEnd(this.Instantiate.name, DTFrameProxy.name);
    });
  }

  async WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name);
    this.ContentEditorProxy.ContentEditorProxyMutationEvent_Subject.RegisterObserver(this.ContentEditorProxyMutationEvent_Observer);
    this.ContentEditorProxy.WireEvents();
    this.Logger.FuncEnd(this.WireEvents.name);
  }

  GetState(): Promise<IStateOfDTFrame> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, DTFrameProxy.name);
      let stateOfDTFrame: IStateOfDTFrame = new DefaultStateOfDTFrame();

      this.NativeIFrameProxy.GetState()
        .then((stateOfFrameStyling: IStateOfFrameStyling) => stateOfDTFrame.StateOfFrameStyling = stateOfFrameStyling)
        .catch((err) => reject(this.GetState.name + ' | ' + err));

      stateOfDTFrame.ZIndex = this.GetZindexAsInt();
      if (this.ContentEditorProxy) {
        await this.ContentEditorProxy.GetState()
          .then((stateOfContentEditorProxy: IStateOfContentEditor) => stateOfDTFrame.StateOfContentEditor = stateOfContentEditorProxy)
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

      await this.ContentEditorProxy.SetState(stateOfDTFrame.StateOfContentEditor)
        .then(() => {
          this.SetFrameStyling(stateOfDTFrame)
          this.DTFrameProxyMutationEvent_Subject.EnableNotifications();
        });
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetState.name, err);
    }
    this.Logger.FuncEnd(this.SetState.name, DTFrameProxy.name);
  }
  //----------------------------------------------------------------------

  GetScWindowType(): ScWindowType {
    return (this.NativeIFrameProxy.GetScWindowType());
  }

  GetContentDoc(): ScDocumentProxy {
    return this.NativeIFrameProxy.ScDocumentProxy;
    //return new FactoryHelper(this.HindeCore).DataOneContentDocFactoryFromIframe(this);
  }

  private SetFrameStyling(stateOfDTFrame: IStateOfDTFrame) {
    this.Logger.FuncStart(this.SetFrameStyling.name);

    this.NativeIFrameProxy.SetState(stateOfDTFrame.StateOfFrameStyling);

    this.Logger.FuncEnd(this.SetFrameStyling.name);
  }

  OnContentEditorProxyMutation(payload: IContentEditorProxyMutationEvent_Payload) {
    let dtFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
      FrameId: this.NativeIFrameProxy.GetNativeIframeId()
      //DTFrameProxy: this
    }
    this.DTFrameProxyMutationEvent_Subject.NotifyObserversAsync(dtFrameProxyMutationEvent_Payload);
  }
}