import React, { useCallback, useContext, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image, Dimensions, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../contexts/AuthContext';

function ImageUpload({ image, setImage }) {
    const inputEl = useRef(null);
    const { userData } = useContext(AuthContext);

    const handleUpload = (file) => {
        console.log(file)
        inputEl.current.click();
    }
    console.log(inputEl)
    const handleSubmit = () => {
        console.log(inputEl.files[0])
        setImage()
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <React.Fragment key={index}>
                        {image[index].uri ?
                            <div onClick={() => handleConfirm(index, image[index].imageId)}>
                                <image src={image[index].uri} style={{ width: Dimensions.get('window').width / 4 - 10, height: 75, marginVertical: 2 }} />
                            </div>
                            :
                            <div onClick={() => handleUpload()} style={{ width: Dimensions.get('window').width / 4 - 10, height: 75, backgroundColor: '#eaeaea', alignItems: 'center', marginTop: 10, display: 'inline-block' }}>
                                <input ref={inputEl} type="file" style={{ display: 'none' }} />
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Ionicons name="ios-images" size={28} color="black" />
                                </div>
                            </div>
                        }
                    </React.Fragment>
                ))}
            </div>
            <button onClick={() => handleSubmit()}>test</button>
        </div>
    )
}

export default ImageUpload
