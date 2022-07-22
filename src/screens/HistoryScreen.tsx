import React, {memo} from 'react';
import styled, {css} from 'styled-components/native';
import {WARNING_LOGO} from '@/assets';
import {COMMUNICATE_ICON} from '@/assets';

import {HeaderCustomer} from '@/components/HeaderCustomer';
import {Platform} from 'react-native';
import {Colors} from '@/themes/Colors';

const Item = ({title, phoneNumber}: any) => (
  <ItemStyle>
    <LogIconContainer>
      <LogIcon source={COMMUNICATE_ICON} />
    </LogIconContainer>

    <LogContainer>
      <ContactContainer>
        <Title>{title}</Title>
        <PhoneNumber>{phoneNumber}</PhoneNumber>
      </ContactContainer>
      <Time>Hôm nay</Time>
      <WarningIcon source={WARNING_LOGO} />
    </LogContainer>
  </ItemStyle>
);

export const HistoryScreen = memo(() => {
  const renderItem = ({item}: any) => {
    return <Item title={item.title} phoneNumber={item.phoneNumber} />;
  };

  return (
    <Container>
      <HeaderCustomer label={'Lịch sử'} />
      <FlatListStyled
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item?.key}
      />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const FlatListStyled = styled.FlatList``;

const LogIconContainer = styled.View`
  width: 42px;
  justify-content: flex-start;
  align-items: center;
`;

const LogIcon = styled.Image`
  height: 20px;
  width: 20px;
  top: 9px;
`;

const ItemStyle = styled.View`
  height: 64px;
  flex-direction: row;
  padding-right: 160px;
`;

const LogContainer = styled.View`
  flex-direction: row;
  height: 64px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.black5};
  width: 150%;
`;

const ContactContainer = styled.View`
  height: 64px;
  justify-content: space-evenly;
`;

const Title = styled.Text`
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
`;

const Time = styled.Text`
  position: absolute;
  font-weight: 400;
  color: ${Colors.oldSilver};
  font-size: 13px;
  top: 25px;
  align-self: center;
  right: 65px;
`;

const WarningIcon = styled.Image`
  position: absolute;
  height: 24px;
  width: 24px;
  align-self: center;
  right: 10px;
`;

const PhoneNumber = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${Colors.oldSilver};
`;

const data = [
  {
    title: 'Nguyễn Tiến Nam',
    phoneNumber: '0907812123',
    key: '1',
  },
  {
    title: 'Vũ Mạnh Linh',
    phoneNumber: '0907812123',
    key: '2',
  },
  {
    title: 'Trần Thái Hà',
    phoneNumber: '0907812123',
    key: '3',
  },
  {
    title: 'Hoàng Ngọc Đức',
    phoneNumber: '0907809123',
    key: '4',
  },
  {
    title: 'Đỗ Minh Hiếu',
    phoneNumber: '090232123',
    key: '5',
  },
  {
    title: 'Nguyễn Tiến Nam',
    phoneNumber: '0907812123',
    key: '6',
  },
  {
    title: 'Phũ Mạnh Linh',
    phoneNumber: '0907812123',
    key: '7',
  },
  {
    title: 'Trần Thái Hào',
    phoneNumber: '0907812123',
    key: '8',
  },
  {
    title: 'Hoàng Ngọc D',
    phoneNumber: '0907809123',
    key: '9',
  },
  {
    title: 'Đỗ Minh Hoang',
    phoneNumber: '090232123',
    key: '10',
  },
];
