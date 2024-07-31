import packageJSON from "./package.json" with { type: "json" };
import { writeFileSync, copyFileSync } from "fs";

console.log('generating the npm package.json')

/** @type {keyof packageJSON} */
const npmFields = ["name", "version", "type", "description", "homepage",
                   "author", "keywords", "license", "repository"]

const npmPackageJSON = {}

npmFields.forEach(f => npmPackageJSON[f] = packageJSON[f])

npmPackageJSON.types = './index.d.ts'
npmPackageJSON.main = './pointitout.js'

const path = './dist/package.json'
writeFileSync(path, JSON.stringify(npmPackageJSON, null, 4), 'utf8');


console.log('copying readme.md')
copyFileSync('./readme.md', './dist/readme.md')


console.log('Done!')