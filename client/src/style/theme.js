const size = {
  minimum: "480px",
  mobile: "770px",
  tablet: "1024px",
  desktop: "1280px",
};

const theme = {
  minimum: `(max-width: ${size.minimum})`,
  mobile: `(min-width: ${size.minimum}) and (max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.mobile}) and (max-width: ${size.desktop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
