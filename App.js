import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

export default function App() {
  const [todoList, setTodoList] = useState([
    { text: "ahmed", state: false },
    { text: "tarek", state: true },
  ]);
  const [shown, setShown] = useState([]);
  const [todo, setTodo] = useState("");
  useEffect(() => {
    setShown(todoList);
  }, [todoList]);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.header}>BABY SHARK</Text>
            <Text style={styles.secondHeader}>TODO dodododoo</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Add to to-Do"
                value={todo}
                onChangeText={(text) => setTodo(text)}
              />
              <TouchableOpacity>
                <AntDesign
                  name="pluscircle"
                  size={50}
                  color="#c73214"
                  onPress={() => {
                    setTodoList([...todoList, { text: todo, state: false }]);
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShown([...todoList]);
                }}
              >
                <Text style={styles.buttonText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShown(todoList.filter((i) => i.state == false));
                }}
              >
                <Text style={styles.buttonText}>Active</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShown(todoList.filter((i) => i.state == true));
                }}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={shown}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
              onPress={() => {
                setTodoList(
                  todoList.map((i) => {
                    return i == item ? { ...i, state: !item.state } : i;
                  })
                );
              }}
            >
              <Text style={{ fontSize: 30, color: "white" }}>{item.text}</Text>
              {item.state ? (
                <Feather name="check-square" size={30} color="white" />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={30}
                  color="white"
                />
              )}
            </TouchableOpacity>
          );
        }}
        keyExtractor={(i) => i.text}
        contentContainerStyle={{
          alignItems: "flex-start",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02011a",
    // alignItems: "center",
    justifyContent: "center",
  },
  header: {
    color: "#c73214",
    fontSize: 50,
    fontWeight: "700",
    textAlign: "center",
  },
  headerContainer: {
    flex: 1,
  },
  flatList: {
    marginTop: 50,
    paddingHorizontal: 30,
  },
  secondHeader: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 40,
  },
  inputView: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonsContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#fff",
    flexBasis: 100,
    borderWidth: 1,
    height: 50,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  itemsView: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
