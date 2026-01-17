import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, findNodeHandle, UIManager, Dimensions, FlatList, Alert, Modal, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import Search from '../components/Searchbar';

const Productdetails = ({ navigation, route }) => {

  

  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { height, width } = Dimensions.get('window');
 

  //Recommended Products api list
  const [productname, setproductname] = useState([]);

  //fetch wishlist product-unique
  const [price, setPrice] = useState([]); // State for wishlist items
  const [desc, setDesc] = useState([]); // State for wishlist items
  const [isInWishlist, setIsInWishlist] = useState(false); // State for product presence

  const { id } = route.params;
  const [image, SetImage] = useState([]);



  // ftech product details
  useEffect(() => {
    const controller = new AbortController();
    fetchProductDetails(controller);
    return () => {
      controller.abort();
    };
  }, [id]);


  const fetchProductDetails = async (controller) => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    const json = await response.json();

    console.log("Full response 👉", json);
    console.log("Product title 👉", json.title);

    // Set states
    setproductname(json.title);
    SetImage(json.images);
    setData(json.images);
    setPrice(json.price)
    setDesc(json.description)

  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};


const [count, setCount] = useState(1);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(prev => prev - 1);
    }
  };


  return (
    <>
      <ScrollView style={{ backgroundColor: '#fff' }} >
        <Search />
        <TouchableOpacity style={styles.backbuttoncontainer} onPress={() => navigation.goBack()}>
          <Image source={require('../images/backarrow2x.png')} style={{ width: 9, height: 16 }} />
          <Text style={styles.backtext}>Back</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {image.length > 1 ? ( // Check if there are multiple images
            <>
              <View
                style={{
                  height: height / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FlatList
                  data={image} // Correctly pass the images array
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  horizontal
                  onScroll={e => {
                    const x = e.nativeEvent.contentOffset.x;
                    setCurrentIndex(Math.round(x / width)); // Use Math.round for accuracy
                  }}
                  renderItem={({ item, index }) => {
                    return (
                      <View key={index}
                        style={{
                          width: width,
                          height: height / 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          disabled={true}
                          style={{
                            width: '90%',
                            height: '90%',
                            backgroundColor: 'white',
                            borderRadius: 10,
                          }}>
                          <Image
                            source={{ uri: item }} // Access the correct image property
                            style={styles.productsliderimg} />
                        </TouchableOpacity>
                      </View>
                    );
                  }} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {data.map((_, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        bottom: 40,
                        width: currentIndex === index ? 20 : 8,
                        height: currentIndex === index ? 10 : 8,
                        borderRadius: currentIndex === index ? 5 : 4,
                        backgroundColor: currentIndex === index ? 'yellow' : 'grey',
                        marginLeft: 5,
                      }} />
                  );
                })}
              </View>
            </>
          ) : (
            // Render single image without slider
            <View
              style={{
                width: '90%',
                height: height / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={{ uri: image[0]?.path }} style={styles.sliderimg} />
            </View>
          )}
        </View>
        <View style={styles.productlistcontainer}>


          <Text style={styles.productlistproductname}>{productname}</Text>
          <View style={styles.productlistpricesection}>
            <Text style={styles.productlistdiscountprice}>₹ {price}</Text>
            <Text style={styles.productlistmrpprice}>₹ {price}</Text>
          </View>

          
          <View style={styles.quantitycontainer}>
            <View style={styles.plueandminus}>
              <TouchableOpacity  onPress={decrement}>
                <Image style={{ height: undefined, width: 30, aspectRatio: 1 }} source={require("../images/minusIco.png")} />
              </TouchableOpacity>
              <Text style={styles.counter}> {count}</Text>
              <TouchableOpacity onPress={increment} >
                <Image style={{ height: undefined, width: 30, aspectRatio: 1 }} source={require("../images/plusIco.png")} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.wishlistcontainer}
             
            >
              <Image
                source={
                  isInWishlist
                    ? require('../images/like2x.png') // Image for item in wishlist
                    : require('../images/ri_heart-line2x.png') // Image for item not in wishlist
                }
                style={{ width: 30, height: 30 }}
              />
              <Text style={styles.addtowishlist}>
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Text>
            </TouchableOpacity>
          </View>
          
           <View style={styles.productlistpricesection}>
            <Text style={styles.productlistdiscountprice}>{desc}</Text>
          </View>

        </View>
   
      </ScrollView>



      <View style={{ backgroundColor: '#fff', elevation: 5 }}>
        <View style={styles.productlistproductbuy}>
          <TouchableOpacity style={styles.productlistaddtobag} >
            <Text style={styles.productlistaddtobagtext}>ADD TO BAG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.productlistbuynow} >
            <Text style={styles.productlistbuynowext}>BUY NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Productdetails

const styles = StyleSheet.create({
   backbuttoncontainer: {
    flexDirection: 'row',
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  backtext: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400'
  },
  productsliderimg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1
  },
  sliderimg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1
  },
  productlistproductname: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16
  },
  productlistcontainer: {
    marginHorizontal: 20
  },
  productlistpricesection: {
    flexDirection: 'row',
    display: 'flex',
    gap: 10,
    marginBottom: 16
  },
  productlistdiscountprice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#242424'
  },
  productlistmrpprice: {
    fontSize: 12,
    fontWeight: '400',
    color: '#505050',
    textDecorationLine: 'line-through'
  },
  reviewcontainer: {
    flexDirection: 'row',
    display: 'flex',
    gap: 5,
    marginBottom: 20
  },
  reviewcontainer2: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 10
  },
  ratingcount: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 26,
    color: '#000'
  },
  productlistproductbuy: {
    flexDirection: 'row',
    // backgroundColor:'#fff',
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 20,
    marginVertical: 16
  },
  productlistaddtobag: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
  productlistaddtobagtext: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
  productlistbuynow: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#8917C6',
    borderRadius: 5,
    flex: 1
  },
  productlistbuynowext: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
   productlistdescription: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 26,
    color: '#000',
    marginBottom: 20
  },
  selectashade: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    color: '#000',
    marginBottom: 10
  },
  productlistcolorsample: {
    height: 40,
    width: 40,
    backgroundColor: '#AD7F55E5',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 3
  },
  selectashadecolor: {
    flexDirection: 'row',
    display: 'flex',
    gap: 8,
  },
  offertext: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
    marginTop: 16
  },
  offers: {
    flexDirection: 'row',
    display: 'flex',
    gap: 11,
    marginTop: 18,
    alignItems: 'center'
  },
  offercontainer: {
    paddingHorizontal: 15,
    backgroundColor: '#F7F2EE',
    borderRadius: 8,
    marginBottom: 20,
    paddingBottom: 10
  },
  offerdetails: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  quantitycontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 39

  },
  plueandminus: {
    flexDirection: 'row',
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  },
  plus: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5
  },
  counter: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000'
  },
  plustext: {
    fontSize: 32,
    fontWeight: '400',
    color: '#000',
    paddingHorizontal: 14,
    paddingVertical: 4
  },
  wishlistcontainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 13
  },
  addtowishlist: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid'
  },
})