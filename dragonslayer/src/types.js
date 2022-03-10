import { generateNumberInRange } from "./util.js";

// Base class for being with health and damage functionality.
class Being {
    maxHealth = 100;
    currentHealth = this.maxHealth;
    maxDamage = 10;
    minDamage = 1;
    critChance = 0.02;

    // Attacks a target with a chance for critical strike.
    attackTarget(target) {
        let damage = generateNumberInRange(this.minDamage, this.maxDamage);

        // Randomly doubles damage based on crit chance.
        if (Math.random() > this.critChance) {
            damage = damage * 2;
        }

        target.currentHealth -= damage;
        return damage;
    }
}

// Implementation of Being for player.
export class Champion extends Being {
    maxDamage = 10;
    minDamage = 5;

    maxHealPower = 20;
    minHealPower = 8;

    // Heals the champion by random amont in healpower range.
    healSelf() {
        const healAmount = generateNumberInRange(this.minDamage, this.maxDamage);

        if (healAmount + this.currentHealth > this.maxHealth) {
            const healthDifference = this.maxHealth - this.currentHealth;
            this.currentHealth = this.maxHealth;
            return healthDifference;
        }

        this.currentHealth += healAmount;
        return healAmount;
    }
}

// Implementation of Being for enemy.
export class Dragon extends Being {
    maxDamage = 15;
    minDamage = 8;
}