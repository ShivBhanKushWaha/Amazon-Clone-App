import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import SplashScreen from "./SplashScreen";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // login using email and password
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    // send a post request to the backend API
    axios
      .post(`${BASE_URL}/login`, user)
      .then((res) => {
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((err) => {
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login failed", err);
      });
  };

  // check if there is already a token saved in the device iska use splash screen pr bhi kr skte hai ki user login hai ya nhi agr hai to bina login pagfe ke direct home dikhyege
  useEffect(() => {
    const checkingLoginStatus = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("authToken");

        if(!token){
          setLoading(false)
        }
        if (token) {
          setLoading(false);
          navigation.navigate("Main");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };

    checkingLoginStatus();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    // safeAreaview se keval view me dikhege mtlb top me header ne nhi ghusega
    // for icons https://icons.expo.fyi/
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
            Login In to your Account
          </Text>
        </View>

        <View className="mt-12">
          <View className="flex-row items-center justify-center p-3 content-center bg-[#D0D0D0] rounded-md mt-8">
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
          onPress={() => handleLogin()}
          className="bg-[#febe10] w-52 rounded-lg mx-auto p-4"
        >
          <Text className="text-center text-white font-bold text-base">
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          className="mt-4"
        >
          <Text className="text-center text-gray-400">
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
