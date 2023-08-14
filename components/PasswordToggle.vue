<script lang="ts" setup>
	defineProps<{
		isVisible: boolean;
	}>();
</script>
<template>
	<div
		class="text-sm text-black cursor-pointer float-left hover:underline hover:text-blue-600"
	>
		{{ isVisible ? "Hide password" : "Show password" }}
	</div>
</template>
<style scoped lang="css"></style>
