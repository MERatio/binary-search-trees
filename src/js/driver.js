import Tree from "./Tree";

function generateUniqueNumbers(length) {
  if (length > 100) {
    throw new Error("Length should be less than or equal to 100");
  }

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const result = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    result.push(numbers[randomIndex]);
    numbers.splice(randomIndex, 1);
  }

  return result;
}

function driver() {
  const arr = generateUniqueNumbers(10);
  const tree = new Tree(arr);
  Tree.prettyPrint(tree.root);
  console.log("height:", Tree.getHeight(tree.root));
  console.log("is balanced?", Tree.isBalanced(tree.root));

  console.log("add 101:", tree.insert(101));
  Tree.prettyPrint(tree.root);
  console.log("height:", Tree.getHeight(tree.root));
  console.log("is balanced?", Tree.isBalanced(tree.root));
}

export default driver;
