import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

beforeEach(()=>{
    document.body.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('existing')
    document.body.appendChild(div)
})