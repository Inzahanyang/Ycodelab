import {withContext} from 'context-q';
import React, {useState} from 'react';
import {Switch, Text} from 'react-native';

export default withContext(({navigation, context}) => {
  const [checked, setChecked] = useState(context.showDate);
  return (
    <>
      <Text> 날짜 표시 </Text>
      <Switch
        value={checked}
        onValueChange={() => {
          setChecked(!checked);
          context.update({
            showDate: !checked,
          });
        }}
      />
    </>
  );
});
