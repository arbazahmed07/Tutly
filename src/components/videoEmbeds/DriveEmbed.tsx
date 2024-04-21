import React from "react";
import PropTypes from "prop-types";

const DriveEmbed = ({ embedId }: {
  embedId: string
}) => (
  <div className="">
    <iframe
      width="100%"
      height="480"
      src={`https://drive.google.com/file/d/${embedId}/preview`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded Drive"
    />
  </div>
);

DriveEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default DriveEmbed;