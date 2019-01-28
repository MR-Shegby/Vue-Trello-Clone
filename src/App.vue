<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  * {
    padding: 0;
    margin: 0;
  }

	body, html, textarea, input, button {
    font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
	}

	textarea, input, button {
		border: none;
		outline: none;
	}

  body, html {
    color: #17394d;
  }

	h2 {
		font-size: 20px;
		line-height: 24px;
		/*margin: 0 0 8px;*/
	}

  h3 {
    font-size: 16px;
    line-height: 20px;
    margin: 0 0 8px;
  }

	b, strong, h1, h2, h3, h4, h5, h6 {
		font-weight: 600;
	}

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a, a:hover {
    color: #092d42;
		text-decoration: none;
  }
</style>