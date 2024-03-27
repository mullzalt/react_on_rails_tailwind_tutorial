import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export function Greeter() {
  return <div className="text-2xl font-bold text-slate-500">Hello Warudo!</div>;
}

Greeter.propTypes = {
  // name: PropTypes.string.isRequired, // this is passed from the Rails view
};
