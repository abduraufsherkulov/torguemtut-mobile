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

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
  inputIOSContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
  iconContainer: {
    top: 5,
    right: 15,
  },
});