import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React from 'react'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const Skeletonloader = () => {

    const avatarRef = React.createRef(null)
    const banRef = React.createRef(null)
    const firstLineRef = React.createRef(null)
    const secondLineRef = React.createRef(null)
    const thirdLineRef = React.createRef(null)
    const fourthLineRef = React.createRef(null)
    const fivethLineRef = React.createRef(null)
    // const sixLineRef = React.createRef(null);
    // const sevenLineRef = React.createRef(null);
   

    React.useEffect(() => {
        const facebookAnimated = Animated.stagger(
            400,
            [

                Animated.parallel([
                    firstLineRef.current.getAnimated(),
                    secondLineRef.current.getAnimated(),
                    thirdLineRef.current.getAnimated(),
                    fourthLineRef.current.getAnimated(),
                    fivethLineRef.current.getAnimated(),
                    // sixLineRef.current.getAnimated(),
                    // sevenLineRef.current.getAnimated(),
                    avatarRef.current.getAnimated(),
                    banRef.current.getAnimated(),
                ])
            ]
        );
        Animated.loop(facebookAnimated).start();
    }, [])


    return (
        <View style={{ paddingHorizontal:20 }}>
            <ShimmerPlaceholder
                ref={banRef}
                stopAutoRun
                height={200}
                width={Dimensions.get('window').width - 40}
                style={{ marginBottom: 10 }}
            />
            <ShimmerPlaceholder
                ref={avatarRef}
                stopAutoRun
                height={26}
                width={170}
                style={{ marginBottom: 20 }}
            />
            <ShimmerPlaceholder
                ref={secondLineRef}
                stopAutoRun
                width={200}
                height={26}
                style={{ marginBottom: 10 }}
            />

            <View style={{ flexDirection: 'row', display: 'flex', gap: 10 }}>
                <ShimmerPlaceholder
                    ref={firstLineRef}
                    stopAutoRun
                    height={26}
                    width={80}
                    style={{ marginBottom: 20 }}
                />
                <ShimmerPlaceholder
                    ref={fivethLineRef}
                    stopAutoRun
                    height={26}
                    width={80}
                    style={{ marginBottom: 10 }}
                />
            </View>
            <View style={{ flexDirection: 'row', display: 'flex', gap: 10 }}>
                <ShimmerPlaceholder
                    ref={thirdLineRef}
                    height={26}
                    width={20}
                />
                <ShimmerPlaceholder
                    ref={fourthLineRef}
                    height={26}
                    width={80}
                />
            </View>


           

        </View>
    )
}

export default Skeletonloader

// const styles = StyleSheet.create({})