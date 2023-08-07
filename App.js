import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Touchable, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { theme } from './colors';
import { useState } from 'react';

export default function App() {

  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (e) => console.log(e);
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

      <TextInput
        style={styles.input}
        placeholder={working ? "Add a To Do" : "Where Do You Wanna Go?"}
        keyboardType='default'
        returnKeyType='done'
        placeholderTextColor="#cdcdcd"
        onChangeText={onChangeText}>

      </TextInput>

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
});
