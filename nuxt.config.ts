// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	pages: true,
	modules: ["@formkit/nuxt", "@nuxtjs/tailwindcss"],
	runtimeConfig: {
		MONGO_URI: process.env.MONGO_URI,
		TOKEN_SECRET: process.env.TOKEN_SECRET,
		ACCESS_TOKEN: process.env.ACCESS_TOKEN,
		ELASTIC_API: process.env.ELASTIC_API,
		APP_URL: process.env.APP_URL,
		EMAIL: process.env.EMAIL,
		public: {
			ELASTIC_URL: "https://api.elasticemail.com/v4",
		},
	},
	imports: {
		dirs: ["server/models"],
	},
	nitro: {
		plugins: ["~/server/plugins/mongoDB.ts"],
	},
});
