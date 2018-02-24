- `m` is a Map

- `m` has a function `set`
- Calling `m.set( key, value )` generates a unique ID for the operation
- The unique ID is independent of `key` and `value`, such that
    - the pair (`key`, `value`) can be reused
    - a new, globally unique ID will be generated for each use

- `m` has a function `get`
- Calling `m.get( key )` will return the value stored by calling `m.set` with the same value of `key` (or return undefined if there is no value)

- `m` has a function `listChanges`
- Calling `m.listChanges()` will return a list of changes (`set` and `remove` operations) that have been applied to the Map.
- The list of changes includes the GUID for the change, the `key` that was changed, and the `value` it was changed to.

- `m` has a function `applyChanges`
- Calling `m.applyChanges( changeList )` will merge the changes

- `m` has a function `applyChange`
- `m.applyChange` is used by both `m.set` and `m.applyChanges`

- Consider two maps, `m1` and `m2`
- `m1.set('x', 27)`
- `m2.set('x', 28)`
- `m1.applyChanges(m2.listChanges())`
- `m2.applyChanges(m1.listChanges())`
- `expect( m1 ).deep.equals( m2 )` to be true
- `expect( m2 ).deep.equals( m1 )` to be true
- Whether `x` equals 27 or 28 should be deterministic and controlled by the surrounding code, not random or arbitrary (i.e. not based on the value of `x`, the chronological time of the `set` calls, or some other internal or hard-coded criterion)
