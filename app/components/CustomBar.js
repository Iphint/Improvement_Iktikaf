import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomBar = ({ state, descriptors, navigation }) => {
    return (
       <View style={styles.tabBar}>
         {state.routes.map((route, index) => {
           const { options } = descriptors[route.key];

           const IconComponent = options.tabBarIcon;
           const iconName = IconComponent ? IconComponent.name : 'home';
           const iconSize = IconComponent && IconComponent.size ? IconComponent.size : 30;
           const isFocused = state.index === index;
           const iconColor = isFocused ? '#EFBC9B' : '#fff';
   
           const onPress = () => {
             const event = navigation.emit({
               type: 'tabPress',
               target: route.key,
             });
   
             if (!isFocused && !event.defaultPrevented) {
               navigation.navigate(route.name);
             }
           };
   
           return (
             <TouchableOpacity
               key={index}
               onPress={onPress}
               style={[styles.tab, isFocused ? styles.activeTab : {}]}
             >
               {IconComponent ? (
                 <IconComponent size={iconSize} color={iconColor} />
               ) : (
                 <Ionicons name={iconName} size={iconSize} color={iconColor} />
               )}
             </TouchableOpacity>
           );
         })}
       </View>
    );
   };
   

const styles = StyleSheet.create({
 tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#627254',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
 },
 tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 }
});

export default CustomBar;
