import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import style from "./HelloWorld.module.css";

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div>
      <h3 className="text-lime-400">Hello, {name}!</h3>
      <hr />
      <form>
        <label className="text-green-800" htmlFor="name">
          Say hello to:
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
};

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default HelloWorld;
