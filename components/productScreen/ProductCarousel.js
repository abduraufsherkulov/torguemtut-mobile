import React from 'react'
import styles from './SliderEntry.style';
import Carousel from 'react-native-snap-carousel';
import { ENTRIES1, ENTRIES2 } from './entries';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import { Image } from 'react-native'

function ProductCarousel() {
    const _renderItem = ({ item, index }) => {
        return (
            <Image
                source={{ uri: item.illustration }}
                style={styles.image}
            />
        );
    }
    return (
        <Carousel
            // ref={(c) => { this._carousel = c; }}
            data={ENTRIES1}
            layout={'default'}
            renderItem={_renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
        />
    )
}

export default ProductCarousel
