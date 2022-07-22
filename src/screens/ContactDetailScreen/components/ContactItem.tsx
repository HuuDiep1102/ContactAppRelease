import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {Linking, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Colors} from '@/themes/Colors';

interface ContactItemProps {
  types: string;
  title: string;
  icon: any;
  active: boolean | undefined;
  values: any;
}

export const ContactItem = memo((props: ContactItemProps) => {
  const {types, title, icon, active, values} = props;
  const [modalVisible, setModalVisible] = useState(false);

  const onLinking = useCallback(() => {
    if (!active) {
      return;
    }
    if (values.length === 1) {
      Linking.openURL(types + values[0]);
    } else setModalVisible(true);
  }, [active]);

  const onLinkingItem = useCallback(
    item => {
      Linking.openURL(types + item);
    },
    [values],
  );

  const onBackdrop = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <ContactItemContainer>
      <Modal
        style={styles.modal}
        isVisible={modalVisible}
        hasBackdrop={true}
        statusBarTranslucent={true}
        onBackdropPress={onBackdrop}>
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              {values?.map((item: any, index: number) => {
                return (
                  <InputContactButton
                    key={index}
                    onPress={() => onLinkingItem(item)}>
                    <ContactIconImageModal source={icon} />
                    <InputContact>{item}</InputContact>
                  </InputContactButton>
                );
              })}
            </InputContactContainer>
          </ModalView>
        </CenteredView>
      </Modal>

      <ContactIcon onPress={onLinking} isActive={active}>
        <ContactIconImage isActive={active} source={icon} />
      </ContactIcon>
      <ContactText isActive={active}>{title}</ContactText>
    </ContactItemContainer>
  );
});

const ContactItemContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
});

const CenteredView = styled.View`
  align-items: center;
  padding: 0 20px;
  padding-bottom: ${getBottomSpace()}px;
  background-color: ${Colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ModalView = styled.View`
  width: 120%;
  background-color: ${Colors.white};
  border-radius: 30px;
  padding-top: 10px;
  padding-left: 20px;
`;

const InputContactContainer = styled.View`
  background-color: ${Colors.white};
  border-radius: 15px;
  padding: 5px;
`;

const InputContactButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  align-items: center;
`;

const ContactIconImageModal = styled.Image`
  height: 28px;
  width: 28px;
  tint-color: ${Colors.yellowOrange};
`;

const InputContact = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.gray1};
  border-radius: 10px;
  padding-left: 10px;
`;

const ContactIcon = styled.TouchableOpacity<{
  isActive: boolean | undefined;
}>`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: ${p => (p.isActive ? 0 : 0.5)}px;
  border-color: ${Colors.gray};
  justify-content: center;
  align-items: center;
  background-color: ${p => (p.isActive ? Colors.yellowOrange : Colors.white)};
`;

const ContactIconImage = styled.Image<{
  isActive: boolean | undefined;
}>`
  height: 24px;
  width: 24px;
  tint-color: ${p => (p.isActive ? Colors.white : Colors.gray)};
`;

const ContactText = styled.Text<{
  isActive: boolean | undefined;
}>`
  font-weight: 400;
  font-size: 11px;
  align-self: center;
  padding: 10px;
  color: ${p => (p.isActive ? Colors.yellowOrange : Colors.gray)};
`;
