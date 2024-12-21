<script setup lang="ts">
import router from '@renderer/router'
import { useConnectionStore } from '@renderer/stores/ConnectionStore'
import { NButton, NCard, NInput, NInputNumber } from 'naive-ui'

const connectionStore = useConnectionStore()

async function connect() {
  const success = await connectionStore.init()
  if (success) {
    if (connectionStore.role === 'Admin') {
      router.push('/admin')
    }
  }
}
</script>

<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center">
    <NCard class="w-80% max-w-800px" content-class="space-y-2" title="Connect to Database">
      <NInput v-model:value="connectionStore.host" placeholder="Host" />
      <NInputNumber v-model:value="connectionStore.port" :show-button="false" placeholder="Port" />
      <NInput v-model:value="connectionStore.user" placeholder="User" />
      <NInput v-model:value="connectionStore.password" placeholder="Password" type="password" />
      <NInput v-model:value="connectionStore.database" placeholder="Database" />
      <NButton @click="connect">
        Connect
      </NButton>
    </NCard>
  </div>
</template>
