﻿import { ElementJacket } from "../../../../../../../DOMJacket/ElementJacket";
import { ElementDivJacket } from "../../../../../../../DOMJacket/ElementDivJacket";
import { ElementImgJacket } from "../../../../../../../DOMJacket/ElementImgJacket";
import { ElementAnchorJacket } from "../../../../../../../DOMJacket/ElementAnchorJacket";
import { RecipeBasics } from "../../../../../RecipeBasics";
import { Guid } from "../../../../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../../../../Shared/scripts/Helpers/GuidData";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateOfScContentTreeNodeDeep } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { IStateOfScContentTreeNodeShallow } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeShallow";
import { ContentConst } from "../../../../../../../Shared/scripts/Interfaces/InjectConst";
import { _APICoreBase } from "../../../../../../../Shared/scripts/_APICoreBase";
import { ConResolver } from "./ConResolver";
import { IScIcon } from "../../../../../../../Shared/scripts/Interfaces/Data/IScIcon";
import { ScIconPath } from "../../../../../../../Shared/scripts/Enums/60 - ScIconPath";

//scContentTreeNode is the name sitecore uses
export class ScContentTreeNodeProxy extends _APICoreBase {
  private ScContentTreeNodeDivElem: ElementDivJacket;
  private RecipeBasics: RecipeBasics;

