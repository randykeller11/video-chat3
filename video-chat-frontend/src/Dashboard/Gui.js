import React from "react";
import "./Gui.css";
import { connect } from "react-redux";

import * as webRTCGroupCallHandler from "../utils/webRTC/webRTCGroupCallHandler";

function Gui(props) {
  const { groupCallRooms } = props;

  return (
    <div className="gui">
      {groupCallRooms.map((room) => (
        <h1
          key={room.roomId}
          onClick={() => {
            webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId);
          }}
        >
          {room.hostName}
        </h1>
      ))}
    </div>
  );
}
const mapStoreStateToProps = ({ dashboard }) => ({
  ...dashboard,
});

export default connect(mapStoreStateToProps)(Gui);
