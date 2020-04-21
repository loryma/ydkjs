//red global scope vars (checkBrackets)

function isEveryBracketClosed(str) {
  //blue checkBrackets function scope
  let stack = [];
  const BRACKETS = { "(": ")", "[": "]", "{": "}", "<": ">" };

  str.split("").forEach(checkBracket);

  function checkBracket(el) {
    //yellow checkBracket function scope var(el)
    if (BRACKETS[el]) {
      //green if block scope
      stack.push(el);
    } else {
      for (const openBracket in BRACKETS) {
        //orange for block scope vars(openBrackets)
        if (BRACKETS[openBracket] === el) {
          // white if block scope vars(index)
          const index = stack.indexOf(openBracket);
          if (index !== -1) {
            stack.splice(index, 1);
          } else stack.push(el);
        }
      }
    }
  }

  return !stack.length;
}

console.log(isEveryBracketClosed("((buu})"));
console.log(isEveryBracketClosed("({buu})"));

function isPrimeWithCache(v) {
  cache = {};

  return function isPrime() {
    if (v in cache) return cache[v];
    if (v <= 3) {
      return v > 1;
    }
    if (v % 2 == 0 || v % 3 == 0) {
      return false;
    }
    var vSqrt = Math.sqrt(v);
    for (let i = 5; i <= vSqrt; i += 6) {
      if (v % i == 0 || v % (i + 2) == 0) {
        return (cache[v] = false);
      }
    }
    return (cache[v] = true);
  };
}

function factorizeWithCache(v) {
  const cache = {};

  return function factorize() {
    if (v in cache) return cache[v];
    if (!isPrimeWithCache(v)()) {
      let i = Math.floor(Math.sqrt(v));
      while (v % i != 0) {
        i--;
      }
      return (cache[v] = [...factorize(i)(), ...factorize(v / i)()]);
    }
    return (cache[v] = [v]);
  };
}

console.log("isPrime", isPrimeWithCache(48)());
// console.log("factorize", factorizeWithCache(25)());

function toggle(...rest) {
  let current = 0;
  return function () {
    if (rest.length === 0) {
      return undefined;
    } else {
      return current < rest.length ? rest[current++] : rest[0];
    }
  };
}

var hello = toggle("hello");
var onOff = toggle("on", "off");
var speed = toggle("slow", "medium", "fast");

console.log(hello()); // "hello"
console.log(hello()); // "hello"

console.log(onOff()); // "on"
console.log(onOff()); // "off"
console.log(onOff()); // "on"

console.log(speed()); // "slow"
console.log(speed()); // "medium"
console.log(speed()); // "fast"
console.log(speed()); // "slow"

function calculator() {
  let lastStr = "";
  let result;

  return function calc(v) {
    if (v === "=") {
      lastStr = v;
      return result;
    }

    const isNumber = (l) => !isNaN(l);

    if (isNumber(v)) {
      if (lastStr === "=") {
        lastStr = v;
        result = v;
      } else if (
        result !== Number(lastStr) &&
        result !== Infinity &&
        (result || result === 0)
      ) {
        if (lastStr && isNumber(lastStr)) {
          lastStr += v;
        } else {
          result = executeOperation(result, lastStr, v);
          lastStr = v;
        }
      } else {
        if (lastStr && isNumber(lastStr)) {
          lastStr += v;
        } else {
          lastStr = v;
        }
        result = Number(lastStr);
      }
    } else {
      lastStr = v;
    }

    function executeOperation(prev, sign, next) {
      const newNumber = Number(next);
      switch (sign) {
        case "+":
          return prev + newNumber;
        case "-":
          return prev - newNumber;
        case "*":
          return prev * newNumber;
        case "/":
          return prev / newNumber;
        default:
          return result;
      }
    }

    return v;
  };
}

var calc = calculator();

function useCalc(calc, keys) {
  return [...keys].reduce(function showDisplay(display, key) {
    var ret = String(calc(key));
    return display + (ret != "" && key == "=" ? "=" : "") + ret;
  }, "");
}

console.log(useCalc(calc, "4+3=")); // 4+3=7
console.log(useCalc(calc, "+9=")); // +9=16
console.log(useCalc(calc, "*8=")); // *8=128
console.log(useCalc(calc, "7*2*3=")); // 7*2*3=42
console.log(useCalc(calc, "1/0=")); // 1/0=ERR
console.log(useCalc(calc, "+3=")); // +3=ERR
console.log(useCalc(calc, "51=")); // 51
