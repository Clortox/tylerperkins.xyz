---
title: "Filebrowser Sidecar"
date: 2023-12-18T19:02:43-05:00
draft: false
---

So [last time](https://www.clortox.com/posts/kubernetes-at-home/) I talked about my
home k3s cluster. I still have been non stop tinkering with the thing, and its a blast.
I really enjoy tinkering with it, hosting my own apps for myself and my friends/family,
and just getting to learn more about the high availability hosting stuff.

With that said, there are definitely growing pains compared to just a straight docker setup.
With more moving parts, theres only more stuff to break, and it breaks kinda often.
Part of it is me not knowing the best practices, and trying to pick it up as I go. And
another large part is the older hardware I use. However the greatest pain is storage.

I use [longhorn](https://longhorn.io) for sharded storage in the cluster, each machine
has 2TB of memory to contribute, which for a small database and some config files is
more than enough. However, what do I do when I want to edit some files in a volume directly? 
Or just look at them to satiate my own curiosity?

So my journey began with using [filebrowser](https://filebrowser.org) as a simple sidecar, which worked for quickly testing stuff. But I wanted something a bit more permament, and something that did not default to very insure credentials. It also needed to not rely on some local files for credentials, I didn't want to make a whole pvc volume just for a sqlite database of a few kilobytes.

My response to all of this is a [custom filebrowser extension](https://git.clortox.com/Infrastructure/Filebrowser)! This container
uses environment variables to configure the container every time it is built, so that you don't need any configuration! 
This solves all the issues I had with it prior, and makes it a much more friendly solution for my personal usecase.

I have more instructions at the actual git repository linked above, but I'll include some of the environment variables that can be
configured below incase you are curious.

| Variable          | Description                                                                        | Default         |
|-------------------|------------------------------------------------------------------------------------|-----------------|
| `ADMIN_PASS`      | `admin` user password                                                              | `admin`         |
| `DEFAULT_USERNAME`| The username for the newly created user                                            | `default`       |
| `DEFAULT_PASSWORD`| The password for the newly created user                                            | `default`       |
| `BRANDING_NAME`   | Name shown on the home screen                                                      | `My file storage`|
| `AUTH_METHOD`     | What [auth method](https://filebrowser.org/configuration/authentication-method) should be used? | `json` |
| `AUTH_HEADER`     | What header should be used for [proxy authentication](https://filebrowser.org/configuration/authentication-method#proxy-header)? | `X-My-Header` |
| `PERM_ADMIN`      | Allow user admin privileges                                                        | `false`         |
| `PERM_EXECUTE`    | Allow user to execute commands                                                     | `false`         |
| `PERM_CREATE`     | Allow user to create files and directories                                         | `false`         |
| `PERM_RENAME`     | Allow user to rename files and directories                                         | `false`         |
| `PERM_MODIFY`     | Allow user to modify files                                                         | `false`         |
| `PERM_DELETE`     | Allow user to delete files                                                         | `false`         |
| `PERM_SHARE`      | Allow user to share files and directories                                          | `false`         |
| `PERM_DOWNLOAD`   | Allow user to download files                                                       | `false`         |

If you have any feature requests or issues with it, feel free to open an issue either on [gitea](https://git.clortox.com/Infrastructure/Filebrowser) 
or [github](https://github.com/Clortox/Filebrowser).
