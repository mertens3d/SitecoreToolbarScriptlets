import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScDocProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { ScDocProxyWatcherForFrames } from "../../../StateFullDocProxies/ScDocProxyWatcherForFrames";
import { _BaseScProxy } from "../../../StateFullDocProxies/_BaseScProxy";

export abstract class _ScDocProxyOfTypeT<T extends IStateOf_> extends _BaseScProxy implements IScDocProxy {
  //abstract GetState(): Promise<T>;
  //abstract SetState(state: T): Promise<void>;
  Friendly: string = '{unknown friendly}';
  protected readonly DocumentJacket: DocumentJacket;
  private WatcherForFrames: ScDocProxyWatcherForFrames;

  async GetStateOfSelf(): Promise<T> {
    //empty by default
    let stateOf: IStateOf_ = {
      Disciminator: ScProxyDisciminator.Unknown,
      DisciminatorFriendly: ScProxyDisciminator[ScProxyDisciminator.Unknown],
      StateOfHostedProxies: []
    };

    return Promise.resolve(<T>stateOf);
  }

  async SetStateSelf(state: T): Promise<any> {
    //empty by default
  }

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
  }

  public async CreateWatcherForFrames(): Promise<void> {
    try {
      this.WatcherForFrames = new ScDocProxyWatcherForFrames(this.ApiCore, this.DocumentJacket, this.ScProxyDisciminatorFriendly);
      await this.WatcherForFrames.EnableWatcherForFrames()
        .catch((err: any) => this.ErrorHand.HandleFatalError([_ScDocProxyOfTypeT.name, this.CreateWatcherForFrames.name, this.ScProxyDisciminatorFriendly], err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([_ScDocProxyOfTypeT.name, this.CreateWatcherForFrames.name, this.ScProxyDisciminatorFriendly], err);
    }
  }


  public  WireWatcherForFrames():void {
    this.Logger.FuncStart([_ScDocProxyOfTypeT.name, this.WireWatcherForFrames.name, this.ScProxyDisciminatorFriendly]);

    try {
    
      
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([_ScDocProxyOfTypeT.name, this.WireWatcherForFrames.name, this.ScProxyDisciminatorFriendly], err);
    }

    this.Logger.FuncEnd([_ScDocProxyOfTypeT.name, this.WireWatcherForFrames.name, this.ScProxyDisciminatorFriendly]);
  }
}