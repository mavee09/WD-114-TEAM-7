const COURSES = {
  webdev: {
    id: 'webdev',
    title: 'Web Development',
    tag: 'CS',
    progress: 88,
    units: [
      {
        id: 'u1', title: 'Unit 1: HTML Foundations',
        lessons: [
          { id: 'html-intro',   title: 'Intro to HTML',      done: true  },
          { id: 'html-tags',    title: 'HTML Tags & Elements',done: true  },
          { id: 'html-forms',   title: 'Forms & Inputs',      done: true  },
          { id: 'html-semantic',title: 'Semantic HTML',        done: false },
        ]
      },
      {
        id: 'u2', title: 'Unit 2: CSS Styling',
        lessons: [
          { id: 'css-selectors',title: 'CSS Selectors',  done: false },
          { id: 'css-flexbox',  title: 'Flexbox',        done: false },
          { id: 'css-grid',     title: 'CSS Grid',       done: false },
        ]
      },
      {
        id: 'u3', title: 'Unit 3: JavaScript',
        lessons: [
          { id: 'js-basics',    title: 'JS Basics',          done: false },
          { id: 'js-dom',       title: 'DOM Manipulation',   done: false },
          { id: 'js-events',    title: 'Events & Listeners', done: false },
        ]
      }
    ]
  },
  hci: {
    id: 'hci',
    title: 'Human-Computer Interaction',
    tag: 'CS',
    progress: 65,
    units: [
      {
        id: 'h1', title: 'Unit 1: HCI Foundations',
        lessons: [
          { id: 'hci-intro',      title: 'What is HCI?',          done: true  },
          { id: 'hci-history',    title: 'History of HCI',         done: true  },
          { id: 'hci-models',     title: 'User Mental Models',     done: false },
        ]
      },
      {
        id: 'h2', title: 'Unit 2: UX & Usability',
        lessons: [
          { id: 'hci-usability',  title: 'Usability Principles',   done: false },
          { id: 'hci-ux',         title: 'UX Design Process',      done: false },
          { id: 'hci-heuristics', title: "Nielsen's 10 Heuristics",done: false },
        ]
      },
      {
        id: 'h3', title: 'Unit 3: Design & Evaluation',
        lessons: [
          { id: 'hci-prototype',  title: 'Prototyping',            done: false },
          { id: 'hci-testing',    title: 'User Testing',           done: false },
          { id: 'hci-accessibility','title': 'Accessibility (A11y)',done: false },
        ]
      }
    ]
  }
};

