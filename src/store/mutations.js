import Vue from 'vue'
import { set } from 'vue'
import * as types from './mutation-types'

import API from '../settings/API.js'


export default {


  [types.INIT2](state) {
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log("init2")
        resolve()
      },1000)
    })
  },
  [types.RECEIVE_POST](state,post) {
     set(state, 'post', post)
  },
  [types.RECEIVE_LATEST_POSTS](state,list) {
     set(state, 'list', list)
  },
  [types.RECEIVE_SEARCH_POSTS](state,list) {
     set(state, 'list', list)
  }



  // [types.RECEIVE_ALL] (state, { messages }) {
  //   let latestMessage
  //   messages.forEach(message => {
  //     // create new thread if the thread doesn't exist
  //     if (!state.threads[message.threadID]) {
  //       createThread(state, message.threadID, message.threadName)
  //     }
  //     // mark the latest message
  //     if (!latestMessage || message.timestamp > latestMessage.timestamp) {
  //       latestMessage = message
  //     }
  //     // add message
  //     addMessage(state, message)
  //   })
  //   // set initial thread to the one with the latest message
  //   setCurrentThread(state, latestMessage.threadID)
  // },
  //
  // [types.RECEIVE_MESSAGE] (state, { message }) {
  //   addMessage(state, message)
  // },
  //
  // [types.SWITCH_THREAD] (state, { id }) {
  //   setCurrentThread(state, id)
  // }
}
