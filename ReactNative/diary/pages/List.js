import React, { useEffect } from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-community/async-storage";

const ListItem = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 0;
  border-bottom-color: #aaaaaa;
  border-bottom-width: 1px;
`;
const Label = styled.Text`
  font-size: 20px;
`;

// 구조 분해 할당, Destructuring Assignment
function List({ navigation }) {
  const [list, setList] = React.useState([]);

  const getData = async () => {
    try {
      const res = await AsyncStorage.getItem("list");
      if (res !== null) {
        setList(JSON.parse(res));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    getData();
  }, []);

  return (
    <Container>
      <Contents>
        {list
          .sort((a, b) => a.date > b.date)
          .map(item => {
            return (
              <ListItem
                key={item.date}
                onPress={() => navigation.navigate("Detail", { date: item.date })}
              >
                <Label>{item.date}</Label>
              </ListItem>
            );
          })}
      </Contents>
      <Button onPress={() => navigation.navigate("Form")}>새 일기 작성</Button>
    </Container>
  );
}

export default List;
