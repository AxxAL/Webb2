<template>
    <input type="number" v-model="a">
    <input type="text" v-model="operator">
    <input type="number" v-model="b">
    <button v-on:click="calc">Calculate</button>
    <p>{{ result }}</p>
</template>

<script>
export default {
    data() {
        return {
            a: 0,
            b: 0,
            operator: "+",
            result: 0
        };
    },

    methods: {
        calc() {
            try {
                this.result = eval(`${ this.a } ${ this.operator } ${ this.b }`);
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>

</style>