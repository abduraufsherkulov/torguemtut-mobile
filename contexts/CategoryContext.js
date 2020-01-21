import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const CategoryContext = createContext();

function CategoryContextProvider(props) {

    const [category, setCategory] = useState([]);
    // https://ttuz.azurewebsites.net/api/category/get-all
    useEffect(() => {
        const endpoint = "https://ttuz.azurewebsites.net/api/category/get-with-children";
        axios({
            method: "get",
            url: endpoint
        })
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.log(error, "error in categories");
            });

    }, []);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider
