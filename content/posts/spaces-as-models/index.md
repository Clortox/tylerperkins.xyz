---
title: "Spaces as Models, and the shittiest JSON validation algorithm"
date: 2026-04-17T12:00:00-04:00
draft: false
---

Today I would like to talk about a concept I have come to rely on quite a lot,
especially over the past two or three years.

Spaces, or state spaces, are a conceptual tool for understanding the world.
Boiled down, they are the practice of imagining all configurations/solutions
of a problem as points in a space,
and variables to your problem as dimensions in that space.
We from here can assign structures that are useful, such as a topology
{{<sidenote>}}A topology is a structure over a set where we decide what items in that set are in the same "neighborhood". This lets us get concepts about continuity without needing specific distances. You can roughly think about it as defining things that are "close". {{</sidenote>}},
algebra
{{<sidenote>}}A set where we define one or more binary operators over the elements of the set, that follow some set of rules, such as groups, rings, etc{{</sidenote>}},
or morphisms between spaces
{{<sidenote>}}A mapping between two spaces, usually one that preserves some useful property. It can be thought of as a formal way of defining "analogies" between problem spaces.{{</sidenote>}}.
From this we have some way to think about all "solutions" or states that our
problem can be in.

## Example

One of the most famous examples of space modeling is the Mandelbrot set.
The function here we are modeling is

$$
f_c(z) = z^2 + c
$$

where c is a complex number. The graph below is the complex plane, or the entire domain of c.
z is the value being iterated, starting at zero.
The coloring here denotes if the series below "blows up", or
approaches infinity.

$$
|f_c(0)|, |f_c(f_c(0))|, ...
$$

![Mandelbrot set](./mandelbrot.jpg)

Mandelbrot set{{<sidenote>}}By Created by Wolfgang Beyer with the program Ultra Fractal 3. - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=321973{{</sidenote>}}

Here we are modeling the "blow up" behaviour in a space, namely the space of all complex numbers.
Even without the visualization, you might have instinctively reached for a similar kind of spatial thinking.
This is such a natural way of modeling these types of problems because it's so useful.
A large amount of high-school algebra is teaching students how to think about problems in this way.

## Less obvious example

Take a JSON parser. You may write its declaration as something like,

```python
def parseJson(input: str) -> dict:
# implementation
```

This works, but you have to have cases to deal with inputs that are strings, but are not valid JSON. For example, the input "qwertyadslgkjafgjlkj" or any other random string
will not parse, and therefore you will have to throw an exception. How can we avoid this, or at least model this?

We can think of all possible finite strings
{{<sidenote>}}This structure is called a [Free Monoid](https://en.wikipedia.org/wiki/Free_monoid){{</sidenote>}}.
as nodes in a graph, and the connections between the points in our graph
being single edits. So the node representing the string "Hello" would have edges connecting to "Hello!", "Hell", and "hello".
{{<sidenote>}}This is not all nodes "Hello" would connect to, just a few examples to illustrate the point{{</sidenote>}}
This hop makes the "distance" one
{{<sidenote>}}This distance is called [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between two strings{{</sidenote>}}

Knowing this graph represents all possible values `input` can take on above, we know there is some sub-graph
that contains all valid JSON strings (because JSON strings are strings, and therefore must be in the set of all strings).

There is a structure, or test, to determine if a string is part of this sub-graph, namely if it follows the grammar defined in
[RFC 4627](https://www.ietf.org/rfc/rfc4627.txt). From this we could define a new type, `JSONString`, which is a subset of all strings,
that follows this structure.

Why is `JSONString` useful? Didn't we just make a wrapper around string? Yes, but now `parseJson`, whose job
is to parse JSON, does not need to worry about parsing something that is not JSON, namely any old string not in
the space of all JSON strings. Now that responsibility is on `JSONString`, which is the boundary of our system.
This lets us throw errors fast, before we waste time getting to the step of trying to parse `input`.

### On the structure of the graph of all JSON Strings

On implementing `JSONString`, how can we make use of the structure prescribed before? If the sub-graph of
all JSON strings is connected (we can walk from any JSON string to any other JSON string,
by adding, subtracting, or modifying a single character at a time),
then our implementation might be able to start at some known JSON object, like `{}`, and walk to the provided `JSONString`.
If we can walk to it on this graph, then we just proved it's JSON. Failing to find a path however is not proof that the provided
string isn't JSON, just that we couldn't find a path in our search bounds (time, steps, etc).
Of course, this is astronomically impractical. It's far cheaper to just validate the grammar of the string.
Regardless, I think it's a neat property to know about, even if it does not have an immediate application to this problem.

Is the graph of all JSON strings connected? I have a hunch, however I leave exploring that to the reader.

### On morphisms

Notice that in modeling `parseJson` we have defined a morphism between the space of all JSON strings
and a space of python values, such as lists, dicts, strings, numbers, and bools. We can think of `parseJson` as taking the space of JSON strings and mapping
it to a space of python values
{{<sidenote>}}Not the space of all python values, just those that can be represented by JSON.{{</sidenote>}}.

In some problems, this way of thinking can really make more obvious how a method (that often models the morphism)
should be implemented. For example, seeing that a morphism is a projection, collapsing some higher-dimension domain into a lower-dimensional range,
or an embedding, raising some lower-dimensional data into a higher dimension with more structure/detail, the implementation will often naturally follow.

## Theory on why

I have a personal theory on why we are so spatially inclined.
{{<sidenote>}}Based on nothing but my gut, however I'm sure there is research I'm not aware of that may back this.{{</sidenote>}}
We struggle to memorize a list of over ten numbers,
but can remember how to drive to tens to hundreds of places without issue.
This is such a useful property there are techniques dedicated to exploiting this property of our cognition
{{<sidenote>}}See [memory of loci](https://en.wikipedia.org/wiki/Method_of_loci), or generally the concept of "memory castles"{{</sidenote>}}.
Spatial modeling seems to be such an innate feature we are built for, which likely explains why this technique
feels so natural after some practice.

## Conclusion

The two examples I've provided above of viewing problems as spaces are just the beginning.
We've demonstrated this idea on both the continuous and discrete problems. This line of thinking
applies to more than just programmers; anything can be modeled as spaces, from the space
of all possible negotiations in a deal, to the internal state of some classes
of machine learning models (latent spaces), to the space of all routes you can take to drive home.

When in doubt on a problem, try thinking spatially; you may be surprised at what insights you can glean,
even if the best idea it gives you is the shittiest JSON validator ever written.
