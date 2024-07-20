import { readdirSync, statSync, rmSync } from "fs"

export default ()=>{
    const folders = readdirSync('./specs/visual')
                    .filter(f => f.endsWith('.ts-snapshots'))
    
    folders.forEach(f => {
        const st = statSync(`./specs/visual/${f}`)
        if (st.isDirectory()) {
            rmSync(`./specs/visual/${f}`, {recursive: true})
        }
    })
}