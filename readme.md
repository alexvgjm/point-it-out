# Point it out! (pointitout.js)

A tiny library to point it out DOM elements by procedurally generated and 
absolutely positioned SVG elements.

## Want to contribute? You should know:
- specs folder
    - unit
        - contains not visual specs (throws, DOM structure, etc).
        - using vitest (`npm run test`).
    - visual
        - contains visual specs by a custom "visual specification design".
        - there is a expected for each spec. See with `npm run dev` the index page and explore yourself.
        - using playwright with a custom pages comparison function hacking the visual regresion tools (`npm run test:visual`).

- architecture
    - All new shapes should extend PointItOutShape, have a .spec.ts file in unit & visual and a name added to ShapeName type and availableShapes array.
    - Use the 'rect' shape (implemented in PIORectShape class) as example.
    - Create a specification/test folder in pages/expected as the other shapes.


## TODO
- No releases and npm package at the moment
    - Coming soon!

- No CI at the moment.
    - A CI/CD pipeline to generate and publish the npm package would be appreciated.
