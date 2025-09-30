// @types/alltypes.d.ts

// Tell TypeScript that these modules exist
declare module "@splidejs/react-splide" {
  import * as React from "react";
  export const Splide: React.ComponentType<any>;
  export const SplideSlide: React.ComponentType<any>;
  export default Splide;
}
