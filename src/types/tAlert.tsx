export type tAlert = {
  severity: 'info' | 'success' | 'warning' | 'error',
  icon?: React.ReactNode,
  children?: React.ReactNode
}