const LESSONS = {

  /* ─── WEB DEV ─── */
  'html-intro': {
    course: 'webdev', unit: 'Unit 1', num: 1,
    title: 'Introduction to HTML',
    duration: '10 min', level: 'Beginner', completed: true,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-info-circle"></i> What is HTML?</h2>
        <p>HTML stands for <strong>HyperText Markup Language</strong>. It is the standard language used to create and structure content on the web. Every webpage you visit is built using HTML as its foundation.</p>
        <p>HTML uses <em>elements</em>, which are represented by <em>tags</em>. Tags are enclosed in angle brackets like <code>&lt;tagname&gt;</code>. Most tags have an opening and closing pair.</p>
        <div class="info-grid">
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-file-code"></i></div><h4>Markup Language</h4><p>HTML describes the structure and meaning of content, not just how it looks.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-globe"></i></div><h4>Web Standard</h4><p>Maintained by W3C (World Wide Web Consortium) and WHATWG.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-code-branch"></i></div><h4>Current Version</h4><p>HTML5 is the latest standard, introduced in 2014 and still evolving.</p></div>
        </div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-code"></i> Basic HTML Structure</h2>
        <p>Every HTML document follows a standard skeleton structure. Here's the minimum you need for a valid HTML5 page:</p>
        <div class="code-block"><span class="cm">&lt;!-- Basic HTML5 Document --&gt;</span>
<span class="kw">&lt;!DOCTYPE</span> <span class="at">html</span><span class="kw">&gt;</span>
<span class="kw">&lt;html</span> <span class="at">lang</span>=<span class="str">"en"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;head&gt;</span>
    <span class="kw">&lt;meta</span> <span class="at">charset</span>=<span class="str">"UTF-8"</span><span class="kw">/&gt;</span>
    <span class="kw">&lt;title&gt;</span>My First Page<span class="kw">&lt;/title&gt;</span>
  <span class="kw">&lt;/head&gt;</span>
  <span class="kw">&lt;body&gt;</span>
    <span class="kw">&lt;h1&gt;</span>Hello, World!<span class="kw">&lt;/h1&gt;</span>
    <span class="kw">&lt;p&gt;</span>This is my first paragraph.<span class="kw">&lt;/p&gt;</span>
  <span class="kw">&lt;/body&gt;</span>
<span class="kw">&lt;/html&gt;</span></div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p><strong>Tip:</strong> The <code>&lt;!DOCTYPE html&gt;</code> declaration tells the browser you're using HTML5. Always include it as the very first line of your HTML file.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-list"></i> Common HTML Tags</h2>
        <p>Here are the most frequently used HTML tags you will encounter as a beginner:</p>
        <div class="code-block"><span class="kw">&lt;h1&gt;</span> to <span class="kw">&lt;h6&gt;</span>  <span class="cm">— Headings (h1 is the largest)</span>
<span class="kw">&lt;p&gt;</span>            <span class="cm">— Paragraph of text</span>
<span class="kw">&lt;a href=""&gt;</span>     <span class="cm">— Hyperlink / anchor</span>
<span class="kw">&lt;img src=""&gt;</span>    <span class="cm">— Embeds an image</span>
<span class="kw">&lt;div&gt;</span>           <span class="cm">— Generic block container</span>
<span class="kw">&lt;span&gt;</span>          <span class="cm">— Generic inline container</span>
<span class="kw">&lt;ul&gt;</span> / <span class="kw">&lt;ol&gt;</span>     <span class="cm">— Unordered / Ordered list</span>
<span class="kw">&lt;li&gt;</span>            <span class="cm">— List item</span>
<span class="kw">&lt;br&gt;</span>            <span class="cm">— Line break (self-closing)</span>
<span class="kw">&lt;hr&gt;</span>            <span class="cm">— Horizontal rule</span></div>
      </div>
    `
  },

  'html-tags': {
    course: 'webdev', unit: 'Unit 1', num: 2,
    title: 'HTML Tags & Elements',
    duration: '12 min', level: 'Beginner', completed: true,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-tag"></i> Anatomy of an HTML Element</h2>
        <p>An HTML <strong>element</strong> consists of a start tag, content, and an end tag. Understanding this structure is fundamental to writing correct HTML.</p>
        <div class="code-block"><span class="cm">Opening tag    Content    Closing tag</span>
    <span class="kw">↓              ↓          ↓</span>
<span class="kw">&lt;p&gt;</span>  Hello, world!  <span class="kw">&lt;/p&gt;</span>

<span class="cm">Attribute = name + value pair (lives inside opening tag)</span>
<span class="kw">&lt;a</span> <span class="at">href</span>=<span class="str">"https://example.com"</span> <span class="at">target</span>=<span class="str">"_blank"</span><span class="kw">&gt;</span>Click me<span class="kw">&lt;/a&gt;</span>

<span class="cm">Self-closing elements (void elements — no content, no closing tag)</span>
<span class="kw">&lt;img</span> <span class="at">src</span>=<span class="str">"photo.jpg"</span> <span class="at">alt</span>=<span class="str">"A photo"</span><span class="kw">/&gt;</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"text"</span><span class="kw">/&gt;</span>
<span class="kw">&lt;br/&gt;</span></div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>Attributes always go in the opening tag and are written as <code>name="value"</code> pairs. Some attributes (like <code>disabled</code> or <code>required</code>) are boolean — they don't need a value.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-layer-group"></i> Block vs Inline Elements</h2>
        <p>HTML elements are categorized into two main display types:</p>
        <div class="info-grid">
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-square"></i></div><h4>Block Elements</h4><p>Always start on a new line and take full width. Examples: <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>, <code>&lt;ul&gt;</code>, <code>&lt;section&gt;</code>.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-minus"></i></div><h4>Inline Elements</h4><p>Flow within text without line breaks. Examples: <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;img&gt;</code>.</p></div>
        </div>
        <div class="code-block"><span class="cm">&lt;!-- Block elements stack vertically --&gt;</span>
<span class="kw">&lt;p&gt;</span>First paragraph.<span class="kw">&lt;/p&gt;</span>
<span class="kw">&lt;p&gt;</span>Second paragraph — starts on new line.<span class="kw">&lt;/p&gt;</span>

<span class="cm">&lt;!-- Inline elements flow inside text --&gt;</span>
<span class="kw">&lt;p&gt;</span>
  This is <span class="kw">&lt;strong&gt;</span>bold<span class="kw">&lt;/strong&gt;</span> and this is <span class="kw">&lt;em&gt;</span>italic<span class="kw">&lt;/em&gt;</span> text.
<span class="kw">&lt;/p&gt;</span></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-link"></i> Links and Images</h2>
        <p>Two of the most essential HTML elements are anchors (links) and images. Both rely on attributes to function correctly.</p>
        <div class="code-block"><span class="cm">&lt;!-- Anchor / Link --&gt;</span>
<span class="kw">&lt;a</span> <span class="at">href</span>=<span class="str">"https://google.com"</span><span class="kw">&gt;</span>Go to Google<span class="kw">&lt;/a&gt;</span>
<span class="kw">&lt;a</span> <span class="at">href</span>=<span class="str">"about.html"</span><span class="kw">&gt;</span>About page (relative)<span class="kw">&lt;/a&gt;</span>
<span class="kw">&lt;a</span> <span class="at">href</span>=<span class="str">"mailto:hello@school.com"</span><span class="kw">&gt;</span>Email us<span class="kw">&lt;/a&gt;</span>

<span class="cm">&lt;!-- Image --&gt;</span>
<span class="kw">&lt;img</span> <span class="at">src</span>=<span class="str">"logo.png"</span> <span class="at">alt</span>=<span class="str">"School logo"</span> <span class="at">width</span>=<span class="str">"200"</span><span class="kw">/&gt;</span>
<span class="cm">   ↑ src = source path   ↑ alt = accessibility description</span></div>
        <div class="warn-box"><i class="fas fa-exclamation-triangle"></i><p>Always include an <code>alt</code> attribute on images. It's required for accessibility (screen readers) and shown when the image fails to load.</p></div>
      </div>
    `
  },

  'html-forms': {
    course: 'webdev', unit: 'Unit 1', num: 3,
    title: 'Forms & Inputs',
    duration: '15 min', level: 'Beginner', completed: true,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-wpforms"></i> HTML Forms</h2>
        <p>Forms are how websites collect input from users — login boxes, search bars, registration pages, and contact forms are all built with HTML form elements. The <code>&lt;form&gt;</code> element is the container that wraps all input fields.</p>
        <div class="code-block"><span class="kw">&lt;form</span> <span class="at">action</span>=<span class="str">"/submit"</span> <span class="at">method</span>=<span class="str">"POST"</span><span class="kw">&gt;</span>
  <span class="kw">&lt;label</span> <span class="at">for</span>=<span class="str">"name"</span><span class="kw">&gt;</span>Your Name:<span class="kw">&lt;/label&gt;</span>
  <span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"text"</span> <span class="at">id</span>=<span class="str">"name"</span> <span class="at">name</span>=<span class="str">"name"</span> <span class="at">placeholder</span>=<span class="str">"Enter name"</span><span class="kw">/&gt;</span>

  <span class="kw">&lt;label</span> <span class="at">for</span>=<span class="str">"email"</span><span class="kw">&gt;</span>Email:<span class="kw">&lt;/label&gt;</span>
  <span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"email"</span> <span class="at">id</span>=<span class="str">"email"</span> <span class="at">name</span>=<span class="str">"email"</span> <span class="at">required</span><span class="kw">/&gt;</span>

  <span class="kw">&lt;button</span> <span class="at">type</span>=<span class="str">"submit"</span><span class="kw">&gt;</span>Submit<span class="kw">&lt;/button&gt;</span>
<span class="kw">&lt;/form&gt;</span></div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>Always pair <code>&lt;label&gt;</code> with <code>&lt;input&gt;</code> using matching <code>for</code> and <code>id</code> attributes. This improves accessibility — clicking the label focuses the input field.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-keyboard"></i> Input Types</h2>
        <p>The <code>type</code> attribute of <code>&lt;input&gt;</code> controls what kind of data can be entered and how the field appears:</p>
        <div class="code-block"><span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"text"</span>     <span class="kw">/&gt;</span>  <span class="cm">— Single line text</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"password"</span> <span class="kw">/&gt;</span>  <span class="cm">— Hidden characters</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"email"</span>    <span class="kw">/&gt;</span>  <span class="cm">— Validates email format</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"number"</span>   <span class="kw">/&gt;</span>  <span class="cm">— Numeric only</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"checkbox"</span> <span class="kw">/&gt;</span>  <span class="cm">— Tick box</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"radio"</span>    <span class="kw">/&gt;</span>  <span class="cm">— One-of-many selection</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"date"</span>     <span class="kw">/&gt;</span>  <span class="cm">— Date picker</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"file"</span>     <span class="kw">/&gt;</span>  <span class="cm">— File upload</span>
<span class="kw">&lt;textarea&gt;&lt;/textarea&gt;</span>      <span class="cm">— Multi-line text</span>
<span class="kw">&lt;select&gt;&lt;option&gt;...&lt;/select&gt;</span> <span class="cm">— Dropdown menu</span></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-shield-alt"></i> Form Validation</h2>
        <p>HTML5 supports built-in validation attributes that enforce rules before the form is submitted — no JavaScript needed for basic checks:</p>
        <div class="code-block"><span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"text"</span>   <span class="at">required</span>                       <span class="kw">/&gt;</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"number"</span> <span class="at">min</span>=<span class="str">"1"</span> <span class="at">max</span>=<span class="str">"100"</span>              <span class="kw">/&gt;</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"text"</span>   <span class="at">minlength</span>=<span class="str">"3"</span> <span class="at">maxlength</span>=<span class="str">"20"</span>  <span class="kw">/&gt;</span>
<span class="kw">&lt;input</span> <span class="at">type</span>=<span class="str">"text"</span>   <span class="at">pattern</span>=<span class="str">"[A-Za-z]+"</span>            <span class="kw">/&gt;</span>
<span class="cm">           ↑ regex pattern — only letters allowed</span></div>
      </div>
    `
  },

  'html-semantic': {
    course: 'webdev', unit: 'Unit 1', num: 4,
    title: 'Semantic HTML',
    duration: '11 min', level: 'Beginner', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-book"></i> What is Semantic HTML?</h2>
        <p>Semantic HTML means using HTML elements that carry <strong>meaning</strong> about the content they wrap — not just presentational structure. Before HTML5, developers used endless <code>&lt;div&gt;</code> tags for everything. Semantic elements tell both the browser and developers <em>what role</em> that content plays.</p>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>Using semantic HTML improves <strong>accessibility</strong> (screen readers understand the page structure), <strong>SEO</strong> (search engines rank content better), and <strong>maintainability</strong> (easier for teams to read your code).</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-sitemap"></i> Key Semantic Elements</h2>
        <div class="code-block"><span class="kw">&lt;header&gt;</span>    <span class="cm">— Top of page or section (logo, nav)</span>
<span class="kw">&lt;nav&gt;</span>       <span class="cm">— Navigation links</span>
<span class="kw">&lt;main&gt;</span>      <span class="cm">— Primary content (only one per page!)</span>
<span class="kw">&lt;section&gt;</span>   <span class="cm">— Thematic grouping of content</span>
<span class="kw">&lt;article&gt;</span>   <span class="cm">— Self-contained content (blog post, card)</span>
<span class="kw">&lt;aside&gt;</span>     <span class="cm">— Sidebar / related content</span>
<span class="kw">&lt;footer&gt;</span>    <span class="cm">— Bottom of page or section</span>
<span class="kw">&lt;figure&gt;</span>    <span class="cm">— Image with caption</span>
<span class="kw">&lt;figcaption&gt;</span><span class="cm">— Caption for &lt;figure&gt;</span>
<span class="kw">&lt;time&gt;</span>      <span class="cm">— Date/time value</span>
<span class="kw">&lt;mark&gt;</span>      <span class="cm">— Highlighted/relevant text</span></div>
        <div class="code-block"><span class="cm">&lt;!-- ❌ Non-semantic (harder to understand) --&gt;</span>
<span class="kw">&lt;div</span> <span class="at">id</span>=<span class="str">"header"</span><span class="kw">&gt;</span>...<span class="kw">&lt;/div&gt;</span>
<span class="kw">&lt;div</span> <span class="at">id</span>=<span class="str">"main"</span><span class="kw">&gt;</span>...<span class="kw">&lt;/div&gt;</span>

<span class="cm">&lt;!-- ✅ Semantic (clear meaning) --&gt;</span>
<span class="kw">&lt;header&gt;</span>...<span class="kw">&lt;/header&gt;</span>
<span class="kw">&lt;main&gt;</span>...<span class="kw">&lt;/main&gt;</span></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-draw-polygon"></i> Page Layout with Semantics</h2>
        <p>A well-structured modern web page typically uses this semantic layout:</p>
        <div class="code-block"><span class="kw">&lt;body&gt;</span>
  <span class="kw">&lt;header&gt;</span>
    <span class="kw">&lt;nav&gt;</span>...<span class="kw">&lt;/nav&gt;</span>
  <span class="kw">&lt;/header&gt;</span>
  <span class="kw">&lt;main&gt;</span>
    <span class="kw">&lt;section</span> <span class="at">id</span>=<span class="str">"hero"</span><span class="kw">&gt;</span>...<span class="kw">&lt;/section&gt;</span>
    <span class="kw">&lt;section</span> <span class="at">id</span>=<span class="str">"about"</span><span class="kw">&gt;</span>
      <span class="kw">&lt;article&gt;</span>...<span class="kw">&lt;/article&gt;</span>
    <span class="kw">&lt;/section&gt;</span>
    <span class="kw">&lt;aside&gt;</span>Related links<span class="kw">&lt;/aside&gt;</span>
  <span class="kw">&lt;/main&gt;</span>
  <span class="kw">&lt;footer&gt;</span>...<span class="kw">&lt;/footer&gt;</span>
<span class="kw">&lt;/body&gt;</span></div>
      </div>
    `
  },

  'css-selectors': {
    course: 'webdev', unit: 'Unit 2', num: 1,
    title: 'CSS Selectors',
    duration: '14 min', level: 'Beginner', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-paint-brush"></i> What is CSS?</h2>
        <p>CSS stands for <strong>Cascading Style Sheets</strong>. While HTML defines the structure, CSS defines the <em>appearance</em> — colors, fonts, spacing, layout, and animations. CSS rules consist of a <strong>selector</strong> and a <strong>declaration block</strong>.</p>
        <div class="code-block"><span class="cm">/* Anatomy of a CSS Rule */</span>
<span class="fn">selector</span> {
  <span class="at">property</span>: <span class="str">value</span>;
  <span class="at">another-property</span>: <span class="str">value</span>;
}

<span class="cm">/* Example */</span>
<span class="fn">h1</span> {
  <span class="at">color</span>: <span class="str">#1a4a2e</span>;
  <span class="at">font-size</span>: <span class="str">2rem</span>;
  <span class="at">font-weight</span>: <span class="str">700</span>;
}</div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-crosshairs"></i> Types of Selectors</h2>
        <div class="code-block"><span class="cm">/* 1. Element selector — targets all &lt;p&gt; tags */</span>
<span class="fn">p</span> { <span class="at">color</span>: <span class="str">gray</span>; }

<span class="cm">/* 2. Class selector — targets class="card" */</span>
<span class="fn">.card</span> { <span class="at">background</span>: <span class="str">white</span>; }

<span class="cm">/* 3. ID selector — targets id="header" (unique!) */</span>
<span class="fn">#header</span> { <span class="at">height</span>: <span class="str">64px</span>; }

<span class="cm">/* 4. Descendant selector — p inside .card */</span>
<span class="fn">.card p</span> { <span class="at">font-size</span>: <span class="str">.9rem</span>; }

<span class="cm">/* 5. Pseudo-class — hover state */</span>
<span class="fn">button:hover</span> { <span class="at">background</span>: <span class="str">darkgreen</span>; }

<span class="cm">/* 6. Pseudo-element — first line of paragraph */</span>
<span class="fn">p::first-line</span> { <span class="at">font-weight</span>: <span class="str">bold</span>; }

<span class="cm">/* 7. Attribute selector */</span>
<span class="fn">input[type="email"]</span> { <span class="at">border</span>: <span class="str">2px solid green</span>; }</div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p><strong>Specificity</strong> determines which rule wins when multiple rules apply. ID selectors beat class selectors, which beat element selectors. Inline styles beat them all (except <code>!important</code>).</p></div>
      </div>
    `
  },

  'css-flexbox': {
    course: 'webdev', unit: 'Unit 2', num: 2,
    title: 'Flexbox',
    duration: '18 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-grip-lines"></i> What is Flexbox?</h2>
        <p>CSS Flexbox (Flexible Box Layout) is a one-dimensional layout system that makes it easy to align and distribute items in a container — horizontally or vertically. It completely replaces the need for float-based layouts.</p>
        <div class="code-block"><span class="cm">/* Enable Flexbox on the parent container */</span>
<span class="fn">.container</span> {
  <span class="at">display</span>: <span class="str">flex</span>;

  <span class="cm">/* Direction */</span>
  <span class="at">flex-direction</span>: <span class="str">row</span>;        <span class="cm">/* row | column | row-reverse */</span>

  <span class="cm">/* Main axis alignment (horizontal if row) */</span>
  <span class="at">justify-content</span>: <span class="str">center</span>;   <span class="cm">/* flex-start | flex-end | space-between */</span>

  <span class="cm">/* Cross axis alignment (vertical if row) */</span>
  <span class="at">align-items</span>: <span class="str">center</span>;      <span class="cm">/* stretch | flex-start | flex-end */</span>

  <span class="cm">/* Allow wrapping to next line */</span>
  <span class="at">flex-wrap</span>: <span class="str">wrap</span>;
  <span class="at">gap</span>: <span class="str">1rem</span>;                  <span class="cm">/* Space between items */</span>
}</div>
        <div class="code-block"><span class="cm">/* Control flex children */</span>
<span class="fn">.item</span> {
  <span class="at">flex</span>: <span class="num">1</span>;           <span class="cm">/* Grow to fill remaining space */</span>
  <span class="at">flex-basis</span>: <span class="str">200px</span>; <span class="cm">/* Default size before growing */</span>
  <span class="at">flex-shrink</span>: <span class="num">0</span>;    <span class="cm">/* Don't shrink below flex-basis */</span>
}

<span class="cm">/* Center a single item within flex container */</span>
<span class="fn">.center-me</span> {
  <span class="at">display</span>: <span class="str">flex</span>;
  <span class="at">justify-content</span>: <span class="str">center</span>;
  <span class="at">align-items</span>: <span class="str">center</span>;
}</div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>The centering trick <code>display:flex; justify-content:center; align-items:center;</code> is one of the most used CSS patterns in the real world — it perfectly centers any child element.</p></div>
      </div>
    `
  },

  'css-grid': {
    course: 'webdev', unit: 'Unit 2', num: 3,
    title: 'CSS Grid',
    duration: '20 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-th"></i> CSS Grid Layout</h2>
        <p>CSS Grid is a <strong>two-dimensional</strong> layout system — meaning it handles both rows AND columns at the same time. It's perfect for building complex page layouts like dashboards, galleries, and magazine-style pages.</p>
        <div class="code-block"><span class="fn">.grid-container</span> {
  <span class="at">display</span>: <span class="str">grid</span>;

  <span class="cm">/* Define 3 columns: fixed, flexible, fixed */</span>
  <span class="at">grid-template-columns</span>: <span class="num">200px</span> <span class="num">1fr</span> <span class="num">300px</span>;

  <span class="cm">/* Define 2 rows */</span>
  <span class="at">grid-template-rows</span>: <span class="str">auto</span> <span class="num">1fr</span>;

  <span class="cm">/* Repeat pattern shorthand */</span>
  <span class="at">grid-template-columns</span>: <span class="fn">repeat</span>(<span class="num">3</span>, <span class="num">1fr</span>); <span class="cm">/* 3 equal columns */</span>

  <span class="at">gap</span>: <span class="num">1.5rem</span>; <span class="cm">/* Space between all cells */</span>
}

<span class="cm">/* Make an item span multiple columns */</span>
<span class="fn">.hero-item</span> {
  <span class="at">grid-column</span>: <span class="num">1</span> / <span class="num">3</span>;  <span class="cm">/* Span from col 1 to col 3 */</span>
  <span class="at">grid-row</span>:    <span class="num">1</span> / <span class="num">2</span>;
}</div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>Use <code>repeat(auto-fit, minmax(250px, 1fr))</code> to create a fully responsive grid that automatically adjusts the number of columns based on screen width — no media queries needed!</p></div>
      </div>
    `
  },

  'js-basics': {
    course: 'webdev', unit: 'Unit 3', num: 1,
    title: 'JavaScript Basics',
    duration: '20 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-bolt"></i> What is JavaScript?</h2>
        <p>JavaScript (JS) is the programming language of the web. While HTML creates structure and CSS adds style, JavaScript adds <strong>interactivity and behaviour</strong> — things like button clicks, form validation, animations, and fetching data from servers.</p>
        <div class="info-grid">
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-running"></i></div><h4>Runs in Browser</h4><p>No installation needed. Every modern browser has a built-in JavaScript engine.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-server"></i></div><h4>Also on Server</h4><p>Node.js lets JavaScript run on the backend, making it a full-stack language.</p></div>
        </div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-code"></i> Variables & Data Types</h2>
        <div class="code-block"><span class="cm">// Declaring variables</span>
<span class="kw">const</span> name = <span class="str">"Alex"</span>;        <span class="cm">// constant — can't reassign</span>
<span class="kw">let</span>   age  = <span class="num">21</span>;           <span class="cm">// variable — can reassign</span>
<span class="kw">var</span>   old  = <span class="str">"avoid this"</span>;  <span class="cm">// old style — avoid in modern JS</span>

<span class="cm">// Data types</span>
<span class="kw">const</span> text    = <span class="str">"Hello"</span>;   <span class="cm">// String</span>
<span class="kw">const</span> score   = <span class="num">95</span>;        <span class="cm">// Number</span>
<span class="kw">const</span> passed  = <span class="kw">true</span>;      <span class="cm">// Boolean</span>
<span class="kw">const</span> nothing = <span class="kw">null</span>;      <span class="cm">// Null (intentional empty)</span>
<span class="kw">const</span> missing = <span class="kw">undefined</span>; <span class="cm">// Undefined (not assigned)</span>
<span class="kw">const</span> items   = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]; <span class="cm">// Array</span>
<span class="kw">const</span> user    = { name: <span class="str">"Alex"</span>, age: <span class="num">21</span> }; <span class="cm">// Object</span></div>
        <div class="code-block"><span class="cm">// Functions</span>
<span class="kw">function</span> <span class="fn">greet</span>(name) {
  <span class="kw">return</span> <span class="str">"Hello, "</span> + name + <span class="str">"!"</span>;
}

<span class="cm">// Arrow function (modern syntax)</span>
<span class="kw">const</span> <span class="fn">add</span> = (a, b) => a + b;

<span class="cm">// Conditionals</span>
<span class="kw">if</span> (score >= <span class="num">75</span>) {
  console.<span class="fn">log</span>(<span class="str">"Passed!"</span>);
} <span class="kw">else</span> {
  console.<span class="fn">log</span>(<span class="str">"Try again."</span>);
}</div>
      </div>
    `
  },

  'js-dom': {
    course: 'webdev', unit: 'Unit 3', num: 2,
    title: 'DOM Manipulation',
    duration: '22 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-project-diagram"></i> What is the DOM?</h2>
        <p>The <strong>Document Object Model (DOM)</strong> is a tree-shaped representation of an HTML page that JavaScript can read and modify. Every HTML element becomes a <em>node</em> in this tree. JavaScript can select, change, add, or remove any node in real time.</p>
        <div class="code-block"><span class="cm">// Select elements</span>
<span class="kw">const</span> title = document.<span class="fn">getElementById</span>(<span class="str">'main-title'</span>);
<span class="kw">const</span> card  = document.<span class="fn">querySelector</span>(<span class="str">'.card'</span>);      <span class="cm">// first match</span>
<span class="kw">const</span> btns  = document.<span class="fn">querySelectorAll</span>(<span class="str">'button'</span>);  <span class="cm">// all matches</span>

<span class="cm">// Change content</span>
title.textContent = <span class="str">"New Title"</span>;
card.innerHTML   = <span class="str">"&lt;p&gt;New HTML content&lt;/p&gt;"</span>;

<span class="cm">// Change styles</span>
title.style.color    = <span class="str">"#1a4a2e"</span>;
title.style.fontSize = <span class="str">"2rem"</span>;

<span class="cm">// Add / remove CSS classes</span>
card.<span class="fn">classList</span>.<span class="fn">add</span>(<span class="str">'active'</span>);
card.<span class="fn">classList</span>.<span class="fn">remove</span>(<span class="str">'hidden'</span>);
card.<span class="fn">classList</span>.<span class="fn">toggle</span>(<span class="str">'open'</span>);</div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>Prefer <code>classList.add/remove/toggle</code> over setting <code>style</code> directly. It keeps styling in CSS (where it belongs) and JavaScript only controls behaviour.</p></div>
        <div class="code-block"><span class="cm">// Create and append new elements</span>
<span class="kw">const</span> newCard = document.<span class="fn">createElement</span>(<span class="str">'div'</span>);
newCard.textContent = <span class="str">"I was created by JS!"</span>;
newCard.<span class="fn">classList</span>.<span class="fn">add</span>(<span class="str">'card'</span>);
document.body.<span class="fn">appendChild</span>(newCard);

<span class="cm">// Remove an element</span>
card.<span class="fn">remove</span>();</div>
      </div>
    `
  },

  'js-events': {
    course: 'webdev', unit: 'Unit 3', num: 3,
    title: 'Events & Listeners',
    duration: '18 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-mouse-pointer"></i> JavaScript Events</h2>
        <p>Events are signals fired by the browser when something happens — a button click, a keypress, a page load, a mouse movement. JavaScript <strong>event listeners</strong> let you run code in response to these signals.</p>
        <div class="code-block"><span class="cm">// Basic event listener syntax</span>
element.<span class="fn">addEventListener</span>(<span class="str">'eventType'</span>, callbackFunction);

<span class="cm">// Common events</span>
btn.<span class="fn">addEventListener</span>(<span class="str">'click'</span>,      () => console.<span class="fn">log</span>(<span class="str">'Clicked!'</span>));
input.<span class="fn">addEventListener</span>(<span class="str">'input'</span>,     (e) => console.<span class="fn">log</span>(e.target.value));
form.<span class="fn">addEventListener</span>(<span class="str">'submit'</span>,    (e) => e.<span class="fn">preventDefault</span>());
window.<span class="fn">addEventListener</span>(<span class="str">'load'</span>,     () => console.<span class="fn">log</span>(<span class="str">'Page loaded'</span>));
document.<span class="fn">addEventListener</span>(<span class="str">'keydown'</span>,(e) => console.<span class="fn">log</span>(e.key));</div>
        <div class="code-block"><span class="cm">// Event object properties</span>
btn.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, (event) => {
  event.target;        <span class="cm">// the element that was clicked</span>
  event.type;          <span class="cm">// 'click'</span>
  event.<span class="fn">preventDefault</span>(); <span class="cm">// stop default browser action</span>
  event.<span class="fn">stopPropagation</span>(); <span class="cm">// stop event bubbling up</span>
});

<span class="cm">// Remove a listener</span>
<span class="kw">function</span> <span class="fn">handler</span>() { ... }
btn.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, handler);
btn.<span class="fn">removeEventListener</span>(<span class="str">'click'</span>, handler);</div>
        <div class="warn-box"><i class="fas fa-exclamation-triangle"></i><p>Use <code>addEventListener</code> over inline <code>onclick=""</code> HTML attributes — it's more flexible (supports multiple listeners) and keeps HTML and JS separate (separation of concerns).</p></div>
      </div>
    `
  },

  /* ─── HCI ─── */
  'hci-intro': {
    course: 'hci', unit: 'Unit 1', num: 1,
    title: 'What is HCI?',
    duration: '12 min', level: 'Beginner', completed: true,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-mouse-pointer"></i> Defining Human-Computer Interaction</h2>
        <p><strong>Human-Computer Interaction (HCI)</strong> is the study of how people interact with computers and digital systems — and how to design those systems to be effective, efficient, and satisfying to use. It sits at the intersection of <em>computer science</em>, <em>cognitive psychology</em>, and <em>design</em>.</p>
        <div class="info-grid">
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-user"></i></div><h4>Human</h4><p>Understanding users — their goals, cognitive limits, emotions, and behaviours.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-laptop"></i></div><h4>Computer</h4><p>The technology — apps, websites, devices, and how they respond to input.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-exchange-alt"></i></div><h4>Interaction</h4><p>The dialogue between human and machine — input, feedback, and outcome.</p></div>
        </div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>HCI is not just about making things look pretty. It's about making systems that work <strong>for people</strong> — reducing errors, minimizing learning time, and maximizing satisfaction.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-bullseye"></i> Goals of HCI</h2>
        <p>HCI aims to achieve three main goals when designing interfaces:</p>
        <ul class="styled-list">
          <li><strong>Usability</strong> — the system is easy to learn and efficient to use.</li>
          <li><strong>Accessibility</strong> — usable by people with different abilities and disabilities.</li>
          <li><strong>User Satisfaction</strong> — using the system feels pleasant, not frustrating.</li>
          <li><strong>Safety</strong> — the system prevents errors and recovers gracefully from them.</li>
          <li><strong>Utility</strong> — it provides the right features to do what users need.</li>
        </ul>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-graduation-cap"></i> Why Study HCI?</h2>
        <p>Bad design costs real money and lives. Poorly designed medical software has led to medication errors. Confusing cockpit controls have contributed to accidents. In everyday software, bad UX drives users away — 88% of users won't return to a website after a bad experience.</p>
        <p>HCI gives engineers and designers the tools to <em>measure</em> and <em>improve</em> the quality of interaction — through user research, prototyping, testing, and iterative design.</p>
      </div>
    `
  },

  'hci-history': {
    course: 'hci', unit: 'Unit 1', num: 2,
    title: 'History of HCI',
    duration: '13 min', level: 'Beginner', completed: true,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-history"></i> A Brief History of HCI</h2>
        <p>HCI evolved alongside computing itself. Understanding its history shows how dramatically our relationship with computers has changed in just a few decades.</p>
      </div>
      <div class="content-section">
        <h2 class="cs-heading sub"><i class="fas fa-terminal"></i> 1940s–1970s: Command Line Era</h2>
        <p>Early computers required expert operators using <strong>punch cards</strong> and later <strong>command line interfaces (CLI)</strong>. Interaction was text-only — users had to memorize exact commands with no visual feedback. Computers were for specialists, not the general public.</p>
        <div class="code-block"><span class="cm"># Example: old Unix-style command interaction</span>
<span class="str">$ ls -la /home/user</span>
<span class="str">$ grep -r "keyword" ./documents</span>
<span class="cm"># Users had to memorize every command exactly</span></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading sub"><i class="fas fa-desktop"></i> 1970s–1980s: GUI Revolution</h2>
        <p>Xerox PARC invented the <strong>Graphical User Interface (GUI)</strong> in the early 1970s — using windows, icons, menus, and pointers (WIMP). Apple popularized this with the <strong>Lisa (1983)</strong> and <strong>Macintosh (1984)</strong>. HCI became a formal field of academic study during this era.</p>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>The term "Human-Computer Interaction" was formally coined in the 1980s. The first ACM CHI (Conference on Human Factors in Computing Systems) was held in 1983 — it's still the world's leading HCI conference today.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading sub"><i class="fas fa-globe"></i> 1990s–2000s: Web & Usability</h2>
        <p>The World Wide Web brought HCI to billions of users. Researchers like <strong>Jakob Nielsen</strong> popularized usability testing and the concept of "discount usability" — quick, cheap methods to identify interface problems. Web accessibility became a major concern.</p>
      </div>
      <div class="content-section">
        <h2 class="cs-heading sub"><i class="fas fa-mobile-alt"></i> 2007–Present: Touch, Voice & Beyond</h2>
        <p>The iPhone (2007) redefined interaction — touch replaced the mouse for billions of users. Today, HCI extends to <strong>voice interfaces</strong> (Siri, Alexa), <strong>augmented/virtual reality</strong>, <strong>gesture control</strong>, <strong>brain-computer interfaces</strong>, and <strong>conversational AI</strong>.</p>
      </div>
    `
  },

  'hci-models': {
    course: 'hci', unit: 'Unit 1', num: 3,
    title: 'User Mental Models',
    duration: '14 min', level: 'Beginner', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-brain"></i> What is a Mental Model?</h2>
        <p>A <strong>mental model</strong> is the internal picture a user builds in their mind about how a system works. When a user interacts with software, they don't see the code — they develop assumptions based on experience, visual cues, and feedback.</p>
        <p>Good design <em>aligns the system's actual behavior</em> with users' mental models. When there's a mismatch, confusion and errors occur.</p>
        <div class="info-grid">
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-user-cog"></i></div><h4>User's Mental Model</h4><p>What the user believes about how the system works — often simplified and sometimes wrong.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-cogs"></i></div><h4>System Model</h4><p>How the system actually works internally — often far more complex than users imagine.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-eye"></i></div><h4>Designer's Model</h4><p>What the designer intends the user to think — should match the user's mental model as closely as possible.</p></div>
        </div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-folder-open"></i> Real-World Metaphors</h2>
        <p>Designers use <strong>metaphors</strong> to connect new interfaces to users' existing mental models. The desktop metaphor is the classic example:</p>
        <ul class="styled-list">
          <li>Files and <strong>folders</strong> mirror physical filing cabinets</li>
          <li>The <strong>recycle bin / trash</strong> works like a physical waste bin</li>
          <li><strong>Cut, copy, paste</strong> mirrors physical document editing</li>
          <li><strong>Scrolling</strong> mimics reading a physical scroll or document</li>
        </ul>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>When introducing a new feature, lean on existing metaphors users already know. But don't push metaphors too far — a "trash bin" that permanently deletes files would violate the mental model (trash can be retrieved in real life!).</p></div>
      </div>
    `
  },

  'hci-usability': {
    course: 'hci', unit: 'Unit 2', num: 1,
    title: 'Usability Principles',
    duration: '16 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-check-double"></i> What is Usability?</h2>
        <p>Usability is a quality attribute assessing how easy user interfaces are to use. It has five components defined by Jakob Nielsen:</p>
        <div class="info-grid">
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-book-open"></i></div><h4>Learnability</h4><p>How easy is it for new users to accomplish basic tasks the first time?</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-tachometer-alt"></i></div><h4>Efficiency</h4><p>Once learned, how quickly can users perform tasks?</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-redo"></i></div><h4>Memorability</h4><p>When returning after time away, how easily can users re-establish proficiency?</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-exclamation-circle"></i></div><h4>Errors</h4><p>How many errors do users make, how severe are they, and how easily can they recover?</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-smile"></i></div><h4>Satisfaction</h4><p>How pleasant is it to use the design?</p></div>
        </div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-ruler-combined"></i> Measuring Usability</h2>
        <p>Usability can be measured empirically through <strong>usability testing</strong> — observing real users complete real tasks. Key metrics include:</p>
        <ul class="styled-list">
          <li><strong>Task completion rate</strong> — % of users who successfully complete the task</li>
          <li><strong>Time on task</strong> — how long it takes to complete a specific action</li>
          <li><strong>Error rate</strong> — number and type of mistakes made</li>
          <li><strong>System Usability Scale (SUS)</strong> — standardized 10-question survey (0–100 score)</li>
        </ul>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>Nielsen's research shows that testing with just <strong>5 users</strong> uncovers about 85% of usability problems — more users add diminishing returns. Run multiple small tests and iterate between each!</p></div>
      </div>
    `
  },

  'hci-ux': {
    course: 'hci', unit: 'Unit 2', num: 2,
    title: 'UX Design Process',
    duration: '18 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-drafting-compass"></i> What is UX Design?</h2>
        <p><strong>User Experience (UX) Design</strong> is the process of creating products that provide meaningful, relevant experiences to users. UX encompasses the entire journey — from first impression to habitual use — including visual design, information architecture, interaction design, and content strategy.</p>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-sync-alt"></i> The UX Design Process</h2>
        <p>UX follows a cyclical, iterative process. There are several models, but the most common steps are:</p>
        <ul class="styled-list">
          <li><strong>1. Research</strong> — Understand your users: interviews, surveys, observation, competitive analysis.</li>
          <li><strong>2. Define</strong> — Synthesize research into personas, user stories, and problem statements.</li>
          <li><strong>3. Ideate</strong> — Generate solutions through brainstorming, sketching, and ideation workshops.</li>
          <li><strong>4. Prototype</strong> — Build low or high-fidelity mockups of the best ideas.</li>
          <li><strong>5. Test</strong> — Evaluate prototypes with real users and gather feedback.</li>
          <li><strong>6. Iterate</strong> — Refine the design based on test results. Repeat from step 3.</li>
        </ul>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>A <strong>persona</strong> is a fictional representation of a key user group, built from real research data. Example: "Maria, 22, a college student who checks grades on her phone between classes." Personas keep the team focused on real user needs throughout the project.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-map"></i> User Journey Mapping</h2>
        <p>A <strong>user journey map</strong> visualizes the steps a user takes to accomplish a goal, including their actions, thoughts, and emotions at each step. It helps teams identify pain points and opportunities for improvement in the experience.</p>
        <div class="warn-box"><i class="fas fa-exclamation-triangle"></i><p>Don't skip user research and jump straight to design. Building without understanding your users leads to a product that solves the wrong problem — no matter how beautiful the interface looks.</p></div>
      </div>
    `
  },

  'hci-heuristics': {
    course: 'hci', unit: 'Unit 2', num: 3,
    title: "Nielsen's 10 Heuristics",
    duration: '20 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-list-ol"></i> What are Heuristic Evaluations?</h2>
        <p>A <strong>heuristic evaluation</strong> is a usability inspection method where evaluators examine an interface and judge its compliance with recognized usability principles — the "heuristics". Jakob Nielsen and Rolf Molich developed the most widely used set of 10 heuristics in 1990.</p>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>Heuristic evaluations are a cost-effective way to find usability problems early — before spending money on user testing. 3–5 evaluators typically identify 65–75% of usability problems.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-award"></i> The 10 Heuristics</h2>
        <ul class="styled-list">
          <li><strong>1. Visibility of system status</strong> — Always keep users informed about what is happening (progress bars, loading indicators).</li>
          <li><strong>2. Match between system and real world</strong> — Use familiar language and concepts; follow real-world conventions.</li>
          <li><strong>3. User control and freedom</strong> — Support undo and redo; provide clear "emergency exits".</li>
          <li><strong>4. Consistency and standards</strong> — Follow platform conventions; don't make users wonder if different words mean the same thing.</li>
          <li><strong>5. Error prevention</strong> — Design carefully to prevent problems from occurring in the first place.</li>
          <li><strong>6. Recognition over recall</strong> — Minimize memory load; make options visible rather than requiring users to remember information.</li>
          <li><strong>7. Flexibility and efficiency of use</strong> — Provide accelerators (shortcuts) for expert users while remaining accessible to novices.</li>
          <li><strong>8. Aesthetic and minimalist design</strong> — Remove irrelevant or rarely needed information — every extra element competes with relevant content.</li>
          <li><strong>9. Help users recognize, diagnose, and recover from errors</strong> — Error messages should be plain language, precise, and constructive.</li>
          <li><strong>10. Help and documentation</strong> — Even though it's better for the system not to need docs, provide easily searchable help.</li>
        </ul>
      </div>
    `
  },

  'hci-prototype': {
    course: 'hci', unit: 'Unit 3', num: 1,
    title: 'Prototyping',
    duration: '16 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-pencil-ruler"></i> What is Prototyping?</h2>
        <p>A <strong>prototype</strong> is an early sample, model, or simulation of a product built to test a concept or process. In UX design, prototypes range from rough paper sketches to interactive digital mockups that look nearly identical to the final product.</p>
        <div class="info-grid">
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-file-alt"></i></div><h4>Low-Fidelity</h4><p>Paper sketches, wireframes, sticky notes. Fast and cheap — great for early exploration.</p></div>
          <div class="info-card"><div class="info-card-icon"><i class="fas fa-tablet-alt"></i></div><h4>High-Fidelity</h4><p>Interactive digital mockups (Figma, Adobe XD). Close to final product — used for user testing.</p></div>
        </div>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>The golden rule: <strong>fail early, fail cheap</strong>. A paper prototype that reveals a fundamental design flaw saves hundreds of hours of development work. Always prototype before coding.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-sitemap"></i> Wireframes vs Mockups vs Prototypes</h2>
        <ul class="styled-list">
          <li><strong>Wireframe</strong> — Simple grayscale layout showing content placement and structure. No color, no detail.</li>
          <li><strong>Mockup</strong> — High-fidelity static image with real colors, fonts, and visual design. Not interactive.</li>
          <li><strong>Prototype</strong> — Clickable/interactive simulation. Can be low or high fidelity. Used for usability testing.</li>
        </ul>
      </div>
    `
  },

  'hci-testing': {
    course: 'hci', unit: 'Unit 3', num: 2,
    title: 'User Testing',
    duration: '17 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-users"></i> What is User Testing?</h2>
        <p><strong>Usability testing</strong> (user testing) is a technique used to evaluate a product by testing it with real users. Participants attempt to complete realistic tasks while observers watch, listen, and take notes to identify where users struggle.</p>
        <div class="warn-box"><i class="fas fa-exclamation-triangle"></i><p>You are testing <strong>the design, not the user</strong>. Never say "you're doing it wrong" — if a user struggles, the design has failed. Every mistake a user makes is valuable feedback.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-clipboard-list"></i> Types of User Testing</h2>
        <ul class="styled-list">
          <li><strong>Moderated testing</strong> — A facilitator guides the session and can ask follow-up questions in real time.</li>
          <li><strong>Unmoderated testing</strong> — Remote, self-guided sessions recorded automatically (e.g. UserTesting.com).</li>
          <li><strong>Think-aloud protocol</strong> — Users narrate their thoughts as they interact — reveals mental models.</li>
          <li><strong>A/B testing</strong> — Two versions shown to different users to compare which performs better on a specific metric.</li>
          <li><strong>Eye tracking</strong> — Tracks where users look on screen — identifies attention patterns and blind spots.</li>
        </ul>
      </div>
    `
  },

  'hci-accessibility': {
    course: 'hci', unit: 'Unit 3', num: 3,
    title: 'Accessibility (A11y)',
    duration: '19 min', level: 'Intermediate', completed: false,
    content: `
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-universal-access"></i> What is Accessibility?</h2>
        <p><strong>Accessibility (A11y)</strong> means designing products usable by people with disabilities — visual, auditory, motor, cognitive, and speech disabilities. Good accessibility is not just ethical — it's legally required in many countries and improves usability for everyone.</p>
        <div class="tip-box"><i class="fas fa-lightbulb"></i><p>The "curb cut effect": accessibility improvements designed for people with disabilities end up benefiting everyone. Closed captions (designed for deaf users) help people in noisy environments. High-contrast modes help people in bright sunlight.</p></div>
      </div>
      <div class="content-section">
        <h2 class="cs-heading"><i class="fas fa-check-circle"></i> WCAG Guidelines</h2>
        <p>The <strong>Web Content Accessibility Guidelines (WCAG)</strong> are the international standard for web accessibility, organized under four principles — <strong>POUR</strong>:</p>
        <ul class="styled-list">
          <li><strong>Perceivable</strong> — Information must be presented in ways users can perceive (alt text for images, captions for video).</li>
          <li><strong>Operable</strong> — All functionality must be keyboard-accessible; no flickering content that can cause seizures.</li>
          <li><strong>Understandable</strong> — Text must be readable; pages must behave predictably; input errors must be explained.</li>
          <li><strong>Robust</strong> — Content must be interpretable by assistive technologies like screen readers.</li>
        </ul>
        <div class="code-block"><span class="cm">&lt;!-- Accessibility best practices in HTML --&gt;</span>

<span class="cm">&lt;!-- 1. Always add alt text to images --&gt;</span>
<span class="kw">&lt;img</span> <span class="at">src</span>=<span class="str">"chart.png"</span> <span class="at">alt</span>=<span class="str">"Bar chart showing Q4 growth of 35%"</span><span class="kw">/&gt;</span>

<span class="cm">&lt;!-- 2. Use semantic HTML for screen readers --&gt;</span>
<span class="kw">&lt;button&gt;</span>Submit<span class="kw">&lt;/button&gt;</span>   <span class="cm">✅ — not &lt;div onclick...&gt;</span>

<span class="cm">&lt;!-- 3. Ensure sufficient colour contrast --&gt;</span>
<span class="cm">   WCAG AA: minimum 4.5:1 ratio for normal text</span>

<span class="cm">&lt;!-- 4. ARIA roles for custom components --&gt;</span>
<span class="kw">&lt;div</span> <span class="at">role</span>=<span class="str">"dialog"</span> <span class="at">aria-label</span>=<span class="str">"Confirm delete"</span><span class="kw">&gt;</span>...<span class="kw">&lt;/div&gt;</span></div>
      </div>
    `
  },

};

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
let currentCourse = 'webdev';
let currentLessonId = 'html-intro';

