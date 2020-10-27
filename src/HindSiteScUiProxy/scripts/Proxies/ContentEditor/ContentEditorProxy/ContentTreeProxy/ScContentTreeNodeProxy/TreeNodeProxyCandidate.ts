import { ElementAnchorJacket, ElementDivJacket } from "../../../../../../../DOMJacket/scripts/DOMJacketEntry";
import { ElementImgJacket } from "../../../../../../../DOMJacket/scripts/Elements/ElementImgJacket";
import { IJacketOfType } from "../../../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../../../Shared/scripts/Interfaces/InjectConst";
import { IScContentTreeNodeCoord } from "../../../../../../../Shared/scripts/Interfaces/StateOf/IScContentTreeNodeCoord";
import { _APICoreBase } from "../../../../../../../Shared/scripts/_APICoreBase";

export class TreeNodeProxyCandidate extends _APICoreBase {
  ContainerElemJacket: IJacketOfType;
  public glyphElem: ElementImgJacket;
  public LinkNodeElem: ElementAnchorJacket;
  public ScContentTreeNodeDivElem: ElementDivJacket;
    Coord: IScContentTreeNodeCoord;

  constructor(apiCore: IAPICore, containerElemJacket: IJacketOfType, coord: IScContentTreeNodeCoord) {
    super(apiCore);
    this.ContainerElemJacket = containerElemJacket;
    this.Coord = coord;
  }

  async ProcessCandidate(): Promise<TreeNodeProxyCandidate> {
    return new Promise(async (resolve, reject) => { 
      if (this.ContainerElemJacket) {
        if (this.ContainerElemJacket.NativeElement.hasAttribute('src')) {
          this.InferFromImageElement(<HTMLImageElement>this.ContainerElemJacket.NativeElement);
        } else if (this.ContainerElemJacket.NativeElement.hasAttribute('href')) {
          this.InferFromAnchorElement(<HTMLAnchorElement>this.ContainerElemJacket.NativeElement);
        } else if (this.ContainerElemJacket.NativeElement.classList.contains('scContentTreeNode')) {
          this.InferFromDivElement(<HTMLDivElement>this.ContainerElemJacket.NativeElement)
        } else {
          this.ErrorHand.HandleFatalError(TreeNodeProxyCandidate.name, 'invalid source element type: ' + (typeof this.ContainerElemJacket));
        }
      } else {
        this.ErrorHand.HandleFatalError(TreeNodeProxyCandidate.name, 'null sourceElement or associatedDoc');
      }

      await this.GetOwnGlyphNodeElem()
        .then(() => this.PollinateNodeElem())
        .then(() => resolve(this))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([TreeNodeProxyCandidate.name, this.ProcessCandidate.name], err)));

    })

  }

  IsNoteWorthy(): boolean {
    return this.QueryIsExpanded() || this.QueryIsActive()
  }

  private InferFromAnchorElement(anchorElement: HTMLAnchorElement) {
    if (anchorElement) {
      this.Logger.Log(this.InferFromAnchorElement.name);
      this.ScContentTreeNodeDivElem = new ElementDivJacket(this.ApiCore, <HTMLDivElement>anchorElement.parentElement)
    }
  }

  private async GetOwnGlyphNodeElem(): Promise<void> {
    try {
      await this.ScContentTreeNodeDivElem.WaitFor(":scope > img", this.GetOwnGlyphNodeElem.name)
        .then((elemImgJacket: ElementImgJacket) => this.glyphElem = elemImgJacket)
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.GetOwnGlyphNodeElem.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.GetOwnGlyphNodeElem.name, err)
    }
  }

  private InferFromDivElement(divElement: HTMLDivElement) {
    if (divElement) {
      this.ScContentTreeNodeDivElem = new ElementDivJacket(this.ApiCore, divElement);
    }
  }

  private InferFromImageElement(imageElement: HTMLImageElement) {
    if (imageElement) {
      this.ScContentTreeNodeDivElem = new ElementDivJacket(this.ApiCore, <HTMLDivElement>imageElement.parentElement)
    }
  }

  private async PollinateNodeElem(): Promise<void> {
    try {
      this.ErrorHand.ThrowIfNullOrUndefinedStatic(this.PollinateNodeElem.name, [this.ScContentTreeNodeDivElem]);

      await this.ScContentTreeNodeDivElem.WaitFor(":scope > a", this.PollinateNodeElem.name)
        .then((htmlAnchorElement: ElementAnchorJacket) => this.LinkNodeElem = htmlAnchorElement)
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.PollinateNodeElem.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([TreeNodeProxyCandidate.name, this.PollinateNodeElem.name], err);
    }
  }

  public QueryIsActive(): boolean {
    let classList = this.LinkNodeElem.NativeElement.classList;
    let toReturn: boolean = classList.contains(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive);
    return toReturn;
  }
  public QueryIsExpanded(): boolean {
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