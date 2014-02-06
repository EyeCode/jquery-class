#Jquery Class

Simple and easy jquery class builder with namespacing

Perequisite:

* jQuery

Exemple

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

