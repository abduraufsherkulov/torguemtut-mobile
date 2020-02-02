export const cacheAssets = () => Promise.resolve(null);

let cachedFonts = {};
const cacheFont = (name, link) => {
  const styleBody = `@font-face { src: url(${link}); font-family: ${name}; }`;
  const style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = styleBody;
  } else {
    style.appendChild(document.createTextNode(styleBody));
  }
  document.head.appendChild(style);
  cachedFonts[name] = link;
};

export const cacheFonts = fonts => {
  let jobs = [];
  for (let fontName in fonts) {
    if (!cachedFonts[fontName])
      jobs.push(cacheFont(fontName, fonts[fontName]))
  }
  return Promise.all(jobs)
};

export const _storeData = async (key, item) => {
  try {
    localStorage.setItem(key, item);
  } catch (error) {
    // Error saving data
    console.log(error, 'here error')
  }
};

export const _retrieveData = async (item) => {
  try {
    const value = localStorage.getItem(item);
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error, 'error in retreive')
  }
};


export const _removeData = async (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log(error, 'in removal')
    // Error saving data
  }
};