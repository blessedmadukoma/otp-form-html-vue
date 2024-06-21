<template>
  <OTPPad :length="5" @entered="(v) => (otpValue = v)" />

  {{ otpValue }}
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

const OTPPad = defineAsyncComponent(() => import('./components/OTPPad.vue'))

const otpValue = ref('')
</script>
