### Part 1. Get started

### Part 2. Scope. Closure

Placement of variable, functions and blocks with respect to each other is analized accorging to rules of scope during initial parsing/compilation stage.
Scope is primarily determinated during compilation.

Lexical scope is associated with 'lexing' stage of compilation.

3 stage of compilation:

-   Tokenizing/lexing
-   Parsing (creating Abstract Syntax Tree from stream(array) of tokens)
-   Code generation (turning AST into executable code)

The JS engine takes the AST for `var a = 2;` and turns it into a set of machine instructions to actually create a variable called a (including reserving memory, etc.), and then store a value into a.

The connection between scopes that are nested within other scopes is called **scope chain**
**Shadowing** in case of identical variables names variable in the closest scope is used. `let` can shadow `var` but `var` can't shadow `let`.

**Hoisting** - every variable is created at the beginning of the scope it belongs to.
When a function is defined a new scope is created.

Closure - Functions maintain original scope irregardles of where they are executed.

**Principle of Least Privilage (POLP). Principle of Least Exposure (POLE)**

Components of the system should be designed to function with least privilage, least access, least exposure.
Minimizing exposure of variables registered in each scope. Otherwise:

-   Naming collisions
-   Unexpected behaviour
-   Unintended Dependency

### Part 3. This. Objects. Prototypes

At a runtime activation record (execution context) is created. Execution context contains information about where the function was called from (call-stack), how the function was invoked, what paramenters were passed. One of the properties of this record is the `this` reference which will be used for the duration of that function execution.

`this` is deteminate by the call site

call-stack = stack of function that have been called to get us to the current moment in execution. call-site is the invocation before the currently executing function.

`this` is either object on wich method is caller or global object (undefined in strict mode);

Can explicitly bind this object during function call via `call`, `apply`

`this` can be hard bound to a function with **bound** method. new funnction also recieves `name` property with the name of the original function
object return by constructor function call has `this` set to returned object

If null or undefined passed to `call` method they are ignored and default binding rules apply

Arrow function adopts this from enclosing scope

**Object**

Objects have two forms: literal and constructed form (new Object())

JS data type:

-   string
-   number
-   boolean
-   null
-   undefined
-   object
    When method is called on primitive data type value an object is created;

object's properies are pointers (references) to values

Any values used as a key to access object property will be converted to string
Can make shallow copy of the object with Object.assign()

**Prototype**

[[prototype]] is an internal property of the object in JS which is a reference to another object
When accessing object propery ([[Get]] operation) if it's not found on the object itself it is searched for on the object referenced by [[Prototype]] link. If property not found on linnked object it is searched on object referenced via [[Prototype]] on the linked object and so on until either property found or undefined returned. Object linked via [[Prototype]] link create Prototype chain.

Add [[Prototype]] when creating object:

```
var myObject = Object.create( anotherObject );
```

for...in loop iterates over object's propeties and any propeties that can be reached via its prototype chain.

the prototype chain ends in Object.prototype where butlt-in utitilies reside (toString(), .hasOwnProperty() etc)

## Part 4. Types and grammar

**Data types**

-   null
-   undefined
-   boolean
-   number
-   string
-   object
-   symbol

`typeof` operator returns type of the given value. Exeption:

```
typeof null = "object"

Numbers:
- 0o363 octal number
- 0b11110011 binary numer
- 0xf3 hexadecimal

`Number.EPSILON` "rounding error" value as the tolerance for comparison

**Coercion**

Values coerced to Boolean False:
- undefined
- null
- false
- +0, -0 and NaN
- ""
```

### Part 5. Async. Promise. Generators

Issues with callbacks:

-   lack of sequentiality
-   lack of trustability

Inversion of control - handing callback to another party to invoke

**Promises**

`new Promise(function(resolve, reject) {resolve()})` Function passed to Promise constructor is executed immediately. Promise is recognized as an object which has `.then()` method defined on it. (thenable)

Promise is immutable once resolved.

`Promise.all([])` takes an array of promises and returns new promise that waits on all of the to finish

Passin non-thenable value `Promise.resolve()` returns a promise that's fullfilled. When passing promise same promise is returned.

**Generators**
Generator is a type of function where execution pauses on `yield` keyword.
Calling generator returns iterator. values can be passes to generator and received from generator.

```

function* generatorFunction() {
    const valuePassedInGenerator = yield "ValueReturntedFromGenertor"
    return;
}

const it = generatorFunction();

it.next();
const res = it.next(valuePassedToGenerator) //{value: "ValueReturntedFromGenertor", done: false}
```
