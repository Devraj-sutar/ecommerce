import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import Search from '../components/Searchbar';


const SearchProductList = ({ route, navigation }) => {

    const { search } = route.params;

    console.log('Received search:', search);

    const [productList, setProductList] = useState([]);

    //loader state
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (search) {
            productSearchAPI(search);
        }
    }, [search]);


    const productSearchAPI = async () => {
        try {
            setIsLoading(true);

            const res = await fetch(
                'https://api.escuelajs.co/api/v1/products'
            );

            const products = await res.json();

            const filtered = products.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );

            setProductList(filtered);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Search failed');
        }
    };



    return (
        <>

            <Search />

            <Text style={{
                fontSize: 20, color: '#000', fontWeight: '700', paddingLeft: 20, paddingTop: 20, zIndex: -100, top: 0
            }}>Showing the search result</Text>
            <FlatList
                data={productList}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.homepageproduct3}
                renderItem={({ item }) => (
                    <View style={styles.categoriesproductcontainer}>
                        <TouchableOpacity
                            style={styles.categoriesproduct}
                            onPress={() =>
                                navigation.navigate('Productdetails', { id: item.id })
                            }
                        >
                            <View style={styles.subcategoriesproduct}>

                                <Image
                                    source={{ uri: item.images?.[0] }}
                                    style={{
                                        height: undefined,
                                        width: '100%',
                                        aspectRatio: 529 / 441,
                                    }}
                                />


                                <Text style={styles.categoryfoundation}>
                                    {item.category?.name}
                                </Text>

                                <Text style={styles.categoryproductname}>
                                    {item.title}
                                </Text>

                                <View style={styles.categorypriceflex}>
                                    <Text style={styles.categorydicountprice}>
                                        ₹{item.price}
                                    </Text>
                                </View>

                                {/* Buttons */}
                                <View style={styles.categoryproductbuy}>
                                    <TouchableOpacity
                                        style={styles.categoryaddtobag}
                                    >
                                        <Text style={styles.categoryaddtobagtext}>ADD TO BAG</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.categorybuynow}
                                    >
                                        <Text style={styles.categorybuynowext}>BUY NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />



        </>
    )
}

export default SearchProductList

const styles = StyleSheet.create({
    homepageproduct3: {
        zIndex: -100,
        backgroundColor: '#fff',
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

