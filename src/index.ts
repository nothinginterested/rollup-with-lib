export const enum ReactiveFlags {
    IS_Reactive = '__lzz_isReactive'
}

export interface Target {
    [ReactiveFlags.IS_Reactive]?: boolean
}

export const isObject = (val: unknown): val is Record<any, any> =>
    val !== null && typeof val === 'object';

const handle = (target: any, key: any): any => {
    if (key === ReactiveFlags.IS_Reactive) {
        return true;
    }
    const res = Reflect.get(target, key);

    if (isObject(res)) {
        return reactive(res);
    }

    return target[key];
};

export function reactive(target: object) {
    return new Proxy(
        target,
        {
            get: handle
        }
    );

}

export function isReactive(value: unknown): boolean {
    return !!(value && (value as Target)[ReactiveFlags.IS_Reactive] as boolean);

}