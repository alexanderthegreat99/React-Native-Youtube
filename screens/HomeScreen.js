import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { categories, shortVideos} from '../constants';
import ShortVideoCard from '../components/shortVideoCard';
import VideoCard from '../components/videoCard';
import { fetchTrendingVideos } from '../api/youtube';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [videos, setVideos] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async ()=>{
    const data = await fetchTrendingVideos();
    console.log('video: ',data[0]);
    setVideos(data);
  }
  return (
    <View style={{ backgroundColor: themeColors.bg}} className="flex-1">
      
      <SafeAreaView edges={["top"]} className="flex-row justify-between mx-4 mt-2 mb-2" >
       
        <View className="flex-row items-center space-x-1">
            <Image source={require('../assets/icons/youtubeIcon.png')}
            className="h-7 w-10"></Image>
            <Text className="text-white font-semibold text-xl tracking-tighter">
              YouTube
            </Text>
        </View>
        <View className="flex-row items-center space-x-5">
            <Icon.Cast stroke="white" strokeWidth={1.2} height="22" />
            <Icon.Bell stroke="white" strokeWidth={1.2} height="22" />
            <Icon.Search stroke="white" strokeWidth={1.2} height="22" />
            <Image source={require('../assets/images/avatar.png')} 
            className="h-7 w-7 rounded-full" />
          </View>
          
      </SafeAreaView>
     
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} >
      
        <View className="my-5 pb-1 " >
        <ScrollView className="px-4" horizontal showsHorizontalScrollIndicator={false}>
          {
            categories.map((category, index)=> {
              let isActive = category==activeCategory;
              let textClass = isActive? 'text-black': 'text-white';

              let isLastItem = index === categories.length - 1;
              let containerClass = isLastItem ? 'rounded-md p-2 px-3 mr-8' : 'rounded-md p-2 px-3 mr-2';
              return (
                <TouchableOpacity
                onPress={()=> setActiveCategory(category)}
                key={index}
                style={{backgroundColor: isActive? 'white': 'rgba(255,255,255,0.1)'}}
                className={containerClass}
                >
                <Text className={textClass}>{category}</Text>

                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
        </View>
        {/* <VideoCard video={videos[4]} /> */}
        {/* short videos */}
        
        <View 
           className="mt-1 py-5 space-y-3 border-t-zinc-700 border-b-zinc-700 border-2 border-l-0 border-r-0">
            <View className="mx-4 flex-row items-center space-x-2">
              <Image source={require('../assets/icons/shortsIcon.png')}
                className="h-6 w-5 ml-2"/>
              <Text className="text-white font-semibold text-lg tracking-tighter">Shorts</Text>
            </View>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} style="px-4">
    {shortVideos.map((item, index) => {
      const isFirstItem = index === 0;
      const isLastItem = index === shortVideos.length - 1;
      // const cardStyle1 = isLastItem
      //   ? 'relative h-64 w-40 mr-5 flex justify-between'
      //   : 'relative h-64 w-40 mr-3 flex justify-between';
        let cardStyle = 'relative h-64 w-40 flex justify-between';

        if (isFirstItem) {
          cardStyle = 'relative h-64 w-40 flex justify-between ml-5 mr-3';
        } else if (isLastItem) {
          cardStyle = 'relative h-64 w-40 flex justify-between mr-5';
        } else {
          cardStyle = 'relative h-64 w-40 flex justify-between mr-3';
        }
       
      return (
        <View className={cardStyle} key={index}>
          <ShortVideoCard item={item} />
        </View>
      );
    })}
  </ScrollView>

          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              videos.map((video, index)=> <VideoCard video={video} key={index} />)
            }
          </ScrollView>
      </ScrollView>
    </View>
    
  );
  ///style={{ backgroundColor: '#FFA500' }} 
}
