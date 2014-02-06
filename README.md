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
            
Doing thing like this, you building an App containing foo and bar where bar is in foo!

To access bar from foo you simply do <code>this.Bar...</code> or <code>Foo.Bar...</code>
To access foo from bar you simply do <code>Foo...</code>

