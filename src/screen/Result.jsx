import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext } from "react";
import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";
const Result = ({ navigation }) => {
  const { result, setUrl, setCategory, setDiffficulty, steResult } =
    useContext(AppContext);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Categories"); // Back Categories
        steResult({
          correct: 0,
          incorrect: 0,
          skipped: 0,
        });
        setUrl("");
        setCategory(null);
        setDiffficulty(null);
        return true; // disable normal behavior
      };
      BackHandler.addEventListner("hardwaeBackPres", onBackPress); // detect back button press
      return () => BackHandler.removeEventListener("hardwareBackPress");
    }, [])
  );

  return (
    <SAfeAreaView style={styles.container}>

      
    </SAfeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({});
