import { DocumentJacket } from '../../../../../../DOMJacket/DocumentJacket';
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { AsyncLock } from '../../../Desktop/DesktopProxy/DesktopStartBarProxy/AsyncLock';
import { DTStartBarProxy } from '../../../Desktop/DesktopProxy/DesktopStartBarProxy/DesktopStartBarProxy';
import { RibbonMenuButtonResolver } from "./RibbonMenuButtonResolver";
import { ScRibbonCommand } from '../../../../../../Shared/scripts/Enums/eScRibbonCommand';
import { IRibbonClickSequence } from '../../../../InternalInterfaces/IRibbonClickSequence';

export class ScRibbonProxy extends _APICoreBase {
  private DocumentJacket: DocumentJacket;
  private RibbonMenuButtonResolver: RibbonMenuButtonResolver;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.Logger.CTORStart(DTStartBarProxy.name);
    this.DocumentJacket = documentJacket;
    this.InstantiateInstance();
    this.Logger.CTOREnd(DTStartBarProxy.name);
  }

  private InstantiateInstance() {
    //empty
  }

  async TriggerRibbonMenuItem(scRibbonButtonCommand: ScRibbonCommand, methodLock: AsyncLock): Promise<void> {
    this.Logger.FuncStart([ScRibbonProxy.name, this.TriggerRibbonMenuItem.name], ScRibbonCommand[scRibbonButtonCommand]);

    try {
      this.RibbonMenuButtonResolver = new RibbonMenuButtonResolver(this.ApiCore);

      let ribbonClickSequence: IRibbonClickSequence = this.RibbonMenuButtonResolver.GetRibbonButtonSequence(scRibbonButtonCommand);

      if (!ribbonClickSequence || !ribbonClickSequence.ScRibbonCommand) { // todo put back once we have more commands || ribbonClickSequence.ScRibbonCommand == ScRibbonCommand.Unknown) {
        this.Logger.LogAsJsonPretty('ribbonButtonSequence', ribbonClickSequence);
        this.ErrorHand.ErrorAndThrow([this.TriggerRibbonMenuItem.name], 'something is wrong with the ribbon selectors');
      }

      await methodLock.WaitForLockControl(ScRibbonCommand[scRibbonButtonCommand])

        .then(() => this.DocumentJacket.WaitForThenClick([ribbonClickSequence.Step1Selector]))
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.TriggerRibbonMenuItem.name))
        .then(() => this.DocumentJacket.WaitForThenClick([ribbonClickSequence.Step2Selector]))
        .catch((err) => this.ErrorHand.WarningAndContinue(this.TriggerRibbonMenuItem.name, err))
        .finally(() => {
          methodLock.ReleaseLock();
          this.TaskMonitor.AsyncTaskCompleted(this.TriggerRibbonMenuItem.name);
        });
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.TriggerRibbonMenuItem.name, err);
    }
    this.Logger.FuncEnd(this.TriggerRibbonMenuItem.name);
  }
}