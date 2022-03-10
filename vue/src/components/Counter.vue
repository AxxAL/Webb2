<template>
    <div class="counter">
        <p>Count: {{ count }}</p>
        <button v-on:click="increment">+</button>
        <button v-on:click="decrement">-</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
        };
    },

    methods: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        }
    }
};
</script>

<style scoped>

</style>
