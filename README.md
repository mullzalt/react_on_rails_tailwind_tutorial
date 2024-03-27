# React on Rails with Tailwindcss

## Objective

The objective of this project is to learn the optimal way to integrate Rails with React.js, easy passing of props directly from your Rails view to your React components rather than having your Rails view load and then make a separate request to your API.
Please refer to the official documentations of [React on Rails](https://www.shakacode.com/react-on-rails/docs/).

Another important thing is that the ability to utilize Tailwindcss without having to install it separately on both Rails and React. So the package/bundle will be just on the Rails.

## Requirements

- **node.js**, latest stable version
- **yarn**
- **ruby** latest stable version
- **rails**, I'am using version 7, but the it's say could be working on 6 or later.
- **postgresql**, latest stable version
- **redis**, latest stable version

Tested on Arch Linux kernel 6.8.1, should be working on another Linux/Unix distributtion.

## Installation Guide from Scratch

1.  Create new rails app:

```
rails new YOUR_PROJECT --database=postgresql --skip-javascript
cd YOUR_PROJECT
```

2.  Add the `shakapacker` and `react_on_rails` gem:

```
bundle add react_on_rails --strict
bundle add shakapacker --strict
```

> :bulb: If the Rails ask you to overwrite files, just accept the overwriting, also accept for the rest of this installation process, **IF ITS FRESHLY INSTALLED** :bangbang:.

3. Run the `shakapacker` generator:

```
bundle exec rails shakapacker:install
```

Commit all change before proceeding to next steps. Or alternativaly, use `--ignore-warning` in next step.

```
git add .
git commit -m "initial commit"
```

4. Run the `react_on_rails` generator:

```
rails generate react_on_rails:install
```

5. Add and install `tailwindcss-rails` gem:

```
bundle add tailwindcss-rails
rails tailwindcss:install
```

#### Running the App

```
./bin/dev
```

Visit [http:127.0.0.1:3000/hello_world](http:127.0.0.1:3000/hello_world) to see the `react_on_rails` on action!

> :bulb: Notice that the style has plain or default html style, and even if you add the tailwind in the `className` on the `.jsx` file, it won't apply the style.

#### Configure Tailwind for the React

The problem above occurs because of the `hello_world_controller.rb` use the `hello_world` layout which by default not integrating tailwind.

```ruby
# app/controllers/hello_world_controller.rb
# frozen_string_literal: true

class HelloWorldController < ApplicationController
    # layout 'hello_world'
    layout 'application' # change the layout to application

    def index
        @hello_world_props = { name: 'Stranger' }
    end
end

```

But then the `application` layout does not load the react by default, to fix this,
Copy the content of the `app/javascript/packs/server-bundle.js` to `app/javascript/packs/application.js`

```js
// app/javascript/packs/application.js
import ReactOnRails from "react-on-rails";

import HelloWorld from "../bundles/HelloWorld/components/HelloWorldServer";

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
});
```

Lastly, add the file type `.jsx` to the `tailwind.config.js`:

```js
// config/tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.{js,jsx}", // add the jsx filetype to the talwind
    "./app/views/**/*.{erb,haml,html,slim}",
  ],
  theme: {...},
  plugins: [ ... ],
};

```

Now you should be able to apply tailwind css in the `.jsx` components. Let's try to add some tailwind class to the React component.

```jsx
// The generated file from the react_on_rails
// app/javascript/bundles/HelloWorld/components/HelloWorld.jsx
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import style from "./HelloWorld.module.css";

const HelloWorld = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <div>
      <h3 className="font-bold text-2xl">Hello, {name}!</h3>
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
```

> :warning: Each of the `.jsx` file must contain `import React from 'react'` even though it's not used.

The next update will showcase how to create custom components and integrate with rails controller and database.
