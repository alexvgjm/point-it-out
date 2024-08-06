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

  - Common options for all future SVG pure pointers:
    - container: where to append the pointer. Default document.body
    - className: specifies class for result SVG
    - zIndex: the z-index css property
    - and more (see docs)
  - The first 'rect' pointer with options:
    - strokeWidth and strokeColor
    - padding: same behavior of CSS padding
    - round: using SVG rect round. Not the same behavior of CSS border-radius
    - and more (see docs)
  - References control
  - Pointer methods to update and destroy
  - Resizing autoupdate (and an option to disable)
  - and more (see the docs!!!!)

- v0.2 (Work in progress)

  - Highlight target:
    - A way to dark all except target (does this technique have any well-known name in UI/UX?)

- v0.3
  - Custom elements:
    - A way to use another elements (like images), not only procedurally generated SVG rects.
