<template>
	<div>
		<Title label="Verify your account." />

		<p class="mt-2 text-zinc-500 text-center">
			Verify now and explore with confidence.
		</p>

		<div class="mt-8">
			<FormKit type="form" :actions="false" @submit="onVerify">
				<FormKit
					type="text"
					label="Verification Code"
					help="6 digit verification code."
					name="verificationCode"
				/>
				<div class="mt-8">
					<FormSubmit :loading="loading" label="Verify Account" />
				</div>
			</FormKit>
		</div>

		<div class="mt-4 text-center">
			<p v-if="loading2" class="text-sm text-zinc-600">Sending.......</p>
			<button
				v-else
				class="text-zinc-500 text-sm hover:text-blue-600 hover:underline"
				@click.prevent="onRequestNewVerificationCode"
			>
				Request a new verification code
			</button>
			<p class="text-sm" :class="sent ? 'text-green-700' : 'text-rose-500'">
				{{ message }}
			</p>
		</div>

		<div class="mt-10 text-sm text-zinc-400 flex justify-between">
			<div>
				<NuxtLink
					to="/"
					class="flex gap-2 items-center cursor-pointer hover:text-blue-700 hover:underline"
				>
					<span>
						<LongArrowLeft class="w-4 h-4" />
					</span>
					<span>Sign in</span>
				</NuxtLink>
			</div>

			<div>
				<NuxtLink
					to="/sign-up"
					class="flex gap-2 items-center cursor-pointer hover:text-blue-700 hover:underline"
				>
					<span>Sign Up</span>
					<span>
						<LongArrowLeft class="w-4 h-4 rotate-180" />
					</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { NuxtError } from "nuxt/app";
	import { FormKitNode } from "@formkit/core";
	import LongArrowLeft from "~/components/icons/LongArrowLeft.vue";

	definePageMeta({
		layout: "user",
	});

	const message = ref<string | null>(null);
	const loading = ref(false);
	const loading2 = ref(false);
	const sent = ref(false);

	async function onVerify(
		formData: { verificationCode: string },
		node: FormKitNode | undefined
	) {
		loading.value = true;
		sent.value = false;
		message.value = null;

		await $fetch("/api/user/verify-user", {
			method: "POST",
			body: {
				uuid: useRoute().params.uuid,
				code: formData.verificationCode,
			},
		})
			.then(async () => {
				await navigateTo("/dashboard");
			})
			.catch((err: { data: NuxtError }) => {
				const error = err.data;
				node?.setErrors(error.statusMessage!);
			})
			.finally(() => {
				loading.value = false;
			});
	}

	async function onRequestNewVerificationCode() {
		loading2.value = true;
		message.value = null;
		sent.value = false;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await $fetch("/api/user/re-verify-user", {
			method: "POST",
			body: {
				uuid: useRoute().params.uuid,
			},
		})
			.then((data) => {
				message.value = `A new verification code has been sent to your email ${data}.`;
				sent.value = true;
			})
			.catch((error: { data: NuxtError }) => {
				if (error.data.statusMessage) {
					message.value = error.data.statusMessage;
				}
				sent.value = false;
			})
			.finally(() => {
				loading2.value = false;
			});
	}
</script>

<style scoped></style>
