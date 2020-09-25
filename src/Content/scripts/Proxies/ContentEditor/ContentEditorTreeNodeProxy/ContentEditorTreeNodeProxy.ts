import { Guid } from "../../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfScContentTreeNode } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { LoggableBase } from "../../../../../Shared/scripts/LoggableBase";

export class ScContentTreeNodeProxy extends LoggableBase {
  private ScContentTreeNodeDivElem: HTMLDivElement;

  constructor(logger: ILoggerAgent, sourceElement: HTMLDivElement)
  constructor(logger: ILoggerAgent, sourceElement: HTMLImageElement)
  constructor(logger: ILoggerAgent, sourceElement: HTMLAnchorElement)
  constructor(logger: ILoggerAgent, sourceElement: HTMLImageElement | HTMLAnchorElement | HTMLDivElement) {
    super(logger);

    if (sourceElement) {
      if (sourceElement.hasAttribute('src')) {
        this.InferFromImageElement(<HTMLImageElement>sourceElement);
      } else if (sourceElement.hasAttribute('href')) {
        this.InferFromAnchorElement(<HTMLAnchorElement>sourceElement);
      } else if (sourceElement.classList.contains('scContentTreeNode')) {
        this.InferFromDivElement(<HTMLDivElement>sourceElement)
      } else {
        this.Logger.ErrorAndThrow(ScContentTreeNodeProxy.name, 'invalid source element type: ' + (typeof sourceElement));
      }
    } else {
      this.Logger.ErrorAndThrow(ScContentTreeNodeProxy.name, 'null sourceElement or associatedDoc');
    }
  }

  private InferFromDivElement(divElement: HTMLDivElement) {
    if (divElement) {
      this.ScContentTreeNodeDivElem = divElement;
    }
  }

  private InferFromAnchorElement(anchorElement: HTMLAnchorElement) {
    if (anchorElement) {
      this.ScContentTreeNodeDivElem = <HTMLDivElement>anchorElement.parentElement
    }
  }

  private InferFromImageElement(imageElement: HTMLImageElement) {
    if (imageElement) {
      this.ScContentTreeNodeDivElem = <HTMLDivElement>imageElement.parentElement
    }
  }
  private GetGlyphNodeElem(): HTMLImageElement {
    return <HTMLImageElement>this.ScContentTreeNodeDivElem.querySelector(":scope > img");
  }
  private GetLinkNodeElem(): HTMLElement {
    return this.ScContentTreeNodeDivElem.querySelector(":scope > a");
  }

  GetStateOfScContentTreeNode(): IDataStateOfScContentTreeNode {
    var newData: IDataStateOfScContentTreeNode = {
      IsExpanded: this.QueryIsExpanded(),
      IsActive: this.QueryIsActive(),
      FriendlyTreeNode: this.GetNodeLinkText(),
      ItemId: this.GetApparentItemId(),
    };

    return newData;
  }

  GetApparentItemId(): GuidData {
    let glyphNodeIdSuffix = this.GetGlyphNodeElem().id.replace(ContentConst.Const.Names.SC.TreeGlyphPrefix, '');
    let toReturnGuidData: GuidData = Guid.ParseGuid(glyphNodeIdSuffix, true);
    return toReturnGuidData;
  }

  GetIconSrc(): string {
    let toReturn: string
    //((document.getElementById('Tree_Node_709C05C504394E1A9D4711E824C87B39')).parentElement).querySelector('.scContentTreeNodeIcon').src
    //((document.getElementById('Tree_Node_EB443C0BF923409E85F3E7893C8C30C2')).parentElement).querySelector('.scContentTreeNodeIcon').outerHTML
    let foundElement: HTMLImageElement = <HTMLImageElement>this.ScContentTreeNodeDivElem.querySelector(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon);

    if (foundElement) {
      toReturn = foundElement.src;
    }

    return toReturn;
  }

  GetParentTreeNode(): ScContentTreeNodeProxy {
    let toReturn: ScContentTreeNodeProxy = null;

    let candidate: HTMLDivElement = <HTMLDivElement>this.ScContentTreeNodeDivElem.closest(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon);

    if (candidate) {
      this.Logger.Log('found a candidate');
      toReturn = new ScContentTreeNodeProxy(this.Logger, candidate);
    } else {
      this.Logger.Log('no candidate found');
    }
    return toReturn;
  }

