import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import moment from 'moment';
import {ActivityIndicator} from 'react-native';
import fetch from '../net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`;

const Description = styled.Text`
  font-size: 18px;
  margin: 12px;
  line-height: 28px;
`;

const Back = styled.TouchableOpacity`
  height: 50px;
  padding: 12px;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;

const BackLabel = styled.Text`
  font-size: 18px;
  color: #0000cc;
`;

const Header = styled.View`
  height: 50px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Temp = styled.Button``;

const MovieDetail = ({navigation, route}) => {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=10a42b2c4a97462ff4b046b617627835&movieCd=${route.params.movieCd}`;
        const {
          movieInfoResult: {movieInfo},
        } = await fetch(url);
        setInfo(movieInfo);
      } catch (e) {
        alert(e.message);
      }
    };
    getData();
  }, []);
  return (
    <Container>
      <Header>
        <Back onPress={() => navigation.goBack()}>
          <BackLabel>🔙</BackLabel>
        </Back>
        <HeaderTitle>영화 상세 정보</HeaderTitle>
      </Header>
      <Contents>
        {info === null ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Title>{info.movieNm}</Title>
            <Description>제작년도: {info.prdtYear} 년</Description>
            <Description>
              개봉일:{' '}
              {moment(info.openDt, 'YYYYMMDD').format('YYYY년 MM월 DD일')}
            </Description>
            <Description>상영시간: {info.showTm}</Description>
            <Description>
              국가: {info.nations.map((item) => item.nationNm).join(', ')}
            </Description>
            <Description>
              국가: {info.directors.map((item) => item.peopleNm).join(', ')}
            </Description>
            <Description>
              출연: {info.actors.map((item) => item.peopleNm).join(', ')}
            </Description>
          </>
        )}
        <Temp
          title="메인으로"
          onPress={() => navigation.navigate('BoxOffice')}
        />
      </Contents>
    </Container>
  );
};

export default MovieDetail;
