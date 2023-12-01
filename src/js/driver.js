import Tree from "./Tree";

function driver() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const tree = new Tree(arr);
  
  Tree.prettyPrint(tree.root);
  console.log("height:", Tree.getHeight(tree.root));
  console.log("is balanced?", Tree.isBalanced(tree.root));

  console.log("insert 101:", tree.insert(101));
  Tree.prettyPrint(tree.root);
  console.log("height:", Tree.getHeight(tree.root));
  console.log("is balanced?", Tree.isBalanced(tree.root));

  console.log("delete tree root node:", tree.delete(tree.root.data));
  Tree.prettyPrint(tree.root);

  console.log("find 8:", tree.find(8));

  console.log("level order no cb:", tree.levelOrder());
  console.log("inOrder no cb::", tree.inOrder());
  console.log("preOrder no cb::", tree.preOrder());
  console.log("postOrder no cb::", tree.postOrder());
}

export default driver;
