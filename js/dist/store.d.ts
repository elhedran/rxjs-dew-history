import { History, Location } from 'history';
import { Observable, Subject } from 'rxjs';
export declare type State = Location;
export declare const createStore: (history: History) => {
    dispatch$: Subject<any>;
    action$: Observable<any>;
    state$: Observable<Location>;
};
