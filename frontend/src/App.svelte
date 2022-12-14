<script>
    import {onMount} from 'svelte';
    import Card from './lib/Card.svelte';
    import Modal from "./lib/Modal.svelte";
    import {getFullNameGaveCase} from "./utils/helpers.js";
    import Alert from "./lib/Alert.svelte";
    import {config} from '../config'

    const sitekey = config.clientKey;
    const apiBaseUrl = config.apiUrl;

    let votes = [];
    let modalOpen = false;
    let captchaWidgetId;
    let submitBtnVisible = false;
    let desision;
    let formVisible = false;
    let alertVisible = false;
    let captchaResult = false;
    let captchaError;
    let isModalTransform = true;

    onMount(async () => {
        await fetchData();
    });

    async function fetchData() {
        const res = await fetch(config.apiUrl + '/votes');
        votes = await res.json();
    }

    function openModal() {
        addTransform();
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
        const captcha = window.smartCaptcha;
        if (captcha) {
            const container = document.getElementById('captcha-container');
            captchaWidgetId = window.smartCaptcha.render(container, {
                sitekey,
                hl: 'ru',
            });
            captcha.subscribe(captchaWidgetId, 'success', showSubmitBtn);
            captcha.subscribe(captchaWidgetId, 'challenge-visible', deleteTransform);
            captcha.subscribe(captchaWidgetId, 'challenge-hidden', addTransform);
        }
    }

    function deleteTransform() {
        isModalTransform = false;
    }

    function addTransform() {
        isModalTransform = true;
    }

    function showSubmitBtn() {
        addTransform();
        submitBtnVisible = true;
    }

    function makeVote(event) {
        if (!checkCookie()) {
            openModal();
            showError('???? ?????? ????????????????????');
            return;
        }
        const prom = new Promise((resolve) => {
            openModal();
            showForm();
            resolve();
        });
        prom.then(renderCaptcha);
        desision = event.detail;
    }

    function showError(msg) {
        hideForm();
        captchaResult = false;
        alertVisible = true;
        captchaError = msg;
    }

    async function processDecision() {
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
            const result = await res.json();
            showError(result.message);
            return;
        }
        hideForm();
        captchaResult = true;
        alertVisible = true;
        await fetchData();
        setCookie();
    }

    function checkCookie() {
        const cookieData = 'vote=true';
        const cookies = document.cookie.split('; ');
        const myCookieExists = cookies.includes(cookieData);
        return !myCookieExists;
    }

    function setCookie() {
        document.cookie = `vote=true; max-age=31536000`;
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
        <Modal on:close-modal={closeModal} transform="{isModalTransform}">
            {#if formVisible}
                <form onsubmit="event.preventDefault()">
                    <div
                            id="captcha-container"
                            class="smart-captcha"
                    ></div>
                    {#if submitBtnVisible}
                        <button class="vote-btn" on:click={processDecision}>??????????????????????????
                            ???? {getFullNameGaveCase(desision)}</button>
                    {/if}
                </form>
            {/if}
            {#if alertVisible}
                {#if captchaResult}
                    <Alert type="success">
                        ?????? ?????????? ????????????
                    </Alert>
                {:else}
                    <Alert type="fail">
                        {captchaError}
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

    @media (max-width: 768px) {
        .cards-container {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 550px) {
        .cards-container {
            grid-template-columns: 1fr;
        }
    }
</style>
