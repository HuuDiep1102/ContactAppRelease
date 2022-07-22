import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import {CAMERA_ICON, MENU_ICON} from '@/assets';
import {Colors} from '@/themes/Colors';
import 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {openDrawer, navigateToCreateContactScreen} from '@/utils/navigation';

interface HeaderCustomerProps {
  label: string;
}
export const HeaderCustomer = memo((props: HeaderCustomerProps) => {
  const {label} = props;

  const onNaviCreateContactScreen = useCallback(() => {
    navigateToCreateContactScreen();
  }, [navigateToCreateContactScreen]);

  return (
    <HeaderContainer>
      <DrawButton onPress={openDrawer}>
        <HeaderImage source={MENU_ICON} />
      </DrawButton>
      <HeaderText>{label}</HeaderText>
      <CreateContactButton onPress={onNaviCreateContactScreen}>
        <HeaderImage source={CAMERA_ICON} />
      </CreateContactButton>
    </HeaderContainer>
  );
});

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: ${44 + getStatusBarHeight()}px;
  padding-top: ${7 + getStatusBarHeight()}px;
  width: 100%;
`;

const DrawButton = styled.TouchableOpacity`
  padding-left: 16px;
`;

const HeaderImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${Colors.gray1};
  margin-top: -6px;
`;

const CreateContactButton = styled.TouchableOpacity`
  padding-right: 13px;
`;
