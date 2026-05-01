/**
 * CSS Modules Type Declarations
 *
 * This file declares module augmentations for CSS modules
 * to enable proper TypeScript support for imported CSS files.
 */

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
