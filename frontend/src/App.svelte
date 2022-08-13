<script>
  import { onMount } from 'svelte';
  import Card from './lib/Card.svelte';

  let votes = [];
  let cdnUrl = 'https://static.tildacdn.com/tild3463-6462-4732-a562-663166633736/'

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
    <Card imgSrc="{cdnUrl+vote.id+'.jpg'}" name={getFullName(vote)} votes={vote.votes} income={vote.income} />
  {/each}
</main>

<style>
</style>
