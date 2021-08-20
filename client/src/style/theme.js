const size = {
  minimum: 375,
  mobile: 770,
  tablet: 1024,
  desktop: 1280,
};

const theme = {
  minimum: `(max-width: ${size.minimum - 1}px)`,
  mobile: `(min-width: ${size.minimum}px) and (max-width: ${
    size.mobile - 1
  }px)`,
  tablet: `(min-width: ${size.mobile}px) and (max-width: ${
    size.desktop - 1
  }px)`,
  desktop: `(min-width: ${size.desktop}px)`,
};

export default theme;
