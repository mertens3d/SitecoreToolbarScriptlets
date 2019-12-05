var xyyz = xyyz || {};

xyyz.OneTree = {
    WalkNodeRecursive: function (targetNode, depth) {
        // xyyz.debug.log('WalkNodeRecursive ' + depth);
        var toReturn = [];
        depth = depth - 1;

        if (targetNode) {
            var id = targetNode.id;
            var className = targetNode.className;
            // xyyz.debug.log('class: ' + className);
            if (className === xyyz.InjectConst.ClassName.ContentTreeNode) {
                var firstImg = targetNode.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);
                if (firstImg) {
                    var srcAttr = firstImg.getAttribute('src');
                    if (srcAttr.indexOf(xyyz.InjectConst.TreeExpandedPng) > -1) {
                        xyyz.debug.log('src: ' + srcAttr);
                        toReturn.push(firstImg.id);
                    }
                }
            }

            var childNodes = targetNode.children;
            if (childNodes && childNodes.length > 0 && depth > 0) {
                for (var jdx = 0; jdx < childNodes.length; jdx++) {
                    var oneChild = childNodes[jdx];
                    toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
                }
            }
        }
        return toReturn;
    },
    GetOneLiveTreeData: function (idx, targetDoc){
        xyyz.debug.log('s) SaveOneCeData idx: ' + idx);
        
        var toReturn = new xyyz.Storage.LivingCE(idx, targetDoc);
        
        var rootNode = targetDoc.querySelector(xyyz.InjectConst.Selector.RootNodeId );
        xyyz.debug.log('rootNode: '  + rootNode.innerHTML);
        if (rootNode) {
            var rootParent = rootNode.parentElement;
            
            var foundNodes = this.WalkNodeRecursive(rootParent, xyyz.InjectConst.MaxIter);
            xyyz.debug.log('foundNodes: ' + foundNodes.length);
            xyyz.debug.log('foundNodes: ' + foundNodes);
            
            window.localStorage.setItem(xyyz.Storage.root + idx, JSON.stringify(foundNodes));
            
            
        }
        xyyz.debug.log('e) SaveOneCeData');

    },

}