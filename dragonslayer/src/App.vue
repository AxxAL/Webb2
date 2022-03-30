<script>
import { Champion, Dragon, Logger } from "./types.js";

export default {
    data() {
        return {
            player: typeof Champion,
            enemy: typeof Dragon,
            logger: typeof Logger,
        }
    },
    created() {
        this.player = new Champion("Skorpan");
        this.enemy = new Dragon("Katla");
        this.logger = new Logger();
    },
    methods: {
        attackEnemy() {
            const damageCaused = this.player.attackTarget(this.enemy);
            this.logger.logAttack(this.player, this.enemy, damageCaused);
        },
        healPlayer() {
            const healAmount = this.player.healSelf();
            this.logger.logHeal(this.player, this.player, healAmount);
        },
        attackPlayer() {
            const damageCaused = this.enemy.attackTarget(this.player);
            this.logger.logAttack(this.enemy, this.player, damageCaused);
        },
        attackEnemySpecial() {
            const damageCaused = this.player.attackTargetSpecial(this.enemy);
            this.logger.logAttack(this.player, this.enemy, damageCaused);
        },
        clash() {
            this.attackEnemy();
            this.attackPlayer();
        },
    },
}
</script>

<template>
    <header>
    
    </header>

    <main class="p-5">
        <div class="columns">
            <progress class="progress is-success is-half" style="height: 100px;" v-bind:value="this.player.currentHealth" v-bind:max="this.player.maxHealth" />
            <progress class="progress is-danger is-half" style="height: 100px;" v-bind:value="this.enemy.currentHealth" v-bind:max="this.enemy.maxHealth" />
        </div>

        <button class="button is-black" @click="clash()">Attack</button>
        
        <!-- Special button is disabled until attackcounter is greater than 3-->
        <button class="button is-warning" v-bind:disabled="this.player.attackCounter < 3" @click="attackEnemySpecial()">Special Attack</button>
        <button class="button is-success" @click="healPlayer()">Heal</button> 

        <div class="box">
            <p class="is-size-3">Log:</p>
            <ul>
                <li v-for="log in logger.getLogs()" :key="log.source.name">{{ log.message }}</li>
            </ul>
        </div>
    </main>
</template>

<style>

</style>
