$.Class = function(parent) {
    var classPointer = function (obj, namespace) {
        return namespace.length > 1 ? classPointer(obj[namespace.shift()], namespace) : obj;
    }, definition = {}, cls = function(){};

    if (arguments.length == 1 && typeof parent == 'object')
        definition = parent;

    if (arguments.length > 2) {
        for(var i = 0; i < arguments.length - 1; i++) {
            if (typeof arguments[i].prototype.namespace == 'undefined')
                throw new Error('Missing namespace plugin loaded at ' + i + 'position');

            if (arguments[i].prototype.namespace == "root") {
                $.extend(true, cls.prototype, arguments[i].prototype);
            } else {
                var pointer = classPointer(cls.prototype, arguments[i].prototype.namespace.split("."));
                pointer[arguments[i].prototype.namespace.split(".").pop()] = arguments[i].prototype;
                if (arguments[i].prototype.namespace.split(".").length == 1)
                    window[arguments[i].prototype.namespace] = pointer[arguments[i].prototype.namespace];
            }
        }
        parent = cls;
    }

    var _parent = {};

    if (typeof parent === 'function') {
        for (var key in parent.prototype) {
            _parent[key] = parent.prototype[key];
        }

        parent = $.extend(parent, parent.prototype);
        definition = $.extend(parent, definition);
    }

    var Class = function() {
        if (definition.initialize) definition.initialize.apply(this, arguments);
    };

    Class.prototype = definition;
    Class.prototype.constructor = Class;

    if (definition.consts && typeof definition.consts === 'object')
        for (var constant in definition.consts) {
            Class.prototype[constant] = $.proxy(
                function(def, cons) { return def[cons]}, this, definition.consts, constant
            );
        }

    return Class;
};