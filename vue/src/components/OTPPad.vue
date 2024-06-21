<template>
  <div ref="container" class="flex gap-4 items-center">
    <input
      type="text"
      v-for="n in length"
      :key="n"
      v-model="otpArray[n - 1]"
      maxlength="1"
      @keyup="(e) => handleEnter(e, n - 1)"
      class="border rounded-md w-10 p-2 text-center"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const otpProps = defineProps({
  length: {
    type: Number,
    default: 4
  }
})

const otpArray = ref([])

const container = ref()

const otpEmit = defineEmits(['entered'])

onMounted(() => {
  for (let index = 0; index < otpProps.length; index++) {
    otpArray.value[index] = null
  }
})

const handleEnter = (e, index) => {
  const children = container.value.children
  const keypressed = e.key

  if ((index > 0 && keypressed === 'Backspace') || keypressed === 'Delete') {
    otpArray.value[index] = null
    children[index - 1].focus()
  } else {
    const matched = keypressed.match(/^[0-9]$/)

    // if user types a value that is not a number
    if (!matched) {
      otpArray.value[index] = null
      return
    } else if (index < otpProps.length - 1) {
      setTimeout(() => {
        children[index + 1].focus()
      }, 50)
    }

    checkEmptyOTPBox()
  }
}

const checkEmptyOTPBox = () => {
  const children = container.value.children

  let flag = true

  for (let index = 0; index < otpProps.length; index++) {
    if (otpArray.value[index] == null) {
      children[index].classList.add('border-red-500')
      flag = false
    } else {
      // clear the border
      children[index].classList.remove('border-red-500')
    }
  }
  if (flag) otpEmit('entered', otpArray.value.join(''))
}
</script>

<style scoped></style>
