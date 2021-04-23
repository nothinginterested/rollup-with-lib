import {isReactive, reactive} from '../src';

describe('reactivity', () => {
    test(
        'Object', () => {
            const original = {foo: 1};
            const observed = reactive(original);
            expect(observed).not.toBe(original);
            expect(isReactive(observed)).toBe(true);
            expect(isReactive(original)).toBe(false);


            // get
            expect(observed.foo).toBe(1);
            // has
            expect('foo' in observed).toBe(true);
            // ownKeys
            expect(Object.keys(observed)).toEqual(['foo']);
        }
    );

    test('proto', () => {
        const obj = {};
        const reactiveObj = reactive(obj);
        expect(isReactive(reactiveObj)).toBe(true);
        // read prop of reactiveObject will cause reactiveObj[prop] to be reactive
        // @ts-ignore
        const prototype = reactiveObj['__proto__'];
        const otherObj = {data: ['a']};
        expect(isReactive(otherObj)).toBe(false);
        const reactiveOther = reactive(otherObj);
        expect(isReactive(reactiveOther)).toBe(true);
        expect(reactiveOther.data[0]).toBe('a');
    });
    // 嵌套
    test('nested reactives', () => {
        const original = {
            nested: {
                foo: 1
            },
            array: [{bar: 2}]
        };
        const observed = reactive(original);
        expect(isReactive(observed.nested)).toBe(true);
        expect(isReactive(observed.array)).toBe(true);
        expect(isReactive(observed.array[0])).toBe(true);
    });
    // test('observing subtypes of IterableCollections(Map, Set)', () => {
    //     // subtypes of Map
    //     class CustomMap extends Map {
    //     }
    //
    //     const cmap = reactive(new CustomMap());
    //
    //     expect(cmap instanceof Map).toBe(true);
    //     expect(isReactive(cmap)).toBe(true);
    //
    //     cmap.set('key', {});
    //     expect(isReactive(cmap.get('key'))).toBe(true);
    //
    //     // subtypes of Set
    //     class CustomSet extends Set {
    //     }
    //
    //     const cset = reactive(new CustomSet());
    //
    //     expect(cset instanceof Set).toBe(true);
    //     expect(isReactive(cset)).toBe(true);
    //
    //     // let dummy;
    //     // effect(() => (dummy = cset.has('value')));
    //     // expect(dummy).toBe(false);
    //     // cset.add('value');
    //     // expect(dummy).toBe(true);
    //     // cset.delete('value');
    //     // expect(dummy).toBe(false);
    // });
});
