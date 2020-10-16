import { RecipeBasics } from "../../../../RecipeBasics";
import { ScDocProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy, IBaseScDocProxy, IStateFullFrameProxy, IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { SupportFrameFactory } from "../../../SupportProxies/BaseFrameFactory";
import { IStateLessDocProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../../DOMJacket/Elements/FrameElemJacket";


export abstract class _BaseScDocProxy extends _APICoreBase implements IBaseScDocProxy {

  abstract readonly ScDocProxyDisciminator: ScDocProxyDisciminator;
  abstract readonly ScDocProxyDisciminatorFriendly;
  abstract InstantiateAsyncMembers();
  abstract TriggerInboundEventsAsync(): void;
  abstract WireEvents();
  protected readonly DocumentJacket: DocumentJacket;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
   
  }
   

}

export abstract class _BaseStateLessScDocProxy extends _BaseScDocProxy implements IStateLessDocProxy {


}



export abstract class _BaseStateFullFrameProxy<T> extends _APICoreBase implements IStateFullFrameProxy {
  FrameJacket: FrameElemJacket;
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
  abstract readonly ScDocProxyDisciminator: ScDocProxyDisciminator;
  abstract readonly ScDocProxyDisciminatorFriendly;
  abstract InstantiateAsyncMembers();
  abstract TriggerInboundEventsAsync(): void;
  abstract WireEvents();

  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore);

    this.FrameJacket = frameJacket;

  }


}

export abstract class _BaseStateFullElemProxy<T> extends _APICoreBase  implements IStateFullElemProxy {

  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
}


export abstract class _BaseStateFullDocProxy<T> extends _BaseScDocProxy implements IStateFullDocProxy {
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
  Friendly: string = '{unknown friendly}';
  protected readonly SupportFrameFactory: SupportFrameFactory;
  RecipeBasics: RecipeBasics;


  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket)

    this.SupportFrameFactory = new SupportFrameFactory(this.ApiCore);
  }
  

}

