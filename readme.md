# Point it out! (pointitout)

A tiny, tree-shakeable, zero-dependencies JavaScript library to mark/point out
DOM elements using absolutely positioned elements or procedurally generated SVGs.

NOTE: in a very early stage of development

## API documentation

You can read the docs at https://alexvgjm.github.io/point-it-out-docs

```sh
$ npm install pointitout
```

## Basic usage

### Rects

```ts
import { create } from 'pointitout'

create('rect', { target: '.a-css-selector' })
```

### Arrows

```ts
import { create } from 'pointitout'

create('arrow', { target: '.a-css-selector' })
```

There are multiple options for each pointer type. Read the docs.
