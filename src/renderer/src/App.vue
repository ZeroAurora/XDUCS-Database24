<script setup lang="ts">
import AdminNavigation from '@renderer/components/AdminNavigation.vue'
import router from '@renderer/router'
import { useConnectionStore } from '@renderer/stores/ConnectionStore'

import { watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import UserNavigation from './components/UserNavigation.vue'

const connectionStore = useConnectionStore()

watchEffect(() => {
  if (!connectionStore.connected) {
    router.push('/')
  }
})
</script>

<template>
  <div class="flex h-screen w-screen">
    <div v-if="connectionStore.connected" class="flex-none w-240px border-0 border-r border-solid border-gray-200">
      <AdminNavigation v-if="connectionStore.role === 'Admin'" />
      <UserNavigation v-else-if="connectionStore.role === 'User'" />
    </div>
    <RouterView class="flex-auto" />
  </div>
</template>
