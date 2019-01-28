<template>
	<div>
		<app-home-app-bar class="welcome__tool-bar" />

		<div class="welcome">
			<div class="welcome__logo">
				<img
					src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/c13d1cd96a2cff30f0460a5e1860c5ea/header-logo-blue.svg"
					class="logo" alt="Trello"
				>
			</div>
			<div class="welcome__text">
				<h1 class="welcome__header">Trello lets you work more collaboratively and get more done.</h1>
				<p class="welcome__paragraph">Trello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible and rewarding way.</p>
			</div>

			<router-link tag="div" class="welcome__signup" to="signup">
				<app-action-button :submit="'true'" :value="`Sign Up - It's free`" :size="'xlarge'" />
			</router-link>
			<router-link tag="div" class="welcome__signin" to="login">
				SignIn...
			</router-link>
		</div>
	</div>
</template>

<script>
  import AppHomeAppBar from './HomeAppBar'

  export default {
    data() {
      return {
      }
    },
    components: {
      AppHomeAppBar
    }
  }
</script>

<style scoped>
	.welcome__tool-bar {
		width: 100%;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 100;
	}

	.welcome {
		text-align: center;
		margin: 0 auto;
		margin-top: 90px;
		max-width: 650px;
		padding: 42px 14px 0;
		word-break: break-word;

		font-family: "jaf-facitweb",-apple-system,"Helvetica Neue",Helvetica,Arial,sans-serif;
	}

	.welcome__text {
		margin-top: 1.6em;
		color: #4d4d4d;
	}

	.welcome__header {
		font-size: 2.3em;
		line-height: 1.2em;
	}

	.welcome__paragraph {
		font-size: 20px;
		font-weight: 300;
		line-height: 1.5;
		margin: 20px 0;
	}

	.welcome__signup {
		width: 70%;
		margin: .3em auto 1em;
	}

	.welcome__signin {
		padding: 1em 2em;
		color: #999;
		font-size: 20px;
		text-decoration: underline;
		text-align: center;
		cursor: pointer;
	}

	.welcome__signin:hover, .quiet a:hover {
		color: #333;
	}



</style>