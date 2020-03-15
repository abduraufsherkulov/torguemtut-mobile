import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const CategoryContext = createContext();

function CategoryContextProvider(props) {

    const [category, setCategory] = useState([]);
    // https://tt.delivera.uz/api/category/get-all
    useEffect(() => {
        const endpoint = "https://tt.delivera.uz/api/category/get-with-children";
        axios({
            method: "get",
            url: endpoint
        })
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.log(error.response, "error in categories");
            });

    }, []);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider
