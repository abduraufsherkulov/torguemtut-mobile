import React from 'react'
import styles from './SliderEntry.style';
import Carousel from 'react-native-snap-carousel';
import { ENTRIES1, ENTRIES2 } from './entries';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import { Image } from 'react-native'

function ProductCarousel({ listImages }) {
    const _renderItem = ({ item, index }) => {
        return (
            <Image
                source={{ uri: `https://tt.delivera.uz/Resources/Images/${item.path}` }}
                style={styles.image}
            />
        );
    }
    console.log(listImages)
    return (
        <Carousel
            // ref={(c) => { this._carousel = c; }}
            data={listImages}
            layout={'default'}
            renderItem={_renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
        />
    )
}

export default ProductCarousel
