/**
 * JQuery Class
 * version 2.0.10
 */
$.Class = function(inherits, core) {

    var definition = core || inherits,
        /** registering namespace **/
        registerNameSpace = function(ns, ptr) {
            var current = ns.shift();

            if (typeof ptr[current] === 'undefined') {
                ptr[current] = {} ;
            }

            return ns.length > 0 ? registerNameSpace(ns, ptr[current]) : ptr;
        },
        /** building Class object **/
        Class = function() {
            // initializing Class
            var instances = definition.instances,
                initialize = function(def, self, args) {
                    // start with registering namespace in window
                    pointer = registerNameSpace(def.namespace.split('.'), window);
                    $.extend(true, pointer[def.namespace.split('.').pop()], self);

                    // call any "init*" function at the load of the class
                    for (var key in def) {
                        if (/^init/.test(key) && typeof def[key] === 'function') {
                            pointer[def.namespace.split('.').pop()][key].apply(pointer[def.namespace.split('.').pop()], args);
                        }
                    }

                    // add current class to the loadedClass stack for futur class where required is needed
                    if (window.loadedClass) {
                        window.loadedClass.push('required_' + def.namespace.replace(/\./, "_"));
                    } else {
                        window.loadedClass = ['required_' + def.namespace.replace(/\./, "_")];
                    }

                    // trigger the loaded class event for class already waiting for it
                    $(document).trigger('required_' + def.namespace.replace(/\./, "_"));
                };

            // define function type to return the type Class
            this.getType = function() {
                return 'Class';
            };

            // define function to return the origin (json) class config
            this.getDefinition = function() {
                return definition
            };

            //lookup for instance of
            this.instanceOf = function (instance) {
                instance = typeof instance === 'function' ? instance.name : instance;
                instance = typeof instance === 'object' ? 'object': instance;
                return $.inArray(instance.toString().toLowerCase(), instances) > -1;
            }

            // if current Class depends (required) on other class
            if (typeof definition.required === 'object') {
                var self = this,
                    events = [];

                // generate events to listen
                for (var x in definition.required) {
                    events.push('required_' + definition.required[x].replace(/\./, "_"));
                }

                // initialize listener on generated events
                $(document).on(events.join(' '), {def: definition, args: arguments}, function(e) {
                    // when events triggered, if required Class are loaded go for initialize
                    if ($.grep(events, function(x) { return $.inArray(x, window.loadedClass)}).length === events.length) {
                        initialize(e.data.def, self, e.data.args);
                    }
                });
            } else {
                // initialize the current class
                initialize(definition, this, arguments);
            }
        };

    // define current default instances
    definition.instances = ['object', 'class', definition.namespace.toLowerCase()];

    // current Class inherits from those sent
    if (core === definition && typeof inherits === 'object') {
        $.each(inherits, function() {
            definition = $.extend(true, {}, this.getDefinition(), definition);
            definition.instances.push(this.getDefinition().namespace.toLowerCase());
        });
    }

    // base Class definition
    Class.prototype = $.extend(true, {}, definition);
    Class.prototype.constructor = Class;

    // turn instances as private value
    delete Class.prototype.instances;

    // constant definition
    if (definition.consts && typeof definition.consts === 'object') {
        $.each(definition.consts, function (constant, value) {
            Class.prototype[constant] = $.proxy(function (cons) { return cons; }, this, value);
        });
    }

    // instantiation of the Class object
    new Class();
};
