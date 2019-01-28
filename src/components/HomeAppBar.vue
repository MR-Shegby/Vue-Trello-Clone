<template>
	<div>
		<div class="welcome-tool-bar">
			<div>
				<router-link to="/">
					<img
						src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/1c3a2d636e34d62a6cb27d83e5e6956b/trello-logo-black.svg"
						class="welcome-tool-bar__logo"
						alt="Trello"
					>
				</router-link>
			</div>
			<div>
				<router-link tag="div" class="signin-button welcome-tool-bar__button" to="login">SignIn</router-link>
				<router-link tag="div" class="signup-button welcome-tool-bar__button" to="signup">SignUp</router-link>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>

	.welcome-tool-bar {
		padding: 20px 15px;
		background-color: #F8F9F9;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.welcome-tool-bar__logo {
		height: 40px;
		opacity: .4;
	}

	.welcome-tool-bar__logo:hover {
		opacity: .6;
	}

	.welcome-tool-bar__button {
		border: none;
		cursor: pointer;
		display: inline-block;
		line-height: 20px;
		margin-left: 15px;
		padding: 9px 20px;
		text-align: center;
		border-radius: 3px;
		font-size: 16px;
	}

	.signin-button {
		background-color: #E2E4E6;
		box-shadow: 0 2px 0 #CDD2D4;
		font-weight: 300;
		color: #4d4d4d;
	}

	/*.signin-button a {*/
		/*color: #4d4d4d;*/
	/*}*/

	.signin-button:hover {
		background-color: #D6DADC;
	}

	.signup-button {
		font-weight: 700;
		background: linear-gradient(to bottom, #61BD4F 0, #5AAC44 100%);
		box-shadow: 0 2px 0 #3F6F21;
		color: #fff;
	}

	.signup-button:hover {
		background: linear-gradient(to bottom, #5AAC44 0, #519839 100%);
	}

	@media only screen and (max-width: 712px) {
		.welcome-tool-bar__logo {
			height: 25px;
			opacity: .4;
		}
	}
</style>