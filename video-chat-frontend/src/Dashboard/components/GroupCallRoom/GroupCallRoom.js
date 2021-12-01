import React from "react";
import ConversationButtons from "../ConversationButtons/ConversationButtons";

import "./GroupCallRoom.css";
import GroupCallVideo from "./GroupCallVideo";

const GroupCallRoom = (props) => {
  const { groupCallStreams, videoRendered, setVideoRendered } = props;
  return (
    <>
      {groupCallStreams.map((stream, i) => {
        return (
          <GroupCallVideo
            index={i}
            key={stream.id}
            stream={stream}
            videoRendered={videoRendered}
            setVideoRendered={setVideoRendered}
          />
        );
      })}

      <ConversationButtons {...props} groupCall />
    </>
  );
};

export default GroupCallRoom;