/* ══════════════════════════════════════════════════
   INIT — read URL params
══════════════════════════════════════════════════ */
(function init() {
  const params = new URLSearchParams(window.location.search);
  const c = params.get('course');
  const l = params.get('lesson');
  if (c && COURSES[c]) currentCourse = c;
  if (l && LESSONS[l]) {
    currentLessonId = l;
    currentCourse = LESSONS[l].course;
  } else {
    const defaults = { webdev: 'html-intro', hci: 'hci-intro' };
    currentLessonId = defaults[currentCourse] || 'html-intro';
  }
  renderSidebar();
  renderLesson(currentLessonId);
  applyNavIdentity();
})();

/* ══════════════════════════════════════════════════
   RENDER SIDEBAR
══════════════════════════════════════════════════ */
function renderSidebar() {
  const course = COURSES[currentCourse];
  const sidebar = document.getElementById('sidebar');
  const allLessonsFlat = course.units.flatMap(u => u.lessons);
  const completedCount = allLessonsFlat.filter(l => l.done).length;
  const totalCount = allLessonsFlat.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  let html = `
    <div class="sidebar-course-header">
      <div class="sc-subject-tag">${course.tag} · Course</div>
      <div class="sc-title">${course.title}</div>
      <div class="sc-progress">
        <div class="sc-progress-label"><span>Course Progress</span><span>${pct}%</span></div>
        <div class="sc-bar"><div class="sc-fill" style="width:${pct}%"></div></div>
      </div>
    </div>
    <div class="sidebar-units">
  `;

  course.units.forEach((unit, uIdx) => {
    const isOpen = unit.lessons.some(l => l.id === currentLessonId) || uIdx === 0;
    html += `
      <div class="unit-section">
        <div class="unit-header ${isOpen ? 'open' : ''}" onclick="toggleUnit(this)">
          <span>${unit.title}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="unit-lessons ${isOpen ? 'open' : ''}">
    `;
    unit.lessons.forEach(lesson => {
      const isActive = lesson.id === currentLessonId;
      html += `
        <div class="s-lesson ${isActive ? 'active' : ''} ${lesson.done ? 'done' : ''}" onclick="goToLesson('${lesson.id}')">
          <div class="l-dot"></div>
          <span class="l-label">${lesson.title}</span>
          ${lesson.done ? '<i class="fas fa-check l-done-icon"></i>' : ''}
        </div>
      `;
    });
    html += `</div></div>`;
  });

  html += `</div>`;
  sidebar.innerHTML = html;
}

