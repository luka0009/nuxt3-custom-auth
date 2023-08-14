<script lang="ts" setup>
	import SpinnerVue from "./icons/Spinner.vue";

	defineProps<{
		label: string;
		loading: boolean;
	}>();
</script>
<template>
	<FormKit type="submit">
		<span
			v-if="loading"
			class="absolute w-full bg-blue-600 top-0 left-0 bottom-0 right-0 grid place-items-center"
		>
			<SpinnerVue class="w-5 h-5 text-white" />
		</span>
		<span v-else>{{ label }}</span>
	</FormKit>
</template>
<style scoped lang="css"></style>
