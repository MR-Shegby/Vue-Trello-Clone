<template>
	<div class="sign">
		<div class="sign__header">Create a Trello Account</div>
		<div class="sign__or">or <router-link to="/login">log in your account</router-link></div>
		<div>
			<form @submit.prevent="signup" class="sign__form">
				<label for="email">Email</label>
				<input
					type="text"
					id="email"
					class="sign__input"
					placeholder="hermione@granger.com, for example"
					v-model="userData.email"
				>
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					class="sign__input"
					placeholder="*********, for example"
					v-model="userData.password"
				>
				<app-action-button
					:submit="'true'"
					:value="'Create account'"
					:size="'xlarge'"
				/>
			</form>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        userData: {
          // name: '',
          email: '',
          password: ''
        }
      }
    },

    methods: {
      signup(){
        this.$store.dispatch('signUpUser', this.userData)
          .then((user) => {
            this.$router.push(`/user/${user._id}/boards`)
          })
          .catch(err => {console.log(err)})
      }
    }
  }
</script>

<style>
	.sign {
		margin: 100px auto 0;
		width: 400px;
		font-size: 18px;
	}

	.sign__header {
		color: #333;
		font-size: 35px;
		line-height: 35px;
		font-weight: 700;
	}

	.sign__or {
		margin-top: 10px;
	}

	.sign__or a {
		color: #298fca;
		font-size: 18px;
		font-weight: 300;
		text-decoration: underline;
	}

	.sign__form {
		margin-top: 30px;
	}

	.sign__input{
		background: #edeff0;
		border-radius: 4px;
		border: 1px solid #cdd2d4;
		box-sizing: border-box;
		padding: 10px;
		width: 100%;
		margin-bottom: 20px;
		outline: none;
		font-size: 16px;
	}

	@media only screen and (max-width: 712px) {
		.sign {
			width: 300px;
			margin-top: 20px;
		}
	}
</style>