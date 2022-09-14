<script>
    import {onMount} from 'svelte';
    import Card from './lib/Card.svelte';
    import Modal from "./lib/Modal.svelte";
    import {getFullNameGaveCase} from "./utils/helpers.js";

    let votes = [];
    let modalOpen = false;
    let captchaWidgetId;
    let submitBtnVisible = false;
    let desision;

    onMount(async () => {
        const res = await fetch('http://localhost:3000/votes');
        votes = await res.json();
    });

    function openModal() {
        modalOpen = true;
    }

    function closeModal() {
        modalOpen = false;
        submitBtnVisible = false;
    }

    function renderCaptcha() {
        if (window.smartCaptcha) {
            const container = document.getElementById('captcha-container');
            captchaWidgetId = window.smartCaptcha.render(container, {
                sitekey: 'ofrzKzQhnlCDvNgcEXpBYZjEQBJJC1jiLZh5Ykeu',
                hl: 'ru',
            });
        }

        if (window.smartCaptcha) {
            window.smartCaptcha.subscribe(captchaWidgetId, 'success', showSubmitBtn);
        }
    }

    function showSubmitBtn() {
        submitBtnVisible = true;
    }

    function makeVote(event) {
        const prom = new Promise((resolve) => {
            openModal();
            resolve();
        });
        prom.then(renderCaptcha);
        desision = event.detail;
    }
</script>

<main>
    <div class="cards-container">
        {#each votes as vote}
            <Card data={vote}
                  on:make-vote={makeVote}/>
        {/each}
    </div>
    {#if modalOpen}
        <Modal on:close-modal={closeModal}>
            <form action="">
                <div
                        id="captcha-container"
                        class="smart-captcha"
                ></div>
                {#if submitBtnVisible}
                    <button class="vote-btn">Проголосовать за {getFullNameGaveCase(desision)}</button>
                {/if}
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
    .vote-btn {
        margin-top: 15px;
    }
</style>
