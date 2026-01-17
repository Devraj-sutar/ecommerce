import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import Search from '../components/Searchbar';


const Shopall = ({ navigation,route }) => {

    const { categoryId } = route.params;


    // show all products state
    const [shopall, setShopall] = useState([]);
    //  View category state

    // fetch Filtered Products useeffect

    useEffect(() => {
        
        fetchproduct();
        
    }, [categoryId])





    const fetchproduct = async () => {
        try {
            const response = await fetch(
                'https://api.escuelajs.co/api/v1/products'
            );

            const json = await response.json();

            // Filter by category id
            const filteredProducts = json.filter(
                item => item.category?.id === categoryId
            );

            setShopall(filteredProducts);

        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };

    return (
        <>
            <View style={{ backgroundColor: '#fff', paddingBottom: 5, position: 'relative', marginBottom: 100 }}>
                <Search />


                <FlatList
  data={shopall}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={[
    styles.homepageproduct2,
    shopall?.length === 0 && { flex: 1 }
  ]}
  ListEmptyComponent={() => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#999' }}>
        Product not found
      </Text>
    </View>
  )}
  renderItem={({ item }) => (
    <View style={styles.categoriesproductcontainer}>
      <TouchableOpacity
        style={styles.categoriesproduct}
        onPress={() =>
          navigation.navigate('productdetails', { id: item.id })
        }
      >
        <View style={styles.subcategoriesproduct}>
          <Image
            source={{ uri: item.images?.[0] }}
            style={{ width: '100%', aspectRatio: 529 / 441 }}
          />
          <Text style={styles.categoryfoundation}>{item.slug}</Text>
          <Text style={styles.categoryproductname}>{item.title}</Text>

          <View style={styles.categorypriceflex}>
            <Text style={styles.categorydicountprice}>₹{item.price}</Text>
            <Text style={styles.categorymrpprice}>₹{item.price}</Text>
          </View>

          <View style={styles.categoryproductcolor}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: item.product_color,
                borderRadius: 3,
              }}
            />
            <Text style={styles.categorycolortext}>
              {item.product_color_name}
            </Text>
          </View>

          <View style={styles.categoryproductbuy}>
            <TouchableOpacity
              style={styles.categoryaddtobag}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.categoryaddtobagtext}>ADD TO BAG</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categorybuynow}
              onPress={() => handleBuyNow(item)}
            >
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
        height:'100%'

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

