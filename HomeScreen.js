import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "./assets/Logo.png";
import Menu from "./assets/Menu.png";
import Filter from "./assets/Filter.png";
import Listview from "./assets/Listview.png";
import Search from "./assets/Search.png";
import shoppingBag from "./assets/shoppingBag.png";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const addToCart = async (product) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      const cartItems = cart ? JSON.parse(cart) : [];
      const itemExists = cartItems.some((item) => item.id === product.id);
      if (!itemExists) {
        cartItems.push(product);
        await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
        alert("Product added to cart!");
      } else {
        alert("Product is already in the cart!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkCart = async () => {
      const cart = await AsyncStorage.getItem("cart");
      if (cart) {
        console.log("Cart:", JSON.parse(cart));
      }
    };

    checkCart();
  }, []);

  const truncateDescription = (description) => {
    return description.length > 50
      ? `${description.substring(0, 50)}...`
      : description;
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
        >
          <Image source={Menu} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={Logo} style={styles.companyIcon} />
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={Search} style={styles.SearchIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.iconButton}
          >
            <Image source={shoppingBag} style={styles.shoppingBag} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.ourStory}>
        <Text style={styles.ourStoryText}>OUR STORY</Text>
        <View style={styles.categoryFilterIcons}>
          <TouchableOpacity style={styles.circleIcon}>
            <Image source={Listview} style={styles.Listview} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleIcon}>
            <Image source={Filter} style={styles.Filter} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.product}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          >
            <View style={styles.productImageContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Icon name="plus" size={15} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productInfo}>
                {truncateDescription(item.description)}
              </Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  companyIcon: {
    position: "absolute",
    left: "40%",
  },
  rightIcons: {
    flexDirection: "row",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  productInfo: {
    fontSize: 14,
    color: "#666",
    fontFamily: "serif",
  },
  productPrice: {
    fontFamily: "serif",
    fontSize: 16,
    color: "#FF6347",
    fontWeight: "bold",
  },
  ourStory: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 10,
  },
  ourStoryText: {
    fontSize: 22,
    letterSpacing: 3,
    fontFamily: "serif",
  },
  categoryFilterIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  circleIcon: {
    backgroundColor: "#dfdcdca2",
    borderRadius: 20,
    height: 40,
    width: 40,
    padding: 10,
    marginHorizontal: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
  },
  product: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    position: "relative",
  },
  productImageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  infoContainer: {
    marginTop: 10,
    textAlign: "left",
    paddingLeft: 2,
    backgroundColor: "white",
  },
  addButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;