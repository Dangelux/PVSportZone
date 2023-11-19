<script setup>
import { RouterLink, RouterView } from 'vue-router'
//
import { useAuthStore } from './stores/auth'
  const auth = useAuthStore()
//

</script>

<template>

  <RouterView />

</template>