# Typing for bettercap javascript(js) files

## Introduction

If you've ever used bettercap, you'd know how annoying it is to look around in the incomplete Bettercap docs or browse around the source code of Bettercap to figure out what variables and functions are in req and res, global functions, e.t.c.

I found this annoying so I read the source code (for you) and consolidated them into a Typescript declare file that gives a lot of these types and globals. Just put this in your working directory and use it's types.

## How to use this

Just download the `httpProxy.d.ts` file, place it in the same directory as your js file, then, before your `onRequest` and `onResponse` functions, add this JSDoc comment:

```javascript
/**
 *
 * @param {import("./httpProxy").JSRequest} req
 * @param {import("./httpProxy").JSResponse} res
 */
```

and you should have types for those two variables. Change the import path or variable names as neccessary.

Enjoy!
