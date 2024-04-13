import React from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  return <div>room id: #{params.id}</div>;
};

export default Meeting;
