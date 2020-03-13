import React, { useState, useEffect, useMemo } from 'react'
import { View, StyleSheet, Button, Platform } from 'react-native'

function CascaderSoato({ navigation, route, selectedSoato, setSelectedSoato }) {
    const [cascaderLoading, setCascaderLoading] = useState(false);
    const [attrHere, setAttrHere] = useState([])
    const [title, setTitle] = useState("Местоположения");
    let districtId = route.params ? route.params.districtId : null;
    // let { region, district, regionId, districtId } = route.params.districtId ? route.params : null;

    useEffect(() => {
        if (districtId) {
            setTitle(`${route.params.region}/${route.params.district}`)
            setSelectedSoato([route.params.regionId, route.params.districtId])
        }
    }, [districtId])

    return (
        <React.Fragment>
            <Button title={title} onPress={() => navigation.navigate('ChooseRegion')} />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 45,
        width: '100%'
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        fontFamily: 'regular',
        fontSize: 16,
    },
    inputErrorContainer: {
        paddingLeft: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        height: 45,
        width: '100%'
    },
    inputErrorStyle: {
        flex: 1,
        color: 'red',
        fontFamily: 'regular',
        fontSize: 16,
    }
});

export default CascaderSoato
