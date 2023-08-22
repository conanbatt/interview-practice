// Return attributes and values of a node in a convenient way:
/* example: 
    <ExampleElement attr1="15" attr2>
    {   attr1: {
            hasValue: true,
            value: 15
        },
        attr2: {
            hasValue: false
        }
Inclusion of hasValue is in case an eslint rule cares about boolean values
explicitly assigned to attribute vs the attribute being used as a flag
*/ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return NodeAttributes;
    }
});
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var NodeAttributes = /*#__PURE__*/ function() {
    "use strict";
    function NodeAttributes(ASTnode) {
        var _this = this;
        _class_call_check(this, NodeAttributes);
        _define_property(this, "attributes", void 0);
        this.attributes = {};
        ASTnode.attributes.forEach(function(attribute) {
            if (!attribute.type || attribute.type !== "JSXAttribute") {
                return;
            }
            if (!!attribute.value) {
                // hasValue
                var value = typeof attribute.value.value === "string" ? attribute.value.value : typeof attribute.value.expression.value !== "undefined" ? attribute.value.expression.value : attribute.value.expression.properties;
                _this.attributes[attribute.name.name] = {
                    hasValue: true,
                    value: value
                };
            } else {
                _this.attributes[attribute.name.name] = {
                    hasValue: false
                };
            }
        });
    }
    _create_class(NodeAttributes, [
        {
            key: "hasAny",
            value: function hasAny() {
                return !!Object.keys(this.attributes).length;
            }
        },
        {
            key: "has",
            value: function has(attrName) {
                return !!this.attributes[attrName];
            }
        },
        {
            key: "hasValue",
            value: function hasValue(attrName) {
                return !!this.attributes[attrName].hasValue;
            }
        },
        {
            key: "value",
            value: function value(attrName) {
                var attr = this.attributes[attrName];
                if (!attr) {
                    return true;
                }
                if (attr.hasValue) {
                    return attr.value;
                }
                return undefined;
            }
        }
    ]);
    return NodeAttributes;
}();
