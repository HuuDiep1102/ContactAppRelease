import {AlphabetList} from 'react-native-section-alphabet-list';
import React, {memo, useCallback} from 'react';
import styled, {css} from 'styled-components/native';
import {Image, Platform, StyleSheet} from 'react-native';
import {AVATAR_DEFAULT_ICON} from '@/assets';
import {ListContact, RawContact} from '@/types';
import {useContactByKey} from '@/store/contact';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/themes/Colors';
import {navigateToDetailScreen} from '@/utils/navigation';

interface AlphabetListProps {
  contactList: ListContact[];
}
const imageDefault = Image.resolveAssetSource(AVATAR_DEFAULT_ICON).uri;

const CustomItem = (contact: ListContact) => {
  const contactByKey: RawContact | undefined = useContactByKey(contact.key);

  const onDetails = useCallback(() => {
    navigateToDetailScreen({
      id: contact.key,
    });
  }, [contact]);

  console.log('contact re-render ', contact.key);

  return (
    <ListItemContainer onPress={onDetails}>
      <AvatarContainer>
        <FastImage
          style={styles.avatar}
          source={{
            uri: contactByKey?.avatar ? contactByKey.avatar : imageDefault,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
        />
      </AvatarContainer>
      <ContactContainer>
        {/*Alphabet list luon yeu cau mot truong la value nen co the tu tuy chinh
        value la lastName*/}
        <ListItemNameLabel>
          {contactByKey?.value} {contactByKey?.firstName}
        </ListItemNameLabel>
        <ListItemPhoneContainer numberOfLines={1}>
          {contactByKey && contactByKey?.phoneNumberList?.length > 0 ? (
            <ListItemPhoneLabel>
              {`${contactByKey?.phoneNumberList.join(', ')}`}
            </ListItemPhoneLabel>
          ) : (
            <ListItemPhoneLabel>Chưa có số điện thoại</ListItemPhoneLabel>
          )}
        </ListItemPhoneContainer>
      </ContactContainer>
    </ListItemContainer>
  );
};

const CustomSectionHeader = (section: any) => {
  return (
    <SectionHeaderContainer>
      <Background />
      <SectionHeaderLabel>{section.title}</SectionHeaderLabel>
    </SectionHeaderContainer>
  );
};

export const CustomAlphabetList = memo((props: AlphabetListProps) => {
  const {contactList} = props;
  return (
    <AlphabetList
      style={styles.alphabet}
      data={contactList}
      indexLetterStyle={styles.letterStyle}
      indexLetterContainerStyle={{
        marginBottom: 0,
        width: 20,
        height: 25,
      }}
      letterListContainerStyle={{
        justifyContent: 'center',
        paddingTop: 8,
      }}
      indexContainerStyle={{
        width: 30,
      }}
      index={customIndex}
      renderCustomItem={CustomItem}
      renderCustomSectionHeader={CustomSectionHeader}
    />
  );
});

const ListItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: 64px;
`;

const AvatarContainer = styled.View`
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
`;

const ContactContainer = styled.View`
  width: 75%;
  height: 64px;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 12px;
  align-items: flex-start;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.chineseWhite};
`;

const ListItemNameLabel = styled.Text`
  ${Platform.select({
    ios: css`
      font-weight: 500;
    `,
    android: css`
      font-weight: 700;
    `,
  })};
  font-size: 16px;
  color: ${Colors.darkCharcoal};
  font-style: normal;
`;

const ListItemPhoneContainer = styled.Text``;

const ListItemPhoneLabel = styled.Text`
  font-weight: 400;
  color: ${Colors.oldSilver};
  font-style: normal;
  font-size: 14px;
`;

const SectionHeaderContainer = styled.View`
  background-color: ${Colors.white};
  justify-content: center;
  height: 36px;
`;

const Background = styled.View`
  background-color: ${Colors.antiFlashWhite};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const SectionHeaderLabel = styled.Text`
  font-weight: 500;
  padding-left: 16px;
  font-size: 15px;
  color: ${Colors.black};
  line-height: 16px;
  letter-spacing: 0.12px;
`;

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 35,
  },

  letterStyle: {
    color: Colors.yellowOrange,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.12,
  },
  alphabet: {
    flex: 1,
  },
});

const customIndex = [
  'a',
  'ă',
  'â',
  'b',
  'c',
  'd',
  'đ',
  'e',
  'ê',
  'f',
  'j',
  'g',
  'h',
  'i',
  'k',
  'l',
  'm',
  'n',
  'o',
  'ô',
  'ơ',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'ư',
  'v',
  'x',
  'w',
  'y',
  'z',
];
