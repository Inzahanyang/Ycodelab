import React, {useState, useCallback} from 'react';
import styled from 'styled-components/native';
import movieList from './movieList';
import _ from 'lodash';

function getInitials(string) {
  return string
    .split('')
    .map((char) => {
      const index = (char.charCodeAt(0) - 44032) / 28 / 21;
      if (index >= 0) return String.fromCharCode(index + 4352);
      return char;
    })
    .join('');
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  padding: 24px;
`;

const Quiz = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;
const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: fuchsia;
  justify-content: center;
  align-items: center;
`;
const Label = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`;

const App = () => {
  const [quizList, setQuizList] = useState(_.shuffle(movieList));
  const [mode, setMode] = useState('quiz');
  const onPress = useCallback(() => {
    if (mode === 'answer') {
      setQuizList(quizList.slice(1));
    }

    setMode(mode === 'quiz' ? 'answer' : 'quiz');
  }, [mode]);

  const retry = useCallback(() => {
    setQuizList(_.shuffle(movieList));
    setMode('quiz');
  }, [quizList]);

  return (
    <>
      <Container>
        <Contents>
          {quizList.length ? (
            <Quiz>
              {mode === 'quiz' ? getInitials(quizList[0]) : quizList[0]}
            </Quiz>
          ) : (
            <Quiz>퀴즈 끝</Quiz>
          )}
        </Contents>
        {quizList.length ? (
          <Button onPress={onPress}>
            <Label>{mode === 'quiz' ? '정답 확인' : '다음'}</Label>
          </Button>
        ) : (
          <Button onPress={retry}>
            <Label>처음부터 다시 시작</Label>
          </Button>
        )}
      </Container>
    </>
  );
};

export default App;
