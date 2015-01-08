# jQuery-Class

> jQuery-Class is a JavaScript library which helps developers create and manage class object.

Perequisite:

* jQuery

## Install

> You can dowmload it from here or install via bower with the following package:

	"jquery-class-ns": "2.0.*"

## How To Use

1) Include `jquery-class.js` in the page (or use the minified version)

2) Now just implement your custom classes:

```javascript
$.Class({
    required: ["Foo.Bar"],// (array) optional..
    namespace: "Foo",

    consts: {
        someConstant: "constant"
    },

    someFunction: function: () {
        // some code..
    }
});
$.Class({
    namespace: "Foo.Bar"
    // ...
});
```

Complete Doc : http://eyecode.github.io/jquery-class/


