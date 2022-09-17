<script>
    import {createEventDispatcher} from "svelte";

    export let transform;

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close-modal');
    }
</script>

<div class="modal" style="{transform ? '' : 'transform: none'}">
    <slot></slot>
</div>
<div class="modal-bg" on:click={closeModal}></div>

<style>
    .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        min-height: 100px;
        min-width: 500px;
        padding: 15px;
        z-index: 100;
        border-radius: 5px;
        display: block;
    }

    .modal-bg {
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        position: fixed;
        background-color: rgba(0, 0, 0, .5);
    }

    @media (max-width: 550px) {
        .modal {
            min-width: 300px;
        }
    }
</style>