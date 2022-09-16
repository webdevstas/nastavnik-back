<script>
    export let type;
</script>

<div class="alert {type}">
    <slot></slot>
</div>

<style>
    .alert {
        position: relative;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
    }
    .success {
        border: solid #92b458 1px;
        border-radius: 5px;
        color: #92b458;
    }
    .fail {
        border: solid #9b0c0c 1px;
        border-radius: 5px;
        color: #9b0c0c;
    }
</style>