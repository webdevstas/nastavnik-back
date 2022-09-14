<script>
    import {onMount} from 'svelte';
    import Card from './lib/Card.svelte';
    import Modal from "./lib/Modal.svelte";

    let votes = [];
    let modalOpen = false;
    let captchaWidget;

    onMount(async () => {
        const res = await fetch('http://localhost:3000/votes');
        votes = await res.json();
    });

    function getFullName(person) {
        return person.firstName + ' ' + person.lastName
    }

    function openModal() {
        const prom = new Promise((resolve, reject) => {
            modalOpen = true;
            resolve();
        });
        prom.then(renderCaptcha);
    }

    function closeModal() {
        modalOpen = false;
    }

    function renderCaptcha() {
        if (window.smartCaptcha) {
            const container = document.getElementById('captcha-container');
            captchaWidget = window.smartCaptcha.render(container, {
                sitekey: '',
                hl: 'ru',
            });
        }
    }
</script>

<main>
    <div class="cards-container">
        {#each votes as vote}
            <Card imgSrc="{vote.imgSrc}" name={getFullName(vote)} votes={vote.votes} income={vote.income}
                  on:open-modal={openModal}/>
        {/each}
    </div>
    {#if modalOpen}
        <Modal on:close-modal={closeModal}>
            <form action="">
                <div
                        id="captcha-container"
                        class="smart-captcha"
                ></div>
            </form>
        </Modal>
    {/if}
</main>

<style>
    .cards-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
</style>
