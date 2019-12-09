class Opener {
  Document: any;
  Window: Window;
  constructor() {
    this.Window = null;
    this.Document = null;
  }
}

class WindowData extends SpokeBase {
  Opener: Opener;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(this.constructor.name)
    this.Opener = new Opener();
    xyyz.debug.FuncEnd(this.constructor.name)
    xyyz.debug.FuncEnd(this.constructor.name)
  }
}