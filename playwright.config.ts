import { devices, type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run dev',
		port: 5173
	},
	testDir: './tests/visual',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	],
	fullyParallel: true,

	globalSetup: './tests/visual/setup.ts'
}

export default config
