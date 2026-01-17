import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import Search from '../components/Searchbar';


const Shopall = ({ navigation }) => {



    // show all products state
    const [shopall, setShopall] = useState([]);
    //  View category state

    // fetch Filtered Products useeffect

    useEffect(() => {
        const controller = new AbortController();
        fetchproduct(controller);
        return () => {
            controller.abort();

        };
    }, [])





    const fetchproduct = async () => {
        try {
            const response = await fetch(
                'https://api.escuelajs.co/api/v1/products'
            );

            const json = await response.json();

            // json is an array
            console.log('category list:', json);
            setShopall(json);

        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };








    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const [isDropdownVisible, setDropdownVisible] = useState(false);



    //show all product function
    const handleCheck = (categoryId) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                // Remove the category if already selected
                return prevSelected.filter((id) => id !== categoryId);

            } else {
                // Add the category if not already selected
                return [...prevSelected, categoryId];
            }
        });
        // setDropdownVisible(false)
    };









    return (
        <>
            <View style={{ backgroundColor: '#fff', paddingBottom: 5, position: 'relative', marginBottom: 100 }}>
                <Search />


                <FlatList
                    data={shopall}

                    keyExtractor={(item, index) => index}
                    contentContainerStyle={styles.homepageproduct2}

                    renderItem={({ item }) => (
                        <View style={styles.categoriesproductcontainer} >
                            <TouchableOpacity style={styles.categoriesproduct} onPress={() => navigation.navigate('productdetails', { id: item.id })} >
                                <View style={styles.subcategoriesproduct}>
                                    <Image source={{ uri: item.images?.[0] }} style={{ height: undefined, width: '100%', aspectRatio: 529 / 441, }} />
                                    <Text style={styles.categoryfoundation}>{item.slug}</Text>
                                    <Text style={styles.categoryproductname}>{item.title}</Text>
                                    <View style={styles.categorypriceflex}>
                                        <Text style={styles.categorydicountprice}>₹{item.price}</Text>
                                        <Text style={styles.categorymrpprice}>₹{item.price}</Text>
                                    </View>
                                    <View style={styles.categoryproductcolor}>
                                        <Text style={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: item.product_color,
                                            borderRadius: 3
                                        }}></Text>
                                        <Text style={styles.categorycolortext}>{item.product_color_name}</Text>
                                    </View>
                                    <View style={styles.categoryproductbuy}>
                                        <TouchableOpacity style={styles.categoryaddtobag} >
                                            <Text style={styles.categoryaddtobagtext}>ADD TO BAG</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.categorybuynow} >
                                            <Text style={styles.categorybuynowext}>BUY NOW</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>

                    )}
                />


            </View>

        </>
    )
}

export default Shopall

const styles = StyleSheet.create({
    homepageproduct2: {
        // marginBottom:200,
        paddingBottom: 200,
        backgroundColor: '#fff',
        position: 'relative',

    },
    categoriesproductcontainer: {
        display: 'flex',
        gap: 20,
        marginTop:25

    },
    categoriesproduct: {
        borderColor: '#DFDFDF',
        borderWidth: 1,
        borderRadius: 16,
        marginHorizontal: 20
    },
    subcategoriesproduct: {
        marginHorizontal: 20,
        marginTop: 16,

    },
    categoryfoundation: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8917C6',
        marginBottom: 16,
        marginTop: 16
    },
    categoryproductname: {
        color: '#242424',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10
    },
    categorypriceflex: {
        flexDirection: 'row',
        display: 'flex',
        gap: 10,
        marginBottom: 9
    },
    categorydicountprice: {
        color: '#242424',
        fontSize: 16,
        fontWeight: '600'
    },
    categorymrpprice: {
        color: '#505050',
        fontSize: 14,
        fontWeight: '400',
        textDecorationLine: 'line-through'
    },
    categoryproductcolor: {
        flexDirection: 'row',
        display: 'flex',
        gap: 10,
        marginBottom: 20,
    },
    categorycolorsample: {
        width: 20,
        height: 20,
        backgroundColor: '#AD7F55',
        borderRadius: 3
    },
    categorycolortext: {
        color: '#A4A4A4',
        fontSize: 14,
        fontWeight: '400'
    },
    categoryproductbuy: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginBottom: 30,
    },
    categoryaddtobag: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
    },
    categoryaddtobagtext: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000',

    },
    categorybuynow: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#8917C6',
        borderRadius: 5,
        flex: 1
    },
    categorybuynowext: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
    },
})

