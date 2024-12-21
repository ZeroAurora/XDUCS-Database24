<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'

const menuOptions: MenuOption[] = [
  {
    label: 'Admin',
    key: 'admin',
  },
]
</script>

<template>
  <NMenu :options="menuOptions" />
</template>
