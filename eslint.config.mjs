import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['node_modules', '**/node_modules/**', 'dist', '**/dist/**', 'out', '**/out/**', '.gitignore', '**/.gitignore/**'],
  formatters: true,
  unocss: true,
  vue: true,
})
