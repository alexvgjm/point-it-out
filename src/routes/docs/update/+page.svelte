<script lang="ts">
  import Code from '$comps/Code.svelte'
  import InfoBox from '$comps/InfoBox.svelte'
  import { PUBLIC_DOCS_ROOT } from '$env/static/public'
</script>

<section class="doc-section">
  <h1 id="update-all">Update all pointers</h1>

  <p>
    If the layout of your web or app changes, absolutely positioned pointers might keep the original
    first calculated position and not follow target elements to their new position. Make sure to
    call this function afterward to recalculate pointers positions over targets.
  </p>

  <InfoBox title="">
    Pointers are stored in a Set with no guaranteed order. If you need to update pointers in a
    specific order, store its references and update manually via its update method.
  </InfoBox>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
    import {'{ update }'} from 'pointitout' 

update() // Update all created pointers, recalculating its position.
    </Code>

  <section class="doc-section">
    <h2>Why is there no automatic update?</h2>
    <p>
      Since the factors that could cause target position changes cannot be known, the simplest
      automatic update could involve continuous queries or repeated invocations of excessive and
      ineffective updates. It is better that this library does not assume such responsibility hiding
      such cost.
    </p>

    <p>Having said that, there is indeed a automatic update when resizing.</p>

    <h3>Automatic update on window resize</h3>
    <p>
      Window resizing is a well-known frequent scenario. When this happens, the update function is
      called.
    </p>

    <p>
      But if you need more control or are updating the pointers another way, or for some other
      reason you need to disable this behavior, set the <a href={`${PUBLIC_DOCS_ROOT}/config`}
        >updateOnResize option</a
      > to false.
    </p>
  </section>
</section>

<section class="doc-section">
  <h1 id="update-specific-pointer">Update a specific pointer</h1>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
import {'{ create }'} from 'pointitout' 

const pointer = create('rect', {"{ target: '#target-element-id' }"})

// ...
// Later, after some change in the target's position
pointer.update() // Update the pointer
    </Code>
</section>
