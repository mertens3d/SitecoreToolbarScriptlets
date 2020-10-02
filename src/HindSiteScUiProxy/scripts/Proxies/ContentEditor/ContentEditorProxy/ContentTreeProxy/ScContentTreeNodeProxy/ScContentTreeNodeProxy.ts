import { Guid } from "../../../../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../../../../Shared/scripts/Helpers/GuidData";
import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IStateOfScContentTreeNodeDeep } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { ContentConst } from "../../../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../../../Shared/scripts/LoggableBase";
import { RecipeBasics } from "../../../../../../../Shared/scripts/Classes/RecipeBasics";
import { StaticHelpers } from "../../../../../../../Shared/scripts/Classes/StaticHelpers";
import { IContentTreeProxyMutationEvent_Payload } from "../../../../Desktop/DesktopProxy/Events/TreeMutationEvent/IContentTreeProxyMutationEvent_Payload";
import { IStateOfScContentTreeNodeFlat } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeFlat";

//scContentTreeNode is the name sitecore uses
export class ScContentTreeNodeProxy extends _HindeCoreBase {
  private ScContentTreeNodeDivElem: HTMLDivElement;
  private RecipeBasics: RecipeBasics;

  private LinkNodeElem: HTMLAnchorElement;
  private glyphElem: HTMLImageElement;
  private Children: ScContentTreeNodeProxy[] = [];
  private StateOfScContentTreeNode: IStateOfScContentTreeNodeDeep = {
    // leave in this order to make it easier to debug when looking at the data in devtools. This is the order it will log out (and maybe store)
    Friendly: '',
    IsExpanded: false,
    IsActive: false,
    Coord: {
      LevelIndex: -1,
      LevelWidth: -1,
      SiblingIndex: -1
    },
    ItemId: null,
    IconSrc: '',
    MainIconSrc: '',
    NodeChildren: [],
  }
  private HasBeenHarvested: boolean = false;
  private: number;

  constructor(hindeCore: IHindeCore, sourceElement: HTMLDivElement, level: number, siblingIndex: number, totalSiblings: number)
  constructor(hindeCore: IHindeCore, sourceElement: HTMLImageElement, level: number, siblingIndex: number, totalSiblings: number)
  constructor(hindeCore: IHindeCore, sourceElement: HTMLAnchorElement, level: number, siblingIndex: number, totalSiblings: number)
  constructor(hindeCore: IHindeCore, sourceElement: HTMLImageElement | HTMLAnchorElement | HTMLDivElement, level: number, siblingIndex: number, totalSiblings: number) {
    super(hindeCore);

    if (sourceElement) {
      this.StateOfScContentTreeNode.Coord.LevelWidth = totalSiblings;
      this.StateOfScContentTreeNode.Coord.SiblingIndex = siblingIndex;
      this.StateOfScContentTreeNode.Coord.LevelIndex = level;

      if (sourceElement.hasAttribute('src')) {
        this.InferFromImageElement(<HTMLImageElement>sourceElement);
      } else if (sourceElement.hasAttribute('href')) {
        this.InferFromAnchorElement(<HTMLAnchorElement>sourceElement);
      } else if (sourceElement.classList.contains('scContentTreeNode')) {
        this.InferFromDivElement(<HTMLDivElement>sourceElement)
      } else {
        this.ErrorHand.ErrorAndThrow(ScContentTreeNodeProxy.name, 'invalid source element type: ' + (typeof sourceElement));
      }
    } else {
      this.ErrorHand.ErrorAndThrow(ScContentTreeNodeProxy.name, 'null sourceElement or associatedDoc');
    }

    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  async Instantiate(): Promise<void> {
    try {
      await this.HarvestNodeState();
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate.name, err);
    }
  }

  private InferFromDivElement(divElement: HTMLDivElement) {
    if (divElement) {
      this.ScContentTreeNodeDivElem = divElement;
    }
  }

  private InferFromAnchorElement(anchorElement: HTMLAnchorElement) {
    if (anchorElement) {
      this.Logger.Log(this.InferFromAnchorElement.name);
      this.ScContentTreeNodeDivElem = <HTMLDivElement>anchorElement.parentElement
    }
  }