/* ══════════════════════════════════════════════════
   RENDER LESSON
══════════════════════════════════════════════════ */
function renderLesson(lessonId) {
  const lesson = LESSONS[lessonId];
  if (!lesson) return;
  currentLessonId = lessonId;

  const course = COURSES[lesson.course];
  const allLessons = course.units.flatMap(u => u.lessons);
  const idx = allLessons.findIndex(l => l.id === lessonId);
  const prevLesson = idx > 0 ? allLessons[idx - 1] : null;
  const nextLesson = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
  const totalCount = allLessons.length;
  const completedCount = allLessons.filter(l => l.done).length;
  const pct = Math.round((completedCount / totalCount) * 100);

  const main = document.getElementById('lessonMain');
  main.innerHTML = `
    <div class="l-breadcrumb">
      <a href="home.html"><i class="fas fa-home"></i> Dashboard</a>
      <span class="sep">›</span>
      <a href="lessons.html">Lessons</a>
      <span class="sep">›</span>
      <span>${course.title}</span>
      <span class="sep">›</span>
      <span>${lesson.unit}</span>
    </div>

    <div class="lesson-hero">
      <div class="lh-tag"><i class="fas fa-graduation-cap"></i> ${lesson.unit} · Lesson ${lesson.num}</div>
      <h1 class="lh-title" id="lessonTitle">${lesson.title}</h1>
      <div class="lh-meta">
        <span><i class="fas fa-clock"></i> ${lesson.duration}</span>
        <span><i class="fas fa-signal"></i> ${lesson.level}</span>
        ${lesson.completed ? '<span><i class="fas fa-check-circle"></i> Completed</span>' : '<span><i class="fas fa-circle" style="color:rgba(255,255,255,.3)"></i> In Progress</span>'}
      </div>
      <div class="lh-progress">
        <div class="lh-progress-track"><div class="lh-progress-fill" style="width:${pct}%"></div></div>
        <div class="lh-progress-label">Course Progress: ${pct}%</div>
      </div>
    </div>

    <div class="lesson-body">
      ${lesson.content}

      <div class="lesson-nav-bar">
        <button class="ln-btn" onclick="${prevLesson ? `goToLesson('${prevLesson.id}')` : "showToast('You are on the first lesson! 🎉')"}" ${!prevLesson ? '' : ''}>
          <i class="fas fa-arrow-left"></i> Previous
        </button>
        ${nextLesson
          ? `<button class="ln-btn primary" onclick="completeAndNext('${lessonId}', '${nextLesson.id}')">Next: ${nextLesson.title} <i class="fas fa-arrow-right"></i></button>`
          : `<button class="ln-btn complete" onclick="showToast('🏆 Course complete! Excellent work!')"><i class="fas fa-trophy"></i> Course Complete!</button>`
        }
      </div>
    </div>
  `;

  
  document.querySelector('.lesson-main').scrollTo(0, 0);
  window.scrollTo(0, 0);

  
  const url = new URL(window.location);
  url.searchParams.set('course', lesson.course);
  url.searchParams.set('lesson', lessonId);
  window.history.replaceState({}, '', url);

  
  document.title = `ASRS — ${lesson.title}`;
}

