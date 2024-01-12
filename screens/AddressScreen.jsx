import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config";


const AddressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState({
    name: "",
    mobileNo: "",
    houseNo: "",
    street: "",
    landMark: "",
    city: "",
    country: "Bharat",
    PostalCode: "",
  });

  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }

    fetchUser();
  },[]);

  const handleAddAddress = () => {
    const addressData = {
      name: address.name,
      mobileNo: address.mobileNo,
      houseNo: address.houseNo,
      street: address.street,
      landMark: address.landMark,
      city: address.city,
      country: address.country,
      PostalCode: address.PostalCode,
    };
    
    axios.post(`${BASE_URL}/addresses`,{userId,address:addressData }).then((res) => {
      Alert.alert("Success","Address added successfully");
      setAddress({
        name: "",
        mobileNo: "",
        houseNo: "",
        street: "",
        landMark: "",
        city: "",
        country: "",
        PostalCode: "",
      });

      setTimeout(() => {
        navigation.navigate('Address')
      },5000)
    }).catch((err) => {
      Alert.alert('Error','Failded to add the new address')
      console.log(err)
    })
  };

  return (
    <ScrollView className="mt-10">
      {/* signle view */}
      <View className="h-4 bg-[#00CED1]" />

      <View className="p-2.5">
        <Text className="text-lg font-bold">Add a new Address</Text>
        <TextInput
          placeholder="Bharat"
          value={address.country}
          placeholderTextColor={"black"}
          className="p-2.5 border-[#D0D0D0] border rounded my-2"
        />

        <View className="my-1.5">
          <Text className="text-base font-bold">
            Full name(first and last name)
          </Text>
          <TextInput
            onChangeText={(text) => setAddress({ ...address, name: text })}
            value={address.name}
            placeholder="Enter your name"
            placeholderTextColor={"black"}
            className="p-2.5 border-[#D0D0D0] border rounded mt-2"
          />
        </View>

        <View className="my-1">
          <Text className="text-base font-bold">Mobile Number</Text>
          <TextInput
            onChangeText={(text) => setAddress({ ...address, mobileNo: text })}
            value={address.mobileNo}
            placeholder="Mobile No."
            placeholderTextColor={"black"}
            className="p-2.5 border-[#D0D0D0] border rounded mt-2"
          />
        </View>

        <View className="my-1">
          <Text className="text-base font-bold">
            Flat/House no./Building/Company
          </Text>
          <TextInput
            onChangeText={(text) => setAddress({ ...address, houseNo: text })}
            value={address.houseNo}
            placeholder=""
            placeholderTextColor={"black"}
            className="p-2.5 border-[#D0D0D0] border rounded mt-2"
          />
        </View>

        <View className="my-1">
          <Text className="text-base font-bold">City</Text>
          <TextInput
            onChangeText={(text) => setAddress({ ...address, city: text })}
            value={address.city}
            placeholder="City"
            placeholderTextColor={"black"}
            className="p-2.5 border-[#D0D0D0] border rounded mt-2"
          />
        </View>

        <View className="my-1">
          <Text className="text-base font-bold">
            Area/Street/Sector/Village Name
          </Text>
          <TextInput
            onChangeText={(text) => setAddress({ ...address, street: text })}
            value={address.street}
            placeholder=""
            placeholderTextColor={"black"}
            className="p-2.5 border-[#D0D0D0] border rounded mt-2"
          />
        </View>

        <View className="my-1">
          <Text className="text-base font-bold">Landmarks</Text>
          <TextInput
            onChangeText={(text) => setAddress({ ...address, landMark: text })}
            value={address.landMark}
            placeholder=""
            placeholderTextColor={"black"}
            className="p-2.5 border-[#D0D0D0] border rounded mt-2"
          />
        </View>

        <View className="my-1">
          <Text className="text-base font-bold">Pincode</Text>
          <TextInput
            onChangeText={(text) => setAddress({ ...address, PostalCode: text })}
            value={address.PostalCode}
            placeholder=""
            placeholderTextColor={"black"}
            className="p-2.5 border-[#D0D0D0] border rounded mt-2"
          />
        </View>

        <Pressable
          onPress={() => handleAddAddress()}
          className="bg-[#ffc72c] p-4 justify-center items-center mt-5"
        >
          <Text className="font-bold text-lg">Add Addrress</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
