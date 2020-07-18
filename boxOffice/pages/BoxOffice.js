import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import Title from '../components/Title';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';
import fetch from '../net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Rank = styled.Text`
  font-size: 14px;
  color: #ccc;
  margin-right: 12px;
`;

const BoxOffice = ({navigation}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          boxOfficeResult: {dailyBoxOfficeList},
        } = await fetch(
          'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=10a42b2c4a97462ff4b046b617627835&targetDt=20200717',
        );
        setList(dailyBoxOfficeList);
      } catch (e) {
        alert(e.message);
      }
    };
    getData();
  }, []);
  return (
    <Container>
      <Title>Box Office</Title>
      {list.length === 0 && <ActivityIndicator size="large" />}
      {list.map((item) => (
        <ListItem
          key={item.movieCd}
          onPress={() => {
            navigation.navigate('MovieDetail', {movieCd: item.movieCd});
          }}>
          <Rank>{item.rank}</Rank>
          <MovieName>{item.movieNm}</MovieName>
        </ListItem>
      ))}
    </Container>
  );
};

export default BoxOffice;
