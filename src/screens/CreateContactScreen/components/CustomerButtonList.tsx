import {PLUS_ICON, REMOVE_ICON} from '@/assets';
import React, {useState, useCallback, memo} from 'react';
import styled from 'styled-components/native';
import {CustomerInput} from './CustomerInput';
import {StyleSheet} from 'react-native';
import {Colors} from '@/themes/Colors';

interface CustomerButtonListProps {
  title: string;
  setParams: (prev: any) => void;
  data: string[];
  keyName: string;
  keyboardType: any;
}

interface CustomerCellProps {
  onRemove: (index: number) => void;
  index: number;
  data: string[];
  setParams: (prev: any) => void;
  keyboardType: any;
  keyName: string;
  autoFocus: boolean;
  title: string;
}

const Cell = (props: CustomerCellProps) => {
  const {
    onRemove,
    index,
    data,
    setParams,
    keyboardType,
    keyName,
    autoFocus,
    title,
  } = props;

  const onValueChange = useCallback((keyName: string, value: string) => {
    setParams((prev: any) => {
      let _arr = [...prev[keyName]];
      _arr[index] = value;
      return {
        ...prev,
        [keyName]: _arr,
      };
    });
  }, []);

  const onRemoveItem = useCallback(() => {
    onRemove(index);
  }, []);

  return (
    <InputContainerView>
      <InputContainer onPress={onRemoveItem}>
        <PlusIcon source={REMOVE_ICON} />
      </InputContainer>
      <CustomerInput
        style={styles.customInput}
        placeholder={title}
        value={data[index]}
        onValueChange={onValueChange}
        placeholderTextColor={'#BDBDBD'}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        keyName={keyName}
      />
    </InputContainerView>
  );
};

export const CustomerButtonList = memo((props: CustomerButtonListProps) => {
  const {title, setParams, data, keyName, keyboardType} = props;
  const [array, setArray] = useState<string[]>([]);

  const addNewValue = useCallback(() => {
    setParams((prev: any) => {
      let _arr = [...prev[keyName]];
      _arr.push('');
      return {...prev, [keyName]: _arr};
    });
  }, [array]);

  const onRemove = useCallback(
    (index: number) => {
      setParams((prev: any) => {
        const oldArray = [...data];
        const newArray = oldArray.filter((_item, _index) => _index !== index);
        return {...prev, [keyName]: newArray};
      });
    },
    [data],
  );

  return (
    <Container>
      {/*Bao loi Object underfined thi them dau hoi cham*/}
      {data?.map((item, index) => {
        return (
          <Cell
            key={index}
            autoFocus={item === ''}
            onRemove={onRemove}
            index={index}
            data={data}
            setParams={setParams}
            keyName={keyName}
            keyboardType={keyboardType}
            title={title}
          />
        );
      })}
      <ButtonContactContainer onPress={addNewValue}>
        <PlusIcon source={PLUS_ICON} />
        <ButtonContactText>{title}</ButtonContactText>
      </ButtonContactContainer>
    </Container>
  );
});

const Container = styled.View`
  background-color: ${Colors.white};
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
`;

const PlusIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const ButtonContactText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${Colors.darkCharcoal};
  padding-left: 17px;
`;

const ButtonContactContainer = styled.TouchableOpacity`
  height: 44px;
  width: 90%;
  background-color: ${Colors.white};
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.chineseWhite};
`;

const InputContainer = styled.TouchableOpacity`
  width: 50px;
  height: 40px;
  margin-left: -10px;
  padding-left: 10px;
  justify-content: center;
`;

const InputContainerView = styled.View`
  height: 44px;
  width: 90%;
  background-color: ${Colors.white};
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.chineseWhite};
`;

const styles = StyleSheet.create({
  customInput: {
    width: '93%',
    color: Colors.bleuDeFrance,
    fontWeight: '400',
    fontSize: 15,
  },
});
