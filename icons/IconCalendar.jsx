import Svg, { Path } from "react-native-svg";
const IconCalendar = (props) => (
    <Svg
        fill={props.fill || "#000"}
        width="20px"
        height="20px"
        viewBox="-2 -3 24 24"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin"
        className="jam jam-calendar-alt"
        {...props}
    >
        <Path d="M9 2V1a1 1 0 1 1 2 0v1h3V1a1 1 0 0 1 2 0v1h1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h1V1a1 1 0 1 1 2 0v1h3zm0 2H6v1a1 1 0 1 1-2 0V4H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-1v1a1 1 0 0 1-2 0V4h-3v1a1 1 0 0 1-2 0V4zM3 8h2v2H3V8zm0 4h2v2H3v-2zm12 0h2v2h-2v-2zm0-4h2v2h-2V8zM7 8h2v2H7V8zm4 0h2v2h-2V8zm0 4h2v2h-2v-2zm-4 0h2v2H7v-2z" />
    </Svg>
);
export default IconCalendar;
