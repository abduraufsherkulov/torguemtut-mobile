import React, { useEffect, useContext, useState } from 'react'
import { Text, View, FlatList, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
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


export const skeletDescriptionHelper = (
    <ScrollView style={{ flex: 1 }}>
        <View>
            <SkeletonContent
                containerStyle={{
                    width: SCREEN_WIDTH - 32,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                isLoading={true}
                layout={
                    [
                        { width: SCREEN_WIDTH, height: 200, marginBottom: 6, },
                    ]}
            />
            <SkeletonContent
                containerStyle={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: SCREEN_WIDTH - 32,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
                isLoading={true}
                layout={
                    [{ width: SCREEN_WIDTH - 32, height: 40, marginBottom: 6, },
                    ]}
            />
            <SkeletonContent
                containerStyle={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: SCREEN_WIDTH - 32,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                isLoading={true}
                layout={
                    [{ width: SCREEN_WIDTH - 32, height: 20, marginBottom: 6, },
                    ]}
            />

            {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <SkeletonContent
                    key={index}
                    containerStyle={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: SCREEN_WIDTH - 32,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    isLoading={true}
                    layout={
                        [{ width: SCREEN_WIDTH / 2 * 0.9 - 16, height: 20, marginBottom: 4 },
                        { width: SCREEN_WIDTH / 2 * 0.9 - 16, height: 20, marginBottom: 4 },
                        ]}
                />
            ))}
        </View>
    </ScrollView>
)