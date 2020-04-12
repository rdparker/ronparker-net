import merge from 'lodash.merge'
import { toTheme } from '@theme-ui/typography'
import { theme } from './typography'
import colors from './colors'

const ronParkerTheme = merge(toTheme(theme), { colors })

export default ronParkerTheme
