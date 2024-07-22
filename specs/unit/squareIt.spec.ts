import { describe, expect, it } from "vitest";
import { create } from "../../src/main";

describe("create('square')", ()=>{
    it(`creates a rect element inside the SVG`, async () => {
        create('square', {target: '.existing'})
        expect(document.querySelector('.existing rect')).toBeDefined()
    })
})