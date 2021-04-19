export const enum ReactiveFlags {
    IS_Reactive = '__lzz_isReactive'
}

export interface Target {
    [ReactiveFlags.IS_Reactive]?: boolean
}


export function reactive(target: object) {
    const handle = (target: any, key: any) => {
        if (key === ReactiveFlags.IS_Reactive) {
            return true;
        }
        const res=Reflect.get(target,key)


        return target[key];
    };
    return new Proxy(
        target,
        {
            get: handle
        }
    );

}

export function isReactive(value: unknown): boolean {
    let tag = (value as Target)[ReactiveFlags.IS_Reactive];

    return !!(value && (value as Target)[ReactiveFlags.IS_Reactive] as boolean);

}