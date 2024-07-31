# Point it out! (pointitout)

A tiny library to mark/point out DOM elements using another absolutely positioned elements or procedurally generated SVGs.

## How to use
```sh
$ npm install pointitout
```

## Roadmap
- v0.1 (Work in progress. Planned for August 1st-2nd, 2024)
    - Common options for all future SVG pure shapes:
        - strokeWidth and strokeColor
        - className: specifies class for result SVG
    - The 'rect' shape with options:
        - padding: same behavior of CSS padding
        - round: using SVG rect round. Not the same behavior of CSS border-radius
    - References control, healthy resize listeners management and cleaning functions.
    - Docs

- v0.2
    - Custom elements:
        - A way to use another elements (like images), not only procedurally generated SVG rects.

## Want to contribute? You should know:
- specs folder
    - unit
        - contains non-visual specs (throws, DOM structure, etc).
        - using vitest (`npm run test:unit`).

    - visual
        - contains visual specs by a custom "visual specification design".
        - there is an expected for each spec. See with `npm run dev` the index page and explore yourself.
        - using playwright with a custom pages comparison function hacking the visual regresion tools (`npm run test:visual`).

- Architecture
    - All new shapes should extend PointItOutShape, have a .spec.ts file in unit & visual and an entry in ShapeOptions type and availableShapes array.
    - Use the 'rect' shape (implemented as PIORectShape class) as example.
    - Create a specification/test folder in pages/expected as the other shapes.