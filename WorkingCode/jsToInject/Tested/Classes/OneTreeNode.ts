class OneTreeNode extends SpokeBase {
  NodeId: string;
  NodeFriendly: string;
  constructor(nodeId, nodeFriendly, xyyz: Hub) {
    super(xyyz);
    this.NodeId = nodeId;
    this.NodeFriendly = nodeFriendly;
  }
}