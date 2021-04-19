import {reactive,isReactive} from './index'
const original = {
    nested: {
        foo: 1
    },
    array: [{ bar: 2 }]
}
const observed = reactive(original)
const a=isReactive(observed.nested)
console.log(a);