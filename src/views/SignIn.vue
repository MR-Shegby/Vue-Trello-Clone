<template>
	<div class="sign">
		<div class="sign__header">Log in to Trello</div>
		<div class="sign__or">or <router-link to="/signup">create an account</router-link></div>
		<div>
			<form @submit.prevent="login" class="sign__form">
				<label for="email">Email</label>
				<input
					type="text"
					id="email"
					class="sign__input"
					placeholder="Email"
					v-model="userData.email"
				>
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					class="sign__input"
					placeholder="Password"
					v-model="userData.password"
				>
				<app-action-button
					:submit="'true'"
					:value="'Log in'"
					:size="'xlarge'"
				/>
			</form>
		</div>
	</div>
</template>


<!--<template>-->
	<!--<div class="sign-in">-->
		<!--<div class="sign-in-wrapper">-->
			<!--<div class="header">Log in to Trello</div>-->
			<!--<div>or <router-link to="/signup">create an account</router-link></div>-->
			<!--<div>-->
				<!--<form @submit.prevent="login">-->
					<!--<label for="email">Email</label>-->
					<!--<input-->
						<!--type="text"-->
						<!--id="email"-->
						<!--placeholder="Email"-->
						<!--v-model="userData.email"-->
					<!--&gt;-->
					<!--<label for="password">Password</label>-->
					<!--<input-->
						<!--type="password"-->
						<!--id="password"-->
						<!--placeholder="Password"-->
						<!--v-model="userData.password"-->
					<!--&gt;-->
					<!--<div>-->
						<!--<app-action-button :submit="'true'" :value="'Log in'" :size="'xlarge'" />-->
					<!--</div>-->
				<!--</form>-->
			<!--</div>-->
		<!--</div>-->
	<!--</div>-->
<!--</template>-->

<script>

  export default {
	  data() {
	    return {
	      userData: {
          email: '',
          password: ''
				}
			}
		},
		methods: {
	    login(){
        this.$store.dispatch('logInUser', this.userData)
          .then((user) => {
            this.$router.push(`/user/${user._id}/boards`)
          })
          .catch(err => {console.log(err)})
			}
		}
  }
</script>

<style></style>