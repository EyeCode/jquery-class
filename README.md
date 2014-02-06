#Jquery Class

Simple and easy jquery class builder with namespacing

Perequisite:

* jQuery

Exemple:

        var foo = new $.Class({
                namespace: "Foo",

                const: {
                    someConstant: "constant"
                },

                someFunction: function: () {
                    // some code..
                }
            }),
            bar = new $.Class({
                namespace: "Foo.Bar"
                ...
            }),
            App = new $.Class(foo, bar),
            runApp = new App();
            
foo and bar are initially individual plugin, combining it in App this is where the fun start..
            
Doing thing like this, you building an App containing foo and bar where bar is in foo!

To access bar from foo you simply do <code>this.Bar.anyFunctionOrVar()</code> or <code>Foo.Bar.anyFunctionOrVar()</code><br>
To access foo from bar you simply do <code>Foo.anyFunctionOrVar()</code>

const used as a constant is simply a getter. If used like the exemple above, this give something like <code>Foo.someConstant() // >> return "constant"</code>

