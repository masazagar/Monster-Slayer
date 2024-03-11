function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min));
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      heal: 0,
      currentRound: 0,
      text: " ",
      logMessages: [],
    };
  },
  computed: {
    PlayerHealthBarStyle() {
      if (this.playerHealth < 0) {
        {
          return { width: "0%" };
        }
      } else {
        {
          return { width: this.playerHealth + "%" };
        }
      }
    },

    MonsterHealthBarStyle() {
      if (this.monsterHealth < 0) {
        {
          return { width: "0%" };
        }
      } else {
        {
          return { width: this.monsterHealth + "%" };
        }
      }
    },
  },
  methods: {
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(10, 17);
      this.playerHealth -= attackValue;
      this.addLogMessage("Monster", "attack", attackValue);
    },

    specialAttack() {
      this.currentRound++;
      const specialAttackValue = getRandomValue(12, 19);
      this.monsterHealth -= specialAttackValue;
      this.addLogMessage("player", "Special attack", specialAttackValue);
      this.attackPlayer();
    },
    healing() {
      this.currentRound++;
      const heal = getRandomValue(8, 17);
      if (this.playerHealth + heal > 100) {
        playerHealth = 100;
      } else {
        this.playerHealth += heal;
      }
      this.addLogMessage("player", "heal", heal);
    },

    surrender() {
      this.playerHealth = 0;
    },
  },
});

app.mount("#game");
