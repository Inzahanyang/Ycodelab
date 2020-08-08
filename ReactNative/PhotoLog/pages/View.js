import {withContext} from 'context-q';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import storage from '../net/storage';
const Title = styled.Text`
  font-size: 36px;
`;

const Image = styled.Image`
  width: 100%;
  height: 360px;
`;
const Tags = styled.Text`
  font-size: 18px;
`;

const Date = styled.Text`
  color: #ccc;
  font-size: 14px;
  text-align: center;
`;

export default withContext(({route, context}) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    storage.readById(route.params.id).then((data) => setItem(data));
  });
  return (
    <>
      {item && (
        <>
          <Image source={{uri: item.url}} />
          {context.showDate && (
            <Date>{moment(item.id, 'x').format('YYYY-MM-DD')}</Date>
          )}
          <Tags>{item.hashtags}</Tags>
        </>
      )}
    </>
  );
});
