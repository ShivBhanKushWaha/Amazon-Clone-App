import { ActivityIndicator, StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-whiteitems-center">
      <View className="flex flex-col items-center justify-center">
        <Image
          className="w-40 h-40"
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
        <ActivityIndicator size={30} color={"red"} />
        <Text className="text-center text-base text-red-400">
          We are loading....
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
