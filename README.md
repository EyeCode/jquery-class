#jQuery Class

Simple and easy jquery class builder with namespacing

Perequisite:

* jQuery

Exemple:
```javascript
var foo = new $.Class({
        namespace: "Foo",

        consts: {
            someConstant: "constant"
        },

        someFunction: function: () {
            // some code..
        }
    }),
    bar = new $.Class({
        namespace: "Foo.Bar"
        // ...
    }),
    App = new $.Class(foo, bar),
    runApp = new App();
```

foo and bar are initially individual plugin, combining it in App this is where the fun start..
            
Doing thing like this, you building an App containing foo and bar where bar is in foo!

To access bar from foo you simply do 
```javascript 
this.Bar.anyFunctionOrVar() 
``` 
or 
```javascript 
Foo.Bar.anyFunctionOrVar()
```

To access foo from bar you simply do 
```javascript 
Foo.anyFunctionOrVar()
```

consts are used as a constant holder where sub variable are simply a getter. If used like the exemple above, this give something like 
```javascript
Foo.someConstant() // >> return "constant"
```

