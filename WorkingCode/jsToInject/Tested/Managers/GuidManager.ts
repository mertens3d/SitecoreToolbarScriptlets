class GuidManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }

  ParseGuid(val: string): IGuid {
    let toReturn: IGuid = {
      Value: val
    }
    return toReturn
  }
}