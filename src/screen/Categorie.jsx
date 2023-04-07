import { View, Text, StyleSheet,Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import categoriesData from "../../categories";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../../AppContext";
const Categorie = () => {
  const { baseUrl, setUrl, category, setCategory, setResult, setifficulty } =
    useContext(AppContext);
  function onCategoryyPress(ctg) {
    if (category && category.id === ctg.id) {
      setCategory(null);
      setUrl(baseUrl);
      return;
    }
    setCategory(ctg);
    setUrl(`${baseUrl}&category=${ctg.id}`);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>SolveMe</Text>
        </View>
        <View>
          <Text>Coose a category to start quiz</Text>
        </View>
      </View>
      <View style={styles.categorycontainer}>
        {categoriesData.map((ctg)=>{
          <TouchableOpacity
          key={categoriesData.id}
          onPress={()=>onCategoryyPress(ctg)}>
         <View style={styles.categoryIconContainer}>
          <Image source={ctg.img} style={styles.categoryIcon}/>
         </View>

          </TouchableOpacity>
        })}
      </View>
    </SafeAreaView>
  );
};

export default Categorie;
const styles = StyleSheet.create({});
