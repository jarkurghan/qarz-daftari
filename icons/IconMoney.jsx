import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const IconMoney = (props) => (
    <Svg
        width="18px"
        height="18px"
        viewBox="0 0 32 32"
        fill="none"
        {...props}
    >
        <G clipPath="url(#clip0_901_1341)">
            <Path
                d="M15 17C15 15.343 13.657 14 12 14M12 14C10.343 14 9 15.343 9 17C9 18.657 10.343 20 12 20C13.657 20 15 21.343 15 23C15 24.657 13.657 26 12 26M12 14V13M12 26C10.343 26 9 24.657 9 23M12 26V27M22 31H31V29M25 26H31V24M26 21H31V19M26 16H31V14M23 11H31V9M10 6H31V1H7V6M23 20C23 13.926 18.074 9 12 9C5.926 9 1 13.926 1 20C1 26.074 5.926 31 12 31C18.074 31 23 26.074 23 20Z"
                stroke="#000000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_901_1341">
                <Rect width={32} height={32} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export default IconMoney;