  private InferFromImageElement(imageElement: HTMLImageElement) {
    if (imageElement) {
      this.ScContentTreeNodeDivElem = <HTMLDivElement>imageElement.parentElement
    }
  }

  private async GetGlyphNodeElem(): Promise<HTMLImageElement> {
    return new Promise(async (resolve, reject) => {
      await this.RecipeBasics.WaitAndReturnFoundFromContainer(this.ScContentTreeNodeDivElem, ":scope > img", this.GetGlyphNodeElem.name)
        .then((htmlElement: HTMLImageElement) => {
          resolve(htmlElement)
        })
        .catch((err) => {
          reject(this.GetGlyphNodeElem.name + ' | ' + err)
        });
    })
  }

  private Friendly(): string {
    let toReturn = 'lvl: ' + this.StateOfScContentTreeNode.Coord.LevelIndex + ' Sib idx: ' + this.StateOfScContentTreeNode.Coord.SiblingIndex + ' tot sib: ' + this.StateOfScContentTreeNode.Coord.LevelWidth;
    return toReturn;
  }

  private async GetLinkNodeElem(): Promise<HTMLAnchorElement> {
    return new Promise(async (resolve, reject) => {
      await this.RecipeBasics.WaitAndReturnFoundFromContainer(this.ScContentTreeNodeDivElem, ":scope > a", this.Friendly())
        .then((htmlAnchorElement: HTMLAnchorElement) => {
          resolve(htmlAnchorElement)
        })
        .catch((err) => {
          reject(this.GetGlyphNodeElem.name + ' | ' + err)
        });
    });
  }

  private async GetStateOfScContentTreeNodeGeneric(includeChildren: boolean): Promise<IStateOfScContentTreeNodeDeep> {
    return new Promise(async (resolve, reject) => {
      let stateOfChildrenAr: Promise<IStateOfScContentTreeNodeDeep>[] = [];
      if (includeChildren) {
        this.Children.forEach((child: ScContentTreeNodeProxy) => stateOfChildrenAr.push(child.GetStateOfScContentTreeNodeDeep()));
      }
      await Promise.all(stateOfChildrenAr)
        .then((result: IStateOfScContentTreeNodeDeep[]) => {
          this.StateOfScContentTreeNode.NodeChildren = [];
          result.forEach((stateoOfScContentTreeNodeChild: IStateOfScContentTreeNodeDeep) => {
            if (stateoOfScContentTreeNodeChild.IsActive || stateoOfScContentTreeNodeChild.IsExpanded) {
              this.StateOfScContentTreeNode.NodeChildren.push(stateoOfScContentTreeNodeChild);
            }
          })
        })
        .then(() => resolve(this.StateOfScContentTreeNode))
        .catch((err) => reject(this.GetStateOfScContentTreeNodeGeneric.name + ' | ' + err));
    });
  }

  async GetStateOfScContentTreeNodeDeep(): Promise<IStateOfScContentTreeNodeDeep> {
    return new Promise(async (resolve, reject) => {
      await this.GetStateOfScContentTreeNodeGeneric(true)
        .then((stateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep) => resolve(stateOfScContentTreeNodeDeep))
        .catch((err) => reject(this.GetStateOfScContentTreeNodeDeep.name + ' | ' + err));
    });
  }

