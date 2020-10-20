import { DeepHotKeyAgent } from "../../Shared/scripts/Agents/DeepHotKey/DeepHotKeyAgent";
import { CoreFactory } from "../../Shared/scripts/Classes/CoreFactory";
import { UrlJacket } from "../../DOMJacket/scripts/UrlJacket";

class ContentAllEntry {
  DeepHotKeyAgent: DeepHotKeyAgent;

  StartUpContent() {
    let commonCore = CoreFactory.BuildCommonCore();
    let urlJacket = new UrlJacket(commonCore, document.URL);
    this.DeepHotKeyAgent = new DeepHotKeyAgent(commonCore, urlJacket)
  }
}

if (window.top != window.self) {
  let contentAllEntry: ContentAllEntry = new ContentAllEntry();
  contentAllEntry.StartUpContent();
}