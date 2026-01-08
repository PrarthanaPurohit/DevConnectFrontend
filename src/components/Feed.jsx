import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addFeed} from "../utils/feedSlice";
import UserCard from './userCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);




  const getFeed = async () => {
    try{
      if(feed?.length > 0) return;
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true})
      dispatch(addFeed(res.data.data));
      
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    getFeed();
  }, [])

  return (
    feed && (
   <div>
    {feed?.length > 0 && <UserCard user={feed[0]} />}

   </div>
    
  ));
}

export default Feed