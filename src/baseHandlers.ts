import {isObject, reactive, ReactiveFlags, Target} from './index';


const get = createGetter();

function createGetter() {
    return function get(target: Target, key: string, receiver: object) {
        if (key === ReactiveFlags.IS_Reactive) {
            return true;
        }
        const res = Reflect.get(target, key);
        if (isObject(res)) {
            return reactive(res);
        }

        return res;
    };


};
export const baseHandler: ProxyHandler<object> = {
    get
};