export const breakpoints = {
    /**
     * Small phones
     */
    xs: 320,
    /**
     * Larger phones, tablet portrait
     */
    sm: 415,
    /** tablet*/
    md: 992,
    /**laptop */
    lg: 1200
  };
  
  export type Breakpoints = typeof breakpoints
  
  export type BreakpointKeys = keyof Breakpoints