/* ══════════════════════════════════════════════════
   NAVIGATION HELPERS
══════════════════════════════════════════════════ */
function goToLesson(lessonId) {
  currentLessonId = lessonId;
  renderLesson(lessonId);
  renderSidebar();
}

function completeAndNext(currentId, nextId) {
  const course = COURSES[LESSONS[currentId].course];
  course.units.forEach(u => u.lessons.forEach(l => {
    if (l.id === currentId) l.done = true;
  }));
  showToast('Lesson complete! +7 pts 🎉');
  goToLesson(nextId);
}

/* ══════════════════════════════════════════════════
   SIDEBAR TOGGLE
══════════════════════════════════════════════════ */
function toggleUnit(header) {
  const lessons = header.nextElementSibling;
  const isOpen = lessons.classList.contains('open');
  lessons.classList.toggle('open', !isOpen);
  header.classList.toggle('open', !isOpen);
}

/* ══════════════════════════════════════════════════
   NAVBAR LOGIC
══════════════════════════════════════════════════ */
let notifOpen = false, userOpen = false;

function applyNavIdentity() {
  const activeId = localStorage.getItem('asrs_active_user');
  if (!activeId) return;
  try {
    const users = JSON.parse(localStorage.getItem('asrs_users') || '[]');
    const user = users.find(u => u.id === activeId);
    if (!user) return;
    const name = user.fullName || 'Student';
    const url = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1a4a2e&fontFamily=Georgia&fontSize=40&fontWeight=700&textColor=ffffff`;
    const av = document.getElementById('navAvatar');
    if (av) { av.src = url; av.alt = name; }
    const nm = document.getElementById('navUserName');
    if (nm) nm.textContent = name;
  } catch(e) {}
}

function toggleNotifications() {
  notifOpen = !notifOpen;
  document.getElementById('notifDropdown').classList.toggle('open', notifOpen);
  if (notifOpen && userOpen) { userOpen = false; document.getElementById('userDropdown').classList.remove('open'); }
}
function toggleUserMenu() {
  userOpen = !userOpen;
  document.getElementById('userDropdown').classList.toggle('open', userOpen);
  if (userOpen && notifOpen) { notifOpen = false; document.getElementById('notifDropdown').classList.remove('open'); }
}
function closeMenus() {
  notifOpen = false; userOpen = false;
  document.getElementById('notifDropdown').classList.remove('open');
  document.getElementById('userDropdown').classList.remove('open');
}
document.addEventListener('click', (e) => {
  if (!document.getElementById('notifWrapper')?.contains(e.target)) { notifOpen = false; document.getElementById('notifDropdown')?.classList.remove('open'); }
  if (!document.getElementById('userMenu')?.contains(e.target)) { userOpen = false; document.getElementById('userDropdown')?.classList.remove('open'); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenus(); });

function markRead(item) {
  item.classList.remove('unread');
  const dot = item.querySelector('.unread-dot');
  if (dot) dot.style.display = 'none';
  updateBadge();
}
function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(item => {
    item.classList.remove('unread');
    const d = item.querySelector('.unread-dot');
    if (d) d.style.display = 'none';
  });
  updateBadge();
  showToast('All caught up ✓');
}
function updateBadge() {
  const count = document.querySelectorAll('.notif-item.unread').length;
  const badge = document.getElementById('notifBadge');
  if (badge) { badge.textContent = count; badge.style.display = count === 0 ? 'none' : 'grid'; }
}
function showToast(msg, dur = 2800) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), dur);
}
