import {
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
const CartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispath = useDispatch();
  const increaseQuantity = (item) => {
    dispath(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispath(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispath(removeFromCart(item));
  };

  return (
    <ScrollView className="mt-10 flex-1 bg-white">
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

      <View className="p-2.5 flex-row items-center">
        <Text className="text-base font-normal">Subtotal : </Text>
        <Text className="text-[20px] font-bold">Rs. {total} </Text>
      </View>
      <Text className="mx-2"> EMI details Available</Text>

      {cart.length > 0 ? (
        <Pressable
          onPress={() => navigation.navigate("Confirmation")}
          className="bg-[#ffc72c] p-2.5 justify-center items-center mx-2.5 mt-2.5 rounded-md"
        >
          <Text>Procees to Buy ({cart.length}) items</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.navigate("Home")}
          className="bg-[#ffc72c] p-2.5 justify-center items-center mx-2.5 mt-2.5 rounded-md"
        >
          <Text>Buy items</Text>
        </Pressable>
      )}

      <Text className="border-[#D0D0D0] h-[2px] border mt-4" />

      <View className="mx-2.5">
        {cart?.map((item, index) => (
          <View
            key={index}
            className="bg-white my-2.5 border-b-[#D0D0D0] border-b p-2.5"
          >
            <Pressable className="my-2.5 flex-row justify-between">
              <View>
                <Image
                  className="w-[140px] h-[140px]"
                  style={{ resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View>
                <Text numberOfLines={3} className="w-[150px] mt-2.5">
                  {item?.title}
                </Text>
                <Text className="text-[20px] font-bold mt-1.5">
                  {item?.price}
                </Text>
                <Image
                  className="w-7 h-7"
                  style={{ resizeMode: "contain" }}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text className="text-green-500">In Stock</Text>
                <Text className="mt-1 font-medium">
                  {item?.rating?.rate} ratings
                </Text>
              </View>
            </Pressable>

            <Pressable className="mt-4 mb-5 flex-row items-center gap-3">
              <View className="flex-row items-center px-2.5 py-1.5 rounded-md">
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    className="bg-[#D8D8D8] p-2 rounded-t-[6px]"
                  >
                    <AntDesign name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    className="bg-[#D8D8D8] p-2 rounded-t-[6px]"
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable className="bg-white px-4 py-1.5">
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => increaseQuantity(item)}
                  className="bg-[#D8D8D8] p-2 rounded-t-[6px]"
                >
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => deleteItem(item)}
                className="bg-white px-2 py-2.5 border border-[#C0C0C0] rounded-md"
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>

            <Pressable className="flex-row items-center gap-2.5 mb-4">
              <Pressable className="bg-white px-2 py-2.5 border border-[#C0C0C0] rounded-md">
                <Text className="text-[14px] font-medium">Save for later</Text>
              </Pressable>
              <Pressable className="bg-white px-2 py-2.5 border border-[#C0C0C0] rounded-md">
                <Text className="text-[14px] font-medium">
                  See More like this
                </Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