  async GetStateOfScContentTreeNodeFlat(): Promise<IStateOfScContentTreeNodeFlat> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfScContentTreeNodeFlat.name);

      await this.GetStateOfScContentTreeNodeGeneric(false)
        .then((stateOfContentTreeNodeFlat: IStateOfScContentTreeNodeFlat) => resolve(stateOfContentTreeNodeFlat))
        .catch((err) => reject(this.GetStateOfScContentTreeNodeDeep.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfScContentTreeNodeFlat.name);
    });
  }

  private async HarvestNodeState(forceRefreshData: boolean = false): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.HasBeenHarvested || forceRefreshData) {
        this.glyphElem = null;
        this.LinkNodeElem = null;
        this.Children = [],

          await this.GetLinkNodeElem()
            .then((htmlAnchorElement: HTMLAnchorElement) => {
              this.LinkNodeElem = htmlAnchorElement
            })
            .then(() => this.GetGlyphNodeElem())
            .then((htmlImageElement: HTMLImageElement) => {
              this.glyphElem = htmlImageElement
            })
            .then(() => {
              this.ErrorHand.ThrowIfNullOrUndefined(this.HarvestNodeState.name, [this.LinkNodeElem, this.glyphElem]);

              this.StateOfScContentTreeNode.IsActive = this.QueryIsActive();
              this.StateOfScContentTreeNode.IsExpanded = this.QueryIsExpanded();
              this.StateOfScContentTreeNode.Friendly = this.GetNodeLinkText(this.LinkNodeElem);
              this.StateOfScContentTreeNode.ItemId = this.GetApparentItemId(this.glyphElem);
              this.StateOfScContentTreeNode.IconSrc = this.GetIconSrc();
              this.StateOfScContentTreeNode.MainIconSrc = this.GetMainIconSrc();
            })
            .then(() => this.GetChildren())
            .then((children: ScContentTreeNodeProxy[]) => {
              this.Children = children;
            })
            .then(() => resolve())
            .catch((err) => {
              reject(this.HarvestNodeState.name + ' | ' + err);
            });
        this.HasBeenHarvested = true;
      } else {
        resolve();
      }
    });
  }

  private GetApparentItemId(htmlImageElement: HTMLImageElement): GuidData {
    let glyphNodeIdSuffix = htmlImageElement.id.replace(ContentConst.Const.Names.SC.TreeGlyphPrefix, '');
    let toReturnGuidData: GuidData = Guid.ParseGuid(glyphNodeIdSuffix, true);
    return toReturnGuidData;
  }

  private GetIconSrc(): string {
    let toReturn: string
    //((document.getElementById('Tree_Node_709C05C504394E1A9D4711E824C87B39')).parentElement).querySelector('.scContentTreeNodeIcon').src
    //((document.getElementById('Tree_Node_EB443C0BF923409E85F3E7893C8C30C2')).parentElement).querySelector('.scContentTreeNodeIcon').outerHTML
    let foundElement: HTMLImageElement = <HTMLImageElement>this.ScContentTreeNodeDivElem.querySelector(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon);

    if (foundElement) {
      toReturn = foundElement.src;
    }

    return toReturn;
  }

  private GetChildren(): Promise<ScContentTreeNodeProxy[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let toReturn: ScContentTreeNodeProxy[] = [];

        let childNodes = this.ScContentTreeNodeDivElem.querySelectorAll(':scope > div > ' + ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNode); //targetNode.children;
        childNodes.forEach((childNode: HTMLDivElement, index: number) => {
          toReturn.push(new ScContentTreeNodeProxy(this.HindeCore, childNode, this.StateOfScContentTreeNode.Coord.LevelIndex + 1, index, childNodes.length))
        });

        let PromiseAr: Promise<void>[] = [];
        toReturn.forEach((newScContentTreeNodeProxy: ScContentTreeNodeProxy) => PromiseAr.push(newScContentTreeNodeProxy.Instantiate()));

        await Promise.all(PromiseAr);
        resolve(toReturn);
      } catch (err) {
        reject(this.GetChildren.name + ' | ' + err);
      }
    });
  }

  private GetMainIconSrc(): string {
    let toReturn: string
    let penultimateNode: ScContentTreeNodeProxy = this;

    let penultimateElem: HTMLDivElement = <HTMLDivElement>this.ScContentTreeNodeDivElem.closest('[id=ContentTreeActualSize] > .scContentTreeNode >  div > .scContentTreeNode')
    if (penultimateElem) {
      penultimateNode = new ScContentTreeNodeProxy(this.HindeCore, penultimateElem, 0, 0, 1);
    }

    if (penultimateNode !== null) {
      toReturn = penultimateNode.GetIconSrc();
    }

    return toReturn;
  }

  async SetStateOfTreeNode(newData: IStateOfScContentTreeNodeDeep, depth: number): Promise<void> {
    try {
      if (newData.IsExpanded) {
        await this.ExpandNode();
      }

      if (newData.IsActive) {
        await this.ActivateNode();
        //var hotTreeNodeId = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(newData.ItemId);

        //let hotTreeNode: HTMLImageElement = <HTMLImageElement>this.ScContentTreeNodeDivElem.querySelector('[id=' + hotTreeNodeId + ']');

        //if (hotTreeNode) {
        //  let hotTreeNodeProxy: ScContentTreeNodeProxy = new ScContentTreeNodeProxy(this.HindeCore, hotTreeNode, 0, 0, 1);

        //  if (hotTreeNodeProxy) {
        //    hotTreeNodeProxy.ActivateNode()
        //  } else {
        //    this.ErrorHand.ErrorAndContinue(this.SetStateOfTreeNode.name, 'hot tree node not found')
        //  }
        //} else {
        //  this.ErrorHand.WarningAndContinue(this.SetStateOfTreeNode.name, 'No hotTreeNode');
        //}
      }

      //if (newData.NodeChildren.length > 0) {
      //  let promises: Promise<void>[] = []
      //  //stateOfContentEditor.StateOfScContentTreeNodeDeep

      //  newData.NodeChildren.forEach((treeNode: IStateOfScContentTreeNodeDeep, index) => {
      //    promises.push(this.SetStateOfTreeNode(treeNode, depth + 1))
      //    //newData.NodeChildren.map(async treeNode  => {
      //    //let newNode: ScContentTreeNodeProxy = new ScContentTreeNodeProxy(this.HindeCore, treeNode.ItemId, 0, 0, 1);
      //    //const numFruit = await this.SetStateOfTreeNode_TreeProxy(treeNode);
      //    //return numFruit;
      //  });

      //await Promise.all(promises);
      //}
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetStateOfTreeNode.name, err);
    }
  }

  private QueryIsActive(): boolean {
    let classList = this.LinkNodeElem.classList;
    let toReturn: boolean = classList.contains(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive);
    return toReturn;
  }

  private async ActivateNode(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ActivateNode.name);

      this.Logger.Log('activating node: ' + this.StateOfScContentTreeNode.Friendly);

      await this.RecipeBasics.WaitForElemToHaveClassOrReject(this.LinkNodeElem,
        [ContentConst.Const.ClassNames.SC.scContentTreeNodeActive, ContentConst.Const.ClassNames.SC.scContentTreeNodeNormal],
        this.StateOfScContentTreeNode.Friendly)
      this.LinkNodeElem.click();

      await this.RecipeBasics.WaitForElemToHaveClassOrReject(this.LinkNodeElem,
        [ContentConst.Const.ClassNames.SC.scContentTreeNodeActive],
        this.StateOfScContentTreeNode.Friendly)
        .then(() => resolve())
        .catch((err) => reject(this.ActivateNode.name + ' | ' + err));

      this.Logger.FuncEnd(this.ActivateNode.name);
    });
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
      this.Logger.Log('clicking it to collapse');
      element.click();
    }
  }

  async ExpandNode(): Promise<void> {
    try {
      if (!this.QueryIsExpanded()) {
        this.glyphElem.click();
      }
      //.catch((err) => this.ErrorHand.ErrorAndThrow(this.ExpandNode.name, err));
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow(this.ExpandNode.name, err);
    }
  }

  private GetNodeLinkText(htmlElement: HTMLElement): string {
    return htmlElement.innerText;
  }

  IsContentTreeNode() {
    var toReturn: boolean = false;
    var className = this.ScContentTreeNodeDivElem.className;
    toReturn = className === ContentConst.Const.ClassNames.SC.ContentTreeNode;
    return toReturn;
  }

  private QueryIsExpanded(): boolean {
    var toReturn: boolean = false;
    var srcAttr = this.glyphElem.getAttribute('src');
    if (srcAttr !== null) {
      if (srcAttr.indexOf(ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
        toReturn = true;
      }
    }
    return toReturn;
  }
}