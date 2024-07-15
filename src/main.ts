import './style.css'
import * as pio from "./core.ts";

Object.entries(pio).forEach(([fnName, fn]) => {
  (window as any)[fnName] = fn
})