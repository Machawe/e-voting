<template>
	<div class="pt-5">
		<navbar />
		<p>Setup Election</p>
		<router-view />
	</div>
</template>
<script>
import navbar from "@/components/InappNevBar.vue";

export default {
	name: "Admin",
	components: {
		navbar,
	},
};
</script>
