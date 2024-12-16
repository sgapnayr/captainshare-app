import { View, Platform, Image, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { Appointment, Articles, History, Home, Profile } from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: Platform.OS !== 'ios',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: Platform.OS === 'ios' ? 90 : 60,
                    backgroundColor: COLORS.white,
                },
            }}
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    title: "",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                paddingTop: 16,
                                width: SIZES.width/4
                            }}>
                                <Image
                                    source={focused ? icons.home : icons.home2Outline}
                                    resizeMode="contain"
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: focused ? COLORS.primary : COLORS.gray3,
                                    }}
                                />
                                <Text style={{
                                    ...FONTS.body4,
                                    color: focused ? COLORS.primary : COLORS.gray3,
                                }}>Home</Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="appointment"
                component={Appointment}
                options={{
                    title: "",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                paddingTop: 16,
                                width: SIZES.width/4
                            }}>
                                <Image
                                    source={focused ? icons.calendar5 : icons.calendar}
                                    resizeMode="contain"
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: focused ? COLORS.primary : COLORS.gray3,
                                    }}
                                />
                                <Text style={{
                                    ...FONTS.body4,
                                    color: focused ? COLORS.primary : COLORS.gray3,
                                }}>Appointment</Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="history"
                component={History}
                options={{
                    title: "",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                paddingTop: 16,
                                width: SIZES.width/4
                            }}>
                                <Image
                                    source={focused ? icons.document2 : icons.document2Outline}
                                    resizeMode="contain"
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: focused ? COLORS.primary : COLORS.gray3,
                                    }}
                                />
                                <Text style={{
                                    ...FONTS.body4,
                                    color: focused ? COLORS.primary : COLORS.gray3,
                                }}>History</Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="articles"
                component={Articles}
                options={{
                    title: "",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                paddingTop: 16,
                                width: SIZES.width/4
                            }}>
                                <Image
                                    source={focused ? icons.document : icons.documentOutline}
                                    resizeMode="contain"
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: focused ? COLORS.primary : COLORS.gray3,
                                    }}
                                />
                                <Text style={{
                                    ...FONTS.body4,
                                    color: focused ? COLORS.primary : COLORS.gray3,
                                }}>Articles</Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    title: "",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                paddingTop: 16,
                                width: SIZES.width/4
                            }}>
                                <Image
                                    source={focused ? icons.user : icons.userOutline}
                                    resizeMode="contain"
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: focused ? COLORS.primary : COLORS.gray3,
                                    }}
                                />
                                <Text style={{
                                    ...FONTS.body4,
                                    color: focused ? COLORS.primary : COLORS.gray3,
                                }}>Profile</Text>
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation