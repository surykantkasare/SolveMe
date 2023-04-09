import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import AppContext from "../../AppContext";

export default Quiz = ({ navigation }) => {
  const { url, category, setResult } = useContext(AppContext);
  const [questions, setQuestions] = useState(null);
  const [currQues, setCurrQues] = useState(null);
  const [loading, setLoading] = useState(null);
  const [answerLoaded, setAnswerLoaded] = useState({
    loaded: false,
    selectedAns: null,
    correctAns: null,
  });

  useEffect(() => {
    setResult({
      correct: 0,
      incorrect: 0,
      skipped: 0,
    });
    setAnswerLoaded({
      loaded: false,
      selectedAns: null,
      correctAns: null,
    });
    setQuestions(null);
    setCurrQues(0);
    fetchQuestions();

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to End the quiz?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            setResult({
              correct: 0,
              incorrect: 0,
              skipped: 0,
            });
            navigation.navigate("Results");
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  async function fetchQuestions() {
    setLoading(true);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code === 2) {
        throw "Failed";
      }
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      data.results.forEach((result) => {
        result.options = shuffle([
          ...result.incorrect_answers,
          result.correct_answer,
        ]);
      });
      setQuestions(data.results);
      setCurrQues(0);
    } catch (e) {
      console.log("Error", e);
      setQuestions(null);
      setCurrQues(0);
    }

    setLoading(false);
  }

  function loadAnswer(opt) {
    setAnswerLoaded({
      loaded: true,
      selectedAns: opt,
      correctAns: questions[currQues].correct_answer,
    });

    if (opt === questions[currQues].correct_answer) {
      setResult((prev) => ({
        ...prev,
        correct: prev.correct + 1,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
      }));
    }
  }
  function nextQuestion() {
    if (!answerLoaded.loaded) {
      setResult((prev) => ({
        ...prev,
        skipped: prev.skipped + 1,
      }));
    }

    if (currQues < questions.length - 1) {
      setCurrQues((prev) => prev + 1);
      setAnswerLoaded({
        loaded: false,
        selectedAns: null,
        correctAns: null,
      });
    } else {
      navigation.navigate("Results");
    }
  }

  const CategoryHeader = () => {
    return (
      <View style={styles.headerSubTextContainer}>
        <Text style={[styles.headerSubText, { fontSize: 50 }]}>
          {category.name}
        </Text>
      </View>
    );
  };
  const QuestionComponent = () => {
    return (
      <View style={[styles.questionContainer,{padding:5}]}>
        <Text style={styles.questionText}>
          Q.{decodeURIComponent(questions[currQues].question)}
        </Text>
      </View>
    );
  };
  const QuestionOptionsComponent = () => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.headerSubTextContainer}>
          <Text style={[styles.headerSubText, { fontSize: 50 }]}>Options</Text>
        </View>
        <View style={styles.optionBox}>
          {questions[currQues].options.map((option, indx) => {
            const isCorrect = answerLoaded.correctAns === option;
            const isSelected = answerLoaded.selectedAns === option;
            const backgroundColor = isCorrect
              ? "#86efac"
              : isSelected
              ? "#fca5a5"
              : "#fff";
            const textColor = isCorrect
              ? "#166534"
              : isSelected
              ? "#dc2626"
              : colors.dark;
            const borderColor = isCorrect
              ? "#166534"
              : isSelected
              ? "#dc2626"
              : colors.dark;

            return (
              <TouchableOpacity
                key={indx}
                onPress={() => loadAnswer(option)}
                style={[
                  styles.questionOption,
                  {
                    backgroundColor,
                    marginBottom: 16,
                    borderColor: borderColor,
                  },
                ]}
              >
                <Text style={{ fontSize: 14, color: textColor }}>
                  {decodeURIComponent(option)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };
  const QuestionCounterComponent = () => {
    return (
      <View style={styles.QCounter}>
        <Text style={styles.QCounterText}>
          {currQues + 1} of out {questions.length}
        </Text>
      </View>
    );
  };
  const ButtonNext = () => {
    return (
      <View style={styles.btnConatiner}>
        <TouchableOpacity
          style={[styles.questionButton, { backgroundColor: "#fff" }]}
          onPress={nextQuestion}
        >
          {answerLoaded.loaded ? (
            <AntIcon name="right" color="#166534" size={30} />
          ) : (
            <AntIcon name="close" color="#dc2626" size={30} />
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <Image
            source={require("../assets/images/loader.gif")}
            style={{ width: 32, height: 32 }}
          />
        </View>
      ) : !questions ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something Went Wrong!</Text>
          <TouchableOpacity style={styles.errorButton} onPress={fetchQuestions}>
            <Text style={styles.errorButtonText}>Try Again!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <CategoryHeader />
          <QuestionCounterComponent />
          <View style={styles.QuestionPage}>
            <QuestionComponent />
            <QuestionOptionsComponent />
          </View>
          <ButtonNext />
        </>
      )}
    </SafeAreaView>
  );
};

const colors = {
  blue: "lightblue",
  yellow: "#FFD60A",
  dark: "#096399",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'lightyellow',
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Iceland_400Regular",
  },
  errorButton: {
    backgroundColor: "yellow",
    width: 180,
    marginVertical: 12,
    padding: 8,
    borderRadius: 10,
  },
  errorButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  QuestionPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSubTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderBottomColor: colors.dark,
    backgroundColor: colors.blue,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  headerSubText: {
    color: colors.dark,
    textAlign: "center",
    fontFamily: "Iceland_400Regular",
    marginBottom: 15,
    position:'relative',
    top:8,
  },
  questionContainer: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  
  questionContainer: {
    width: "87%",
    marginVertical: 10,
    
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.dark,
  overflow:'hidden',
    paddingBottom:20,
  },
  optionBox: {
    paddingTop: 20,
  },
  questionOption: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
  },
  questionText: {
    fontSize: 18,
    color: colors.dark,
    textAlign: "justify",
    paddingHorizontal: 10,
  },
  questionButton: {
    padding: 16,
    borderRadius: 50,
    borderColor:colors.dark,
    borderWidth:2,
  },
  QCounter: {
    position: "relative",
   top:25,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  QCounterText: {
    color: colors.dark,
    fontSize: 30,
    fontFamily: "Iceland_400Regular",
  },
  btnConatiner: {
    position:'relative',
    bottom:40,
    width: "100%",
    alignItems: "center",
  },
});
