import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from "react-native";
import styled from "styled-components/native";
import produce from "immer";

const Safe = styled.SafeAreaView`
  flex: 1;
`;
const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;
const TodoContainer = styled.ScrollView`
  flex: 1;
`;

const TodoArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TodoText = styled.Text`
  font-size: 20px;
  flex: 1;
`;
const MyID = styled.Text`
  color: #fff;
  font-size: 5px;
`;
const TodoDelete = styled.Button``;
const InputArea = styled.View`
  flex-direction: row;
  padding: 12px;
`;
const InputText = styled.TextInput`
  flex: 1;
  padding: 8px 24px;
  border: 2px solid #ccc;
  border-radius: 8px;
`;
const InputButton = styled.Button``;

const Check = styled.TouchableOpacity`
  margin: 0 10px;
`;

const CheckIcon = styled.Text`
  font-size: 30px;
`;

export default function App() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await AsyncStorage.getItem("list");
      setList(JSON.parse(res));
    };
    getData();
  }, []);
  const listStore = newList => {
    setList(newList);
    AsyncStorage.setItem("list", JSON.stringify(newList));
  };
  return (
    <Safe>
      <KeyboardAvoiding behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TodoContainer>
          {list.map(item => (
            <TodoArea key={item.id}>
              <Check
                onPress={() => {
                  listStore(
                    produce(list, draft => {
                      const index = list.indexOf(item);
                      draft[index].done = !draft[index].done; //toggle
                    })
                  );
                }}
              >
                <CheckIcon>{item.done ? "✅" : "☑️"}</CheckIcon>
              </Check>
              <TodoText>{item.todo}</TodoText>
              <TodoDelete
                title="DEL"
                color="mistyrose"
                onPress={() => listStore(list.filter(v => v.id !== item.id))}
              />
            </TodoArea>
          ))}
        </TodoContainer>
        <InputArea>
          <InputText
            value={inputText}
            onChangeText={value => setInputText(value)}
          />
          <InputButton
            title="전송"
            color="#000"
            onPress={() => {
              if (inputText === "") return;
              const newList = {
                id: new Date().getTime().toString(),
                todo: inputText,
                done: false,
              };
              listStore([...list, newList]);
              setInputText("");
            }}
          />
        </InputArea>
      </KeyboardAvoiding>
    </Safe>
  );
}
