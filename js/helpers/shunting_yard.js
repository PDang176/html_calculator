import Stack from "./stack.js";

export const operators = {
  "*": { precedence: 3, associativity: "Left" },
  "/": { precedence: 3, associativity: "Left" },
  "+": { precedence: 2, associativity: "Left" },
  "-": { precedence: 2, associativity: "Left" },
};

const comparePrecedence = (o2, o1) => {
  if (operators[o2].precedence > operators[o1].precedence) {
    return true;
  }
  if (
    operators[o1].associativity === "Left" &&
    operators[o2].precedence === operators[o1].precedence
  ) {
    return true;
  }
  return false;
};

export const shunting_yard = (tokens) => {
  const rpn = [];
  const stack = new Stack();

  for (const token of tokens) {
    if (/\d+/.test(token)) {
      rpn.push(token);
    } else if (token in operators) {
      while (
        !stack.isEmpty() &&
        stack.peek() in operators &&
        comparePrecedence(stack.peek(), token)
      ) {
        rpn.push(stack.pop());
      }
      stack.push(token);
    }
  }

  while (!stack.isEmpty()) {
    rpn.push(stack.pop());
  }

  return rpn;
};

const performOperation = (a, b, op) => {
  switch (op) {
    case "+":
      return b + a;
    case "-":
      return b - a;
    case "*":
      return b * a;
    case "/":
      return b / a;
    default:
      throw new Error("Invalid Operation", op);
  }
};

export const evaluate_rpn = (rpn) => {
  const stack = new Stack();
  for (const token of rpn) {
    if (/\d+/.test(token)) {
      stack.push(token);
    } else {
      let a = stack.pop();
      let b = stack.pop();
      stack.push(performOperation(+a, +b, token));
    }
  }

  return stack.pop();
};
