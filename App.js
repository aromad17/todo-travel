import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Touchable, TouchableOpacity, TouchableWithoutFeedback, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './colors';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
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
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working: working }
    }
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }
  console.log(toDos);

  const deletToDo = (key) => {
    Alert.alert("Delete to do", "are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: 'destructive',
        onPress: () => {
          const newToDos = { ...toDos }
          delete newToDos[key]
          setToDos(newToDos);
          saveToDos(newToDos);
        }
      }
    ])
  }

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
              <TouchableOpacity onPress={() => { deletToDo(key) }}>
                <Text>
                  <Fontisto name="trash" size={18} color={theme.trash} />
                </Text>
              </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  toDoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500
  },
});
