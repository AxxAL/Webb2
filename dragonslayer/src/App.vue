<script>
import { Champion, Dragon } from "./types.js";

export default {
    data() {
        return {
            player: typeof Champion,
            enemy: typeof Dragon     
        }
    },
    methods: {
        attackEnemy() {
            const damageCaused = this.player.attackTarget(this.enemy);
            console.log(`Caused ${damageCaused} damage to enemy!`);
        }
    },
    created() {
        this.player = new Champion();
        this.enemy = new Dragon();
    }
}
</script>

<template>
    <header>
    
    </header>

    <main>
        <button class="button is-black" @click="attackEnemy()">goog</button>
    </main>
</template>

<style>

</style>
