declare module "*.module.css" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module 'd3';