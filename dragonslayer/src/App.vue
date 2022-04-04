<script>
import { Being, Champion, Dragon, Logger } from "./types.js";

export default {
    data() {
        return {
            player: typeof Champion,
            enemy: typeof Dragon,
            logger: typeof Logger,
            winner: typeof Being,
            inProgress: typeof Boolean,
        }
    },

    created() {
        this.player = new Champion("Skorpan");
        this.enemy = new Dragon("Katla");
        this.logger = new Logger();
        this.inProgress = true;
    },

    methods: {
        // Attack the enemy.
        attackEnemy() {
            const damageCaused = this.player.attackTarget(this.enemy);
            this.logger.logAttack(this.player, this.enemy, damageCaused);

            // Ends the game if the enemy dies.
            if (this.enemy.isDead()) {
                this.inProgress = false;
                this.winner = this.player;
                this.showResultModal(true);
            }
        },

        // Attack enemy with player's special attack.
        attackEnemySpecial() {
            const damageCaused = this.player.attackTargetSpecial(this.enemy);
            this.logger.logAttack(this.player, this.enemy, damageCaused);

            // Ends game if the enemy dies.
            if (this.enemy.isDead()) {
                this.inProgress = false;
                this.winner = this.player;
                this.showResultModal(true);
            }
        },

        // Heal the player.
        healPlayer() {
            const healAmount = this.player.healSelf();
            this.logger.logHeal(this.player, this.player, healAmount);
        },

        // Enemy's attack.
        attackPlayer() {
            const damageCaused = this.enemy.attackTarget(this.player);
            this.logger.logAttack(this.enemy, this.player, damageCaused);

            // Ends game if the player dies.
            if (this.player.isDead()) {
                this.inProgress = false;
                this.winner = this.enemy;
                this.showResultModal(true);
            }
        },

        // Surrender
        forfeit() {
            this.inProgress = false;
            this.winner = this.enemy;
            this.showResultModal(true);
        },

        // Cause both the player and enemy to damage one another.
        clash() {
            this.attackEnemy();
            this.attackPlayer();
        },

        showResultModal(state) {
            const modal = document.getElementById("result-modal");
            state ? modal.classList.add("is-active") : modal.classList.remove("is-active");
        },

        // Reset the game.
        reloadPage() {
            window.location.reload();
        }
    }
}
</script>

<template>
    <main class="p-5 container is-full-height">

        <!-- Player healthbar -->
        <div class="box is-half">
            <h1 class="is-size-3 has-text-centered mb-3">{{ player.name }}</h1>
            <progress class="progress is-success" style="height: 50px;" v-bind:value="this.player.currentHealth" v-bind:max="this.player.maxHealth" />
        </div>

        <!-- Enemy healthbar -->
        <div class="box is-half">
            <h1 class="is-size-3 has-text-centered mb-3">{{ enemy.name }}</h1>
            <progress class="progress is-danger" style="height: 50px;" v-bind:value="this.enemy.currentHealth" v-bind:max="this.enemy.maxHealth" />
        </div>

        <div class="box has-text-centered">
            <!-- All buttons are disabled when the player or enemy dies. -->
            <button class="button is-black mr-5" :disabled="!this.inProgress" @click="clash()">Attack</button>
            
            <!-- Special button is also disabled when attackcounter is less than 3-->
            <button class="button is-warning mr-5" :disabled="this.player.attackCounter < 3 || !this.inProgress" @click="attackEnemySpecial()">Special Attack</button>

            <!-- Heal button is also disabled if the player's current health is greater or equal to their max health. -->
            <button class="button is-success mr-5" :disabled="!this.inProgress || this.player.currentHealth >= this.player.maxHealth" @click="healPlayer()">Heal</button>

            <button class="button is-danger" :disabled="!this.inProgress"  @click="forfeit()">Forfeit</button>
        </div>

        <!-- Reactive log that displays attack and heal events. -->
        <div class="box">
            <p class="is-size-3">Log:</p>
            <ul>
                <li v-for="log in logger.getLogs()" :key="log.source.name" v-html="log.message"></li>
            </ul>
        </div>

        <!-- Modal that displays the winner. -->
        <div id="result-modal" class="modal">
            <div class="modal-background"></div>

            <div class="modal-content">
                <div class="box has-text-centered">
                    <p class="is-size-1" v-if="this.winner == this.player"><span style="color: green;">{{ this.player.name }} wins!</span></p>
                    <p class="is-size-1" v-else><span style="color: red;">{{ this.enemy.name }} wins!</span></p>
                    <button class="button is-danger mt-5" @click="reloadPage()">Reset game.</button>
                </div>
            </div>

            <button id="modal-close-button" class="modal-close is-large" aria-label="close" @click="showResultModal(false)"></button>
        </div>
    </main>
</template>