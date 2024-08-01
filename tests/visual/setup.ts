import { readdirSync, statSync, rmSync } from 'fs';
export default () => {
	const folders = readdirSync('./tests/visual').filter((f) => f.endsWith('.ts-snapshots'));

	folders.forEach((f) => {
		const st = statSync(`./tests/visual/${f}`);
		if (st.isDirectory()) {
			rmSync(`./tests/visual/${f}`, { recursive: true });
		}
	});
};
