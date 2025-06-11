<template>
  <div>
    <h1>Welcome to the Slot Machine</h1>

    <div class="slot-machine">
      <div class="info">{{ items.join(" ") }}</div>

      <div class="door" v-for="(column, index) in doors" :key="index">
        <div class="boxes" :style="{ transform: column.transform }">
          <div v-for="(symbol, idx) in column.symbols" :key="idx" class="box">
            {{ symbol }}
          </div>
        </div>
      </div>

      <button @click="spin">Spin</button>
      <button @click="reset">Reset</button>
    </div>

    <div v-if="showWin" class="win-message">🎉 You Win! 🎉</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import gsap from "gsap"

const items = ["7️⃣", "❌", "🍓", "🍋", "🍉", "🍒", "💵", "🍊", "🍎"]

// State
const doors = ref([
  { symbols: ["❓"], transform: "translateY(0px)" },
  { symbols: ["❓"], transform: "translateY(0px)" },
  { symbols: ["❓"], transform: "translateY(0px)" },
])

const showWin = ref(false)

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Computed: check if all visible symbols are equal
const currentResult = computed(() => doors.value.map((door) => door.symbols[0]))

const isWin = computed(() => currentResult.value.every((val) => val === currentResult.value[0]))

// Methods
function spin() {
  showWin.value = false

  doors.value.forEach((door, index) => {
    const shuffled = shuffle([...items, ...items])
    door.symbols = shuffled
    door.transform = `translateY(-${(shuffled.length - 1) * 150}px)`

    // After spin ends, set first symbol as result
    setTimeout(() => {
      door.symbols = [shuffled[0]]
      door.transform = "translateY(0px)"

      // If it's the last door and it's a win, show animation
      if (index === doors.value.length - 1 && isWin.value) {
        triggerWinAnimation()
      }
    }, 1000)
  })
}

function reset() {
  doors.value.forEach((door) => {
    door.symbols = ["❓"]
    door.transform = "translateY(0px)"
  })
  showWin.value = false
}

function triggerWinAnimation() {
  showWin.value = true
  const winMessage = document.querySelector(".win-message")
  gsap.fromTo(
    winMessage,
    { opacity: 0, scale: 0.5, y: -100 },
    {
      opacity: 1,
      scale: 1.2,
      y: 0,
      duration: 1,
      ease: "bounce.out",
      onComplete: () => {
        gsap.to(winMessage, {
          opacity: 0,
          delay: 2,
          duration: 1,
          onComplete: () => (showWin.value = false),
        })
      },
    },
  )
}
</script>

<style scoped>
.slot-machine {
  text-align: center;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.door {
  display: inline-block;
  margin: 10px;
  width: 200px;
  height: 150px;
  overflow: hidden;
  background: #f4f4f4;
  border-radius: 10px;
  vertical-align: top;
}

.boxes {
  transition: transform 1s ease-out;
}

.box {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  border-bottom: 1px solid #ccc;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.win-message {
  font-size: 24px;
  color: green;
  margin-top: 20px;
}
</style>
