<script>
    import {onMount} from 'svelte';
    import Card from './lib/Card.svelte';
    import Modal from "./lib/Modal.svelte";
    import {getFullNameGaveCase} from "./utils/helpers.js";
    import Alert from "./lib/Alert.svelte";

    const apiBaseUrl = 'http://localhost:3000';
    const sitekey = 'ofrzKzQhnlCDvNgcEXpBYZjEQBJJC1jiLZh5Ykeu';

    let votes = [];
    let modalOpen = false;
    let captchaWidgetId;
    let submitBtnVisible = false;
    let desision;
    let formVisible = false;
    let alertVisible = false;
    let captchaResult = false;

    onMount(async () => {
        await fetchData();
    });

    async function fetchData() {
        const res = await fetch(apiBaseUrl + '/votes');
        votes = await res.json();
    }

    function openModal() {
        modalOpen = true;
    }

    function closeModal() {
        modalOpen = false;
        submitBtnVisible = false;
        alertVisible = false;
        formVisible = false;
    }

    function showForm() {
        formVisible = true;
    }

    function hideForm() {
        formVisible = false;
    }

    function renderCaptcha() {
        if (window.smartCaptcha) {
            const container = document.getElementById('captcha-container');
            captchaWidgetId = window.smartCaptcha.render(container, {
                sitekey,
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
            showForm();
            resolve();
        });
        prom.then(renderCaptcha);
        desision = event.detail;
    }

    async function processDesition() {
        const token = document.forms[0]['smart-token'].value;
        const url = apiBaseUrl + '/votes';
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({id: desision.id, token}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            alertVisible = true;
            return;
        }
        hideForm();
        await fetchData();
        captchaResult = true
        alertVisible = true;
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
            {#if formVisible}
                <form onsubmit="event.preventDefault()">
                    <div
                            id="captcha-container"
                            class="smart-captcha"
                    ></div>
                    {#if submitBtnVisible}
                        <button class="vote-btn" on:click={processDesition}>Проголосовать
                            за {getFullNameGaveCase(desision)}</button>
                    {/if}
                </form>
            {/if}
            {#if alertVisible}
                {#if captchaResult}
                    <Alert type="success">
                        Ваш голос принят
                    </Alert>
                {:else}
                    <Alert type="fail">
                        Ошибка, попробуйте снова
                    </Alert>
                {/if}
            {/if}
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
