<script>
    import {createEventDispatcher} from "svelte";
    import {getFullName} from "../utils/helpers.js";

    export let data;
    const dispatch = createEventDispatcher();

    function makeVote() {
        dispatch('make-vote', data)
    }
</script>

<div class="card">
    <div class="card-img" style="background-image: url({data.imgSrc})"></div>
    <h2 class="card-name">{getFullName(data)}</h2>
    <p class="card-income">Доход: {data.income} руб.</p>
    <p class="card-votes">Количество голосов: {data.votesNumber}</p>
    <div class="card-buttons_block">
        <button on:click={makeVote}>Проголосовать</button>
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
        background-position: center;
    }
</style>