import * as Font from "expo-font";

// export const cacheAssets = Asset.loadAsync;
// export const cacheFonts = Font.loadAsync;
export const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
};

export const _storeData = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    // Error saving data
  }
};

export const _retrieveData = async (item) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};


export const _removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error saving data
  }
};