import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../config";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error while getting address in add address screen", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  console.log("add address screen addresses ->", addresses);
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="mt-8">
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
      <View className="p-2.5">
        <Text className="text-[20px] font-bold">Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("AddAddress")}
          className="flex-row items-center justify-between mt-2.5 border-[#D0D0D0] border-t border-b py-2"
        >
          <Text>Add a New Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* all the added adresses */}
          {addresses?.map((item, index) => (
            <Pressable
              key={index}
              className="border border-[#D0D0D0] p-2.5 flex-col my-2.5"
            >
              <View className="flex-row items-center">
                <Text className="text-base font-bold">{item?.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text className="text-base font-bold">
                {item?.houseNo}, {item?.landmark}
              </Text>

              <Text className="text-base font-bold">{item?.street}</Text>

              <Text className="text-base font-bold">bharat, Hamirpur</Text>

              <Text className="text-base font-bold">
                phone No : {item?.mobileNo}
              </Text>
              <Text className="text-base font-bold">
                pin code : {item?.PostalCode}
              </Text>

              <View className="flex-row items-center mt-2 ">
                <Pressable className="bg-[#F5F5F5] px-2.5 py-2 border rounded border-[#D0D0D0] mr-4">
                  <Text>Edit</Text>
                </Pressable>

                <Pressable className="bg-[#F5F5F5] px-2.5 py-2 border rounded border-[#D0D0D0] mr-4">
                  <Text>Remove</Text>
                </Pressable>

                <Pressable className="bg-[#F5F5F5] px-2.5 py-2 border rounded border-[#D0D0D0]">
                  <Text>Set as Default</Text>
                </Pressable>
              </View>

            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
