import { Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
  
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const addItemtoCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 4000);
  };

  return (
    <Pressable className="mx-5 my-6">
      <Image
        source={{ uri: item?.image }}
        width={150}
        height={150}
        resizeMode="contain"
      />
      <Text numberOfLines={1} className="w-[150px] mt-2.5">
        {item.title}
      </Text>
      <View className="mt-1.5 flex-row items-center justify-between">
        <Text className="text-[15px] font-bold">₹{item?.price}</Text>
        <Text className="text-[#FFC72C] font-bold">
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addItemtoCart(item)}
        className="bg-[#FFC72C] p-2.5 rounded-[20px] justify-center items-center mx-2.5 mt-2.5"
      >
        {addedToCart ? (
          <View>
            <Text>Adding to cart...</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
