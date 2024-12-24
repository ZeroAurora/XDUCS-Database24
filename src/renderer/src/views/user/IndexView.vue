<script setup lang="ts">
import { NButton, NResult } from 'naive-ui'

function onLogoutClick() {
  window.db.close()
  window.location.reload()
}
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <NResult status="success" title="Logged in as Regular">
      <template #footer>
        <NButton type="primary" @click="onLogoutClick">
          Logout
        </NButton>
      </template>
    </NResult>
  </div>
</template>
