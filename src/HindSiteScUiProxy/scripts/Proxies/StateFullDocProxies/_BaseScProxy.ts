import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
import { IStateOf_ } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";

export abstract class _BaseScProxy extends _APICoreBase implements IBaseScProxy {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[] = [];
  StateHasBeenSet: boolean = false;

  //protected readonly DocumentJacket: DocumentJacket;
  //readonly ContainerJacket: GenericElemJacket;

  constructor(apiCore: IAPICore) {
    super(apiCore);

    //if (container instanceof DocumentJacket) {
    //  this.DocumentJacket = <DocumentJacket>container;
    //} else if (container instanceof GenericElemJacket) {
    //  this.ContainerJacket = <GenericElemJacket>container;
    //}
  }

  TriggerEventsForInbound(): void {
    this.TriggerEventsForInboundSelf();
    this.TriggerEventsForInboundHosted();
  }

  TriggerEventsForInboundSelf(): void {
    //empty by default
  }

  protected TriggerInboundEventsAsyncOnHosted() {
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => hostedProxy.TriggerEventsForInbound());
    }
  }

  GetOnlyOrNullHostedProxiesByDisciminator(needleScProxyDiscriminator: ScProxyDisciminator): IBaseScProxy {
    let toReturn: IBaseScProxy = null;
    let found: IBaseScProxy[] = this.GetHostedProxiesStateByDisciminator(needleScProxyDiscriminator);
    if (found.length === 1) {
      toReturn = found[0];
    } else {
      this.ErrorHand.WarningAndContinue([_BaseScProxy.name, this.GetOnlyOrNullHostedProxiesByDisciminator.name, this.ScProxyDisciminatorFriendly], 'Num needles found: ' + found.length + ' of ' + found.length + ' candidates');
    }
    return toReturn;
  }

  GetHostedProxiesStateByDisciminator(needleScProxyDiscriminator: ScProxyDisciminator): IBaseScProxy[] {
    let toReturn: IBaseScProxy[] = [];
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => { if (hostedProxy.ScProxyDisciminator === needleScProxyDiscriminator) { toReturn.push(hostedProxy) } });
    }

    return toReturn;
  }

  async OnFocus(): Promise<any> {
    // empty by default
  }

  protected async GetStateOfHosted(): Promise<IStateOf_[]> {
    return new Promise(async (resolve, reject) => {
      let promAr: Promise<IStateOf_>[] = [];

      if (this.HostedProxies) {
        this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => promAr.push(hostedProxy.GetState()));
        //await this.HostedStateFullProxy.GetState()
        //  .then((statefullProxyState: IStateOf_) => stateOfDTFrame.StateOfHostedProxies.push(statefullProxyState))
        //  .catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));
      }

      await Promise.all(promAr)
        .then((promAllResult: IStateOf_[]) => resolve(promAllResult))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([_BaseScProxy.name, this.GetStateOfHosted.name], err)));
    });
  }

  async GetState(): Promise<IStateOf_> {
    return new Promise(async (resolve, reject) => {
      let toReturn: IStateOf_ = null;

      await this.GetStateOfSelf()
        .then((state: IStateOf_) => toReturn = state)
        .then(() => this.GetStateOfHosted())
        .then((stateOfHostedProxies: IStateOf_[]) => toReturn.Children = stateOfHostedProxies)
        .then(() => resolve(toReturn))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([_BaseScProxy.name, this.GetState.name, this.ScProxyDisciminatorFriendly], err)));
    })
  }

  async GetStateOfSelf(): Promise<IStateOf_> {
    let toReturn: IStateOf_ = {
      DisciminatorFriendly: this.ScProxyDisciminatorFriendly,
      Disciminator: this.ScProxyDisciminator,
      Children: [],
    }

    return Promise.resolve(toReturn);
  }

  async SetState(state: IStateOf_): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.SetStateSelf(state)
        .then(() => this.SetStateOfHosted(state.Children))
        .then(() => resolve())
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([_BaseScProxy.name, this.SetState.name, this.ScProxyDisciminatorFriendly], err)));
    })
  }

  async SetStateSelf(state: any): Promise<any> {
  }

  GetMatchingHostedProxy(needleDiscriminator: ScProxyDisciminator): IBaseScProxy {
    let toReturn: IBaseScProxy = null;

    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => {
        if (hostedProxy.ScProxyDisciminator === needleDiscriminator
          &&
          !hostedProxy.StateHasBeenSet) {
          toReturn = hostedProxy;
        }
      })
    }

    return toReturn;
  }

  async SetStateOfHosted(states: IStateOf_[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!states) { states = [] };

      let promAr: Promise<any>[] = [];

      states.forEach((stateOf: IStateOf_) => {
        // find matching proxy without state restored
        let foundMatch: IBaseScProxy = this.GetMatchingHostedProxy(stateOf.Disciminator);
        if (foundMatch) {
          foundMatch.StateHasBeenSet = true;
          promAr.push(foundMatch.SetState(stateOf));
        }
      });

      await Promise.all(promAr)
        .then((promArResults: any[]) => resolve(promArResults))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([_BaseScProxy.name, this.SetStateOfHosted.name, this.ScProxyDisciminatorFriendly], err)));
    });
  }

  private TriggerEventsForInboundHosted() {
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => hostedProxy.TriggerEventsForInbound());
    }
  }
  //empty by default;

  //return new Promise((resolve, reject) => {
  //  if (this.HostedProxies) {
  //    let promAr: Promise<any>[] = [];

  //    this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => {
  //      promAr.push(hostedProxy.SetStateSelf())
  //    })

  //  }

  //})

  async InstantiateAwaitElementsTop(): Promise<void> {
    this.Logger.FuncStart([_BaseScProxy.name, this.InstantiateAwaitElementsTop.name, this.ScProxyDisciminatorFriendly]);

    await this.InstantiateAwaitElementsSelf()
      .then(() => this.InstantiateElementsOnHostedProxies())
      .then(() => Promise.resolve())
      .catch((err) => Promise.reject(this.ErrorHand.FormatRejectMessage([_BaseScProxy.name, this.InstantiateAwaitElementsTop.name, this.ScProxyDisciminatorFriendly], err)));

    this.Logger.FuncEnd([_BaseScProxy.name, this.InstantiateAwaitElementsTop.name, this.ScProxyDisciminatorFriendly]);
  }

  protected  async InstantiateAwaitElementsSelf(): Promise<void> {
    //empty by default
  }

  private async InstantiateElementsOnHostedProxies(): Promise<void> {
    this.Logger.FuncStart([_BaseScProxy.name, this.InstantiateElementsOnHostedProxies.name, this.ScProxyDisciminatorFriendly], 'count: ' + this.HostedProxies.length);
    let promAr: Promise<void>[] = [];

    this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => promAr.push(hostedProxy.InstantiateAwaitElementsTop()));

    await Promise.all(promAr)
      .catch((err) => this.ErrorHand.HandleFatalError(this.ScProxyDisciminatorFriendly, err));

    this.Logger.FuncEnd([_BaseScProxy.name, this.InstantiateElementsOnHostedProxies.name, this.ScProxyDisciminatorFriendly]);
  }

  WireEvents(): void {
    this.Logger.FuncStart([_BaseScProxy.name, this.WireEvents.name, this.ScProxyDisciminatorFriendly]);
    this.WireEventsSelf();
    this.WireEventsOnHostedProxies();
    this.Logger.FuncEnd([_BaseScProxy.name, this.WireEvents.name, this.ScProxyDisciminatorFriendly]);
  }

  WireEventsSelf(): void {
    //empty by default
  }

  private WireEventsOnHostedProxies(): void {
    this.Logger.FuncStart([_BaseScProxy.name, this.WireEventsOnHostedProxies.name, this.ScProxyDisciminatorFriendly]);
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => {
        if (hostedProxy) {
          hostedProxy.WireEvents();
        } else {
          this.ErrorHand.WarningAndContinue(this.WireEventsOnHostedProxies.name, 'Null hosted proxy. On behalf of: ' + this.ScProxyDisciminatorFriendly);
        }
      });
    }
    this.Logger.FuncEnd([_BaseScProxy.name, this.WireEventsOnHostedProxies.name, this.ScProxyDisciminatorFriendly]);
  }
}