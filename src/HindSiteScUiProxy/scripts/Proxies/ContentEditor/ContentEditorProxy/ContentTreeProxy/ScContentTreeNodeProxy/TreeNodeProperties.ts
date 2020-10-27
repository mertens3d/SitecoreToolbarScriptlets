import { ElementAnchorJacket, ElementDivJacket } from "../../../../../../../DOMJacket/scripts/DOMJacketEntry";
import { ElementImgJacket } from "../../../../../../../DOMJacket/scripts/Elements/ElementImgJacket";
import { IJacketOfType } from "../../../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScContentTreeNodeLineage } from "../../../../../../../Shared/scripts/Interfaces/Data/IScContentTreeNodeLineage";
import { IScIcon } from "../../../../../../../Shared/scripts/Interfaces/Data/IScIcon";
import { ContentConst } from "../../../../../../../Shared/scripts/Interfaces/InjectConst";
import { IScContentTreeNodeCoord } from "../../../../../../../Shared/scripts/Interfaces/StateOf/IScContentTreeNodeCoord";
import { _APICoreBase } from "../../../../../../../Shared/scripts/_APICoreBase";
import { IConResolver } from "./IConResolver";
import { ScContentTreeNodeProxy } from "./ScContentTreeNodeProxy";
import { TreeNodeProxyCandidate } from "./TreeNodeProxyCandidate";

export class TreeNodeProperties extends _APICoreBase {
  private ContainerElemJacket: IJacketOfType;
  private OwnerNode: ScContentTreeNodeProxy;
  public IconResolver: IConResolver;
  public Children: ScContentTreeNodeProxy[] = [];
  private ParentTreeNode: ScContentTreeNodeProxy;
  public Linieage: IScContentTreeNodeLineage;
  readonly IsExpanded: boolean;
  readonly IsActive: boolean;
  readonly CandidateTreeNode: TreeNodeProxyCandidate;

  constructor(apiCore: IAPICore, candidateTreeNode: TreeNodeProxyCandidate, containerElemJacket: IJacketOfType, ownerNode: ScContentTreeNodeProxy, conResolver: IConResolver, parentTreeNode: ScContentTreeNodeProxy) {
    super(apiCore);

    this.ContainerElemJacket = containerElemJacket;
    this.IsExpanded = candidateTreeNode.QueryIsExpanded();
    this.IsActive = candidateTreeNode.QueryIsActive();

    this.CandidateTreeNode = candidateTreeNode;
    this.OwnerNode = ownerNode;

    this.IconResolver = conResolver;
    this.ParentTreeNode = parentTreeNode;

    this.Instantiate();
  }

