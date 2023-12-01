import Node from "./Node";

class Tree {
  constructor(arr) {
    const uniqueArr = [...new Set(arr)];
    const uniqueSortedArr = uniqueArr.sort((a, b) => a - b);
    this.root = this.#buildTree(uniqueSortedArr);
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

  static getHeight(node) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
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

  #insertRec(node, data) {
    if (node === null) {
      node = new Node(data);
      return node;
    }
    if (node.data > data) {
      node.left = this.#insertRec(node.left, data);
    } else if (node.data < data) {
      node.right = this.#insertRec(node.right, data);
    } else {
      throw new Error("Trees cannot contain any duplicate values.");
    }
    return node;
  }

  // https://www.geeksforgeeks.org/deletion-in-binary-search-tree/
  #deleteRec(node, data) {
    if (node === null) {
      return node;
    }
    // Find the node to be deleted.
    if (node.data > data) {
      node.left = this.#deleteRec(node.left, data);
      return node;
    } else if (node.data < data) {
      node.right = this.#deleteRec(node.right, data);
      return node;
    } else {
      // When it reaches here the node to be deleted is found.
      /* If the node to be deleted has 1 empty child.
         Make its parent point to its grand child, essentially removing the node to be deleted.
      */
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        // If the node to be deleted has both children.
        let succParent = node;
        /* Find the successor.
           Successor is the next bigger node value next to the node to be deleted.
        */
        let succ = node.right;
        while (succ.left !== null) {
          succParent = succ;
          succ = succ.left;
        }
        // Delete successor.
        if (succParent !== node) {
          succParent.left = succ.right;
        } else {
          succParent.right = succ.right;
        }
        // Copy successor data to node to be deleted.
        node.data = succ.data;
        return node;
      }
    }
  }

  #findRec(node, data) {
    if (node === null) {
      return null;
    } else if (node.data > data) {
      return this.#findRec(node.left, data);
    } else if (node.data < data) {
      return this.#findRec(node.right, data);
    } else {
      return node;
    }
  }

  #getDepthRec(tmp, node, depth = 0) {
    if (tmp === null) {
      return -1;
    }
    if (tmp.data > node.data) {
      return this.#getDepthRec(tmp.left, node, depth + 1);
    } else if (tmp.data < node.data) {
      return this.#getDepthRec(tmp.right, node, depth + 1);
    } else {
      return depth;
    }
  }

  #isBalanced(node) {
    if (node === null) {
      return true;
    }
    const leftHeight = Tree.getHeight(node.left);
    const rightHeight = Tree.getHeight(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.#isBalanced(node.left) &&
      this.#isBalanced(node.right)
    );
  }

  insert(data) {
    this.root = this.#insertRec(this.root, data);
  }

  delete(data) {
    this.root = this.#deleteRec(this.root, data);
  }

  find(data) {
    return this.#findRec(this.root, data);
  }

  levelOrder(cb) {
    if (this.root === null) {
      if (cb === undefined) {
        return [];
      }
    }
    const nodeQueue = [this.root];
    const result = [];
    while (nodeQueue.length > 0) {
      const curNode = nodeQueue.shift();
      if (cb) {
        cb(curNode);
      } else {
        result.push(curNode.data);
      }
      if (curNode.left !== null) {
        nodeQueue.push(curNode.left);
      }
      if (curNode.right !== null) {
        nodeQueue.push(curNode.right);
      }
    }
    if (cb === undefined) {
      return result;
    }
  }

  inOrder(cb) {
    const result = [];
    function traverse(node, cb) {
      if (node === null) {
        return;
      }
      traverse(node.left, cb);
      if (cb) {
        cb(node);
      } else {
        result.push(node.data);
      }
      traverse(node.right, cb);
    }
    traverse(this.root, cb);
    if (cb === undefined) {
      return result;
    }
  }

  preOrder(cb) {
    const result = [];
    function traverse(node, cb) {
      if (node === null) {
        return;
      }
      if (cb) {
        cb(node);
      } else {
        result.push(node.data);
      }
      traverse(node.left, cb);
      traverse(node.right, cb);
    }
    traverse(this.root, cb);
    if (cb === undefined) {
      return result;
    }
  }

  postOrder(cb) {
    const result = [];
    function traverse(node, cb) {
      if (node === null) {
        return;
      }
      traverse(node.left, cb);
      traverse(node.right, cb);
      if (cb) {
        cb(node);
      } else {
        result.push(node.data);
      }
    }
    traverse(this.root, cb);
    if (cb === undefined) {
      return result;
    }
  }

  getDepth(node) {
    return this.#getDepthRec(this.root, node);
  }

  isBalanced() {
    return this.#isBalanced(this.root);
  }
}

export default Tree;
