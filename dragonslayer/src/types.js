import { generateNumberInRange, removeNullElementsFromArray } from "./util.js";

// Base class for being with health and damage functionality.
export class Being {
    name;

    maxHealth = 100;
    currentHealth = this.maxHealth;
    maxDamage = 10;
    minDamage = 1;
    critChance = 0.05;

    attackCounter = 0;

    constructor(name) {
        this.name = name;
    }

    // Attacks a target with a chance for critical strike.
    attackTarget(target) {
        let damage = generateNumberInRange(this.minDamage, this.maxDamage);

        // Random chance of critical strike.
        if (Math.random() < this.critChance) {
            damage *= 2;
        }

        target.currentHealth -= damage;
        this.attackCounter++;
        return damage;
    }

    // Returns true if the target is dead.
    isDead() {
        return this.currentHealth <= 0;
    }
}

// Implementation of Being for player.
export class Champion extends Being {
    maxDamage = 10;
    minDamage = 5;

    maxHealPower = 20;
    minHealPower = 8;

    specialMaxDamage = 25;
    specialMinDamage = 10;

    // Special attack with higher damage range which is activated after 3 attacks.
    attackTargetSpecial(target) {
        let damage = generateNumberInRange(this.specialMinDamage, this.specialMaxDamage);

        // Randomly doubles damage based on crit chance.
        if (Math.random() < this.critChance) {
            damage *= 2;
        }

        target.currentHealth -= damage;
        this.attackCounter = 0;
        return damage;
    }

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

class Log {
    source;
    target;
    message;

    constructor(source, target, message) {
        this.source = source;
        this.target = target;
        this.message = message;
    }
}

export class AttackLog extends Log {
    constructor(source, target, damage) {
        super(
            source,
            target,
            `[${new Date().getHours()}:${new Date().getMinutes()}] <span style="color: orange;">${source.name}</span> attacked <span style="color: orange;">${target.name}</span> for <span style="color: red;">${damage}</span> damage.`
        );
    }
}

export class HealLog extends Log {
    constructor(source, target, healAmount) {
        super(
            source,
            target,
            `[${new Date().getHours()}:${new Date().getMinutes()}] <span style="color: orange;">${source.name}</span> healed <span style="color: orange;">${target.name}</span> for <span style="color: green;">${healAmount}</span> health.`
        );
    }
}

export class Logger {
    logs;

    constructor() {
        this.logs = [];
    }

    // Logs an attack event.
    logAttack(source, target, damage) {
        this.logs.push(new AttackLog(source, target, damage));
        console.log(`${source.name} attacked ${target.name} for ${damage} damage.`);
    }

    // Logs a heal event.
    logHeal(source, target, healAmount) {
        this.logs.push(new HealLog(source, target, healAmount));
        console.log(`${source.name} healed ${target.name} for ${healAmount} health.`);
    }

    // Removes log at provided index.
    removeLog(index) {
        this.logs.pop(index);
        this.logs = removeNullElementsFromArray(this.logs);
    }

    // Returns all log elements.
    getLogs() {
        return this.logs;
    }
}