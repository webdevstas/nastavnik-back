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
    <div class="card-img" style="background-image: url({imgSrc})"></div>
    <h2 class="card-name">{name}</h2>
    <p class="card-income">{income}</p>
    <p class="card-votes">{votes}</p>
    <div class="card-buttons_block">
        <button on:click={openModal}>Открыть модалку</button>
    </div>
</div>

<style>
    .card {
        -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    .card-img {
        height: 300px;
        background-size: cover;
        border-radius: 5px;
    }
</style>