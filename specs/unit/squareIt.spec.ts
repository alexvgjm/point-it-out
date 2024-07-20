import { describe, expect, it } from "vitest";
import { squareIt } from "../../src/core";

describe('squareIt()', ()=>{
    it(`creates a rect element inside the SVG`, async () => {
        squareIt({target: '.existing'})
        expect(document.querySelector('.existing rect')).toBeDefined()
    })
})