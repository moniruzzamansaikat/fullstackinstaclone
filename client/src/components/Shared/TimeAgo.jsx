import React from "react";
import ReactTimeAgo from "react-timeago";

function TimeAgo({ time }) {
  return (
    <small>
      <ReactTimeAgo date={time} timestyle="round" />
    </small>
  );
}

export default TimeAgo;
