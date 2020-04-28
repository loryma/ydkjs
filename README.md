### Part 1. Get started

### Part 2. Closure

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

Property descriptors:
