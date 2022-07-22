import * as React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {memo} from 'react';
import {Colors} from '@/themes/Colors';

interface CustomInputProps extends TextInputProps {
  keyName: string;
  onValueChange: (keyName: string, value: string) => void;
}

export const CustomerInput = memo((props: CustomInputProps) => {
  const {keyName, onValueChange, ...remainingProps} = props;

  const onChangeText = (value: string) => {
    onValueChange(keyName, value);
  };

  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      {...remainingProps}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 44,
    color: Colors.darkCharcoal,
  },
});
