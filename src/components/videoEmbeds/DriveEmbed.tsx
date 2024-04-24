import React from "react";
import PropTypes from "prop-types";

const DriveEmbed = ({ embedId }: {
  embedId: string
}) => (
  <div className="">
    <iframe
      src={`https://drive.google.com/file/d/${embedId}/preview`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded Drive"
      className="w-full aspect-video"
    />
  </div>
);

DriveEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default DriveEmbed;