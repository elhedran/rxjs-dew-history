import { History, Location, LocationListener } from 'history';
import * as Dew from 'rxjs-dew';
import { Action, CompleteAction, ActionType, scope, isAction, isCompleteAction } from './actions';
import { Observable, Subject } from 'rxjs';

export type State = Location;

const talkToHistory = (action: Action, history: History): void => {
    switch (action.type) {
        case ActionType.Push:
            if (typeof (action.destination) === 'string') {
                history.push(action.destination, action.state);
            } else {
                history.push(action.destination);
            }
            break;
        case ActionType.Go:
            history.go(action.n);
            break;
        case ActionType.Replace:
            if (typeof (action.destination) === 'string') {
                history.replace(action.destination, action.state);
            } else {
                history.replace(action.destination);
            }
            break;
        default:
            break;
    }
};

const listenToHistory = (history: History): Observable<CompleteAction> => {
    const subject = new Subject<CompleteAction>();
    const listener: LocationListener = (location, a) => {
        switch (a) {
            case 'PUSH':
                subject.next({
                    scope: scope,
                    type: ActionType.PushComplete,
                    location: location
                });
                break;
            case 'POP':
                subject.next({
                    scope: scope,
                    type: ActionType.PopComplete,
                    location: location
                });
                break;
            case 'REPLACE':
                subject.next({
                    scope: scope,
                    type: ActionType.ReplaceCompelte,
                    location: location
                });
                break;
        }
    };
    history.listen(listener);
    return subject;
};

const createSoak = (history: History): Dew.Soak<Location, any> =>
    (state, action) => isCompleteAction(action) ? action.location : state;
const createFlow = (history: History): Dew.Flow<any> =>
    (in$) => {
        in$.filter(isAction)
            .subscribe(action => talkToHistory(action, history));
        return listenToHistory(history);
    };

export const createStore = (history: History): Dew.Store<Location, any> =>
    Dew.createStore(
        createFlow(history),
        createSoak(history),
        history.location);