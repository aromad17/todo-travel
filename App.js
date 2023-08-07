import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Touchable, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { theme } from './colors';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const STORAGE_KEY = "@toDos";
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const [text, setText] = useState("");
  const onChangeText = (payload) => setText(payload);
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, [])

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
  }

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // const newToDos = Object.assign(
    //   {},
    //   toDos,
    //   { [Date.now()]: { text, work: working } }
    // );
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working: working }
    }
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }
  console.log(toDos);



  return (
    <View style={styles.container}>
      <StatusBar style='auto'></StatusBar>

      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: working ? theme.grey : "white" }}>Travel</Text>
        </TouchableOpacity>

      </View>

      <TextInput style={styles.input}
        onSubmitEditing={addToDo}
        placeholder={working ? "Add a To Do" : "Where Do You Wanna Go?"}
        keyboardType='default'
        returnKeyType='done'
        placeholderTextColor="#cdcdcd"
        onChangeText={onChangeText}
        value={text}
      >

      </TextInput>
      <ScrollView>
        {
          Object.keys(toDos).map((key) =>

          (toDos[key].working === working ?
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
            : null
          )

          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 44,
    fontWeight: 600,
    color: "white",
  },
  input: {
    marginTop: 30,
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500
  },
});
