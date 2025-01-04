---
title: "Modeling Thought"
date: 2025-01-04T23:24:13Z
draft: false
---

I have played with the concept of how to model my own thought for a long time.
Being that thought is a pretty complex yet predictable process, I have thought about
what analogies or models I can use to better understand my own way of thinking, and
why I do certain things.

My working model I have developed thus far (based on nothing but vibes) is
linear algebra based. I believe this comes from both my CS/Math background causing
a bias, as well as a bias from learning about how transformers model internal state.

So in this quick writeup, I would like to try and give a quick introduction to
the concept I have, and over time I will develop it with some of the derivations
I have found that come as a consequence.

#### Defining Thought

To begin, let me define what I mean when I say a *thought* or an *idea*.

> Thought
>
> Any single concept or abstract idea at a single point in time that can be 
> held inside of one's mind.
> 
> Also see *Atomic Thoughts* as used in zettlekastens

Cool. What does this actually mean?

Your mind is almost always experiencing a thought, 
or sometimes it may feel as though there are several thoughts at once.
You can think of this as a function of time and some other external stimuli. 
Lets call
this function \(M\). Let \(t\) be time and \(e\) be some other 
state ocurring at this time.

$$
M(t, e)
$$

When I say a *thought* or *idea* I mean a single output from \(M\).

#### Modeling an Individual Thought

A single thought is a very complex thing! It has some general idea of "closeness"
to other thoughts, as well as different "directions" that it can move in. These
directions are things like how much of a certain adjative a thought containts, 
for example sentiment or much more complex adjatives like how much a thought
relates to World War 2. These we can think of as "dimensions".

This is basically how embedding spaces work in language modeling.
They are modeled as vectors, and I feel that this is a very natural analog to apply
to thoughts as well. 

We leave the paramaters of these vectors pretty abstract for now. They are \(d\)
dimenions (presumably \(d\) is rather large) and each thought vector \(\boldsymbol{T}\) is created as a result of some paramaters to \(M\).

$$
\forall t \ \forall e \ \exists \ \boldsymbol{T} \rightarrow \boldsymbol{T} = M(t, e)
$$

Also note that  \(\boldsymbol{e}\) is itself a vector.

Thoughts can be checked how similar they are by checking the dot product, which
encodes the "closeness" we percieve in thoughts. Thoughts An amount of suprise
can be found by how small the dot product is between the current thought,
and the next thought.

Next, we will investigate how this model impacts modeling creativity.

