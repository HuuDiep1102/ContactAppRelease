import React, {memo, useCallback, useEffect, useState} from 'react';

import styled from 'styled-components/native';
import {CustomerButtonList} from '@/screens/CreateContactScreen/components/CustomerButtonList';
import {CustomerButtonDateTime} from '@/screens/CreateContactScreen/components/CustomerButtonDateTime';
import {CustomerInput} from '@/screens/CreateContactScreen/components/CustomerInput';
import {AvatarPicker} from '@/screens/CreateContactScreen/components/AvatarPicker';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {updateContact} from '@/store/contact';
import {slugify} from '@/utils/string';
import {css} from 'styled-components';
import {CreateScreenProps, RawContact} from '@/types';
import {Colors} from '@/themes/Colors';
import {goBack, navigateToDetailScreen} from '@/utils/navigation';
import {useNavigationParams} from '@/hooks/useNavigationParams';

export const CreateContactScreen = memo(() => {
  const [isActive, setActive] = useState(false);

  //contact route lay data tu ben Detail

  const param = useNavigationParams<CreateScreenProps>();

  const contactDefault = param?.contact;

  const id = param?.id;

  const [params, setParams] = useState<RawContact>({
    id: `${new Date().getTime().toString()}`,
    avatar: '',
    firstName: '',
    value: '',
    company: '',
    phoneNumberList: [],
    emailList: [],
    addressList: [],
    birthdayList: [],
  });

  useEffect(() => {
    if (contactDefault) {
      setParams(contactDefault);
      return;
    }
    Keyboard.dismiss();
  }, [contactDefault]);

  useEffect(() => {
    if (params.firstName || params.value || params.company) setActive(true);
    else setActive(false);
  }, [params.firstName, params.value, params.company]);

  // Xay dung ham onChangeText chung
  // Muon su dung ham chung phai tu build component input rieng

  const onUpdate = useCallback(() => {
    const newParams = {
      ...params,
      phoneNumberList: params.phoneNumberList.filter(phone => phone !== ''),
      addressList: params.addressList.filter(address => address !== ''),
      emailList: params.emailList.filter(email => email !== ''),
      normalizerForSearch: `${params.firstName} ${params.value} ${slugify(
        params.firstName,
      )} ${slugify(params.value)}`,
    };
    updateContact([newParams], id ?? newParams.id);

    if (id) {
      goBack();
    } else {
      goBack();
      navigateToDetailScreen({
        id: id ?? newParams.id,
      });
    }
  }, [params, id, updateContact]);

  const onValueChange = useCallback((keyName: string, value: string) => {
    setParams(state => ({
      ...state,
      [keyName]: value,
    }));
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboard}>
      <Container>
        {/*Su dung HeaderComponent kho tuong tac du lieu*/}
        <HeaderContainer>
          {/*Su kho tuong tac du lieu*/}
          <DrawButton onPress={goBack}>
            <HeaderTextCancer isActive={isActive}>Huỷ</HeaderTextCancer>
          </DrawButton>
          <CreateContactButton onPress={onUpdate} disabled={!isActive}>
            <HeaderTextDone isActive={isActive}>Xong</HeaderTextDone>
          </CreateContactButton>
        </HeaderContainer>

        <FormContainer>
          <AvatarPicker
            setParams={setParams}
            imageUri={contactDefault?.avatar}
          />
          <InputContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="Họ"
                keyName={'value'}
                value={params.value}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
                autoFocus={true}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="Tên"
                keyName={'firstName'}
                value={params.firstName}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
                autoFocus={false}
              />
            </InputInfoContainer>
            <InputInfoContainer>
              <CustomerInput
                placeholder="Công ty"
                keyName={'company'}
                value={params.company}
                onValueChange={onValueChange}
                placeholderTextColor={'#BDBDBD'}
                autoFocus={false}
              />
            </InputInfoContainer>
          </InputContainer>
          <CustomerButtonList
            title={'thêm số điện thoại'}
            setParams={setParams}
            data={params.phoneNumberList}
            keyName={'phoneNumberList'}
            keyboardType="numeric"
          />
          <CustomerButtonList
            title={'thêm email'}
            setParams={setParams}
            data={params.emailList}
            keyName={'emailList'}
            keyboardType="default"
          />
          <CustomerButtonList
            title={'thêm địa chỉ'}
            setParams={setParams}
            data={params.addressList}
            keyName={'addressList'}
            keyboardType="default"
          />
          <CustomerButtonDateTime
            title={'thêm ngày sinh'}
            setParams={setParams}
            data={params.birthdayList}
          />
        </FormContainer>
      </Container>
    </KeyboardAvoidingView>
  );
});

const Container = styled.View`
  background-color: ${Colors.white};
  height: 100%;
  justify-content: center;
  padding-top: 40px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  ${Platform.select({
    ios: css`
      padding-top: 15px;
    `,
    android: css`
      padding-top: 0;
    `,
  })};
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const HeaderTextCancer = styled.Text<{isActive: boolean}>`
  font-size: 18px;
  font-weight: 400;
  color: ${p => (p.isActive ? Colors.oldSilver : Colors.yellowOrange)};
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 16px;
`;

const HeaderTextDone = styled.Text<{isActive: boolean}>`
  font-size: 18px;
  font-weight: 400;
  color: ${p => (p.isActive ? Colors.yellowOrange : Colors.oldSilver)};
`;

const InputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const InputInfoContainer = styled.View`
  height: 44px;
  width: 90%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.chineseWhite};
  justify-content: center;
`;

const FormContainer = styled.ScrollView``;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
});