  IsSitecoreRootNode(): boolean {
    let toReturn: boolean = false;

    let apparentId = this.GetApparentItemId();
    if (apparentId) {
      toReturn = apparentId.Raw === ContentConst.Const.ElemId.sc.SitecoreRootApparentIdRaw;
    }
    return toReturn;
  }

  GetMainIconSrc(): string {
    let toReturn: string

    let maxIter: number = 100;
    let penultimateNode: ScContentTreeNodeProxy = this;
    let parentNode: ScContentTreeNodeProxy = this;

    let penultimateElem: HTMLDivElement = <HTMLDivElement>this.ScContentTreeNodeDivElem.closest('[id=ContentTreeActualSize] > .scContentTreeNode >  div > .scContentTreeNode')
    if (penultimateElem) {
      penultimateNode = new ScContentTreeNodeProxy(this.Logger, penultimateElem);
    }

    if (penultimateNode !== null) {
      toReturn = penultimateNode.GetIconSrc();
    }

    return toReturn;
  }

  SetStateOfTreeNode(newData: IDataStateOfScContentTreeNode) {
    if (newData.IsExpanded) {
      this.ExpandNode();
    }

    this.Logger.LogVal('IsActive', newData.IsActive.toString());

    if (newData.IsActive) {
      var hotTreeNodeId = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(newData.ItemId);

      let hotTreeNode: HTMLImageElement = <HTMLImageElement>this.ScContentTreeNodeDivElem.querySelector('[id=' + hotTreeNodeId + ']');

      if (hotTreeNode) {
        let hotTreeNodeProxy: ScContentTreeNodeProxy = new ScContentTreeNodeProxy(this.Logger, hotTreeNode);

        if (hotTreeNodeProxy) {
          hotTreeNodeProxy.ActivateNode()
        } else {
          this.Logger.ErrorAndContinue(this.SetStateOfTreeNode.name, 'hot tree node not found')
        }
      } else {
        this.Logger.WarningAndContinue(this.SetStateOfTreeNode.name, 'No hotTreeNode');
      }
    }
  }

  QueryIsActive(): boolean {
    var toReturn: boolean = false;

    if (this.GetLinkNodeElem()) {
      var classList = this.GetLinkNodeElem().classList;
      if (classList.contains(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive)) {
        toReturn = true;
      }
    }

    return toReturn;
  }

  ActivateNode(): void {
    this.Logger.FuncStart(this.ActivateNode.name);

    if (this.GetLinkNodeElem()) {
      this.Logger.Log('clicking it to activate');

      this.GetLinkNodeElem().click();

      // check
      if (!this.QueryIsActive()) {
        this.Logger.WarningAndContinue(this.ActivateNode.name, 'Did not work. Trying to activate: ' + this.GetNodeLinkText());
      }
    } else {
      this.Logger.ErrorAndContinue(this.ActivateNode.name, 'No associated Elem');
    }

    this.Logger.FuncEnd(this.ActivateNode.name);
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
      this.Logger.Log('clicking it to collapse');
      element.click();
    }
  }

  ExpandNode(): void {
    this.Logger.FuncStart(this.ExpandNode.name);
    if (!this.QueryIsExpanded()) {
      this.Logger.Log('clicking it to expand');
      this.GetGlyphNodeElem().click();
    } else {
      this.Logger.Log('Already expanded');
    }
    this.Logger.FuncEnd(this.ExpandNode.name);
  }

  GetNodeLinkText() {
    var toReturn = 'unknown';

    if (this.GetLinkNodeElem()) {
      toReturn = this.GetLinkNodeElem().innerText;
    }

    return toReturn;
  }

  IsContentTreeNode() {
    var toReturn: boolean = false;
    var className = this.ScContentTreeNodeDivElem.className;
    toReturn = className === ContentConst.Const.ClassNames.SC.ContentTreeNode;
    return toReturn;
  }

  QueryIsExpanded() {
    var toReturn: boolean = false;
    let candidate: HTMLImageElement = this.GetGlyphNodeElem();
    if (candidate) {
      var srcAttr = candidate.getAttribute('src');
      if (srcAttr !== null) {
        if (srcAttr.indexOf(ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
          toReturn = true;
        }
      } else {
        this.Logger.ErrorAndThrow(this.QueryIsExpanded.name, 'Bad Glyph/ node data');
      }
      return toReturn;
    }
  }
}