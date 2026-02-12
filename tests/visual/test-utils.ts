import { expect, type Page, type TestInfo } from '@playwright/test'
import { createHash } from 'crypto'

const generated = new Set<string>()

type TestPagesParams = {
  expectedURL: string
  testingURL: string
  beforeExpectedScreenshot?: () => Promise<unknown>
  beforeAction?: () => Promise<unknown>
  beforeActionScreenshot?: () => Promise<unknown>
  action?: () => Promise<unknown>
  pwPage: Page
  pwTestInfo: TestInfo
  not?: boolean
}

export async function visualComparisonBetweenPages(params: TestPagesParams) {
  const page = params.pwPage

  // Generate deterministic ID based on test path and URLs
  const testPath = params.pwTestInfo.titlePath.join(' › ')
  const uniqueString = `${testPath}::${params.expectedURL}::${params.testingURL}`
  const hash = createHash('sha256').update(uniqueString).digest('hex')
  let id = hash.substring(0, 12)

  let counter = 0
  while (generated.has(id)) {
    // In case of collision, append counter
    id = hash.substring(0, 10) + (counter++).toString(16).padStart(2, '0')
  }
  generated.add(id)

  const dir = params.pwTestInfo.snapshotDir
  const projectName = params.pwTestInfo.project.name
  const suffix = params.pwTestInfo.snapshotSuffix

  await page.goto(params.expectedURL, { waitUntil: 'networkidle' })
  if (params.beforeExpectedScreenshot) {
    await params.beforeExpectedScreenshot()
  }

  await page.screenshot({
    path: `${dir}/${id}-${projectName}-${suffix}.png`,
    scale: 'css'
  })

  await page.goto(params.testingURL, { waitUntil: 'networkidle' })

  if (params.beforeAction) {
    await params.beforeAction()
  }
  if (params.action) {
    await params.action()
  }
  if (params.beforeActionScreenshot) {
    await params.beforeActionScreenshot()
  }

  if (params.not) {
    await expect(page).not.toHaveScreenshot([`${id}.png`], { threshold: 0.1 })
  } else {
    await expect(page).toHaveScreenshot([`${id}.png`], { threshold: 0.1 })
  }
}
