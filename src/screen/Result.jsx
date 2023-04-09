import React, { useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Image,
  TouchableOpacity,
  TextInputComponent,
} from "react-native";
import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
const Result = ({ navigation }) => {
  const { result, setUrl, setCategory, setDifficulty, setResult } =
    useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Categories"); // remove two screens i.e. Document and Camera
        setResult({
          correct: 0,
          incorrect: 0,
          skipped: 0,
        });
        setUrl("");
        setCategory(null);
        setDifficulty(null);
        return true; // disable normal behaviour
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress); // detect back button press
      return () => BackHandler.removeEventListener("hardwareBackPress");
    }, [])
  );
  const Header = () => {
    return (
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
    );
  };
  const Result = () => {
    let emojiSource = require("../assets/images/sad.gif");
    if (result.correct >= 8) {
      emojiSource = require("../assets/images/happy.gif");
    } else if (result.correct >= 5) {
      emojiSource = require("../assets/images/pleased.gif");
    }
    return (
      <View style={styles.resultContainer}>
        <View style={styles.emojicontainer}>
          <Image source={emojiSource} style={styles.emojiImage} />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {result.correct < 10 ? `0${result.correct}` : result.correct}
          </Text>
          <Text style={styles.scoreLabel}>Your Score</Text>
        </View>
      </View>
    );
  };
  const ScoreCard = ({ title, value, color }) => {
    return (
      <View style={styles.resultscoreContainer}>
        <View style={[styles.resultscoreCard, { borderColor: color }]}>
          <Text styles={styles.socreCardTitle}>{title}</Text>
          <Text styles={[styles.scoreCardValue]}>{value}</Text>
        </View>
      </View>
    );
  };
  const headlePlayAgainPress = () => {
    setResult({
      correct: 0,
      incorrect: 0,
      skipped: 0,
    });
    setUrl("");
    setCategory(null);
    setDifficulty(null);
    navigation.navigate("Categories");
  };
  const PlayAgainButon = ({onPress}) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Play Again !</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Result />
      <View style={{ marginTop: 8, marginBottom: 12 }}>
        <ScoreCard title="Total Questions " value="10" color={colors.dark} />
        <ScoreCard
          title="Correct Answers "
          value={result.correct}
          color="#16a34a"
        />
        <ScoreCard
          title="Incorrect Answers "
          value={result.incorrect}
          color="#dc2626"
        />
        <ScoreCard
          title="Skipped Questions "
          value={result.skipped}
          color="#eab308"
        />
      </View>
      <PlayAgainButon onPress={headlePlayAgainPress} />
    </SafeAreaView>
  );
};

export default Result;
// Define custom color values
const colors = {
  blue: "lightblue",
  yellow: "#FFD60A",
  dark: "#096399",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'lightyellow'
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
  resultContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  emojicontainer: {
    width: 120,
    height: 120,
    overflow: "hidden",
  },
  emojiImage: {
    width: 120,
    height: 120,
  },
  scoreContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  scoreText: {
    color: colors.dark,
    fontSize: 60,
  },
  scoreLabel: {
    textTransform: "uppercase",
    color: colors.dark,
  },
  resultscoreContainer: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 5,
  },
  resultscoreCard: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  socreCardTitle: {
    color: "#333",
  },
  socreCardValue: {
    fontFamily: "RubikDirt_400Regular",
  },
  button: {
    backgroundColor: colors.yellow,
    width: 220,
    padding: 30,
    borderRadius: 3,
    borderWidth: 2,
    position: "relative",
    borderColor: colors.dark,
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: "auto",
    padding: 3,
    borderRadius: 8,
    top:50,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "NotoSansGeorgian_800ExtraBold",
    color: colors.dark,
  },
});
