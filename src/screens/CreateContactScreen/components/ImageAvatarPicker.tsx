import React from 'react';

import styled from 'styled-components/native';

import {CAMERA_INPUT_ICON, AVATAR_DEFAULT} from '@/assets';
import {Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/themes/Colors';

const imageDefault = Image.resolveAssetSource(AVATAR_DEFAULT).uri;

export function ImagePickerAvatar({uri, onPress}: any) {
  return (
    <Container>
      <AddButtonContainer onPress={onPress}>
        <FastImage
          style={styles.imageBackground}
          source={{
            uri: uri ? uri : imageDefault,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
        />
        <AddButton>
          <AddButtonIcon source={CAMERA_INPUT_ICON} />
        </AddButton>
      </AddButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
  padding-top: 24px;
`;

const AvatarImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  z-index: -1;
`;
const AddButtonContainer = styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const AddButton = styled.View`
  height: 30px;
  width: 30px;
  background-color: ${Colors.yellowOrange};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const AddButtonIcon = styled.Image`
  height: 13px;
  width: 15px;
`;

const styles = StyleSheet.create({
  imageBackground: {
    height: 100,
    width: 100,
    backgroundColor: Colors.anti_flashWhite,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageStyle: {
    borderRadius: 50,
  },
});
