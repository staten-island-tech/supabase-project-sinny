<template>
  <div>
    <h1>Welcome to the Slot Machine</h1>

    <div class="slot-machine">
      <div class="info"></div>

      <div class="door">
        <div class="boxes"></div>
      </div>

      <div class="door">
        <div class="boxes"></div>
      </div>

      <div class="door">
        <div class="boxes"></div>
      </div>

      <button id="spinner">Spin</button>
      <button id="reseter">Reset</button>
    </div>

    <div id="win-message" class="win-message">🎉 You Win! 🎉</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import gsap from "gsap"

onMounted(() => {
  const items = ["7️⃣", "❌", "🍓", "🍋", "🍉", "🍒", "💵", "🍊", "🍎"]
  const info = document.querySelector(".info")
  if (info) info.textContent = items.join(" ")

  const doors = document.querySelectorAll(".door")
  const spinner = document.querySelector("#spinner")
  const reseter = document.querySelector("#reseter")

  spinner?.addEventListener("click", spin)
  reseter?.addEventListener("click", () => init())

  async function spin() {
    init(false, 1, 2)
    for (const door of doors) {
      const boxes = door.querySelector(".boxes")
      const duration = parseInt(boxes.style.transitionDuration)
      boxes.style.transform = "translateY(0)"
      await new Promise((resolve) => setTimeout(resolve, duration * 700))
    }

    const results = [...doors].map((door) => {
      const boxes = door.querySelector(".boxes")
      return boxes?.firstElementChild?.textContent
    })

    if (results.every((val) => val === results[0])) {
      showWinAnimation()
    }
  }

  function showWinAnimation() {
    const winMessage = document.getElementById("win-message")
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
          })
        },
      },
    )
  }

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = "0"
      } else if (door.dataset.spinned === "1") {
        return
      }

      const boxes = door.querySelector(".boxes")
      const boxesClone = boxes.cloneNode(false)
      const pool = ["❓"]

      if (!firstInit) {
        const arr = []
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...items)
        }
        pool.push(...shuffle(arr))

        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1"
            this.querySelectorAll(".box").forEach((box) => {
              box.style.filter = "blur(1px)"
            })
          },
          { once: true },
        )

        boxesClone.addEventListener(
          "transitionend",
          function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)"
              if (index > 0) this.removeChild(box)
            })
          },
          { once: true },
        )
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div")
        box.classList.add("box")
        box.style.width = door.clientWidth + "px"
        box.style.height = door.clientHeight + "px"
        box.textContent = pool[i]
        boxesClone.appendChild(box)
      }

      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`
      door.replaceChild(boxesClone, boxes)
    }
  }

  function shuffle([...arr]) {
    let m = arr.length
    while (m) {
      const i = Math.floor(Math.random() * m--)
      ;[arr[m], arr[i]] = [arr[i], arr[m]]
    }
    return arr
  }

  init()
})
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
  width: 100px;
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.boxes {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  transition: transform 1s ease;
}

.box {
  font-size: 2rem;
  text-align: center;
  line-height: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.win-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: gold;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
}
</style>
