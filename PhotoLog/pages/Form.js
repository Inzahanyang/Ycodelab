import React, {useState} from 'react';
import styled from 'styled-components/native';
import storage from '../net/storage';
import uploadImage from '../net/uploadImage';

const Title = styled.Text`
  font-size: 36px;
`;
const Button = styled.Button``;
const Image = styled.Image`
  width: 100%;
  height: 360px;
`;
const Input = styled.TextInput`
  width: 100%;
  font-size: 16px;
  padding: 4px;
  border: 1px solid #e5e5e5;
`;

export default ({navigation}) => {
  const [url, setUrl] = useState(null);
  const [hashtags, setHashtags] = useState('');
  const selectImage = function () {
    uploadImage()
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <>
      <Button title="이미지 선택" onPress={selectImage} />
      {url && <Image source={{uri: url}} />}
      <Input
        placeholder="#해시태그"
        value={hashtags}
        onChangeText={(value) => setHashtags(value)}
      />
      <Button
        title="저장"
        onPress={() => {
          storage
            .append({
              url,
              hashtags,
            })
            .then(() => {
              navigation.goBack();
            });
        }}
      />
    </>
  );
};
