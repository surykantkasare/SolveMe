import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import {
  useFonts,
  NotoSansGeorgian_800ExtraBold,
  Nabla_400Regular,
} from "@expo-google-fonts/dev";
const Home = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Nabla_400Regular,
    NotoSansGeorgian_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>SolveMe</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/intro.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Categories")}
        >
          <Text style={styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
// Define custom color values
const colors = {
  blue: "lightblue",
  yellow: "#FFD60A",
  dark: "#096399",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 30,
    position: "relative",
    top: 80,
  },
  title: {
    fontFamily: "Nabla_400Regular",
    fontSize: 70,
    textAlign: "center",
    color: colors.dark,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  button: {
    marginBottom: 20,
    backgroundColor: colors.yellow,
    width: 220,
    padding:30,
    borderRadius:3,
    borderWidth:2,
    position:'relative',
    bottom:90,
    borderColor:colors.dark,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: "auto",
    padding: 3,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "NotoSansGeorgian_800ExtraBold",
    color: colors.dark,
  },
});
