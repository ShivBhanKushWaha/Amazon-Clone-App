import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import { BASE_URL } from "../config";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/addresses/${userId}`);
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await axios.post(`${BASE_URL}/orders`, orderData);
      if (response.status === 200) {
        navigation.navigate("Orders");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const pay = async () => {
    try {
      const options = {
        description: "Adding To Wallet",
        currency: "INR",
        name: "Amazon",
        key: "rzp_test_E3GWYimxN7YMk8",
        amount: total * 100,
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "RazorPay Software",
        },
        theme: { color: "#F37254" },
      };

      const data = await RazorpayCheckout.open(options);

      console.log(data);

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: paymentMethod,
      };

      const response = await axios.post(`${BASE_URL}/orders`, orderData);
      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <ScrollView className="mt-10">
      {/* top numbering of pages means current status */}
      <View className="flex-1 px-5 pt-10">
        <View className="flex-row items-center mb-5 justify-between">
          {steps?.map((step, index) => (
            <View className="justify-center items-center">
              {index > 0 && (
                <View
                  className="flex-1 h-[2px] bg-green-600"
                  style={[index <= currentStep && { backgroundColor: "green" }]}
                />
              )}
              <View
                className="w-6 h-6 rounded-[15px] bg-[#ccc] justify-center items-center"
                style={[index < currentStep && { backgroundColor: "green" }]}
              >
                {index < currentStep ? (
                  <Text className="text-base font-bold text-white">
                    &#10003;
                  </Text>
                ) : (
                  <Text className="text-base font-bold text-white">
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text className="text-center mt-2">{step.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* according to indexes and staus show that pages */}
      {currentStep == 0 && (
        <View className="mx-5">
          <Text className="text-base font-bold">Select Delivery Address</Text>

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                className="border border-[#D0D0D0] p-2.5 flex-row items-center pb-4 my-2 rounded-md"
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAdress(item)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}

                <View className="ml-5">
                  <View className="flex-row items-center gap-3">
                    <Text className="text-base font-bold">{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text className="text-base text-[#181818]">
                    {item?.houseNo}, {item?.landmark}
                  </Text>

                  <Text className="text-base text-[#181818]">
                    {item?.street}
                  </Text>

                  <Text className="text-base text-[#181818]">
                    Bharat, Hamirpur
                  </Text>

                  <Text className="text-base text-[#181818]">
                    phone No : {item?.mobileNo}
                  </Text>
                  <Text className="text-base text-[#181818]">
                    pin code : {item?.postalCode}
                  </Text>

                  <View className="flex-row items-center gap-2.5 mt-2">
                    <Pressable className="bg-[#F5F5F5] py-2 px-2.5 rounded-md border border-[#D0D0D0]">
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable className="bg-[#F5F5F5] py-2 px-2.5 rounded-md border border-[#D0D0D0]">
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable className="bg-[#F5F5F5] py-2 px-2.5 rounded-md border border-[#D0D0D0]">
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>

                  <View>
                    {selectedAddress && selectedAddress._id === item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        className="bg-[#008397] p-2.5 rounded-xl justify-center items-center mt-2.5"
                      >
                        <Text className="text-center text-white">
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View className="mx-5">
          <Text className="text-[20px] font-bold">
            Choose your delivery options
          </Text>

          <View className="flex-row items-center bg-white p-2 gap-2 border-[#D0D0D0] border mt-2.5">
            {option ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text className="flex-1">
              <Text className="text-green font-medium">Tomorrow by 10pm</Text> -
              FREE delivery with your Prime membership
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            className="bg-[#FFC72C] p-2.5 rounded-3xl justify-center items-center mt-4"
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View className="mx-5">
          <Text className="text-[20px] font-bold">
            Select your payment Method
          </Text>

          <View className="bg-white p-3 border-[#D0D0D0] border flex-row mt-3">
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="gray"
              />
            )}
            <Text className="pl-3">Cash on Delivery</Text>
          </View>

          <View className="bg-white p-3 border-[#D0D0D0] border flex-row mt-3">
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption("card");
                  Alert.alert("UPI/Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      text: "OK",
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text className="pl-3">UPI / Credit or debit card</Text>
          </View>

          {selectedOption ? (
            <Pressable
              onPress={() => setCurrentStep(3)}
              className="bg-[#FFC72C] p-2.5 rounded-3xl justify-center items-center mt-5"
            >
              <Text>Continue with {selectedOption} </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                Alert.alert("Please Choose", "Select an options given above")
              }
              className="bg-[#FFC72C] p-2.5 rounded-3xl justify-center items-center mt-4"
            >
              <Text>Choose an options</Text>
            </Pressable>
          )}
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View className="mx-5">
          <Text className="text-[20px] font-bold">Order Now</Text>

          <View className="flex-row items-center justify-between bg-white p-2 border-[#D0D0D0] border mt-2.5">
            <View>
              <Text className="text-base font-bold">
                Save 5% and never run out
              </Text>
              <Text className="text-[15px] text-gray-600 mt-1.5">
                Turn on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>

          <View className="bg-white p-2 border-[#D0D0D0] border mt-2.5">
            <Text>Shipping to {selectedAddress?.name}</Text>

            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-base font-medium text-gray-600">Items</Text>

              <Text style={{ color: "gray", fontSize: 16 }}>₹ {total}</Text>
            </View>

            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-base font-medium text-gray-600">
                Delivery charges
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
            </View>

            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-[20px] font-bold">Order Total</Text>

              <Text className="text-red-700 text-base font-bold">
                ₹ {total}
              </Text>
            </View>
          </View>

          <View className="bg-white p-2 border-[#D0D0D0] border mt-2.5">
            <Text className="text-base text-gray-500">Pay With</Text>

            <Text className="text-base font-semibold mt-2">
              Pay on delivery (Cash)
            </Text>
          </View>

          <Pressable
            className="bg-[#FFC72C] p-2.5 rounded-[20px] justify-center items-center mt-5"
            onPress={() => handlePlaceOrder()}
          >
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
