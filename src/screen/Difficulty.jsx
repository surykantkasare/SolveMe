import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import AppContext from "../../AppContext";
import Icon from "react-native-vector-icons/Feather";

const Difficulty = ({ navigation }) => {
  const { url, setUrl, difficulty, setDifficulty } = useContext(AppContext);
  const difficultyLevels = ["easy", "medium", "hard"];
  const DLevel = {
    easy: {
      color: "#86efac",
      img: (source = require("../assets/images/easy.gif")),
    },
    medium: {
      color: "#fde047",
      img: require("../assets/images/medium.gif"),
    },
    hard: {
      color: "#fca5a5",
      img: require("../assets/images/hard.gif"),
    },
  };
  function handleDifficulty(diff) {
    setDifficulty(diff);

    if (diff !== "easy" && url.includes(`&difficulty=easy`)) {
      setUrl((prev) => prev.replace("&difficulty=easy", `&difficulty=${diff}`));
      return;
    }
    if (diff !== "medium" && url.includes(`&difficulty=medium`)) {
      setUrl((prev) =>
        prev.replace("&difficulty=medium", `&difficulty=${diff}`)
      );
      return;
    }
    if (diff !== "hard" && url.includes(`&difficulty=hard`)) {
      setUrl((prev) => prev.replace("&difficulty=hard", `&difficulty=${diff}`));
      return;
    }

    setUrl((prev) => `${prev}&difficulty=${diff}`);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-left"
            size={40}
            color={colors.dark}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>SolveMe</Text>
      </View>
      <View style={styles.headerSubTextContainer}>
        <Text
          style={[styles.headerSubText, { fontSize: difficulty ? 50 : 40 }]}
        >
          {difficulty ? `${difficulty}` : `Choose a Difficulty Level`}
        </Text>
      </View>

      <View
        style={[
          styles.ImageContainer,
          { borderColor: difficulty ? DLevel[difficulty].color : colors.dark },
        ]}
      >
        {difficulty ? (
          <Image source={DLevel[difficulty].img} style={styles.gifImage} />
        ) : (
          <Image
            source={require("../assets/images/init.gif")}
            style={{ resizeMode: "contain", width: 288, height: 288 }}
          />
        )}
      </View>
      <View style={styles.difficultyBtnConatiner}>
        {difficultyLevels.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => handleDifficulty(level)}
            style={[
              styles.button,
              {
                borderColor: DLevel[level].color,
                backgroundColor:
                  difficulty === level ? DLevel[level].color : "#fff",
              },
            ]}
          >
            <Text
              style={{
                color: difficulty === level ? "#166534" : "#555",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}

        {difficulty && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.difficultyBtnConatiner,
                {
                  top: 10,
                },
              ]}
              onPress={() => navigation.navigate("Quiz")}
            >
              <Text
                style={[
                  styles.buttonText,
                  difficulty ? { color: DLevel[difficulty].color } : {},
                ]}
              >
                {" "}
                Start Quiz !
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Difficulty;

const colors = {
  blue: "lightblue",
  yellow: "#FFD60A",
  dark: "#096399",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
  header: {
    backgroundColor: "lightblue",
    minHeight: 80,
    width: "100%",
    borderBottomColor: colors.dark,
    borderBottomWidth: 3,
    justifyContent: "center",
    alignContent: "center",
  },

  backBtn: {
    position: "absolute",
    left: 10,
    top: 18,
    zIndex: 1,
  },
  headerText: {
    fontFamily: "Nabla_400Regular",
    fontSize: 50,
    textAlign: "center",
    color: colors.dark,
  },
  headerSubTextContainer: {
    marginHorizontal: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  headerSubText: {
    color: colors.dark,
    textAlign: "center",
    fontFamily: "Iceland_400Regular",
    marginBottom: 15,
  },
  ImageContainer: {
    marginHorizontal: "5%",
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
  },
  gifImage: {
    resizeMode: "contain",
    width: 288,
    height: 288,
  },
  difficultyBtnConatiner: {
    position: "relative",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "Iceland_400Regular",
    color: colors.dark,
  },
});
