import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../config";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a post request to the backend API
    axios
      .post(`${BASE_URL}/register`, user)
      .then((res) => {
        Alert.alert(
          "Registered Successfull",
          "You have registered successfully"
        );

        setName("");
        setPassword("");
        setEmail("");
        navigation.navigate("Login");
      })
      .catch((err) => {
        Alert.alert(
          "Registration Error",
          "An error occured during registration"
        );
        console.log("registration failed", err);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View>
        <Image
          className="w-40 h-40"
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View className="items-center">
          <Text className="font-bold text-lg mt-3 text-[#041E42]">
            Register to create an account
          </Text>
        </View>

        <View className="mt-12">
          <View className="flex-row items-center justify-center content-center bg-[#D0D0D0] rounded-md p-3 mt-8">
            <Ionicons name="person-sharp" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              className="pl-4 text-gray-950 w-80 text-[16px]"
              placeholder="Enter your name"
            />
          </View>
        </View>

        <View className="mt-1">
          <View className="flex-row items-center justify-center content-center bg-[#D0D0D0] rounded-md p-3 mt-8">
            <MaterialCommunityIcons
              style={{ color: "gray" }}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="pl-4 text-gray-950 w-80 text-[16px]"
              placeholder="Enter your email"
            />
          </View>
        </View>

        <View className="mt-1">
          <View className="flex-row items-center justify-center content-center bg-[#D0D0D0] rounded-md p-3 mt-8">
            <AntDesign
              name="lock"
              style={{ color: "gray" }}
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              className="pl-4 text-gray-950 w-80 text-[16px]"
              placeholder="Enter your password"
            />
          </View>
        </View>

        <View className="mt-3 flex-row items-center justify-between">
          <Text>Keep me logged in</Text>
          <Text className="text-[#007fff] font-bold">Forget password</Text>
        </View>

        <View className="mt-[80px]" />

        <Pressable
          onPress={() => handleRegister()}
          className="bg-[#febe10] w-52 rounded-lg mx-auto p-4"
        >
          <Text className="text-center text-white font-bold text-base">
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          className="mt-4"
        >
          <Text className="text-center text-gray-400">
            Already have an account Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
