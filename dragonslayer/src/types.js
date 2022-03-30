import { generateNumberInRange } from "./util.js";

// Base class for being with health and damage functionality.
class Being {
    name;

    maxHealth = 100;
    currentHealth = this.maxHealth;
    maxDamage = 10;
    minDamage = 1;
    critChance = 0.02;

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

export const EventType = {
    Attack: "Attack",
    Heal: "Heal"
};

class LogELement {
    eventType;
    source;
    target;
    message;

    constructor(eventType, source, target, message) {
        this.eventType = eventType;
        this.source = source;
        this.target = target;
        this.message = message;
    }
}

export class AttackLogElement extends LogELement {
    constructor(source, target, damage) {
        super(EventType.Attack, source, target, `${source.name} attacked ${target.name} for ${damage} damage.`);
    }
}

export class HealLogElement extends LogELement {
    constructor(source, target, healAmount) {
        super(EventType.Heal, source, target, `${source.name} healed ${target.name} for ${healAmount} health.`);
    }
}

export class Logger {
    logElements;

    constructor() {
        this.logElements = [];
    }

    // Logs an attack event.
    logAttack(source, target, damage) {
        this.logElements.push(new AttackLogElement(source, target, damage));
        console.log(`${source.name} attacked ${target.name} for ${damage} damage.`);
    }

    // Logs a heal event.
    logHeal(source, target, healAmount) {
        this.logElements.push(new HealLogElement(source, target, healAmount));
        console.log(`${source.name} healed ${target.name} for ${healAmount} health.`);
    }

    // Returns all log elements.
    getLogs() {
        return this.logElements;
    }
}