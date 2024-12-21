import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'node_modules',
    '**/node_modules/**',
    'dist',
    '**/dist/**',
    'out',
    '**/out/**',
    '.gitignore',
    '**/.gitignore/**',
    'src/main/drizzle',
    '**/src/main/drizzle/**',
  ],
  formatters: true,
  unocss: true,
  vue: true,
})
