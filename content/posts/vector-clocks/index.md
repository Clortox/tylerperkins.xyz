---
title: "Vector Clocks"
date: 2024-01-28T20:22:27-05:00
draft: false
---

Today, in order to both sharpen my understanding, (as well as hopefully to give you something you might not have known), I'd like to talk about vector clocks.
These are something I have thought about quite a bit recently (due to my class at Georgia Tech currently being Distributed Systems), and I thought they were
neat enough to talk about here. So through next few minutes, we will work up the *why* and the required requisite knowledge to work with vector clocks.

#### Logical Clocks

So why do we need any kind of special clock? Why won't a normal clock do?
Big surprise, but time is hard to keep. [Like really hard](https://en.wikipedia.org/wiki/History_of_timekeeping_devices).
Therefore, in a large distributed system (of possibly tens, or hundreds of machines), we really don't want to try and keep all clocks in sync. 
Given we are talking about computer systems, where events happen on the scale of milliseconds down to microseconds or less, makes precision especially important.
So lets just abandon the concept of real time all together. What is we instead use *logical time*?

*Logical Time* is a mechanism for determining the ordering of events, without the use of a real clock. So think of it more as a timer.
For example, event 1 happens *before* event 2. Simple enough, right?

We can be more formal and define a *Logical Clock* as some function, lets call it \(C()\), that creates a *time stamp* that preserves this order.
So for a set of events \(e1\) and \(e2\), where \(e1\) happened *before* \(e2\),

$$
e_1 \rightarrow e_2 \implies C(e_1) < C(e_2)
$$

(In case you haven't seem them before, \(\rightarrow\) encapsulates that \(e_1\) happens first, then \(e_2\), while \(\implies\) means implies).

So our *Logical Clock* is a kind of function. A simple function that could do this, in java for example, would be,

```java
public class LogicalClock {
    private static final int time = 0;

    @Data
    public static final TimestampEvent {
        Event e;
        Integer timestamp;
    }

    public synchronized static TimestampEvent c(Event e){
        return new TimestamptEvent(e, time++);
    }
}
```

This on its own is a simple implementation of our conceptual *Logical Clock* from above. Neat!

#### Consistency

Next, lets talk about an important property of *Logical Time*, called *consistency*. Basically, beyond the single process trivial case, like above,
we can run into issues if every node in our distributed application is keeping its own time. If they all did, we would be no better off than if
we just used real clocks instead! Therefore, we need to define a sense of *consistency* to our *time stamps*.

A *Logical Clock* is said to be *consistent* if,

$$
e_1 \rightarrow e_2 \implies C(e_1) < C(e_2)
$$

This is exactly what we stated in the earlier section! This is because logical clocks are really only useful if they are at least *consistent*.

> To convince yourself of this, think about the following clock function that associates each unique event with a *time stamp*, that is not *consistent*
> ```java
> @Data
> public static final Time {
>   Event e;
>   Date d;
> }
> 
> public synchronized static TimestampEvent c(Event e) {
>     return new TimestampEvent(e, new Time(e, new Date()).hashCode());
> }
> ```
> Despite each event in time generating a unique time stamp, the new time stamp is not all that useful, as they cannot be ordered!

A *Logical Clock* that is *strongly consistent* is one where we can determine causality just from the timestamps alone,

$$
C(e_1) < C(e_2) \implies e_1 \rightarrow e_2
$$

A synchronous clock like the one we defined above is also *strongly consistent*, however this attribute is much harder to maintain in a distributed context.

#### Lamport Clocks

A *Lamport Clock* is a type of *Logical Clock*, that guarantees *consistency*, but not *strong consistency*. We can pretty much use our example from above, where
we make each one of our timestamps a simple increment for the case of a single process/node generating events. Things get slightly more complex when we introduce
other processes.

If some process \(p_i\) receives a message from \(p_j\), and it has some time stamp, called \(t\), we set the time stamp of \(p_j\) to be,

$$
\max(\text{time at} \ p_j, t + 1)
$$

This *guarantees* that the time at \(p_j\) will be greater, ensuring that the timestamp both at \(p_j\) is always larger, which means all things that happened before
receiving this message (at least on the scale of this node), have smaller timestamps. Take a moment to convince yourself of this.

This is an interesting concept, because by only adding some ever growing integer, we can determine some order to our events. This is going to grow into something far
more useful in our next section.

#### Vector Clocks

Finally, on to what we were here for. A *Vector Clock* is pretty much just a vector of the *Lamport Clocks* at all the other nodes, or at least the 
last known state of them. So to start, let every node keep a vector of size *n* in memory, where *n* is the number of processes/machines/nodes in the distributed system.
Each of these vectors should be zero initialized. To make our lives easier, call this vector *v*.

So each node, *i* is the index of the node, will keep a *Lamport Clock* in index *v[i]*. And for some node *j*, its *Lamport Clock* will be *v[j]*. Now, what do we do
when we have an event?

If the event, called *e*, is on *i*, then we just increment *v[i]*, just like a normal *Lamport Clock*. If, however, the event is the node *j* getting a message from
*i*, then we would ensure that all messages contain the senders' vector clock. Lets call the vector clock thats coming in *vi* (because its the vector clock of node *i*).

Node *j* would iterate over both vectors, and update its own vector to be the max of the two values in each index in the vector. This ensures that the end vector at
*j*, *vj*, is the max of the two vectors. Next, we would run *vj[j] += 1*, which is us just incrementing the clock for the receive event that we are experiencing currently.
Finally, we can now process our message, and do whatever business logic that we do.

#### Why do we care?

We would want to keep a *Vector Clock*, because this lets us know the general state of the system. For example, if a node thinks that it should hold on to some data, because
some node may request it, but it knows that data will not be needed after event 100 say, it can just wait till all *Lamport Clocks* in the vector reach at least 100, then
discard that information, because it knows that all nodes have used that information. This is basically just distributed garbage collection.


#### Conclusion

Hope this was somewhat informative, and gave you a general idea of what a vector clock is, and why you might want one. They may not come up all the time, but in your 
career, just may need one to keep your applications and processes in sync.
