import { LocationState, Location, LocationDescriptorObject } from 'history';
export declare const scope = "@rjs-dew-history";
export declare type BaseAction = {
    scope: '@rjs-dew-history';
};
export declare enum ActionType {
    Push = 0,
    Replace = 1,
    Go = 2,
    PushComplete = 3,
    PopComplete = 4,
    ReplaceCompelte = 5,
}
export declare type PushAction = BaseAction & {
    type: ActionType.Push;
    destination: string | LocationDescriptorObject;
    state?: LocationState;
};
export declare type ReplaceAction = BaseAction & {
    type: ActionType.Replace;
    destination: string | LocationDescriptorObject;
    state?: LocationState;
};
export declare type GoAction = BaseAction & {
    type: ActionType.Go;
    n: number;
};
export declare type CompleteAction = BaseAction & {
    type: ActionType.ReplaceCompelte | ActionType.PopComplete | ActionType.PushComplete;
    location: Location;
};
export declare type Action = PushAction | ReplaceAction | GoAction | CompleteAction;
export declare const actionCreators: {
    push: (destination: string | LocationDescriptorObject, state?: any) => PushAction;
    replace: (destination: string | LocationDescriptorObject, state?: any) => ReplaceAction;
    go: (n: number) => GoAction;
};
export declare const isAction: (action: any) => action is Action;
export declare const isCompleteAction: (action: any) => action is CompleteAction;
