import React from 'react';
import { FlatList, Image, Text, View, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopNav from '../components/TopNav';
import Categories from '../components/Categories';
import BottomNav from '../components/BottomNav';
import TodoCard from '../components/TodoCard';
import todoData from '../data/mockTodos.json';

export default function Home() {
  const insets = useSafeAreaInsets();

  const Header = () => (
    <View style={{ paddingTop: insets.top + 140 ,padding:10 }} className="self-center  pb-6">
     <View>
      <Text style={{fontSize:50, fontWeight: 'light', textAlign: 'center' }} >
       Manage Your Daily Tasks
      </Text>
      </View>
      <View className="-mx-6"> 
        <Categories />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <Image 
        source={require('../assets/gradient-bg.png')} 
        className="absolute w-full h-full" 
        resizeMode="cover" 
      />

      <FlatList
        data={todoData}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingBottom: insets.bottom + 100, 
        }}
        renderItem={({ item }) => (
          <View className="px-6  mb-4">
            <TodoCard {...item} onOpen={() => {}} />
          </View>
        )}
      />

      <View 
        style={{ top: insets.top + 50 }} 
        className="absolute w-full z-[100] items-center px-6"
      >
        <TopNav />
      </View>

      <View 
        style={{ bottom: insets.bottom + 40 }} 
        className="absolute w-full z-[100] items-center"
      >
        <BottomNav />
      </View>
      
    </View>
  );
}