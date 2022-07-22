import React, {memo, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';

import {SEARCH_ICON} from '@/assets';
import {HeaderCustomer} from '@/components/HeaderCustomer';
import {useListContact} from '@/store/contact';
import {CustomAlphabetList} from '@/screens/ContactScreen/components/AlphabetList';
import {slugify} from '@/utils/string';
import {ListContact} from '@/types';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {Colors} from '@/themes/Colors';

export const ContactScreen = memo(() => {
  const contacts: ListContact[] = useListContact();

  const [searchText, setSearchText] = useState('');

  const contactList = useMemo(() => {
    if (searchText === '') return contacts;

    let _contactList: ListContact[] = [];

    const _slug = slugify(searchText);

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      if ((contact?.normalizerForSearch || contact.value).includes(_slug)) {
        _contactList.push({...contact});
      }
    }
    return _contactList;
  }, [searchText, contacts]);

  const isIos: boolean = Platform.OS === 'ios';

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  console.log('  contact list ', contactList);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Container>
      <HeaderCustomer label={'Liên hệ'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}>
        <SearchbarContainer>
          <Search source={SEARCH_ICON} />
          <InputSearch
            placeholder="Tìm kiếm danh bạ"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={'#BDBDBD'}
          />
        </SearchbarContainer>
        <ListContainer isKeyboardVisible={isKeyboardVisible} isIos={isIos}>
          {!contacts?.length ? (
            <NotificationView>
              <NotificationText>The list is empty</NotificationText>
            </NotificationView>
          ) : null}
          <CustomAlphabetList contactList={contactList} />
        </ListContainer>
      </KeyboardAvoidingView>
    </Container>
  );
});

const Container = styled.View`
  background-color: ${Colors.white};
  flex: 1;
`;
const ListContainer = styled.View<{isKeyboardVisible: boolean; isIos: boolean}>`
  flex: 1;
  padding-bottom: ${p => (p.isKeyboardVisible && p.isIos ? 80 : 0)}px;
`;

const NotificationView = styled.View`
  justify-content: center;
  align-items: center;
`;

const NotificationText = styled.Text`
  color: ${Colors.black};
  font-size: 18px;
  padding-top: 75%;
`;

const SearchbarContainer = styled.View`
  background-color: ${Colors.anti_flashWhite};
  opacity: 0.5;
  height: 36px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 9px;
  flex-direction: row;
  border-radius: 6px;
  padding-left: 34px;
  align-items: center;
`;

const InputSearch = styled.TextInput`
  color: ${Colors.black};
  width: 100%;
  font-size: 13px;
  font-weight: 300;
`;

const Search = styled.Image`
  position: absolute;
  left: 8px;
  height: 16px;
  width: 16px;
`;
const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
});
