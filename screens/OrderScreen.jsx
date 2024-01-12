import { StyleSheet, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main");
    }, 1500);
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <LottieView
        source={require("../assets/thumbs.json")}
        ref={animation}
        className="h-[200px] w-[300px] items-start mt-10 justify-center"
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text className="mt-5 text-[20px] font-semibold text-center">
        Your Order Has been Recieved
      </Text>
      <LottieView
        className="h-[300px] absolute top-[100px] w-[300px] items-center"
        source={require("../assets/sparkle.json")}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
