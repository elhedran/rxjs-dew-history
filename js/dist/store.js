"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dew = require("rxjs-dew");
var actions_1 = require("./actions");
var rxjs_1 = require("rxjs");
var talkToHistory = function (action, history) {
    switch (action.type) {
        case actions_1.ActionType.Push:
            if (typeof (action.destination) === 'string') {
                history.push(action.destination, action.state);
            }
            else {
                history.push(action.destination);
            }
            break;
        case actions_1.ActionType.Go:
            history.go(action.n);
            break;
        case actions_1.ActionType.Replace:
            if (typeof (action.destination) === 'string') {
                history.replace(action.destination, action.state);
            }
            else {
                history.replace(action.destination);
            }
            break;
        default:
            break;
    }
};
var listenToHistory = function (history) {
    var subject = new rxjs_1.Subject();
    var listener = function (location, a) {
        switch (a) {
            case 'PUSH':
                subject.next({
                    scope: actions_1.scope,
                    type: actions_1.ActionType.PushComplete,
                    location: location
                });
                break;
            case 'POP':
                subject.next({
                    scope: actions_1.scope,
                    type: actions_1.ActionType.PopComplete,
                    location: location
                });
                break;
            case 'REPLACE':
                subject.next({
                    scope: actions_1.scope,
                    type: actions_1.ActionType.ReplaceCompelte,
                    location: location
                });
                break;
        }
    };
    history.listen(listener);
    return subject;
};
var createSoak = function (history) {
    return function (state, action) { return actions_1.isCompleteAction(action) ? action.location : state; };
};
var createFlow = function (history) {
    return function (in$) {
        in$.filter(actions_1.isAction)
            .subscribe(function (action) { return talkToHistory(action, history); });
        return listenToHistory(history);
    };
};
exports.createStore = function (history) {
    return Dew.createStore(createFlow(history), createSoak(history), history.location);
};
//# sourceMappingURL=store.js.map