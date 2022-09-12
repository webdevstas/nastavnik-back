<script>
    import {createEventDispatcher} from "svelte";

    export let imgSrc;
    export let name;
    export let income;
    export let votes;

    const dispatch = createEventDispatcher();

    function openModal() {
        dispatch('open-modal')
    }
</script>

<div class="card">
    <img src={imgSrc} alt={name} class="card-img">
    <h2 class="card-name">{name}</h2>
    <p class="card-income">{income}</p>
    <p class="card-votes">{votes}</p>
    <div class="card-buttons_block">
        <button on:click={openModal}>Открыть модалку</button>
    </div>
</div>
