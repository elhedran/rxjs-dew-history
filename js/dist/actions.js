"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scope = '@rjs-dew-history';
var ActionType;
(function (ActionType) {
    ActionType[ActionType["Push"] = 0] = "Push";
    ActionType[ActionType["Replace"] = 1] = "Replace";
    ActionType[ActionType["Go"] = 2] = "Go";
    ActionType[ActionType["PushComplete"] = 3] = "PushComplete";
    ActionType[ActionType["PopComplete"] = 4] = "PopComplete";
    ActionType[ActionType["ReplaceCompelte"] = 5] = "ReplaceCompelte";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
exports.actionCreators = {
    push: function (destination, state) { return ({
        scope: exports.scope,
        type: ActionType.Push,
        destination: destination,
        state: state
    }); },
    replace: function (destination, state) { return ({
        scope: exports.scope,
        type: ActionType.Replace,
        destination: destination,
        state: state
    }); },
    go: function (n) { return ({
        scope: exports.scope,
        type: ActionType.Go,
        n: n
    }); }
};
exports.isAction = function (action) {
    return action.scope === exports.scope && action.type !== undefined;
};
exports.isCompleteAction = function (action) {
    return action.scope === exports.scope &&
        (action.type === ActionType.PopComplete
            || action.type === ActionType.PushComplete
            || action.type === ActionType.ReplaceCompelte);
};
//# sourceMappingURL=actions.js.map