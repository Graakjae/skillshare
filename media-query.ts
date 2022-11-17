import { BreakpointKeys, breakpoints } from './breakpoints'

/**
 * Utility function to generate media query strings.
 *
 * @example mq('sm') = (min-width: ${breakpoints.sm}px) or from small and up.
 * @example mq(0, 'sm') = (max-width: ${breakpoints.sm - 1}px) or up to small.
 * @example mq(100, 500) = (min-width: 100px and max-width: 499px).
 *
 * @param min number or key of breakpoints. Minimun width (value included). If left out the media query will apply up to value.
 * @param max number or key of breakpoints. Maximun width (value NOT included). If left out media query will apply from min value.
 * @param withPrefix whether or not to use prefix '\@media only screen and'. Defaults to true.
 * @returns media query string
 */
export const mq = (min?: number | BreakpointKeys, max?: number | BreakpointKeys, withPrefix = true): string => {
  const actualMin = min ? (typeof min === 'number' ? min : breakpoints[min]) : min
  const actualMax = max ? (typeof max === 'number' ? max : breakpoints[max]) : max
  const prefix = withPrefix ? '@media only screen and' : ''
  const getMin = (actualMin?: number) => `${actualMin ? `(min-width: ${actualMin}px)` : ''}`
  const getMax = (actualMax?: number) => `${actualMax ? `(max-width: ${actualMax - 1}px)` : ''}`

  if (actualMin && actualMax) {
    return `${prefix} ${getMin(actualMin)} and ${getMax(actualMax)}`
  } else if (actualMin && !actualMax) {
    return `${prefix} ${getMin(actualMin)}`
  } else if (!actualMin && actualMax) {
    return `${prefix} ${getMax(actualMax)}`
  } else {
    throw new Error('Cannot do mediaquery without min or max')
  }
}