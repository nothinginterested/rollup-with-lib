import { isReactive, reactive } from '../index';
describe('reactivity', () => {
    test('Object', () => {
        const original = { foo: 1 };
        const observed = reactive(original);
        expect(observed).not.toBe(original);
        expect(isReactive(observed)).toBe(true);
        expect(isReactive(original)).toBe(false);
    });
    test('Object1', () => {
        const obj = {
            a: 1
        };
        const b = reactive(obj);
        expect(obj.a).toEqual(b.a);
    });
});
