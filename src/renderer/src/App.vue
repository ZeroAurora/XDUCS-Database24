<script setup lang="ts">
import AdminNavigation from '@renderer/components/AdminNavigation.vue'
import UserNavigation from '@renderer/components/UserNavigation.vue'
import router from '@renderer/router'

import { useConnectionStore } from '@renderer/stores/ConnectionStore'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { watchEffect } from 'vue'
import { RouterView } from 'vue-router'

hljs.registerLanguage('json', json)

const connectionStore = useConnectionStore()

watchEffect(() => {
  if (!connectionStore.connected) {
    router.push('/')
  }
})
</script>

<template>
  <NConfigProvider :hljs="hljs">
    <NMessageProvider>
      <div class="flex h-screen w-screen">
        <div v-if="connectionStore.connected" class="flex-none w-240px border-0 border-r border-solid border-gray-200">
          <AdminNavigation v-if="connectionStore.role === 'Admin'" />
          <UserNavigation v-else-if="connectionStore.role === 'User'" />
        </div>
        <RouterView />
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>
