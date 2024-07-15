# Point it out! (pointitout.js)

A tiny library to point it out dom elements by procedurally generated and 
absolutely positioned SVG elements

## Want to contribute? You should know:

- specs folder
    - Should contain an .spec.ts file for each core feature
    - Fully oriented to E2E testing with Playwright at the moment
        - If it grows in complexity (it shouldn't), DOM and not visual relevant specifications (i.e "should append an SVG element") can be tested with vitest.
    - Some common asserts.

- No CI at the moment
    - It should be a small project. Pull requests can be managed completely manually.