  private LinkNodeElem: ElementAnchorJacket;
  private glyphElem: ElementImgJacket;
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
    IconSrc: {
      IconPath: ScIconPath.Unknown,
      IconSuffix: '',
    },
    NodeChildren: [],
    Lineage: {
      L1Icon: {
        IconSuffix: '',
        IconPath: ScIconPath.Unknown,
      },
      L1Text: '',
      L2Icon: {
        IconSuffix: '',
        IconPath: ScIconPath.Unknown,
      },
      L2Text: ''
    }
  }
  private HasBeenHarvested: boolean = false;
  private: number;
  ParentTreeNode: ScContentTreeNodeProxy;
  private ConResolver: ConResolver;

  constructor(apiCore: IAPICore, sourceElemJacket: ElementJacket, level: number, siblingIndex: number, totalSiblings: number, parent: ScContentTreeNodeProxy, conResolver: ConResolver) {
    super(apiCore);

    if (sourceElemJacket) {
      this.StateOfScContentTreeNode.Coord.LevelWidth = totalSiblings;
      this.StateOfScContentTreeNode.Coord.SiblingIndex = siblingIndex;
      this.StateOfScContentTreeNode.Coord.LevelIndex = level;
      this.ConResolver = conResolver;

      if (sourceElemJacket.NativeElement.hasAttribute('src')) {
        this.InferFromImageElement(<HTMLImageElement>sourceElemJacket.NativeElement);
      } else if (sourceElemJacket.NativeElement.hasAttribute('href')) {
        this.InferFromAnchorElement(<HTMLAnchorElement>sourceElemJacket.NativeElement);
      } else if (sourceElemJacket.NativeElement.classList.contains('scContentTreeNode')) {
        this.InferFromDivElement(<HTMLDivElement>sourceElemJacket.NativeElement)
      } else {
        this.ErrorHand.ErrorAndThrow(ScContentTreeNodeProxy.name, 'invalid source element type: ' + (typeof sourceElemJacket));
      }
    } else {
      this.ErrorHand.ErrorAndThrow(ScContentTreeNodeProxy.name, 'null sourceElement or associatedDoc');
    }

    this.ParentTreeNode = parent;
    this.RecipeBasics = new RecipeBasics(this.ApiCore);
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
      this.ScContentTreeNodeDivElem = new ElementDivJacket(this.ApiCore, divElement);
    }
  }

  private InferFromAnchorElement(anchorElement: HTMLAnchorElement) {
    if (anchorElement) {
      this.Logger.Log(this.InferFromAnchorElement.name);
      this.ScContentTreeNodeDivElem = new ElementDivJacket(this.ApiCore, <HTMLDivElement>anchorElement.parentElement)
    }
  }

  private InferFromImageElement(imageElement: HTMLImageElement) {
    if (imageElement) {
      this.ScContentTreeNodeDivElem = new ElementDivJacket(this.ApiCore, <HTMLDivElement>imageElement.parentElement)
    }
  }

  private async PolllinateGlyphNodeElem(): Promise<void> {
    try {
      await this.ScContentTreeNodeDivElem.WaitForElement(":scope > img", this.PolllinateGlyphNodeElem.name)
        .then((elemImgJacket: ElementImgJacket) => this.glyphElem = elemImgJacket)
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.PolllinateGlyphNodeElem.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.PolllinateGlyphNodeElem.name, err)
    }
  }

  private Friendly(): string {
    let toReturn = 'lvl: ' + this.StateOfScContentTreeNode.Coord.LevelIndex + ' Sib idx: ' + this.StateOfScContentTreeNode.Coord.SiblingIndex + ' tot sib: ' + this.StateOfScContentTreeNode.Coord.LevelWidth;
    return toReturn;
  }

  private async PollinateNodeElem(): Promise<void> {
    try {
      await this.ScContentTreeNodeDivElem.WaitForElement(":scope > a", this.Friendly())
        .then((htmlAnchorElement: ElementAnchorJacket) => this.LinkNodeElem = htmlAnchorElement)
        .catch((err) => {
        });
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.PollinateNodeElem.name, err);
    }
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

  async GetStateOfScContentTreeNodeFlat(): Promise<IStateOfScContentTreeNodeShallow> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfScContentTreeNodeFlat.name);

      await this.GetStateOfScContentTreeNodeGeneric(false)
        .then((stateOfContentTreeNodeShallow: IStateOfScContentTreeNodeShallow) => resolve(stateOfContentTreeNodeShallow))
        .catch((err) => reject(this.GetStateOfScContentTreeNodeDeep.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfScContentTreeNodeFlat.name);
    });
  }

  private HarvestProperties() {
    this.ErrorHand.ThrowIfNullOrUndefined(this.HarvestNodeState.name, [this.LinkNodeElem, this.glyphElem]);
    this.StateOfScContentTreeNode.IsActive = this.QueryIsActive();
    this.StateOfScContentTreeNode.IsExpanded = this.QueryIsExpanded();
    this.StateOfScContentTreeNode.Friendly = this.LinkNodeElem.NativeElement.innerText;
    this.StateOfScContentTreeNode.ItemId = this.GetApparentItemId(this.glyphElem);
    this.StateOfScContentTreeNode.IconSrc = this.GetIconSrc();
    this.HarvestLineageProperties();
  }

  private HarvestLineageProperties() {
    let mainIconSrc: IScIcon = this.GetMainIconSrc();
    this.StateOfScContentTreeNode.Lineage.L1Icon = mainIconSrc;

    if (this.StateOfScContentTreeNode.Coord.LevelIndex === 0) {
      this.StateOfScContentTreeNode.Lineage.L1Icon = this.ConResolver.DefaultScIcon();
      this.StateOfScContentTreeNode.Lineage.L1Text = '';
      this.StateOfScContentTreeNode.Lineage.L2Icon = this.ConResolver.DefaultScIcon();
      this.StateOfScContentTreeNode.Lineage.L2Text = '';
    } else if (this.StateOfScContentTreeNode.Coord.LevelIndex === 1) {
      this.StateOfScContentTreeNode.Lineage.L1Icon = this.StateOfScContentTreeNode.IconSrc;
      this.StateOfScContentTreeNode.Lineage.L1Text = this.StateOfScContentTreeNode.Friendly;
      this.StateOfScContentTreeNode.Lineage.L2Icon = this.ConResolver.ResolveIconData('');
      this.StateOfScContentTreeNode.Lineage.L2Text = '';
    } else if (this.StateOfScContentTreeNode.Coord.LevelIndex === 2) {
      if (this.ParentTreeNode) {
        this.StateOfScContentTreeNode.Lineage.L1Icon = this.ParentTreeNode.StateOfScContentTreeNode.Lineage.L1Icon;
        this.StateOfScContentTreeNode.Lineage.L1Text = this.ParentTreeNode.StateOfScContentTreeNode.Lineage.L1Text;
      } else {
        this.StateOfScContentTreeNode.Lineage.L1Icon = this.ConResolver.ResolveIconData('');
        this.StateOfScContentTreeNode.Lineage.L1Text = '';
      }

      this.StateOfScContentTreeNode.Lineage.L2Icon = this.StateOfScContentTreeNode.IconSrc;
      this.StateOfScContentTreeNode.Lineage.L2Text = this.StateOfScContentTreeNode.Friendly;
    }
    else {
      if (this.ParentTreeNode) {
        this.StateOfScContentTreeNode.Lineage.L1Icon = this.ParentTreeNode.StateOfScContentTreeNode.Lineage.L1Icon;
        this.StateOfScContentTreeNode.Lineage.L1Text = this.ParentTreeNode.StateOfScContentTreeNode.Lineage.L1Text;
        this.StateOfScContentTreeNode.Lineage.L2Icon = this.ParentTreeNode.StateOfScContentTreeNode.Lineage.L2Icon;
        this.StateOfScContentTreeNode.Lineage.L2Text = this.ParentTreeNode.StateOfScContentTreeNode.Lineage.L2Text;
      } else {
        this.StateOfScContentTreeNode.Lineage.L1Icon = this.ConResolver.ResolveIconData('');
        this.StateOfScContentTreeNode.Lineage.L1Text = '';
        this.StateOfScContentTreeNode.Lineage.L2Icon = this.ConResolver.ResolveIconData('');
        this.StateOfScContentTreeNode.Lineage.L2Text = '';
      }
    }

    if (this.StateOfScContentTreeNode.Coord.LevelIndex == 0) {
      this.StateOfScContentTreeNode.Lineage.L1Icon = this.ConResolver.ResolveIconData('');
    } else if (this.StateOfScContentTreeNode.Coord.LevelIndex == 1) {
      this.StateOfScContentTreeNode.Lineage.L1Icon = this.StateOfScContentTreeNode.IconSrc;
    } else {
      if (this.ParentTreeNode) {
        this.StateOfScContentTreeNode.Lineage.L1Icon = this.ParentTreeNode.StateOfScContentTreeNode.Lineage.L1Icon;
      } else {
        this.StateOfScContentTreeNode.Lineage.L1Icon = this.ConResolver.ResolveIconData('');
      }
    }
  }

  private async HarvestNodeState(forceRefreshData: boolean = false): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.HasBeenHarvested || forceRefreshData) {
        this.glyphElem = null;
        this.LinkNodeElem = null;
        this.Children = [],

          await this.PollinateNodeElem()
            .then(() => this.PolllinateGlyphNodeElem())
            .then(() => this.HarvestProperties())
            .then(() => this.GetChildren())
            .then((children: ScContentTreeNodeProxy[]) => this.Children = children)
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

  private GetApparentItemId(htmlImageElement: ElementImgJacket): GuidData {
    let glyphNodeIdSuffix = htmlImageElement.NativeElement.id.replace(ContentConst.Const.Names.SC.TreeGlyphPrefix, '');
    let toReturnGuidData: GuidData = Guid.ParseGuid(glyphNodeIdSuffix, true);
    return toReturnGuidData;
  }

  private GetIconSrc(): IScIcon {
    let toReturn: IScIcon = null;
    //((document.getElementById('Tree_Node_709C05C504394E1A9D4711E824C87B39')).parentElement).querySelector('.scContentTreeNodeIcon').src
    //((document.getElementById('Tree_Node_EB443C0BF923409E85F3E7893C8C30C2')).parentElement).querySelector('.scContentTreeNodeIcon').outerHTML
    let foundElement: ElementImgJacket = <ElementImgJacket>this.ScContentTreeNodeDivElem.querySelector(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon);

    if (foundElement) {
      toReturn = this.ConResolver.ResolveIconData( foundElement.NativeElement.src);
    }

    return toReturn;
  }

  private GetChildren(): Promise<ScContentTreeNodeProxy[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let toReturn: ScContentTreeNodeProxy[] = [];

        let childNodes = this.ScContentTreeNodeDivElem.NativeElement.querySelectorAll(':scope > div > ' + ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNode); //targetNode.children;
        childNodes.forEach((childNode: HTMLDivElement, index: number) => {
          let childJacket = new ElementDivJacket(this.ApiCore, childNode);
          toReturn.push(new ScContentTreeNodeProxy(this.ApiCore, childJacket, this.StateOfScContentTreeNode.Coord.LevelIndex + 1, index, childNodes.length, this, this.ConResolver))
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

  private GetMainIconSrc(): IScIcon {
    let toReturn: IScIcon = null;
    let penultimateNode: ScContentTreeNodeProxy = this;

    let penultimateElem: HTMLDivElement = <HTMLDivElement>this.ScContentTreeNodeDivElem.NativeElement.closest('[id=ContentTreeActualSize] > .scContentTreeNode >  div > .scContentTreeNode')
    if (penultimateElem) {
      let penElemJacket: ElementDivJacket = new ElementDivJacket(this.ApiCore, penultimateElem);
      penultimateNode = new ScContentTreeNodeProxy(this.ApiCore, penElemJacket, 0, 0, 1, this, this.ConResolver);
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
      }
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetStateOfTreeNode.name, err);
    }
  }

  private QueryIsActive(): boolean {
    let classList = this.LinkNodeElem.NativeElement.classList;
    let toReturn: boolean = classList.contains(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive);
    return toReturn;
  }

  private async ActivateNode(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ActivateNode.name);

      this.Logger.Log('activating node: ' + this.StateOfScContentTreeNode.Friendly);

      await this.RecipeBasics.WaitForElemToHaveClassOrReject(this.LinkNodeElem.NativeElement,
        [ContentConst.Const.ClassNames.SC.scContentTreeNodeActive, ContentConst.Const.ClassNames.SC.scContentTreeNodeNormal],
        this.StateOfScContentTreeNode.Friendly)
      this.LinkNodeElem.NativeElement.click();

      await this.RecipeBasics.WaitForElemToHaveClassOrReject(this.LinkNodeElem.NativeElement,
        [ContentConst.Const.ClassNames.SC.scContentTreeNodeActive],
        this.StateOfScContentTreeNode.Friendly)
        .then(() => resolve())
        .catch((err) => reject(this.ActivateNode.name + ' | ' + err));

      this.Logger.FuncEnd(this.ActivateNode.name);
    });
  }

  async ExpandNode(): Promise<void> {
    try {
      if (!this.QueryIsExpanded()) {
        this.glyphElem.NativeElement.click();
      }
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow(this.ExpandNode.name, err);
    }
  }

  IsContentTreeNode() {
    var toReturn: boolean = false;
    var className = this.ScContentTreeNodeDivElem.NativeElement.className;
    toReturn = className === ContentConst.Const.ClassNames.SC.ContentTreeNode;
    return toReturn;
  }

  private QueryIsExpanded(): boolean {
    var toReturn: boolean = false;
    var srcAttr = this.glyphElem.NativeElement.getAttribute('src');
    if (srcAttr !== null) {
      if (srcAttr.indexOf(ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
        toReturn = true;
      }
    }
    return toReturn;
  }
}