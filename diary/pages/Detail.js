import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-community/async-storage";

const Text = styled.Text`
  font-size: 20px;
  line-height: 28px;
`;

function Detail({ navigation, route }) {
  navigation.setOptions({ title: route.params.date });
  const [text, setText] = useState([]);
  const getData = async () => {
    const res = await AsyncStorage.getItem("list");
    const data = JSON.parse(res).find(data => data.date === route.params.date);
    setText(data.text);
  };
  useEffect(() => {
    getData();
  });
  return (
    <Container>
      <Contents>
        <Text>{text}</Text>
      </Contents>
    </Container>
  );
}

export default Detail;
