<script setup lang="ts">
import router from '@renderer/router'
import { useConnectionStore } from '@renderer/stores/ConnectionStore'
import { NButton, NCard, NInput, NInputNumber, useMessage } from 'naive-ui'

const naiveMessage = useMessage()
const connectionStore = useConnectionStore()

async function connect() {
  const success = await connectionStore.init()
  if (success) {
    if (connectionStore.role === 'Admin') {
      router.push('/admin')
    }
    else if (connectionStore.role === 'User') {
      router.push('/user')
    }
  }
  else {
    naiveMessage.error('Connect failed')
  }
}

async function onFillAdminAccount() {
  connectionStore.user = 'admin_user'
  connectionStore.password = 'admin_password'
}

async function onFillUserAccount() {
  connectionStore.user = 'regular_user'
  connectionStore.password = 'user_password'
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
      <template #action>
        <div class="flex gap-4">
          <NButton @click="onFillAdminAccount">
            Fill Admin Account
          </NButton>
          <NButton @click="onFillUserAccount">
            Fill User Account
          </NButton>
          <NButton type="primary" @click="connect">
            Connect
          </NButton>
        </div>
      </template>
    </NCard>
  </div>
</template>
