import { View, Text, ScrollView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import SearchInput from '../../components/SearchInput';

import { images } from '../../constants'

import EmptyState from '../../components/EmptyState';
import { searchPosts } from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';

const Search = () => {
  
  const { query } = useLocalSearchParams();
  const { data: posts, refetch} = useAppWrite(() => searchPosts(query));


  useEffect(() => {
    refetch();
  }, [query])

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
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Search results for 
                </Text>
                <Text className='text-2xl font-psemibold text-gray-100'>
                  {query}
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image 
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query}/>
            </View>
  
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title='No Videos Found'
            subtitle='No videos found for this search query'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search