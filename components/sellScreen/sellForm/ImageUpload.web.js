import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { Ionicons } from '@expo/vector-icons';

function ImageUpload() {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flex: 1 }} {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={{ background: 'red', height: '100%' }}>
                    <Ionicons name="ios-images" size={28} color="black" />
                </div>
            </div>
            <div style={{ flex: 1 }}  {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <div style={{ flex: 1 }}  {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <div style={{ flex: 1 }}  {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    )
}

export default ImageUpload
