// Import CSS
// const css = require('./assets/css')

// Unlike the the first version of Vue.js Email Renderer, here we export the component as an object
// and then declare it in the component that is use it.

const inlineCSS = `
/* 
  Hover states are generally not supported so leaving links underline is a visual cue that the text is clickable.
 */

html {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  color: #fff;
}

body {
  width: 100%;
  height: 100%;
}
a {
  color: #0073ff;
}
h1 a,
h2 a,
h3 a {
  color: #292e31;
}
img {
  max-width: 100%;
}
.section-title {
  font-size: 26px;
}
.summary h2,
.headline {
  font-size: 20px;
}
.body,
.summary {
  font-size: 16px;
  line-height: 24px;
}
.footer a {
  color: #fff;
}
`

const css = {
  inlineCSS,
  headCSS: ''
}

export const email = {

  // The default width for <mj-body> is 600px.
  template: (body: string): string => `
    <mjml>
      <mj-head>
        <mj-title>Faker News: The Real Fake News</mj-title>
        <mj-preview>Vue.js is just plain awesome, so let's use it to build HTML email and bring some joy into HTML email development.</mj-preview>
        <mj-attributes>
          <mj-all font-family="Arial, sans-serif" />
          <mj-section padding="10px" background-color="#fff" />
          <mj-column padding="0" />
          <mj-text padding="0" />
        </mj-attributes>
        <mj-style inline="inline">
          ${css.inlineCSS}
        </mj-style>
        <mj-style>
          ${css.headCSS}
        </mj-style> 
      </mj-head>
      <mj-body>
        ${body}
      </mj-body>
    </mjml>
  `
}
