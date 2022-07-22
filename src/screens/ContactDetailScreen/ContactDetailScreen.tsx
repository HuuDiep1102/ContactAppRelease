/////ContactDetail
import React, {memo, useCallback, useState, useMemo} from 'react';
import styled from 'styled-components/native';
import {
  ARROW_ICON,
  AVATAR_DEFAULT_ICON,
  FACETIME_ICON,
  MAIL_ICON,
  MESSAGE_ICON,
  PHONE_ICON,
} from '@/assets';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import {ContactItem} from '@/screens/ContactDetailScreen/components/ContactItem';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/themes/Colors';
import {goBack, navigateToCreateContactScreen} from '@/utils/navigation';

import {removeContact, useContactByKey} from '@/store/contact';
import Modal from 'react-native-modal';
import {css} from 'styled-components';
import {DetailScreenProps, RawContact} from '@/types';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useNavigationParams} from '@/hooks/useNavigationParams';

const imageDefault = Image.resolveAssetSource(AVATAR_DEFAULT_ICON).uri;

export const ContactDetailScreen = memo(() => {
  const [modalVisible, setModalVisible] = useState(false);

  const params = useNavigationParams<DetailScreenProps>();

  const contact: RawContact | undefined = useContactByKey(params?.id);

  const isHaveEmailList = useMemo(() => {
    return contact && contact.emailList.length > 0;
  }, [contact?.emailList]);

  const isHavePhoneNumberList = useMemo(() => {
    return contact && contact?.phoneNumberList?.length > 0;
  }, [contact?.phoneNumberList]);

  const onRemoveContact = useCallback(() => {
    return Alert.alert('Nhắc nhở', 'Bạn có chắc chắn muốn xoá liên hệ?', [
      {
        text: 'Yes',
        onPress: () => {
          removeContact(contact?.id);
          goBack();
        },
      },
      {
        text: 'No',
      },
    ]);
  }, [removeContact]);

  const onNavToCreateContactScreen = useCallback(() => {
    navigateToCreateContactScreen({
      contact,
      id: contact?.id,
    });
  }, [navigateToCreateContactScreen, contact, contact?.id]);

  const onBackdrop = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onSendMessage = useCallback(
    phoneNumber => {
      if (contact?.phoneNumberList && contact?.phoneNumberList.length > 1) {
        setModalVisible(true);
        return;
      } else Linking.openURL(`sms:${phoneNumber}`);
      setModalVisible(false);
    },
    [contact?.phoneNumberList],
  );

  const onLinkingTel = useCallback(
    async phoneNumber => {
      await Linking.openURL(`tel:${phoneNumber}`);
    },
    [contact?.phoneNumberList],
  );

  const onLinkingMess = useCallback(
    async phoneNumber => {
      await Linking.openURL(`sms:${phoneNumber}`);
    },
    [contact?.phoneNumberList],
  );

  const onLinkingMail = useCallback(
    async email => {
      await Linking.openURL(`mailto:${email}`);
    },
    [contact?.emailList],
  );

  return (
    <Container>
      <HeaderView />
      <HeaderContainerUpdate>
        <DrawButton onPress={goBack}>
          <HeaderImage source={ARROW_ICON} />
        </DrawButton>
        <CreateContactButton onPress={onNavToCreateContactScreen}>
          <HeaderText>Sửa</HeaderText>
        </CreateContactButton>
      </HeaderContainerUpdate>
      <FlatList
        data={[{}]}
        ListHeaderComponent={
          <>
            <HeaderContainer>
              <AvatarContainer>
                <FastImage
                  style={styles.avatar}
                  source={{
                    uri: contact?.avatar ? contact?.avatar : imageDefault,
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                />
              </AvatarContainer>

              <InfoContainer>
                <InfoName>
                  {contact?.value} {contact?.firstName}
                </InfoName>
                <InfoJob>UI/UX Design</InfoJob>
              </InfoContainer>

              <ContactIconContainer>
                <ContactItem
                  types={`tel:`}
                  title={'Nhấn gọi điện'}
                  icon={PHONE_ICON}
                  active={isHavePhoneNumberList}
                  values={contact?.phoneNumberList}
                />
                <ContactItem
                  types={`sms:`}
                  title={'Nhắn tin'}
                  icon={MESSAGE_ICON}
                  active={isHavePhoneNumberList}
                  values={contact?.phoneNumberList}
                />
                <ContactItem
                  types={'tel:'}
                  title={'Facetime'}
                  icon={FACETIME_ICON}
                  active={isHavePhoneNumberList}
                  values={contact?.phoneNumberList}
                />
                <ContactItem
                  types={'mailto:'}
                  title={'Gửi mail'}
                  icon={MAIL_ICON}
                  active={isHaveEmailList}
                  values={contact?.emailList}
                />
              </ContactIconContainer>
            </HeaderContainer>
          </>
        }
        renderItem={() => (
          <>
            <WrapInput>
              <InputTitleContainer>
                <InputTitleText>Điện thoại</InputTitleText>
              </InputTitleContainer>
              <InputContactContainer>
                {contact && contact?.phoneNumberList?.length > 0 ? (
                  contact?.phoneNumberList.map((phoneNumber, index) => {
                    return (
                      <InputContactButton
                        key={index}
                        onPress={() => onLinkingTel(phoneNumber)}>
                        <InputContact>{phoneNumber}</InputContact>
                      </InputContactButton>
                    );
                  })
                ) : (
                  <InputContact>Chưa có số điện thoại</InputContact>
                )}
              </InputContactContainer>
              <InputTitleContainer>
                <InputTitleText>Email</InputTitleText>
              </InputTitleContainer>
              <InputContactContainer>
                {contact && contact?.emailList?.length > 0 ? (
                  contact?.emailList.map((email, index) => {
                    return (
                      <InputContactButton
                        key={index}
                        onPress={() => onLinkingMail(email)}>
                        <InputContact>{email}</InputContact>
                      </InputContactButton>
                    );
                  })
                ) : (
                  <InputContact>Chưa có email</InputContact>
                )}
              </InputContactContainer>
              <InputTitleContainer>
                <InputTitleText>Ghi chú</InputTitleText>
              </InputTitleContainer>
              <InputContactContainer>
                <InputContactNote />
              </InputContactContainer>
              <WrapButton>
                <Modal
                  style={styles.modal}
                  isVisible={modalVisible}
                  hasBackdrop={true}
                  statusBarTranslucent={true}
                  onBackdropPress={onBackdrop}>
                  <CenteredView>
                    <ModalView>
                      <InputContactContainerMessage>
                        {contact?.phoneNumberList?.map((phoneNumber, index) => {
                          return (
                            <InputContactButtonMess
                              key={index}
                              onPress={() => onLinkingMess(phoneNumber)}>
                              <ContactIconImageModal source={MESSAGE_ICON} />
                              <InputContactMess>{phoneNumber}</InputContactMess>
                            </InputContactButtonMess>
                          );
                        })}
                      </InputContactContainerMessage>
                    </ModalView>
                  </CenteredView>
                </Modal>
                <BtnMessage onPress={onSendMessage}>
                  <BtnMessageText>Gửi tin nhắn</BtnMessageText>
                </BtnMessage>

                <BtnRemove onPress={onRemoveContact}>
                  <BtnRemoveText>Xoá người gọi</BtnRemoveText>
                </BtnRemove>
              </WrapButton>
            </WrapInput>
          </>
        )}
      />
    </Container>
  );
});

const Container = styled.View`
  background-color: ${Colors.white};
  //margin-bottom: 20px;
`;

const HeaderView = styled.View`
  background-color: ${Colors.yellowOrange};
  opacity: 0.05;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 360px;
`;

const HeaderContainerUpdate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  ${Platform.select({
    ios: css`
      padding-top: 50px;
    `,
    android: css`
      padding-top: 40px;
    `,
  })};
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const HeaderImage = styled.ImageBackground`
  width: 24px;
  height: 24px;
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 16px;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.yellowOrange};
`;

const HeaderContainer = styled.View`
  z-index: 1;
`;

const AvatarContainer = styled.View`
  padding-top: 14px;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.View`
  margin-top: 10px;
  height: 50px;
  justify-content: space-evenly;
  align-items: center;
`;

const InfoName = styled.Text`
  font-weight: 500;
  font-size: 18px;
  align-self: center;
  color: ${Colors.black};
`;

const InfoJob = styled.Text`
  font-weight: 400;
  font-size: 13px;
  opacity: 0.5;
  color: ${Colors.black};
`;

const ContactIconContainer = styled.View`
  height: 64px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const WrapInput = styled.View`
  margin-bottom: 200px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: ${Colors.white};
`;

const InputTitleContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const InputTitleText = styled.Text`
  font-weight: 400;
  justify-content: center;
  align-self: flex-start;
  padding-left: 18px;
  padding-top: 9px;
  color: ${Colors.black};
  padding-bottom: 8px;
`;

const InputContactContainer = styled.View`
  width: 90%;
  background-color: ${Colors.white};
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.chineseWhite};
`;

const InputContactButton = styled.TouchableOpacity`
  flex-direction: row;
`;

const InputContact = styled.Text`
  color: ${Colors.bleuDeFrance};
  font-size: 17px;
  font-weight: 400;
  padding-bottom: 8px;
`;

const InputContactNote = styled.TextInput`
  color: ${Colors.bleuDeFrance};
  font-size: 17px;
  font-weight: 400;
  padding-bottom: 8px;
`;

const WrapButton = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },

  avatar: {
    height: 100,
    width: 100,
    borderRadius: 55,
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

const InputContactContainerMessage = styled.View`
  background-color: ${Colors.white};
  border-radius: 15px;
  padding: 5px;
`;

const InputContactButtonMess = styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  align-items: center;
`;

const ContactIconImageModal = styled.Image`
  height: 28px;
  width: 28px;
  tint-color: ${Colors.yellowOrange};
`;

const InputContactMess = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.gray1};
  border-radius: 10px;
  padding-left: 10px;
`;

const BtnMessage = styled.TouchableOpacity`
  height: 45px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.chineseWhite};
  justify-content: center;
`;

const BtnMessageText = styled.Text`
  font-weight: 400;
  color: ${Colors.darkCharcoal};
  font-size: 15px;
`;

const BtnRemove = styled.TouchableOpacity`
  height: 45px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.chineseWhite};
  justify-content: center;
`;

const BtnRemoveText = styled(BtnMessageText)`
  font-weight: 400;
  color: ${Colors.tartOrange};
  font-size: 15px;
`;
