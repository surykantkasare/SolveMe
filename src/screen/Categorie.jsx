import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageComponent,
} from "react-native";
import React, { useContext } from "react";
import categoriesData from "../../categories";
import AppContext from "../../AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Iceland_400Regular,
  Nabla_400Regular,
  Judson_400Regular,
} from "@expo-google-fonts/dev";

const Categorie = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Nabla_400Regular,
    Iceland_400Regular,
    Judson_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const { baseUrl, setUrl, category, setCategory, setResult, setDifficulty } =
    useContext(AppContext);
  function onCategoryPress(ctg) {
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
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>SolveMe</Text>
        </View>
        <View style={styles.headerSubTextContainer}>
          <Text style={[styles.headerSubText,  {fontSize:category?50:40},category?{bottom:20}:{}]}>
            {category ? `${category.name}` : `Choose a category to start Quiz`}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.categoriesContainer,
          {
            marginTop: category ? -100 : -50,
          },
        ]}
      >
        {categoriesData.map((ctg) => {
          return (
            <TouchableOpacity
              key={ctg.id}
              onPress={() => onCategoryPress(ctg)}
              style={[
                styles.category,
                {
                  backgroundColor:
                    category?.id === ctg.id ? colors.blue : "lightyellow",
                },
              ]}
            >
              <View style={styles.categoryImageContainer}>
                <Image source={ctg.img} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{ctg.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {category && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Difficulty")}
          >
            <Text style={styles.buttonText}>Next!</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Categorie;

const colors = {
  primary: "#b2e4d0",
  blue: "lightblue",
  yellow: "#FFD60A",
  dark: "#096399",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    backgroundColor:'lightyellow',
  },
  header: {
    backgroundColor: "lightblue",
    minHeight: 350,
    width: "100%",
    borderBottomColor: colors.dark,
    borderBottomWidth: 5,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  headerTextContainer: {
    paddingtop: 6,
    position:'relative',
    top:60,
  },
  headerText: {
    fontFamily: "Nabla_400Regular",
    fontSize: 70,
    textAlign: "center",
    color: colors.dark,
  },
  headerSubTextContainer: {
    marginHorizontal: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position:'relative',
  },
  headerSubText: {
    color: colors.dark,
    textAlign: "center",
    fontFamily: "Iceland_400Regular",
  
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  category: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    margin: 4,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 8,
    padding: 2,
  },
  categoryImageContainer: {
    width: 75,
    width: 75,
    borderRadius: 37.5,
    marginHorizontal: "auto",
  },
  categoryImage: {
    width: 75,
    height: 75,
  },
  categoryText: {
    color: "black",
    textAlign: "center",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  button: {
    marginBottom: 20,
    backgroundColor: colors.yellow,
    width: 220,
    padding: 30,
    borderRadius: 3,
    borderWidth: 1,
    position: "relative",
    top:10,
    borderColor: colors.dark,
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Iceland_400Regular",
    color: colors.dark,
  },
});
