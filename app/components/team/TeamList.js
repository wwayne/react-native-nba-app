'use strict'

import React, {
  Component,
  PropTypes,
  View,
  Text,
  StyleSheet
} from 'react-native'

import Tabbar from '../share/Tabbar'
import moment from 'moment-timezone'
import TeamConference from './TeamConference'
import CollectionView from '../../lib/collection'

export default class TeamList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      conference: 'western'
    }
  }

  componentDidMount () {
    const {actions} = this.props
    const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format()
    const dateArray = dateString.replace('T', '-').split('-')
    actions.getTeamRank(dateArray[0], dateArray[1], dateArray[2])
  }

  scrollEnd (x, y) {
    if (x === 0) {
      this.setState({
        conference: 'western'
      })
    } else {
      this.setState({
        conference: 'eastern'
      })
    }
  }

  render () {
    const {conference} = this.state
    const {team} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.conference}>{conference.toUpperCase()}</Text>
          <Text style={styles.confLabel}>conference</Text>
        </View>
        <Tabbar tab={'teams'} {...this.props}/>
        {team.loaded &&
          <CollectionView scrollEnd={this.scrollEnd.bind(this)}>
          {[<TeamConference data={team.data.western} {...this.props} key={0}/>, <TeamConference data={team.data.eastern} {...this.props} key={1} />]}
          </CollectionView>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // Header
  header: {
    backgroundColor: '#2DB43D',
    height: 100,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  conference: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '300'
  },
  confLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '200'
  }
})

TeamList.propTypes = {
  actions: PropTypes.object,
  team: PropTypes.object
}
