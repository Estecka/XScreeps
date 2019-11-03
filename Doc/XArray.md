# XArray

## ◼ Array.prototype.remove (value)
Removes the first instance of `value` from the array.
```javascript
let array = [1, 0, 1];
array.remove(1);
console.log (array); // [0, 1]
```

## ◼ _.findBy (array, predicate)
This is sort of a mashup of lodash's `_.sortBy` and `_.filterBy`, but optimized for returning only one element instead of reordering the whole array.

`predicate` is a function that takes an element in parameter, and may return either a number or a boolean :
- when several elements predicate to a number, the function will pick the element with the smallest value to be returned.
- if an element ever predicates to `true`, it will be returned immediately, without evaluating or comparing remaining elements.
- if an element predicates to `false`, it will be completely ignored. If all elements predicate to `false`, the function will return `undefined`.

```javascript
let array = [2, 1, 0, -1, -2]
_.findBy(array, n => n); // -2
_.findBy(array, n => n<0); // -1
_.findBy(array, n => n<0 ? false : n); // 0
_.findBy(array, n => n>3); // undefined
```
