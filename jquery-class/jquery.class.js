$.Class = function(definition) {
    var registerNameSpace = function(ns, ptr) {
        var current = ns.shift();
        if (typeof ptr[current] === 'undefined') { ptr[current] = {}; }
        return ns.length > 0 ? registerNameSpace(ns, ptr[current]) : ptr;
    }

    var Class = function() {
        for (var key in definition) {
            if (/^init/.test(key) && typeof definition[key] === 'function') definition[key].apply(this, arguments);
        }
    };

    Class.prototype = definition;
    Class.prototype.constructor = Class;

    if (definition.consts && typeof definition.consts === 'object') {
        $.each(definition.consts, function (constant, value) {
            Class.prototype[constant] = $.proxy(function (cons) { return cons; }, this, value);
        });
    }

    var pointer = registerNameSpace(definition.namespace.split('.'), window);
    return $.extend(pointer[definition.namespace.split('.').pop()], new Class());
};