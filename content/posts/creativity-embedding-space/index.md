---
title: "Creativity in Embedding Spaces"
date: 2025-01-12T03:24:13Z
draft: false
---

Connecting back to [last week](../thought-embedding-space/index.md) about modeling thought as an embedding space; today I would
like to talk about how this analogy extends to creativity.

Creativity is generally the idea to come up with novel ideas. Novel ideas are the product of our experience, you can't think of something you have never seen before, 
generally you have to at least see part of it. I believe why many of our creations mimic what we have seen in nature. Nature is our reference, and we are just remixing
what nature has given us, hence being creative.

So, if creativity is the remixing of thoughts and ideas, and ideas are vectors, how would we model that? Usually a creative idea comes from a group of similar ideas, therefore creativity
can be represented as a nearest vector search algorithm.

So what we do when we are being creative is walking through several nearby vectors to our seed (current state of mind), traveling in some direction in the space that corresponds to 
the type of reasoning we are wanting to do, and taking combinations of the current state and the vectors we find, till we find the new idea we want in the vector space.

This of course assumes that reasoning itself is a linear operation. Reasoning through a problem appears (at least for me) to be an associative operation.
Applying some thought before or after reasoning through it can *sometimes* yield the same result for me, however often it does not.
This is a counter argument to this modeling as vectors, because reasoning may not always be a linear operation in the thought space.

