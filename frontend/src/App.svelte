<script>
    import {onMount} from 'svelte';
    import Card from './lib/Card.svelte';
    import Modal from "./lib/Modal.svelte";

    let votes = [];
    let modalOpen = false;

    onMount(async () => {
        const res = await fetch('http://localhost:3000/votes');
        votes = await res.json();
    });

    function getFullName(person) {
        return person.firstName + ' ' + person.lastName
    }

    function openModal() {
        modalOpen = true;
    }

    function closeModal() {
        modalOpen = false;
    }
</script>

<main>
    {#each votes as vote}
        <Card imgSrc="{vote.imgSrc}" name={getFullName(vote)} votes={vote.votes} income={vote.income}
              on:open-modal={openModal}/>
    {/each}

    {#if modalOpen}
        <Modal on:close-modal={closeModal}>
            <div
                    id="captcha-container"
                    class="smart-captcha"
                    data-sitekey="ofrzKzQhnlCDvNgcEXpBYZjEQBJJC1jiLZh5Ykeu"
            ></div>
        </Modal>
    {/if}
</main>

<style>
</style>
