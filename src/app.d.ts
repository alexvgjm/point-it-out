// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  /**
   * FIXME: static adapter requires $env/static and not $env/dynamic. Need to
   * investigate how to add version programmatically without .env file.
   */
  type ForcedEnv = {
    PUBLIC_VERSION: string
    PUBLIC_DOCS_ROOT: string
  }
}

export {}
