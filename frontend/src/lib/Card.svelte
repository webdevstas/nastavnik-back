<script>
    export let imgSrc;
    export let name;
    export let income;
    export let votes;
</script>

<div class="card">
    <img src={imgSrc} alt={name} class="card-img">
    <h2 class="card-name">{name}</h2>
    <p class="card-income">{income}</p>
    <p class="card-votes">{votes}</p>
    <div class="card-buttons_block">

    </div>
</div>