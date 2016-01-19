'use strict'

import {TEAM} from '../constant'
import Channel from '../channel'

export const getTeamRank = (year, month, date) => {
  return (dispatch, getStore) => {
    if (getStore().team.loaded) {
      return Promise.resolve({
        type: TEAM.RANK,
        data: getStore().team.data
      })
    }
    const channel = new Channel()
    return channel.getTeamRank(year, month, date)
      .then(data => {
        return dispatch({
          type: TEAM.RANK,
          data: data
        })
      })
      .catch(err => console.error(err))
  }
}

export const getTeamInfo = (id) => {
  return (dispatch, getStore) => {
    if (getStore().team.detail[id]) {
      return Promise.resolve({
        type: TEAM.INFO,
        data: getStore().team.detail[id],
        id
      })
    }
    const channel = new Channel()
    return channel.getTeamInfo(id)
      .then(data => {
        return dispatch({
          type: TEAM.INFO,
          data: data,
          id
        })
      })
      .catch(err => console.error(err))
  }
}

export const getTeamDetail = (id) => {
  return (dispatch, getStore) => {
    if (getStore().team.detail[id] && getStore().team.detail[id].players) {
      return Promise.resolve({
        type: TEAM.DETAIL,
        data: getStore().team.detail[id].players,
        id
      })
    }
    const channel = new Channel()
    return channel.getTeamDetail(id)
      .then(data => {
        return dispatch({
          type: TEAM.DETAIL,
          data: data,
          id
        })
      })
      .catch(err => console.error(err))
  }
}

export default {
  getTeamRank,
  getTeamInfo,
  getTeamDetail
}
