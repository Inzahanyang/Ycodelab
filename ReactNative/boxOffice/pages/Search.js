import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import Title from '../components/Title';
import Row from '../components/Row';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  margin-left: 12px;
  padding: 0 12px;
`;

const Button = styled.Button``;

export default ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(() => {
    const getData = async () => {
      let url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=10a42b2c4a97462ff4b046b617627835&movieNm=${keyword}`;
      setIsLoading(true);
      try {
        const {
          data: {
            movieListResult: {movieList},
          },
        } = await axios.get(url);
        setIsLoading(false);
        setList(movieList);
      } catch (e) {
        alert(e.message);
      }
    };
    getData();
  }, [keyword]);

  return (
    <Container>
      <Title>검색</Title>
      <Row>
        <Input value={keyword} onChangeText={(value) => setKeyword(value)} />
        <Button title="search" onPress={search} />
      </Row>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        list.map((item) => (
          <ListItem
            key={item.movieCd}
            onPress={() => {
              navigation.navigate('MovieDetail', {movieCd: item.movieCd});
            }}>
            <MovieName>{item.movieNm}</MovieName>
          </ListItem>
        ))
      )}
    </Container>
  );
};
