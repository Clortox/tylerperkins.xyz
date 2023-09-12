---
title: "First Post"
date: 2023-09-11T21:30:41-04:00
draft: false 
---

# First Post

This is my first post from the rewrite! I decided to rewrite my website in [Hugo](https://gohugo.io) this time instead of PHP. The real innovation here is the new tech stack underpinning the process of hosting this thing.

So previously, I had no clue about "real" server hosting (like what actual companies do). But now that I have some experience under my belt in both my professional environment and in my hobby hosting, I now know a bit more about how to host in a more durable manner. Over engineering? Probably. But that's where the fun lies!

## New Tech Stack

The new tech stack this time around is a replicated S3 bucket (hosted using [Minio](https://min.io)) that is hosted in two separate sites, and synced together every 10 mins is hosting the content for this website. Then an nginx reverse proxy is doing some basic security and routing rules, then forwarding it to you as you see it currently. Pretty sweet!

The real win for me comes from a great simplification of the deployment process, though. With hugo, I can build the static website, then with my self hosted CI/CD runner ([Drone](https://drone.io), my self hosted instance is [here](https://drone.clortox.com)) I can auto build the site then deploy it, and only change the state in the bucket! How awesome is that!

![](https://s3.clortox.com/static-assets/img/mermaid-diagram-2023-09-11-214406.png)

Before I had this nasty system of updating files in the git repo (which required me to open the git repo anytime I wanted to make any changes to the website), then pushing it then running a upload script. I thought it was cool at the time (and was proud of it), but now this has made me much more enthusiastic about writing stuff for the site. With it all tying into obsidian (I'll try to write about my obsidian workflow stuff soon) it makes it super easy to write a post, making me more likely to do it.

That's about all the nitty gritty there is regarding the sites hosting. Everything as usual is open source and free for you to look at if you want. Feel free to [take a look](https://git.clortox.com/Infrastructure/Site-static).

