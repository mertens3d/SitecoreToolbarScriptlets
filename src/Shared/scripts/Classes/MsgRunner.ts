///// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
//import { BaseDebug } from "./debug";
//import { IMsgFromX } from "../Interfaces/IMsgPayload";
//import { MsgFlag } from "../Enums/MessageFlag";
//import { MsgFromContent } from "./MsgPayloadResponseFromContent";

//export class MessageRunner {
//  ReceiveResponseHndlr: Function;
//  SendHndlr: Function;
//  private Debug: BaseDebug;
//  Nickname: string;

//  constructor(sendHndlr: Function, receiveResponseHndlr: Function, debug: BaseDebug, nickname: string) {
//    this.Debug = debug;
//    this.Nickname = nickname;

//    this.Debug.FuncStart(MessageRunner.name, 'new messageRunner ' + this.Nickname);

//    this.ReceiveResponseHndlr = receiveResponseHndlr;
   
//    this.SendHndlr = sendHndlr;
   
//    this.Debug.FuncEnd(MessageRunner.name, this.Nickname);
//  }


  

  

//  //HandleMessageExample(request: IMsgFromX, sender, sendResponse) {
//  //  this.Debug.FuncStart(this.HandleMessageExample.name, request.MsgFlag)
//  //  console.log("Message from the content script: " + request.greeting);
//  //  //sendResponse({ response: "Response from background script" });
//  //}

//  //private HandleMessage(message: IMsgFromX) {
//  //  this.Debug.FuncStart(this.HandleMessage.name, this.Nickname);
//  //  this.Debug.LogVal('Message Flag', MsgFlag[message.MsgFlag]);
//  //  if (this.ReceiveRequestHndlr) {
//  //    this.ReceiveRequestHndlr(message);
//  //  } else {
//  //    this.Debug.Error(this.HandleMessage.name, 'no receive handler');
//  //  }
//  //  this.Debug.FuncEnd(this.HandleMessage.name);
//  //}

//  //private handleResponse() {
//  //}

  
//}