  private Instantiate(): void {
    try {
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.Instantiate.name, err);
    }
  }

  async InstantiateAwaitElementsSelf(): Promise<void> {
    this.Logger.FuncStart([TreeNodeProperties.name, this.InstantiateAwaitElementsSelf.name]);
    await this.GetOwnChildren()
      .then(() => this.HarvestLineageProperties())
      .catch((err: string) => this.ErrorHand.FormatRejectMessage([TreeNodeProperties.name, this.InstantiateAwaitElementsSelf.name], err));

    this.Logger.FuncEnd([TreeNodeProperties.name, this.InstantiateAwaitElementsSelf.name]);
  }

  public Friendly(): string {
    let toReturn = 'lvl: ' + this.CandidateTreeNode.Coord.LevelIndex + ' Sib idx: ' + this.CandidateTreeNode.Coord.SiblingIndex + ' tot sib: ' + this.CandidateTreeNode.Coord.LevelWidth;
    return toReturn;
  }
  public GetOwnChildren(): Promise<void[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let nativeChildNodes: NodeList = null;

        if (this.IsActive || this.IsExpanded) {
          nativeChildNodes = this.CandidateTreeNode.ScContentTreeNodeDivElem.NativeElement.querySelectorAll(':scope > div > ' + ContentConst.Const.Selector.SC.ContentTree.ScContentTreeNode); //targetNode.children;

          let promAr: Promise<TreeNodeProxyCandidate>[] = [];
          let candidateChildren: TreeNodeProxyCandidate[] = [];

          nativeChildNodes.forEach((childNode: HTMLDivElement, index: number) => {
            let childJacket = new ElementDivJacket(this.ApiCore, childNode);

            let candidateCoord: IScContentTreeNodeCoord = {
              LevelIndex: this.CandidateTreeNode.Coord.LevelIndex + 1,
              LevelWidth: nativeChildNodes.length,
              SiblingIndex: index,
            }
            let candidateChild: TreeNodeProxyCandidate = new TreeNodeProxyCandidate(this.ApiCore, childJacket, candidateCoord);

            promAr.push(candidateChild.ProcessCandidate());
            candidateChildren.push(candidateChild);
          });


          await Promise.all(promAr)
            .then((treeNodeProxyCandidates: TreeNodeProxyCandidate[]) => treeNodeProxyCandidates.forEach((processedCandidateChildCandidate: TreeNodeProxyCandidate) => {
              if (processedCandidateChildCandidate.IsNoteWorthy()) {
                this.Children.push(new ScContentTreeNodeProxy(this.ApiCore, processedCandidateChildCandidate, processedCandidateChildCandidate.ContainerElemJacket, this.OwnerNode, this.IconResolver));
              }
            }))
            .catch((err: any) => reject(err));

          //let PromiseAr: Promise<void>[] = [];
          //toReturn.forEach((newScContentTreeNodeProxy: ScContentTreeNodeProxy) => PromiseAr.push(newScContentTreeNodeProxy.Instantiate()));

          //await Promise.all(PromiseAr)
        }
        resolve();
      } catch (err: any) {
        reject(this.GetOwnChildren.name + ' | ' + err);
      }
    });
  }

  private HarvestLineageProperties() {
    let mainIconSrc: IScIcon = this.GetMainIconSrc();

    this.Linieage.L1Icon = mainIconSrc;

    if (this.CandidateTreeNode.Coord. LevelIndex === 0) {
      this.Linieage.L1Icon = this.IconResolver.DefaultScIcon();
      this.Linieage.L1Text = '';
      this.Linieage.L2Icon = this.IconResolver.DefaultScIcon();
      this.Linieage.L2Text = '';
    } else if (this.CandidateTreeNode.Coord.LevelIndex === 1) {
      this.Linieage.L1Icon = this.GetIconSrc();
      this.Linieage.L1Text = this.Friendly();
      this.Linieage.L2Icon = this.IconResolver.ResolveIconData('');
      this.Linieage.L2Text = '';
    } else if (this.CandidateTreeNode.Coord.LevelIndex === 2) {
      if (this.ParentTreeNode) {
        this.Linieage.L1Icon = this.Linieage.L1Icon;
        this.Linieage.L1Text = this.Linieage.L1Text;
      } else {
        this.Linieage.L1Icon = this.IconResolver.ResolveIconData('');
        this.Linieage.L1Text = '';
      }

      this.Linieage.L2Icon = this.GetIconSrc();
      this.Linieage.L2Text = this.Friendly();
    }
    else {
      if (this.ParentTreeNode) {
        this.Linieage.L1Icon = this.ParentTreeNode.TreeNodeProperties.Linieage.L1Icon;
        this.Linieage.L1Text = this.ParentTreeNode.TreeNodeProperties.Linieage.L1Text;
        this.Linieage.L2Icon = this.ParentTreeNode.TreeNodeProperties.Linieage.L2Icon;
        this.Linieage.L2Text = this.ParentTreeNode.TreeNodeProperties.Linieage.L2Text;
      } else {
        this.Linieage.L1Icon = this.IconResolver.ResolveIconData('');
        this.Linieage.L1Text = '';
        this.Linieage.L2Icon = this.IconResolver.ResolveIconData('');
        this.Linieage.L2Text = '';
      }
    }

    if (this.CandidateTreeNode.Coord.LevelIndex == 0) {
      this.Linieage.L1Icon = this.IconResolver.ResolveIconData('');
    } else if (this.CandidateTreeNode.Coord.LevelIndex == 1) {
      this.Linieage.L1Icon = this.GetIconSrc();
    } else {
      if (this.ParentTreeNode) {
        this.Linieage.L1Icon = this.ParentTreeNode.TreeNodeProperties.Linieage.L1Icon;
      } else {
        this.Linieage.L1Icon = this.IconResolver.ResolveIconData('');
      }
    }
  }

  public GetIconSrc(): IScIcon {
    let toReturn: IScIcon = null;
    //((document.getElementById('Tree_Node_709C05C504394E1A9D4711E824C87B39')).parentElement).querySelector('.scContentTreeNodeIcon').src
    //((document.getElementById('Tree_Node_EB443C0BF923409E85F3E7893C8C30C2')).parentElement).querySelector('.scContentTreeNodeIcon').outerHTML
    let foundElement: ElementImgJacket = <ElementImgJacket>this.CandidateTreeNode.ScContentTreeNodeDivElem.querySelector(ContentConst.Const.Selector.SC.ContentTree.scContentTreeNodeIcon);

    if (foundElement) {
      toReturn = this.IconResolver.ResolveIconData(foundElement.NativeElement.src);
    }

    return toReturn;
  }

  public GetMainIconSrc(): IScIcon {
    let toReturn: IScIcon = null;
    let penultimateNode: ScContentTreeNodeProxy = this.OwnerNode;

    let penultimateElem: HTMLDivElement = <HTMLDivElement>this.CandidateTreeNode.ScContentTreeNodeDivElem.NativeElement.closest('[id=ContentTreeActualSize] > .scContentTreeNode >  div > .scContentTreeNode')
    if (penultimateElem) {
      let penElemJacket: ElementDivJacket = new ElementDivJacket(this.ApiCore, penultimateElem);
      //penultimateNode = new ScContentTreeNodeProxy(this.ApiCore, penElemJacket, 0, 0, 1, this.OwnerNode, this.ConResolver);
    }

    if (penultimateNode !== null) {
      toReturn = penultimateNode.TreeNodeProperties.GetIconSrc();
    }

    return toReturn;
  }

  public IsContentTreeNode() {
    var toReturn: boolean = false;
    var className = this.CandidateTreeNode.ScContentTreeNodeDivElem.NativeElement.className;
    toReturn = className === ContentConst.Const.ClassNames.SC.ContentTreeNode;
    return toReturn;
  }
}