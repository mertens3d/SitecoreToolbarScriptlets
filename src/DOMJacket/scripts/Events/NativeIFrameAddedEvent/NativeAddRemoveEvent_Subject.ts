﻿import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IElemJacketWatcherParameters } from "../../../../Shared/scripts/IElemJacketWatcherParameters";
import { IJacketOfType } from "../../../../Shared/scripts/IJacketOfType";
import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { ElementJacketOfType } from "../../Elements/ElementJacketBaseOfType";
import { INativeAddRemoveEvent_Payload } from "./INativeAddRemoveEvent_Payload";

export class NativeAddRemoveEvent_Subject extends HindeSiteEvent_Subject<INativeAddRemoveEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.FrameJacketAddRemoveEvent_Subject;
 protected ShowLogActions: boolean = true;
  private ContainerElemJacket: IJacketOfType;
  private WatcherParams: IElemJacketWatcherParameters;

  constructor(commonCore: ICommonCore, elemJacket: IJacketOfType, watcherParams: IElemJacketWatcherParameters) {
    super(commonCore);

    this.Logger.CTORStart(NativeAddRemoveEvent_Subject.name);
    if (!elemJacket) {
      this.ErrorHand.HandleFatalError(NativeAddRemoveEvent_Subject.name, 'No target doc');
    }
    this.ContainerElemJacket = elemJacket;
    this.WatcherParams = watcherParams;

    this.InitMutationObserver();
    this.Logger.CTOREnd(NativeAddRemoveEvent_Subject.name);
  }

  private HandleRemovedNodes(removedNodes: NodeList): string[] {
    let removedIframeIds: string[] = [];
    removedNodes.forEach((removedNode: Node) => {
      if (removedNode instanceof HTMLIFrameElement) { //this may not filter correctly
        let htmlIFrameElement: HTMLIFrameElement = <HTMLIFrameElement>removedNode;
        if (htmlIFrameElement) {
          removedIframeIds.push(htmlIFrameElement.id);
        }
      }
    });

    return removedIframeIds;
  }

  private HandleAddedNodes(addedNodes: NodeList): IJacketOfType[] {
    this.Logger.FuncStart([NativeAddRemoveEvent_Subject.name, this.HandleAddedNodes.name], 'for: ' + this.WatcherParams.OwnerFriendly);

    let addedElementJackets: IJacketOfType[] = [];

    addedNodes.forEach((addedNode) => {
      if (addedNode instanceof HTMLElement) {
        let passesFilterTest: boolean = true;
        let addedHtmlElement = <HTMLElement>addedNode;

        if (this.WatcherParams.TagFilter && this.WatcherParams.TagFilter.length > 0) {
          passesFilterTest = (this.WatcherParams.TagFilter.indexOf(addedHtmlElement.tagName) > -1);
        }

        if (passesFilterTest && addedHtmlElement.tagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
          passesFilterTest = passesFilterTest && (<HTMLIFrameElement>addedHtmlElement).contentDocument !== null;
        }


        if (passesFilterTest) {
          if (addedHtmlElement instanceof HTMLIFrameElement) {
            addedElementJackets.push(new ElementJacketOfType < HTMLElement>(this.CommonCore, addedHtmlElement));
          }
        }
      }
    });

    this.Logger.FuncEnd([NativeAddRemoveEvent_Subject.name, this.HandleAddedNodes.name], addedElementJackets.length +  '  for: ' + this.WatcherParams.OwnerFriendly);
    return addedElementJackets;
  }

  private CallBackOnNativeMutation(mutations: MutationRecord[]) {
    this.Logger.FuncStart(this.CallBackOnNativeMutation.name);

    if (this.HasObservers()) {
      mutations.forEach((mutation, index) => {
        this.Logger.Log('processing mutation ' + (index + 1) + ':' + mutations.length);
        this.Logger.LogVal('mutation.addedNodes.length ', mutation.addedNodes.length);

        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          let nativeDomAddRemoveEvent_Payload: INativeAddRemoveEvent_Payload = {
            AddedElementJacket: null,
            RemovedIFrameId: null,
            OnBehalfOfFriendly: this.WatcherParams.OwnerFriendly
          };

          if (mutation.addedNodes.length > 0) {
            let addedNodes: IJacketOfType[] = this.HandleAddedNodes(mutation.addedNodes);
            addedNodes.forEach((addedNode: IJacketOfType) => {
              nativeDomAddRemoveEvent_Payload.AddedElementJacket = addedNode;
              nativeDomAddRemoveEvent_Payload.RemovedIFrameId = null;
              this.NotifyObserversAsync(nativeDomAddRemoveEvent_Payload);
            });
          }

          if (mutation.removedNodes.length > 0) {
            let removedNodeIds: string[] = this.HandleRemovedNodes(mutation.removedNodes);
            removedNodeIds.forEach((removedNodeId: string) => {
              nativeDomAddRemoveEvent_Payload.AddedElementJacket = null;
              nativeDomAddRemoveEvent_Payload.RemovedIFrameId = removedNodeId;
              this.Logger.LogAsJsonPretty('removed', nativeDomAddRemoveEvent_Payload);
              this.NotifyObserversAsync(nativeDomAddRemoveEvent_Payload);
            });
          }
        }
      });
    }
    else {
      this.Logger.Log('No observers');
    }
    this.Logger.FuncEnd(this.CallBackOnNativeMutation.name);
  }

  private InitMutationObserver() {
    this.Logger.FuncStart(this.InitMutationObserver.name);
    try {
      if (this.ContainerElemJacket) {
        let self = this;
        let mutationObserver = new MutationObserver((mutations: MutationRecord[]) => { self.CallBackOnNativeMutation(mutations); });
        //let desktop: HTMLElement = <HTMLElement> this.NativeDocument.getElementsByTagName(SharedConst.Const.KeyWords.Html.Tags.Body)[0];
        //let desktopElemJacket: ElementJacket = this.DocumentJacket.GetElementById('Desktop');

        this.Logger.LogAsJsonPretty(this.InitMutationObserver.name, this.WatcherParams);

        if (this.WatcherParams) {
          mutationObserver.observe(this.ContainerElemJacket.NativeElement, { attributes: this.WatcherParams.Attributes, subtree: this.WatcherParams.Subtree, childList: this.WatcherParams.ChildList });
        } else {
          this.ErrorHand.HandleFatalError(this.InitMutationObserver.name, ' no params');
        }
      }
      else {
        this.ErrorHand.HandleFatalError(this.InitMutationObserver.name, 'no container element');
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InitMutationObserver.name, err);
    }
    this.Logger.FuncEnd(this.InitMutationObserver.name);
  }
}