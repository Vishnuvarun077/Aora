import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

import { GetCurrentUser, SignInFunction } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {

  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [form, setForm]= useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if( !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true)
    try{
      await SignInFunction(form.email, form.password)
      const result = await GetCurrentUser();
      setUser(result)
      setIsLoggedIn(true);
      router.replace('/home')
    } catch(err) {
      Alert.alert('Error', err.message)
    } finally {
      setIsSubmitting(false)
    }
    
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center px-5 my-6 min-h-[75vh] items-center'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>

          <FormField 
            title='Email'
            value = {form.email}
            handleChangeText = {(e) => setForm({ ...form, email: e})}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField 
            title='Password'
            value = {form.password}
            handleChangeText = {(e) => setForm({ ...form, password: e})}
            otherStyles='mt-7'
          />

          <CustomButton 
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7 w-full'
            isLoading={isSubmitting}
            
          />

          <View className=' justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-lg font-semibold text-secondary'>Sign Up</Link>
          </View>
          

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn