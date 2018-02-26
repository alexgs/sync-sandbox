# Sync Sandbox

A place for me to play with different approaches to synchronizing data over unreliable network connections.

- **Alpha** &mdash; my first foray into "conflict-free replicative data types" (CRDTs)
-

## Contents

- [Notes](#notes)
- [To Do](#to-do)

## Notes

(after a weekend of burying myself in academic literature | Created: 2018-02-25)

- Introduction
    - **Basic data types** &mdash; Let's lay out some common terminology before getting into a more detailed discussion.
        - **Scalar** data types can only hold one value at a time (for example, integers and booleans). A string can be considered a scalar if merging concurrent edits renders the string meaningless or nonsense (for example) concurrent edits to an email address would mangle the address, making it invalid and meaningless).
        - **Data structures** hold multiple values, such as Map, List, and Set.
        - A **register** is a data structure that holds one scalar. This is useful for storing scalars in data structures.
    - **Conflict-free replicative data types** (CRDTs) are data structures that allow for automatically resolving conflicts between replicas. They are most useful in peer-to-peer sharing applications, where there is not a central server to coordinate changes. This is why they are used, for example, in Atom's "Teletype" extension.
    - Adding a CRDT as a header or metadata to a data structure will allow programs to detect changes and conflicts in the data structure, but it will _not_ allow the data structure to automatically resolve conflicts.
    - **Operational transformation** (OT) is a methodology for synchronizing changes between strings for collaborative, distributing document editing. There are several algorithms available. OT is apparently easier to implement in a client-server architecture than in a peer-to-peer system.
- Specific References
    - Shapiro[^1] lays out the basics of CRDTS and provides abstract specifications for several types. Most are sets, but there are two or three types that are useful for text editing. For a CRDT to work correctly, either its operations must be commutative or its state must converge.
        - "Commutative" operations can be performed in any order. Adding elements to a Set is one example.
        - A "convergent" state can be achieved by only using idempotent operations to mutate the state. For example, to increment a counter from 3 to 4, setting the value to 4 is idempotent (e.g., `map.set('counter', 4)`). Calling an "increment" function is not, because the result depends on the prior state.
        - A commutative RDT can be converted to a convergent RDT, and vice versa.
    - Logical clocks[^2] are a class of CRDT that can be used to track causality and updates. They can be added to plain data structures to give them conflict detection, and they are used by some CRDTs to detect and resolve conflicts.
        - Dotted version vectors (DVV)
        - Interval tree clocks (ITC)
    - Delta-state CRDTs
    - JSON CRDT
        - This is basically a nested grow-only set.
        - It uses tombstoning to mark deleted items.
        - Concurrent changes to a scalar value in a map results in a multi-value register
        - An operation includes a path to reach the appropriate spot in the hierarchical data structure
- Observations, Ideas, and Conclusions
    - Concurrent changes to a scalar
        - Automatic resolution of the conflict requires the data type to do something like "last write wins"
        - Without automatic resolution, both values have to be saved. The conflict is then resolved either by application logic or user action. **There's just no way around this.**
    - Unless there's a need to peer-to-peer functionality, OT is probably the best approach to collaborative editing for my products
    - In an offline first PWA, think about the local replica in the browser as a peer to the remote database. Obviously, we should be selective about what gets synced, for reasons of security, bandwidth, and browser storage.
    - On the other hand, if each client syncs only to the server (and _not_ to peers), then DVVs are a very good way to handle concurrency. [^3]
        ![DVV diagram](https://github.com/ricardobcl/Dotted-Version-Vectors/raw/master/images/DVV.png)
    - ITCs have good properties in terms of "client explosion" and garbage collection, but I find DVVs easier to understand and reason about at this point.
        - In my use cases, I think we can effect garbage collection by waiting until a document is not being used (not open in any clients, or client is idle for some period of time).
        - Clients that reconnect after GC can just get the new structure
    - DVVs suggest a way to switch between sending operations (or delta structures) and the whole structure
        - We can look at the changeset, and the difference in LUB, to make the decision
    - The JSON CRDT solves the network issues that make CmRDTs difficult by checking for prior state, resending operations, and discarding duplicates. This is easy to track with a Version Vector that acts like a causal history until all events are received.
        - If we have events C1 -- C7, except for C5, then the vector for C would look like `| C4 | null | C6 | C7 |`.
        - When C5 arrives, it is applied to C4. Then C6 and C7 are applied.
        - Finally, the contiguous, applied events are removed from the vector. It is now just `| C7 |`.
    - With idempotent operations, an absent intervening step can be safely omitted. In the above example, there is no need to wait for C5 because its result or effect has no bearing on C7's effect.
    - I _think_ that tracking a path into a nested data structure (as in the JSON CRDT) and an idempotent operation on the specified leaf node is equivalent to an "operative transformation" on the data structure

### Footnotes and references

- [^1] "A Comprehensive Study of Convergent and Commutative Replicated Data Types" ([link][1])([Diigo][2])
- [^2] "Why Logical Clocks are Easy" ([link][3])
- [^3] "Dotted Version Vectors" ([link][4])

[1]: https://hal.inria.fr/file/index/docid/555588/filename/techreport.pdf
[2]: https://www.diigo.com/user/philgs/b/441326920
[3]: https://queue.acm.org/detail.cfm?id=2917756
[4]: https://github.com/ricardobcl/Dotted-Version-Vectors

## To-Do

1. Write conference proposal(s)
2. Design a data structure with basic get/set semantics
3. Write tests and implement getters & setters
4. Write tests and implement conflict detection and resolution
5. I need to tie all of this into a document-store database, such as IndexedDB (in the browser) and Couchbase (on the server).
