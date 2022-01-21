<script>
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
	export let classes = "w-min"
	export let title = "Title"
	export let subTitle = "SubTitle"
	export let switchColor = "bg-blue-600"
	export let active = true
	export let disabled = false
	$: bg = active ? (disabled ? "bg-gray-600" : switchColor) : "bg-gray-200"
	$: translate = active ? "translate-x-5" : "translate-x-1"
	let toggle = () => {
		if (!active) {
			bg = disabled ? "bg-gray-600" : switchColor
			translate = "translate-x-5"
			active = true
		} else {
			bg = "bg-gray-200"
			translate = "translate-x-1"
			active = false
		}
		dispatch("event", {
			active: active,
		})
	}
</script>

<div class="{classes} flex items-center justify-between space-x-4">
	<span class="flex-grow flex flex-col">
		<span
			class="text-sm leading-5 font-medium text-gray-900"
			id="availability-label">{title}</span
		>
		<span
			class="text-xs leading-5 font-normal text-gray-500"
			id="availability-description"
		>
			{subTitle}
		</span>
	</span>
	<button
		on:click={toggle}
		type="button"
		class="{bg} relative shadow-inner inline-flex flex-shrink-0 h-6 w-11 rounded-full cursor-pointer
		transition-colors ease-in-out duration-200 focus:outline-none"
		role="switch"
		aria-checked="false"
		aria-labelledby="availability-label"
		aria-describedby="availability-description"
	>
		<span
			aria-hidden="true"
			class="{translate} pointer-events-none inline-block my-auto h-5 w-5 rounded-full bg-white
			shadow transform transition ease-in-out duration-200"
		/>
	</button>
</div>
