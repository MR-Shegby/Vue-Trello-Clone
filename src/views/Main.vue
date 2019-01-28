<template>
	<div class="card">
		<img  class="card__img" src="https://a.trellocdn.com/prgb/dist/images/home/orientation/no-content.e25c676458c1f4cb280b.svg"></img>
		<div class="card__content">
			<div class="card__title">Будьте в курсе всех дел</div>
			<div class="card__text">Приглашайте людей на доски и карточки, оставляйте комментарии, добавляйте сроки, и мы отобразим здесь наиболее важные активности.</div>
		</div>
	</div>
</template>

<script>

  export default {
    data: () => ({
    })
  }
</script>

<style scoped>

	.card {
		max-width: 500px;
		box-sizing: border-box;
	}

	.card__img {
		width: 100%;
		display: block;
	}

	.card__content {
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		border: 1px solid rgba(123,123,123,.1);
		border-top: none;
	}

	.card__title {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 15px;
	}

	@media only screen and (max-width: 712px) {
		.card {
			max-width: 300px;
		}
	}

</style>