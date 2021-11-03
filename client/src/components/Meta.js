import React from "react";
import { Helmet } from "react-helmet";

function Meta({ title = "InstaClone" }) {
  return (
    <Helmet>
      <meta http-equiv="X-UA-Compatible" content="IE=7" />
      <title>{title}</title>
      <meta
        name="description"
        content="This website is built for demo purpose. The developer tried to make a simpole clone of Instagram."
      />
      <meta name="keywords" content="react, node, nodejs, webdev,website" />
    </Helmet>
  );
}

export default Meta;
