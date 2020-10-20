import { IterationDrone } from './Agents/Drones/IterationDrone/IterationDrone';
import { ErrorHandlerAgent } from './Agents/ErrorHandler/ErrorHandlerAgent';
import { IAPICore } from './Interfaces/Agents/IAPICore';
import { IHindSiteScUiProxyRunTimeOptions } from './Interfaces/Agents/IContentApi/IHindSiteScUiProxyRunTimeOptions';
import { _CommonBase } from './_CommonCoreBase';

export abstract class _APICoreBase extends _CommonBase {
  protected ApiCore: IAPICore;
  RunTimeOptions: IHindSiteScUiProxyRunTimeOptions;

  constructor(apiCore: IAPICore) {
    super(apiCore);
    ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [apiCore]);
    ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [apiCore.ErrorHand, apiCore.Logger, apiCore.TaskMonitor]);

    this.Logger = apiCore.Logger;
    this.ApiCore = apiCore;
    this.ErrorHand = apiCore.ErrorHand;
    this.TaskMonitor = apiCore.TaskMonitor;
    this.RunTimeOptions = apiCore.RunTimeOptions;
    
  }

  WaitForTimePeriod(timeToWaitMs: number, friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForTimePeriod.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.ApiCore, this.WaitForTimePeriod.name, true);

      let startTimeStamp: number = new Date().getTime();
      let timeElapsed: number = 0;

      while (iterationJr.DecrementAndKeepGoing() && timeElapsed < timeToWaitMs) {
        timeElapsed = new Date().getTime() - startTimeStamp;
        await iterationJr.Wait();
      }
      resolve();

      this.Logger.FuncEnd(this.WaitForTimePeriod.name, friendly);
    });
  }
}