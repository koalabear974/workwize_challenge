const flowbite = require("flowbite-react/tailwind")

module.exports = {
  content: [
    './node_modules/flowbite/**/*.js',
    './src/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    flowbite.plugin()
  ],
}
