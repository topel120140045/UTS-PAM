import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Front from "./Front";
import History from "./History";
const Tab = createBottomTabNavigator();
const Main = ()=>{

    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={"Front"}
            screenOptions={({route})=>({
                tabBarStyle:{
                    padding:5,
                    height: 85,
                },
                tabBarIcon:({focused,color,size})=>{
                    let icon;
                    let routeName = route.name
                    if(routeName === "Front"){
                        icon = focused ? 'home':'home-outline'
                    } else if(routeName==="History"){
                        icon = focused ? "time":"time-outline"
                    }
                    return <Ionicons name={icon} size={size} color={color} />
                }
            })}
            tabBarOptions={{
                activeTintColor:"#FF69B4",
                inactiveTintColor:"#FFC0CB",
                labelStyle: {paddingBottom:10,fontSize:12},
            }}>
                <Tab.Screen name={'Front'} component={Front}
                options={{headerShown:false}}/>
                <Tab.Screen name={'History'} component={History}
                options={{
                    headerTittle: "History",
                    headerTittleAlign: "center",
                    headerStyle:{
                        backgroundColor: '#FFC0CB'
                    },
                    headerTintColor: "white"
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Main;