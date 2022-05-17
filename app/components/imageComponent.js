import React from 'react';
import { View } from 'react-native';
import Image from 'react-native-remote-svg';

const Item = ({ uri }) => (
    <View>
        <Image source={{ uri: uri }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </View>
);

export default React.memo(Item);
