import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/${userId}`);
        const { user } = response.data;
        console.log(user);
        setUser(user);
      } catch (error) {
        console.log("error fetching useer details", error);
      }
    };

    fetchUserProfile();
  }, []);

  console.log(user);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log("error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView className="p-2.5 flex-1 bg-white">
      <Text className="text-center">Welcome {user?.name}</Text>

      <View className="flex-row items-center mt-3">
        <Pressable className="p-2.5 bg-[#E0E0E0] rounded-3xl flex-1 m-1">
          <Text className="text-center">Your orders</Text>
        </Pressable>

        <Pressable className="p-2.5 bg-[#E0E0E0] rounded-3xl flex-1">
          <Text className="text-center">Your Account</Text>
        </Pressable>
      </View>

      <View className="flex-row items-center mt-3">
        <Pressable className="p-2.5 bg-[#E0E0E0] rounded-3xl  flex-1 m-1">
          <Text className="text-center">Buy Again</Text>
        </Pressable>

        <Pressable
          className="p-2.5 bg-[#E0E0E0] rounded-3xl  flex-1"
          onPress={() => logout()}
        >
          <Text className="text-center">Logout</Text>
        </Pressable>
      </View>

      <ScrollView className="mb-2" showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text className="text-center text-base">Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              className="mt-5 p-4 m-2 border border-[#d0d0d0]mx-2.5 justify-center items-center"
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map((product) => (
                <View
                  className="my-2.5 flex-row px-3 flex justify-around items-center"
                  key={product._id}
                >
                  <Image
                    source={{ uri: product.image }}
                    className="w-[100px] h-[100px]"
                    style={{ resizeMode: "contain" }}
                  />
                  <View className="flex flex-col mx-14">
                    <Text numberOfLines={2} className="text-base font-normal">
                      Name : {product?.name}
                    </Text>
                    <Text className="text-base font-bold text-green-400">
                      Quantity : {product?.quantity}
                    </Text>
                    <Text className="text-2xl font-medium text-red-400">
                      Price : {product?.price}
                    </Text>
                  </View>
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
