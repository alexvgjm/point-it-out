import { describe, expect, it } from "vitest";
import { create } from "../../src/main";

describe("create('round')", ()=>{
    it(`creates a ellipse element inside the SVG`, async () => {
        create('round', {target: '.existing'})
        expect(document.querySelector('.existing ellipse')).toBeDefined()
    })
})