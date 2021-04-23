import {baseHandler} from './baseHandlers';

export const enum ReactiveFlags {
    IS_Reactive = '__lzz_isReactive'
}

export interface Target {
    [ReactiveFlags.IS_Reactive]?: boolean
}


export function makeMap(
    str: string,
    expectsLowerCase?: boolean
): (key: string) => boolean {
    const map: Record<string, boolean> = Object.create(null);
    const list: Array<string> = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}

const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);

// export const isFuntion=()=>

export const isObject = (val: unknown): val is Record<any, any> =>
    val !== null && typeof val === 'object';

const setHandle = (target: any, p: any, value: any): boolean => {

    // const res=Reflect.set()
    console.log(target);
    console.log(p);
    console.log(value);

    return true;

};

export function reactive(target: object) {
    return createReactiveObject(
        target,
        baseHandler,
        baseHandler
    );

}

export function isReactive(value: unknown): boolean {
    return !!(value && (value as Target)[ReactiveFlags.IS_Reactive] as boolean);

}


function createReactiveObject(target: Target, baseHandlers: ProxyHandler<any>, collectionHandlers: ProxyHandler<any>) {
    return new Proxy(
        target,
        baseHandlers
    );

}