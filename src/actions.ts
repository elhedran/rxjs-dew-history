import { LocationState, Location, LocationDescriptorObject } from 'history';

export const scope = '@rjs-dew-history';

export type BaseAction = {
    scope: '@rjs-dew-history';
};

export enum ActionType {
    Push,
    Replace,
    Go,
    PushComplete,
    PopComplete,
    ReplaceCompelte,
}

export type PushAction = BaseAction & {
    type: ActionType.Push,
    destination: string | LocationDescriptorObject;
    state?: LocationState;
};

export type ReplaceAction = BaseAction & {
    type: ActionType.Replace,
    destination: string | LocationDescriptorObject;
    state?: LocationState;
};

export type GoAction = BaseAction & {
    type: ActionType.Go,
    n: number;
};

export type CompleteAction = BaseAction & {
    type: ActionType.ReplaceCompelte | ActionType.PopComplete | ActionType.PushComplete,
    location: Location
};

export type Action = PushAction | ReplaceAction | GoAction | CompleteAction;

export const actionCreators = {
    push: (destination: string | LocationDescriptorObject, state?: LocationState): PushAction => ({
        scope,
        type: ActionType.Push,
        destination: destination,
        state
    }),
    replace: (destination: string | LocationDescriptorObject, state?: LocationState): ReplaceAction => ({
        scope,
        type: ActionType.Replace,
        destination: destination,
        state
    }),
    go: (n: number): GoAction => ({
        scope,
        type: ActionType.Go,
        n
    })
};

export const isAction = (action: any): action is Action =>
    action.scope === scope && action.type !== undefined;

export const isCompleteAction = (action: any): action is CompleteAction =>
    action.scope === scope &&
    (action.type === ActionType.PopComplete
        || action.type === ActionType.PushComplete
        || action.type === ActionType.ReplaceCompelte);