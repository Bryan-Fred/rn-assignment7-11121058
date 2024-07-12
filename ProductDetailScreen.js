import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import doNotBleachIcon from "./assets/Do Not Bleach.png";
import doNotTumbleDryIcon from "./assets/Do Not Tumble Dry.png";
import dryCleanIcon from "./assets/Do Not Wash.png";
import ironIcon from "./assets/Iron Low Temperature.png";
import Logo from "./assets/Logo.png";
import Menu from "./assets/Menu.png";
import Search from "./assets/Search.png";
import shoppingBag from "./assets/shoppingBag.png";
import shippingIcon from "./assets/Shipping.png";
import upIcon from "./assets/Up.png";

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;



  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
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
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.productInfo}>
          <Text style={styles.name}>{product.title}</Text>
          <Icon style={styles.export} name="upload" size={20} color="#555"/>
          <Text style={styles.description}>
            {product.description}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>

        <Text style={styles.sectionHeader}>MATERIALS</Text>
        <Text style={styles.materialsDescription}>
          This product is made with high-quality materials to ensure comfort and
          durability. The materials used in this product include 100% cotton,
          polyester, and other synthetic fibers.
        </Text>

        <View style={styles.precautions}>
          <View style={styles.precautionContainer}>
            <Image source={doNotBleachIcon} style={styles.icon} />
            <Text style={styles.precautionText}>Do not bleach</Text>
          </View>
          <View style={styles.precautionContainer}>
            <Image source={doNotTumbleDryIcon} style={styles.icon} />
            <Text style={styles.precautionText}>Do not tumble dry</Text>
          </View>
          <View style={styles.precautionContainer}>
            <Image source={dryCleanIcon} style={styles.icon} />
            <Text style={styles.precautionText}>
              Dry clean with tetrachloroethylene
            </Text>
          </View>
          <View style={styles.precautionContainer}>
            <Image source={ironIcon} style={styles.icon} />
            <Text style={styles.precautionText}>
              Iron at a maximum of 110°C/230°F
            </Text>
          </View>
        </View>

        <View style={styles.shippingRow}>
          <Image source={shippingIcon} style={styles.icon} />
          <View style={styles.shippingInfo}>
            <View style={styles.shippingFirstRow}>
              <Text style={styles.shippingText}>Free Flat Rate Shipping</Text>
              <Image source={upIcon} style={styles.icon} />
            </View>
            <Text style={styles.shippingDate}>Estimated to be delivered on</Text>
            <Text style={styles.shippingDate}>09/11/2021 - 12/11/2021.</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.checkoutContainer}>
        <View style={styles.plusAndText}>
          <Icon style={styles.plusIcon} name="plus" />
          <Text style={styles.checkoutText}>ADD TO BASKET</Text>
        </View>
        <Icon name="heart" size={20} color="#888"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  main: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
  },
  companyIcon: {
    position: "absolute",
    left: "40%",
  },
  rightIcons: {
    flexDirection: "row",
    width: 70,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    resizeMode: "contain",
  },
  productInfo: {
    width: "100%",
    display: 'relative',
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  export:{
    position: 'absolute',
    right: 30,
    top: 15,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "left",
    fontFamily: "serif",
  },
  price: {
    marginTop: 5,
    fontSize: 24,
    color: "#FF6347",
    fontWeight: "bold",
    fontFamily: "serif",
  },
  sectionHeader: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "flex-start",
    fontFamily: "serif",
  },
  materialsDescription: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "left",
    width: "100%",
    fontFamily: 'serif'
  },
  precautions: {
    width: "100%",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  precautionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  precautionText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "serif",
  },

  shippingRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
    width: "100%",
  },
  shippingFirstRow:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  shippingText:{
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'serif',
    marginBottom: 5,
  },

  shippingDate:{
    fontSize: 16,
    color: '#666',
    fontFamily: 'serif',
    marginBottom: 5,
  },

  shippingInfo: {
    width: "100%",
    paddingRight: 30,
  },

  checkoutContainer: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: "98%",
  },
  plusAndText: {
    display: "flex",
    flexDirection: "row",
  },
  plusIcon: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
  },
  checkoutText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "serif",
    marginLeft: 20,
  },
});

export default ProductDetailScreen;