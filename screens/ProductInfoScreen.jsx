import {
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useSelector } from "react-redux";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = width;
  const dispatch = useDispatch();

  const addItemtoCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 4000);
  };
  const cart = useSelector((state) => state.cart.cart);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=" mt-10 flex-1 bg-white"
    >
      <View className="bg-[#00ced1] h-16 p-3 flex-row items-center justify-between">
        <Pressable className="flex-row bg-white rounded-md px-2 py-2 items-start justify-start text-base w-[92%]">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput placeholder="Search products" className="pl-3" />
        </Pressable>
        <Feather
          name="mic"
          size={24}
          color="black"
          style={{ paddingLeft: 8 }}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ marginTop: 25, width, height, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View className="p-2.5 flex-row items-center justify-between">
              <View className="w-[40px] h-[40px] rounded-[20px] bg-[#c60c30] items-center justify-center flex-row ml-2.5">
                <Text className="text-white font-semibold text-[12px] text-center">
                  20% off
                </Text>
              </View>

              <View className="w-[40px] h-[40px] rounded-[20px] bg-[#E0E0E0] items-center justify-center flex-row mr-2.5">
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <View className="w-[40px] h-[40px] rounded-[20px] bg-[#E0E0E0] items-center justify-center flex-row mt-auto ml-5 mb-5">
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View className="p-2.5">
        <Text className="text-[15px] font-medium">{route?.params?.title}</Text>
        <Text className="text-[18px] font-semibold mt-1.5">
          ₹ {route?.params?.price}
        </Text>
      </View>

      {/* bottom border */}
      <Text className="h-1 border-[#D0D0D0] border-[2px] mt-4 " />

      <View className="flex-row items-center p-2.5">
        <Text>Color:</Text>
        <Text className="text-[15px] font-bold">{route?.params?.color}</Text>
      </View>
      <View className="flex-row items-center p-2.5">
        <Text>Size:</Text>
        <Text className="text-[15px] font-bold">{route?.params?.size}</Text>
      </View>

      {/* bottom border */}
      <Text className="h-1 border-[#D0D0D0] border-[2px] mt-4 " />

      <View className="p-2.5">
        <Text className="text-[15px] font-bold my-1">
          Total: ₹{route?.params?.price}
        </Text>
        <Text className="text-green-500 text-[14px]">
          FREE Delivery Tomorrow by 3 pm orders with in 10hrs 30mins
        </Text>
        <View className="flex-row my-1 items-center gap-1">
          <Ionicons name="location" size={24} color="black" />
          <Text className="text-[15px] font-medium" t>
            Delivery to shivbhan - muaudaha
          </Text>
        </View>
      </View>

      <Text className="text-green-700 mx-2.5 font-medium">IN Stock</Text>

      <Pressable
        onPress={() => addItemtoCart(route?.params?.item)}
        className="bg-[#ffc72c] p-2.5 rounded-[20px] justify-center items-center mx-2.5 my-2.5"
      >
        {addedToCart ? (
          <View>
            <Text>Adding to cart...</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Cart")}
        className="bg-[#fdb539] p-2.5 rounded-[20px] justify-center items-center mx-2.5 my-2.5"
      >
        <Text>Buy now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
