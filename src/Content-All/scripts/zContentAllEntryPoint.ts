import { DeepHotKeyAgent } from "../../Shared/scripts/Agents/DeepHotKeyAgent";
import { CoreFactory } from "../../Shared/scripts/Classes/CoreFactory";
import { UrlJacket } from "../../DOMJacket/UrlJacket";

class ContentAllEntry {
  DeepHotKeyAgent: DeepHotKeyAgent;

  StartUpContent() {
    let commonCore = CoreFactory.BuildCommonCore();
    let urlJacket = new UrlJacket(commonCore, document.URL);
    this.DeepHotKeyAgent = new DeepHotKeyAgent(commonCore, urlJacket)
  }
}

if (window.top != window.self) {
  console.log('Content Entry for all iframes');
  let contentAllEntry: ContentAllEntry = new ContentAllEntry();
  contentAllEntry.StartUpContent();
}

//let toReturn: HTMLSpanElement = <HTMLSpanElement>document.createElement('h1');
//toReturn.style.position = 'absolute';
//toReturn.style.left = '100px';
//toReturn.style.top = '100px';
//toReturn.style.color = "red";
//toReturn.innerText = "Gregoryxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

//window.document.body.appendChild(toReturn);