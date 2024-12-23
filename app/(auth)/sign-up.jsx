import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignUp = () => {

  const {setUser, setIsLoggedIn} = useGlobalContext();

  const [form, setForm]= useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true)
    try{
      const result = await createUser(form.username, form.email, form.password)
      setUser(result)
      setIsLoggedIn(true)
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
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign Up to Aora</Text>

          <FormField 
            title='Username'
            value = {form.username}
            handleChangeText = {(e) => setForm({ ...form, username: e})}
            otherStyles='mt-7'          
          />

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
              Already have an account?
            </Text>
            <Link href='/sign-in' className='text-lg font-semibold text-secondary'>Log In</Link>
          </View>
          

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp