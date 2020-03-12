import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const SoatoContext = createContext();

function SoataContextProvider(props) {

    const [soato, setSoato] = useState([]);
    // https://ttuz.azurewebsites.net/api/category/get-all
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/news/get-regions?lang=ru";
        axios({
            method: "get",
            url: endpoint
        })
            .then(response => {
                console.log(response.data)
                setSoato(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });

    }, []);

    return (
        <SoatoContext.Provider value={{ soato, setSoato }}>
            {props.children}
        </SoatoContext.Provider>
    )
}

export default SoataContextProvider
