import React, {memo, useCallback} from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HistoryScreen} from '@/screens/HistoryScreen';
import {ContactScreen} from '@/screens/ContactScreen/ContactScreen';
import {navigationRef} from '@/utils/navigation';
import {PHONEBOOK_ICON, WATCH_ICON} from '@/assets';
import styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from '@/screens/LoginScreen/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateContactScreen} from '@/screens/CreateContactScreen/CreateContactScreen';
import {ContactDetailScreen} from '@/screens/ContactDetailScreen/ContactDetailScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import CustomDrawer from '@/components/CustomDrawer';

const TabStack = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const DrawerStack = createDrawerNavigator();

const TabStackComponent = memo(function TabStackComponent() {
  return (
    <TabStack.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#FFDAAE',
        tabBarStyle: {
          backgroundColor: '#F2A54A',
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <TabStack.Screen
        name="Danh bạ"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Danh bạ',
          tabBarIcon: ({focused}) => (
            <Icon
              source={PHONEBOOK_ICON}
              tintColor={focused ? '#ffffff' : '#FFDAAE'}
            />
          ),
        }}
      />
      <TabStack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Gần đây',
          tabBarIcon: ({focused}) => (
            <Icon
              source={WATCH_ICON}
              tintColor={focused ? '#ffffff' : '#FFDAAE'}
            />
          ),
        }}
      />
    </TabStack.Navigator>
  );
});

const DrawerStackComponent = memo(function DrawerStackComponent() {
  return (
    <DrawerStack.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="TabNavigation"
      screenOptions={{headerShown: false, drawerType: 'front'}}>
      <DrawerStack.Screen name="TabNavigation" component={TabStackComponent} />
    </DrawerStack.Navigator>
  );
});

const MainStackComponent = memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      initialRouteName="TabNavigation"
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Draw" component={DrawerStackComponent} />
      <MainStack.Screen
        name="ContactDetailScreen"
        component={ContactDetailScreen}
      />
      <MainStack.Screen
        name="CreateContactScreen"
        component={CreateContactScreen}
      />
    </MainStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  const routeNameRef = React.useRef<string>('');
  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      // analytics().setCurrentScreen(currentRouteName);
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen
          name="MainNavigation"
          component={MainStackComponent}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;

const Icon = styled.Image<{tintColor: string}>`
  width: 24px;
  height: 24px;
  tint-color: ${p => p.tintColor};
`;
