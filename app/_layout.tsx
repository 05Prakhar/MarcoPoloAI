import { StatusBar, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// import { Colors } from '@/constants/Colors';

import TabIternaryPlanner from './iternaryplanner';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const theme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // const onActiveIcon = (focused: Boolean) => {
  //   if (theme === 'light' && focused) {
  //     return Colors.light.tint
  //   } else if (theme === 'light' && !focused) {
  //     return Colors.light.tabIconDefault
  //   } else if (theme === 'dark' && focused) {
  //     return Colors.dark.tint
  //   } else if (theme === 'dark' && !focused) {
  //     return Colors.dark.tabIconDefault
  //   }
  // };

  return (
    // <Tab.Navigator
    //   screenOptions={() => ({
    //     tabBarStyle: { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background },
    //     tabBarActiveTintColor: theme === 'light' ? Colors.light.tint : Colors.dark.tint,
    //     tabBarInactiveTintColor: theme === 'light' ? Colors.light.tabIconDefault : Colors.dark.tabIconDefault,
    //   })}
    // >
    //   <Tab.Screen
    //     name="iternaryplanner"
    //     component={TabIternaryPlanner}
    //     options={{
    //       headerShown: false,
    //       tabBarLabel: 'Plan Iternary',
    //       tabBarIcon: ({ focused }) => <MaterialCommunityIcons name='sort-calendar-descending' size={20}
    //       // color={(theme === 'light' && focused) ? Colors.light.tint :
    //       //   ((theme === 'light' && !focused) ? Colors.light.tabIconDefault : ((theme === 'dark' && focused) ? Colors.dark.tint : ((theme === 'dark' && !focused) ? Colors.dark.tabIconDefault : '')))}
    //       />
    //     }}
    //   />
    //   <Tab.Screen
    //     name="triprecommendar"
    //     component={TabTripRecommendar}
    //     options={{
    //       headerShown: false,
    //       tabBarLabel: 'Get Recommendation',
    //       tabBarIcon: ({ focused }) => <MaterialCommunityIcons name='sort-calendar-descending' size={20}
    //       // color={(theme === 'light' && focused) ? Colors.light.tint :
    //       //   ((theme === 'light' && !focused) ? Colors.light.tabIconDefault : ((theme === 'dark' && focused) ? Colors.dark.tint : ((theme === 'dark' && !focused) ? Colors.dark.tabIconDefault : '')))}
    //       />
    //     }}
    //   />
    // </Tab.Navigator>
    <>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      />
      <TabIternaryPlanner />
    </>
  );
}
