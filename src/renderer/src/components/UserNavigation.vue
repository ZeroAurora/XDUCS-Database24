<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

const menuOptions: MenuOption[] = [
  {
    label: () => h(RouterLink, { to: '/user' }, { default: () => 'User' }),
    key: 'user',
  },
  {
    label: () => h(RouterLink, { to: '/user/queryTeam' }, { default: () => 'Query Team' }),
    key: 'queryTeam',
  },
  {
    label: () => h(RouterLink, { to: '/common/sql' }, { default: () => 'SQL' }),
    key: 'sql',
  },
]
</script>

<template>
  <NMenu :options="menuOptions" />
</template>
