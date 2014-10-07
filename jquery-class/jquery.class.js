$.Class = function(definition) {
    if (arguments.length !== 1 || typeof definition !== 'object')
        throw new Error('Wrong Class definition provided');

    var Class = function() {
        $.each(definition, function(key, value){
            if (/^init/.test(key))
                definition[key].apply(this, []);
        });
    };

    Class.prototype = definition;
    Class.prototype.constructor = Class;

    if (definition.consts && typeof definition.consts === 'object')
        for (var constant in definition.consts) {
            Class.prototype[constant] = $.proxy(
                function(def, cons) { return def[cons]}, this, definition.consts, constant
            );
        }

    if (typeof definition.namespace !== 'undefined') {
        var routing    = window,
            namespaces = definition.namespace.split('.'),
            className  = namespaces.pop();

        $.each(namespaces, function(idx, namespace) {
            if (typeof routing[namespace] !== 'function') {
                routing[namespace] = function(){};
            }
            routing = routing[namespace].prototype;
        });

        routing[className] = Class;
    }

    return Class;
};