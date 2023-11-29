import Node from "./Node";

class Tree {
  constructor(arr) {
    const uniqueArr = [...new Set(arr)];
    const uniqueSortedArr = uniqueArr.sort((a, b) => a - b);
    this.root = this.#buildTree(uniqueSortedArr);
  }

  #buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }
    const middleIndex = Math.floor((arr.length - 1) / 2);
    const node = new Node(arr[middleIndex]);
    node.left = this.#buildTree(arr.slice(0, middleIndex));
    node.right = this.#buildTree(arr.slice(middleIndex + 1));
    return node;
  }

  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

export default Tree;