/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

// Used to not get TS errors when importing svg in the same way as CRA does
declare module '*.svg' {
  import * as React from 'react';
  
  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;
  
  const src: string;
  export default src;
}
