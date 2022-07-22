import React from 'react';
import {
  DrawerActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import {TransitionPresets} from '@react-navigation/stack';
import {ContactDetailScreen} from '@/screens/ContactDetailScreen/ContactDetailScreen';
import {CreateContactScreen} from '@/screens/CreateContactScreen/CreateContactScreen';
import {DetailScreenProps, CreateScreenProps} from '@/types';

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigation = () => navigationRef.current!;

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().navigate(screenName, params);
  };

export const goBack = () => navigation().goBack();

export const openDrawer = () =>
  navigation().dispatch(DrawerActions.openDrawer());

export const navigateToDetailScreen = createNavigate<DetailScreenProps>(
  'ContactDetailScreen',
);

export const navigateToCreateContactScreen = createNavigate<CreateScreenProps>(
  'CreateContactScreen',
);
export const navigateToMainNavigation = createNavigate('MainNavigation');

/**
 * USAGE EXAMPLE:
 *
 * type-safe NAVIGATE to EditUser screen with required userId props
 * const navigateToEditUser = createNavigate<{userId: string}>('EditUser');
 * -> use: navigateToEditUser({userId: '123'});
 *
 *
 * type-safe NAVIGATION to multiple screens
 * const profileNavigation = createNavigation<{EditUser: {userId: string}, Profile: undefined}>();
 *
 * -> use
 * - navigate to EditUser screen
 * profileNavigation().navigate('EditUser', {userId: '123'});
 * - navigate to Profile screen
 * profileNavigation().navigate('Profile');
 *
 * It's all auto completed. Enjoy!
 */