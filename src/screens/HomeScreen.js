import React from 'react';
import { View, Text} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const HomeScreen = ({username, fullname}) => {


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home {username} ({fullname})</Text>
        </View>
      );
};

HomeScreen.protoTypes = {
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    username: state.auth.username,
    fullname: state.auth.fullname,
  });

  export default connect(mapStateToProps)(HomeScreen) ;