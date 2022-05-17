import React from 'react';
import Image from 'react-native-remote-svg';

function getStars(rating) {
    if (rating === 5) {
        return require('../assets/active_stars.png');
    } else if (rating >= 4) {
        return require('../assets/4_stars.png');
    } else if (rating >= 3) {
        return require('../assets/3_stars.png');
    } else if (rating >= 2) {
        return require('../assets/2_stars.png');
    } else if (rating >= 1) {
        return require('../assets/1_star.png');
    } else {
        return require('../assets/0_star.png');
    }
}

const StarComponent = (props) => (
    <Image
        source={getStars(props.rating)}
        resizeMode="contain"
        style={props.style}
    />
)

export default React.memo(StarComponent);
