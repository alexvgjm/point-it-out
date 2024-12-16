<script lang="ts">
  import { browser } from '$app/environment'
  import type { PageData } from './$types'

  export let data: PageData

  /**
   * THIS IS THE TEST SCENARIO WHERE TO EXECUTE THE create('arrow', {...})
   * WITH THE RESPONSIVE OPTION. DO NOT ALTER IT.
   */

  /**
   * Call this for some fun during manual testing :)
   */
  // function scaleTests(animate: 'pulse' | false = false) { // eslint-disable @typescript-eslint/no-unused-vars
  //   setTimeout(() => {
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       fillColor: 'yellow',
  //       container: '.limited-container',
  //       fromAngle: 135,
  //       responsive: 'scale',
  //       distance: 40,
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fromAngle: 0,
  //       fillColor: '#0c0',
  //       responsive: 'scale',
  //       distance: 40,
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fillColor: 'red',
  //       fromAngle: 45,
  //       responsive: 'scale',
  //       distance: 40,
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fromAngle: 180,
  //       responsive: 'scale',
  //       distance: 40,
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fillColor: '#acf',
  //       fromAngle: 315,
  //       responsive: 'scale',
  //       distance: 40,
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fillColor: '#f4f',
  //       fromAngle: 225,
  //       responsive: 'scale',
  //       distance: 40,
  //       animate
  //     })
  //   }, 500)
  // }

  // // /**
  // //  * Call this for some fun during manual testing :)
  // //  */
  // function rotationTests(animate: 'pulse' | false = false) { // eslint-disable @typescript-eslint/no-unused-vars
  //   setTimeout(() => {
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       fillColor: 'yellow',
  //       container: '.limited-container',
  //       fromAngle: 135,
  //       distance: 50,
  //       responsive: 'rotate',
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fillColor: 'limegreen',
  //       fromAngle: 0,
  //       distance: 40,
  //       responsive: 'rotate',
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fillColor: 'red',
  //       fromAngle: 45,
  //       distance: 30,
  //       responsive: 'rotate',
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fromAngle: 180,
  //       distance: 20,
  //       responsive: 'rotate',
  //       zIndex: 100,
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fillColor: '#acf',
  //       fromAngle: 315,
  //       distance: 10,
  //       responsive: 'rotate',
  //       zIndex: 100,
  //       animate
  //     })
  //     create('arrow', {
  //       target: `.test-box`,
  //       className: 'test-arrow',
  //       container: '.limited-container',
  //       fillColor: '#f4f',
  //       fromAngle: 225,
  //       responsive: 'rotate',
  //       zIndex: 100,
  //       animate
  //     })
  //   }, 500)
  // }

  if (browser) {
    // scaleTests('pulse')
    //rotationTests('pulse')
  }
</script>

<div class="limited-container" data-testid="limited-container">
  <div
    class="test-box test-box--{data.w}x{data.h} test-box--expected"
    style="width: {data.w}px; height: {data.h}px; min-width: {data.w}px; min-height: {data.h}px"
  ></div>
</div>

<style>
  .test-box {
    position: relative;
    overflow-x: visible;
    z-index: -1;
  }

  .limited-container {
    max-width: 250px;
    width: 100%;
    border-left: 1px solid var(--color-third);
    border-right: 1px solid var(--color-third);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: absolute;
    top: 0;
    overflow-x: visible;
  }
</style>
