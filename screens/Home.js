import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Search from '../components/Searchbar';
import Skeletonloader from '../components/Skeletonloader';
import Appdrawer from '../components/Appdrawer';

const Home = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [furniture, setFurniture] = useState([]);
    const [category, setcategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const flatListRefss = useRef(null);


    useEffect(() => {
        const controller = new AbortController();
        fetchproduct(controller);
        return () => {
            controller.abort();

        };
    }, [])
    useEffect(() => {
        const controller = new AbortController();
        fetchcategory(controller);
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
            const filteredClothsProducts = json.filter(
                item => item.category?.id === 1
            );
            const filteredProducts = json.filter(
                item => item.category?.id === 3
            );
            setData(filteredClothsProducts);
            setFurniture(filteredProducts);

            if (json.status) {
                setIsLoading(false)
            } else {
                setIsLoading(false)

            }

        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };

    const fetchcategory = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(
                'https://api.escuelajs.co/api/v1/categories'
            );

            const json = await response.json();

            // json is an array
            console.log('category list:', json);
            setcategory(json);

        } catch (error) {
            setIsLoading(false)
            console.error('Error fetching category details:', error);
        }
    };




    return (
        <>
            <ScrollView style={styles.mainContainer}>
                <Search />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horizontalhomepage}>
                    <View style={styles.homepagecontainer} >

                        <TouchableOpacity style={styles.homepageslideshopall} onPress={() => navigation.navigate('shopall')} >
                            <Text style={styles.homepageslidebuttonshopall}>Shop All</Text>
                        </TouchableOpacity>
                        {category.map((item, index) => (

                            <TouchableOpacity style={styles.homepageslide} onPress={() => navigation.navigate('viewcategory', { categoryId: item.id })} key={index}>
                                <Text style={styles.homepageslidebutton}>{item.name}</Text>
                            </TouchableOpacity>


                        ))}
                    </View>
                </ScrollView>
                <View>
                    <Image source={require('../images/banner.jpg')} style={styles.hoempagecoverimg} />
                </View>

                <Text style={styles.indianskin}>For Indian Produts</Text>
                <Text style={styles.makeupforall}>Cloths for all</Text>

                <FlatList
                    data={data}
                    ref={flatListRefss}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.homepageproduct}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.homepageproductcontainer}
                            onPress={() => navigation.navigate('productdetails', { id: item.id })}
                        >
                            <View style={styles.productimg}>
                                <Image source={{ uri: item.images?.[0] }} style={{ height: 250, width: 200, aspectRatio: 250 / 200 }} />
                            </View>
                            <View style={{ marginHorizontal: 15 }}>
                                <Text style={styles.foundationstick}>{item.slug}</Text>
                                <Text style={styles.productname}>{item.title}</Text>
                                <View style={styles.priceflex}>
                                    <Text style={styles.dicountprice}>₹ {item.price}</Text>
                                </View>
                                <View style={styles.productcolor}>
                                    <Text style={{ width: 20, height: 20, backgroundColor: item.product_color, borderRadius: 3 }}></Text>
                                    <Text style={styles.colortext}>{item.product_color_name}</Text>
                                </View>
                                <View style={styles.productbuy}>
                                    <TouchableOpacity style={styles.addtobag} >
                                        <Text style={styles.addtobagtext}>ADD TO BAG</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buynow} >
                                        <Text style={styles.buynowext}>BUY NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}

                />
                {isLoading &&
                    <Skeletonloader />
                }

                <View style={{ paddingTop: 20 }}></View>
                <Text style={styles.indianskin}>For Indian Furniture</Text>
                <Text style={styles.makeupforall}>Furniture all</Text>

                <FlatList
                    data={furniture}
                    ref={flatListRefss}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.homepageproduct}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.homepageproductcontainer}
                            onPress={() => navigation.navigate('productdetails', { id: item.id })}
                        >
                            <View style={styles.productimg}>
                                <Image source={{ uri: item.images?.[0] }} style={{ height: 250, width: 200, aspectRatio: 250 / 200 }} />
                            </View>
                            <View style={{ marginHorizontal: 15 }}>
                                <Text style={styles.foundationstick}>{item.slug}</Text>
                                <Text style={styles.productname}>{item.title}</Text>
                                <View style={styles.priceflex}>
                                    <Text style={styles.dicountprice}>₹ {item.price}</Text>
                                </View>
                                <View style={styles.productcolor}>
                                    <Text style={{ width: 20, height: 20, backgroundColor: item.product_color, borderRadius: 3 }}></Text>
                                    <Text style={styles.colortext}>{item.product_color_name}</Text>
                                </View>
                                <View style={styles.productbuy}>
                                    <TouchableOpacity style={styles.addtobag} >
                                        <Text style={styles.addtobagtext}>ADD TO BAG</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buynow}>
                                        <Text style={styles.buynowext}>BUY NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                {isLoading &&
                    <Skeletonloader />
                }


            </ScrollView>
            <Appdrawer />
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    horizontalhomepage: {
        marginHorizontal: 20,
        marginTop: 20,
        zIndex: -100,
        marginBottom: 38
    },
    hoempagecoverimg: {
        width: '100%',
        height: undefined,
        aspectRatio: 259 / 194,
        marginBottom: 40,
        zIndex: -100,
        resizeMode: 'contain'
    },
    indianskin: {
        marginLeft: 20,
        fontSize: 12,
        fontWeight: '400',
        color: '#000',
        marginBottom: 8
    },
    makeupforall: {
        marginLeft: 20,
        color: '#000',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 30,
    },
    homepagecontainer: {
        flexDirection: 'row',
        display: 'flex',
        gap: 10,
    },
    homepageslide: {
        padding: 10,
        borderColor: '#DFDFDF',
        borderWidth: 1,
        borderRadius: 8
    },
    homepageslideshopall: {
        padding: 10,
        borderColor: '#DFDFDF',
        backgroundColor: '#8917C6',
        borderWidth: 1,
        borderRadius: 8
    },
    homepageslidebuttonshopall: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff'
    },
    homepageslidebutton: {
        fontSize: 12,
        fontWeight: '500',
        color: '#242424'
    },

    homepageproduct: {
        flexDirection: 'row',
        display: 'flex',
        gap: 16,
        // marginHorizontal: 20,
        paddingHorizontal: 20
    },
    homepageproduct2: {
        // marginBottom:200,
        paddingBottom: 200,
        backgroundColor: '#fff',
        position: 'relative',

    },
    homepageproduct3: {
        zIndex: -100,
        backgroundColor: '#fff',
    },
    homepageproductcontainer: {
        backgroundColor: '#F5F5F5',
        borderColor: '#DFDFDF',
        borderWidth: 1,
        borderRadius: 16,

    },
    productimg: {
        marginHorizontal: 15,
        marginTop: 20,
        backgroundColor: '#fff',
        position: 'relative'
    },
    dicount: {
        color: '#fff',
        backgroundColor: '#000',
        padding: 6,
        borderRadius: 8,
        position: 'absolute',
        fontSize: 14,
        fontWeight: '700',
        top: 15,
        right: 15
    },
    foundationstick: {
        color: '#8917C6',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 20,
        marginTop: 16
    },
    productname: {
        fontSize: 20,
        fontWeight: '700',
        color: '#242424',
        marginBottom: 8
    },
    priceflex: {
        flexDirection: 'row',
        display: 'flex',
        gap: 10,
        marginBottom: 9
    },
    dicountprice: {
        color: '#242424',
        fontSize: 16,
        fontWeight: '600'
    },
    mrpprice: {
        color: '#505050',
        fontSize: 14,
        fontWeight: '400',
        textDecorationLine: 'line-through'
    },
    productcolor: {
        flexDirection: 'row',
        display: 'flex',
        gap: 10,
        marginBottom: 30,
    },
    colorsample: {
        width: 20,
        height: 20,
        backgroundColor: '#AD7F55',
        borderRadius: 3
    },
    colortext: {
        color: '#A4A4A4',
        fontSize: 15,
        fontWeight: '400'
    },
    productbuy: {
        flexDirection: 'row',
        display: 'flex',
        gap: 20,
        marginBottom: 20
    },
    addtobag: {
        // paddingHorizontal: 30,
        paddingVertical: 15,
        flex: 1,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5
    },
    buynow: {
        // paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: '#8917C6',
        borderRadius: 5,
        flex: 1,
    },
    addtobagtext: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center'
    },
    buynowext: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center'
    },
    buynowetext: {
        fontSize: 14,
        fontWeight: '500',
        color: '#39FF14',
        textAlign: 'center'
    },
    back: {
        backgroundColor: '#d7ffd0',
        borderRadius: 30,
        padding: 10
    },

})