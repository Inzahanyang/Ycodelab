import {withContext} from 'context-q';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import storage from '../net/storage';

const Title = styled.Text`
  font-size: 36px;
`;
const Button = styled.Button``;
const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-bottom-width: 1px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Thumbnail = styled.Image`
  width: 80px;
  height: 80px;
`;
const Tags = styled.Text``;

const Date = styled.Text`
  color: #ccc;
  font-size: 14px;
  text-align: center;
  margin-right: 12px;
`;

export default withContext(({navigation, context}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      storage.readAll().then((data) => setList(data));
    });
    storage.readAll().then((data) => setList(data));
    return () => unsubscribe();
  }, []);
  return (
    <>
      {list.map((item) => (
        <ListItem
          key={item.id}
          onPress={() => {
            navigation.navigate('View', {id: item.id});
          }}>
          <Row>
            <Thumbnail source={{uri: item.url}} />
            <Tags>{item.hashtags}</Tags>
          </Row>
          {context.showDate && (
            <Date>{moment(item.id, 'x').format('YYYY-MM-DD')}</Date>
          )}
        </ListItem>
      ))}
      <Button
        title="신규 작성"
        onPress={() => {
          navigation.navigate('Form');
        }}
      />
      <Button
        title="설정"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </>
  );
});
