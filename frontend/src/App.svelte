<script>
  import { onMount } from 'svelte';
  import Card from './lib/Card.svelte';

  let votes = [];

  onMount(async () => {
    const res = await fetch('https://api.nastavnik5.ru/votes')
    votes = await res.json()
  });

  function getFullName(person) {
    return person.firstName + ' ' + person.lastName
  }
</script>

<main>
  {#each votes as vote}
    <Card imgSrc="{vote.imgSrc}" name={getFullName(vote)} votes={vote.votes} income={vote.income} />
  {/each}
</main>

<style>
</style>
