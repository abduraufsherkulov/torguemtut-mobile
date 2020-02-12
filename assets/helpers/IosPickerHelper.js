import React, { useState, useEffect } from 'react';
import { Animated, Button, Dimensions, Picker, Platform, StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';

const { width: WindowWidth } = Dimensions.get('window');

function IosPickerHelper() {
    const [language, setLanguage] = useState('js');
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [modalAnimatedValue, setModalAnimatedValue] = useState(new Animated.Value(0))

    useEffect(() => {
        if (Platform.OS === 'android') {
            alert(
                'Umm yeah this is meant for iOS, Picker modal looks different on Android. But go for it and try if you want, maybe make your own Snack that gives Android specific styling, that would be neat.'
            );
        }
    }, [])

    const _handlePressDone = () => {
        Animated.timing(modalAnimatedValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            setModalIsVisible(false);
        });
    };

    const _handlePressOpen = () => {
        if (modalIsVisible) {
            return;
        }

        setModalIsVisible(true);
        Animated.timing(modalAnimatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();

    };

    const opacity = modalAnimatedValue;
    const translateY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0],
    });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>
                    Hey! This is some text. Maybe a form would go here or something
                    {language}
                </Text>
                <Button title="Open thing" onPress={_handlePressOpen} />
            </View>
            {modalIsVisible ? (<View
                style={StyleSheet.absoluteFill}
                pointerEvents={modalIsVisible ? 'auto' : 'none'}>
                <TouchableWithoutFeedback onPress={_handlePressDone}>
                    <Animated.View style={[styles.overlay, { opacity }]} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 55555,
                        transform: [{ translateY }],
                    }}>
                    <View style={styles.toolbar}>
                        <View style={styles.toolbarRight}>
                            <Button title="Done" onPress={_handlePressDone} />
                        </View>
                    </View>
                    <Picker
                        style={{ width: WindowWidth, backgroundColor: '#e1e1e1' }}
                        selectedValue={language}
                        onValueChange={itemValue => setLanguage(itemValue)}>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="Objective C" value="objc" />
                    </Picker>
                </Animated.View>
            </View >) : null}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        position: 'absolute',
        bottom: -300,
        width: '100%',
        left: 0,
        zIndex: 999
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    toolbar: {
        backgroundColor: '#f1f1f1',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    toolbarRight: {
        alignSelf: 'flex-end',
    },
});

export default IosPickerHelper