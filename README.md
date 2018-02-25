# Sync Sandbox

A place for me to play with different approaches to synchronizing data over unreliable network connections.

- **Alpha** &mdash; my first foray into "conflict-free replicative data types" (CRDTs)

## Notes after a weekend of burying myself in academic literature

(Created: 2018-02-25)

- Introduction
    - **Basic data types** &mdash; Let's lay out some common terminology before getting into a more detailed discussion.
        - **Scalar** data types can only hold one value at a time (for example, integers and booleans). A string can be considered a scalar if merging concurrent edits renders the string meaningless or nonsense (for example) concurrent edits to an email address would mangle the address, making it invalid and meaningless).
        - **Data structures** hold multiple values, such as Map, List, and Set.
        - A **register** is a data structure that holds one scalar. This is useful for storing scalars in data structures.
    - **Conflict-free replicative data types** (CRDTs) are data structures that allow for automatically resolving conflicts between replicas. They are most useful in peer-to-peer sharing applications, where there is not a central server to coordinate changes. This is why they are used, for example, in Atom's "Teletype" extension.
    - Adding a CRDT as a header or metadata to a data structure will allow programs to detect changes and conflicts in the data structure, but it will _not_ allow the data structure to automatically resolve conflicts.
    - **Operational traansformation** (OT) is a methodology for synchonizing changes between strings for collaborative, dsitributing document editing. There are several algorithms available. OT is apparently easier to implement in a client-server architecture than in a peer-to-peer system.
- Specific References
    - Shapiro [^1] lays out the basics of CRDTS and 


### Footnotes and references
