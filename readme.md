# Point it out! (pointitout)

A tiny library to mark/point out DOM elements using another absolutely positioned elements or procedurally generated SVGs.

NOTE: in a very early stage of development

Read the full docs at https://alexvgjm.github.io/point-it-out-docs/

```sh
$ npm install pointitout
```

## Basic usage

```ts
import { create } from 'pointitout'

// only rect shape at the moment
create('rect', { target: '.a-css-selector' })
```

## Roadmap

- v0.1

  - Common options for all future SVG pure shapes:
    - strokeWidth and strokeColor
    - className: specifies class for result SVG
  - The 'rect' shape with options:
    - padding: same behavior of CSS padding
    - round: using SVG rect round. Not the same behavior of CSS border-radius
  - References control, healthy resize listeners management and cleaning functions.

- v0.2 (Work in progress)
  - Docs
  - Custom elements:
    - A way to use another elements (like images), not only procedurally generated SVG rects.
