import { View, Text, ScrollView, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';

import { icons } from '../../constants'

import EmptyState from '../../components/EmptyState';
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  
  const { user } = useGlobalContext();
  const { data: posts} = useAppWrite(() => getUserPosts(user.$id));


  const logOut = async () =>  {
    await signOut(); 
    router.replace('/sign-in');
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList  
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
            post={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <View className='justify-between items-end flex-col'>
            <View className='mt-1.5'>
                <TouchableOpacity activeOpacity={0.7} onPress={logOut}>
                  <Image 
                    source={icons.logout}
                    className='w-7 h-9'
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
              <View className='self-center items-center gap-2 pb-3'>
                <Image 
                  source={{uri: user?.avatar}}
                  className='rounded-lg w-[46px] h-[46px]'
                  resizeMode='cover'
                />
                <Text className='text-2xl font-psemibold text-gray-100'>
                  {user?.username}
                </Text>
              </View>
              <View className='self-center flex-row justify-center gap-5 items-center'>
                <View className='flex-col items-center'>
                  <Text className='text-white text-lg'>{posts.length}</Text>
                  <Text className='text-gray-100 text-lg'>Posts</Text>
                </View>
                <View className='flex-col items-center'>
                  <Text className='text-white text-lg'>0</Text>
                  <Text className='text-gray-100 text-lg'>Views</Text>
                </View>
              </View>
             
            </View>
            <View className='mt-6 mb-2'>
              {/* <SearchInput initialQuery={query}/> */}
            </View>
  
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title='No Videos Found'
            subtitle='No videos found for this user'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile