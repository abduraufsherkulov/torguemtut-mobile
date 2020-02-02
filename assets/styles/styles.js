import { StyleSheet, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get("window");

export const colors = {
  mainColor: "#6BB267",
  disabledColor: "#BFBFBF",
  borderColor: "#EDEDED",
  mainBoldColor: "#33C37B"
};

export const fonts = {
  regular: require("../fonts/Roboto-Regular.ttf"),
  medium: require("../fonts/Roboto-Medium.ttf"),
  bold: require("../fonts/Roboto-Bold.ttf")
};


export const error = {
  container: {
    backgroundColor: 'red',
  },
  text: {
    fontFamily: 'regular',
    fontSize: 12,
    color: 'white'
  }
}

export const warning = {
  container: {
    backgroundColor: 'yellow',
  },
  text: {
    fontFamily: 'regular',
    fontSize: 12,
    color: 'white'
  }
}

export const success = {
  container: {
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'regular',
    fontSize: 12,
    color: 'black'
  }
}


export const loading = {
  container: {
    backgroundColor: 'white'
  },
  text: {
    fontFamily: 'regular',
    fontSize: 12,
    color: 'black'
  }
}


export const getAdjustedFontSize = size => {
  return (parseInt(size) * width + height) / 400;
};

export const PolifySafeArea = (background) => {
  return {
    flex: 1,
    backgroundColor: background,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0
  }
}