import packageJSON from "./package.json" with { type: "json" };
import { writeFileSync } from "fs";

console.log('generating the npm package.json')

/** @type {keyof packageJSON} */
const npmFields = ["name", "version", "type", "description", "homepage",
                   "author", "keywords", "license", "repository"]

const npmPackageJSON = {}

npmFields.forEach(f => npmPackageJSON[f] = packageJSON[f])

npmPackageJSON.types = './index.d.ts'
npmPackageJSON.main = './pointout.js'

const path = './dist/package.json'
writeFileSync(path, JSON.stringify(npmPackageJSON, null, 4), 'utf8');

console.log('Done!')