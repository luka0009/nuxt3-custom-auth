<script lang="ts" setup>
	import { FormKitNode } from "@formkit/core";
	import { NuxtError } from "nuxt/app";
	import { UserRequestBody } from "../types/user";
	import Title from "../components/Title.vue";

	definePageMeta({
		layout: "user",
	});

	const showPassword = ref(false);
	const loading = ref(false);

	async function onCreateAccount(
		data: UserRequestBody,
		node: FormKitNode | undefined
	) {
		loading.value = true;
		node?.clearErrors();
		await $fetch("/api/user/sign-up", {
			method: "POST",
			body: data,
		})
			.then(async (data) => {
				await navigateTo(`/account-verification/${data}`);
			})
			.catch((err: { data: NuxtError }) => {
				const formErrorMessage = "Failed to create an account.";
				const error = err.data;
				if (error.statusCode !== 200) {
					if (Array.isArray(error.data)) {
						error.data.forEach((e) => node?.setErrors(formErrorMessage, e));
					} else if (error.statusCode === 500) {
						node?.setErrors(formErrorMessage, error.statusMessage);
					} else if (error.statusCode === 409) {
						node?.setErrors(formErrorMessage, {
							email: error.statusMessage!,
						});
					} else {
						node?.setErrors(formErrorMessage, error.statusMessage);
					}
				}
			})
			.finally(() => {
				loading.value = false;
			});
	}
</script>
<template>
	<div>
		<Title label="Create a New Account" />
		<p class="mt-2 text-zinc-500 text-center">
			Sign up now to access exclusive features and personalized experiences.It's
			quick, and easy.
		</p>
		<div class="mt-6 p-3">
			<FormKit type="form" :actions="false" @submit="onCreateAccount">
				<div class="flex gap-4">
					<div class="w-full">
						<FormKit
							type="text"
							label="First Name"
							placeholder="John"
							name="firstName"
							validation="required:trim|alpha_spaces:latin"
						/>
					</div>
					<div class="w-full">
						<FormKit
							type="text"
							label="Last Name"
							placeholder="Doe"
							name="lastName"
							validation="required:trim|alpha_spaces:latin"
						/>
					</div>
				</div>
				<!-- Email -->
				<div class="mt-6">
					<FormKit
						type="email"
						label="Email"
						placeholder="someone@example.com"
						name="email"
						validation="required:trim|email"
					/>
				</div>
				<!-- Password -->
				<div class="mt-6">
					<FormKit
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						:placeholder="showPassword ? 'Password12345' : '***********'"
						name="password"
						help="Min of 10 characters"
						validation="required:trim|length:10,30"
					/>
					<PasswordToggle
						:is-visible="showPassword"
						@click.prevent="showPassword = !showPassword"
					/>
				</div>
				<!-- Submit -->
				<div class="mt-8">
					<FormSubmit :loading="loading" label="Create Account" />
				</div>
			</FormKit>
			<div class="mt-6 text-center text-zinc-500">
				Already have an account?
				<NuxtLink class="text-blue-600 hover:underline" to="/">
					Sign in
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
<style scoped lang="css"></style>
