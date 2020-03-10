import React, { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Button, Image } from 'react-native-elements';
import SkeletonContent from "react-native-skeleton-content";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const skeletItemHelper = ({ item, index }) => (
    <ListItem
        key={index}
        title={
            <View>
                <SkeletonContent
                    containerStyle={{
                        flex: 1,
                        width: SCREEN_WIDTH - 32,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    isLoading={true}
                    layout={
                        [
                            { width: SCREEN_WIDTH - 32, height: 20, marginBottom: 6, },
                        ]}
                />

                <SkeletonContent
                    containerStyle={{
                        flex: 1,
                        width: SCREEN_WIDTH - 32,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    isLoading={true}
                    layout={
                        [{ width: SCREEN_WIDTH / 2 * 0.9 - 16, height: 150, marginBottom: 6 },
                        { width: SCREEN_WIDTH / 2 * 0.9 - 16, height: 20, marginBottom: 6 },
                        ]}
                />
                <SkeletonContent
                    containerStyle={{
                        flex: 1,
                        width: SCREEN_WIDTH,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                    isLoading={true}
                    layout={
                        [
                            { width: SCREEN_WIDTH / 2, height: 20, marginBottom: 6 },
                        ]}
                />
            </View>
        }
        bottomDivider
    />
)