import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Collapsible from 'react-native-collapsible';
const Search = () => {
  const navigation = useNavigation()

  const [searchText, setSearchText] = useState("");
  const [suggestionProducts, setSuggestionProducts] = useState([]);
  const [suggestionDivShow, setSuggestionDivShow] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");


  // Fetch Suggestions API
 const searchSuggestionAPI = async () => {
  if (searchText && searchText.length > 2) {
    try {
      const response = await fetch(
        'https://api.escuelajs.co/api/v1/products',
        {
          method: 'GET',
        }
      );

      const products = await response.json(); 

      // 🔍 Filter products by title
      const filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );

      setSuggestionProducts(filteredProducts);
      setSuggestionDivShow(true);

      if (filteredProducts.length === 0) {
        setSuggestionError('No products found');
      } else {
        setSuggestionError('');
      }

    } catch (error) {
      console.error('Search API Error:', error);
      setSuggestionError('Something went wrong');
    }
  } else {
    setSuggestionProducts([]);
    setSuggestionDivShow(false);
  }
};

  // Debounce API Calls
  useEffect(() => {
    const debounce = setTimeout(() => {
      searchSuggestionAPI();
    }, 300); // 300ms debounce time
    return () => clearTimeout(debounce);
  }, [searchText]);

  // Navigate to Product List Page
  const handleSearch = () => {
    console.log('search text', searchText);
    if (searchText) {
      navigation.navigate("searchproductlist", { search: searchText });
      setSearchText("");
    }
  };

  // Navigate to Product Details
  const handleSearchResultClick = (productId) => {
    navigation.navigate("productdetails", { id: productId });
    setSearchText("");
    setSuggestionDivShow(false);
  };

  
  const [isCollapsed, setIsCollapsed] = useState(true);


  return (
    <>
      <View style={styles.maincontainer}>
        <Text style={styles.shippingtext}>Free shipping all over India on all Prepaid Orders</Text>
      </View>
      <View style={{ backgroundColor: '#fff', elevation: 4 }}>
        <View style={styles.secondcontainer}>
          <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Image source={require('../images/images.jpg')} style={{ width: 66, height: 50 }} />
          </TouchableOpacity>
          <View style={styles.wishlistandcart}>
            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
              <Image source={require('../images/search.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Image source={require('../images/wishlist2x.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity >
              <Image source={require('../images/shopping-cart2x.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
        </View>
        
        {!isCollapsed && (
          <View style={styles.searchinput}>
            <View style={styles.search}>
              <TouchableOpacity onPress={handleSearch}>
                <Image source={require('../images/search-interface-symbol2x.png')} style={{ width: 22, height: 22 }} />
              </TouchableOpacity>
              <TextInput
                placeholder="Search"
                style={styles.textArea}
                placeholderTextColor="#ABABAB"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={handleSearch}
              />
              {searchText.length > 2 && suggestionDivShow && (
                <View style={styles.suggestionDiv}>
                  {suggestionProducts.length > 0 ? (
                    <View style={styles.suggestion}>
                      {suggestionProducts.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => handleSearchResultClick(item.id)}
                          style={styles.suggestionItem}
                        >
                          <Text style={styles.productname}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.errorText}>{suggestionError}</Text>
                  )}
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </>
  )
}

export default Search

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#461066',
    // marginBottom: 10,
  },
  shippingtext: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 36,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  suggestion: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  secondcontainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#fff'

  },
  wishlistandcart: {
    flexDirection: 'row',
    display: 'flex',
    gap: 20
  },
  textArea: {
    color: '#000',
    width: 200
  },


  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },


  searchinput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#DFDFDF',
    position: 'relative',

    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginHorizontal: 20
  },
  search: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  // textArea: {
  //   color: '#000',
  //   flex: 1,
  //   fontSize: 16,
  // },
  suggestionDiv: {
    marginTop: 5,
    backgroundColor: '#fff',
    elevation: 4,
    maxHeight: 250,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
  },
  suggestionItem: {
    paddingHorizontal: 15,

  },
  productname: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500', // Slightly bold for better readability
  },
  errorText: {
    color: 'red',
    padding: 10,
    color: 'red',
    padding: 10,
    textAlign: 'center',
  },

})