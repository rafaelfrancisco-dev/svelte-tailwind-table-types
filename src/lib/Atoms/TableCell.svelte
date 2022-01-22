<script>
	import "../tailwind.css";
	import { createEventDispatcher, onMount } from "svelte"
	const dispatch = createEventDispatcher()

	export let key = ""
	export let indexi = 0
	export var indexj = 0
	export let rowData = []
	export let data = {}
	export let _numberAlign = "right"
	export let _allCenter = false
	export let _selectedRows = 0
	export let _numbersSmall = false

	$: showSelect = false
	$: showInput = false
	$: selectRef = null
	$: showTextInput = false
	$: prvcolor = ""
	$: colored = false
	$: refreshStat = false

	let component = null
	onMount(() => {
		component = data?.component
	})

	function LightenDarkenColor(col, amt) {
		var usePound = false
		if (col) {
			if (col[0] == "#") {
				col = col.slice(1)
				usePound = true
			}
			var num = parseInt(col, 16)
			var r = (num >> 16) + amt
			if (r > 255) r = 255
			else if (r < 0) r = 0
			var b = ((num >> 8) & 0x00ff) + amt
			if (b > 255) b = 255
			else if (b < 0) b = 0
			var g = (num & 0x0000ff) + amt
			if (g > 255) g = 255
			else if (g < 0) g = 0
			return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
		}
	}

	function setShowSelect(bool, e) {
		showSelect = bool
		if (bool) selectRef = e.target
		// console.log("showSelect: " + showSelect)
		// console.log(selectRef)
		// console.log(data)
		refreshState()
	}
	function updateSelectedRows() {
		if (key == "checkbox") {
			if (rowData[indexi][indexj].value) {
				_selectedRows++
			} else {
				_selectedRows--
			}
		}
	}
	function customIndexOf(arr, val) {
		let f = false
		let i = 0
		for (i = 0; i < arr.length; i++) {
			if (JSON.stringify(arr[i]) == JSON.stringify(val)) {
				f = true
				break
			}
		}
		if (f) return i
		return -1
	}
	function setMultiSelect(option) {
		let i = customIndexOf(rowData[indexi][indexj].value, option)
		if (i === -1) {
			rowData[indexi][indexj].value.push(option)
		} else {
			rowData[indexi][indexj].value.splice(i, 1)
		}
		refreshState()
	}

	function getRandomColor() {
		let colors = ["#FF4D4D", "#AEA4A2", "#41D1A4", "#5C9A9A"]
		let color = colors[Math.floor(Math.random() * colors.length)]
		while (color == prvcolor) {
			color = colors[Math.floor(Math.random() * colors.length)]
		}
		prvcolor = color
		return color
	}

	function refreshState() {
		showSelect = showSelect
		showInput = showInput
		rowData = rowData
		data = data
		refreshStat = refreshStat

		if (
			key == "select" &&
			rowData[indexi][indexj].value != undefined &&
			customIndexOf(data.options, rowData[indexi][indexj].value) === -1
		) {
			if (!colored) {
				data.options.forEach(function (option) {
					if (option.text == rowData[indexi][indexj].value.text) {
						rowData[indexi][indexj].value.color = option.color
					}
				})
				colored = true
			} else {
				rowData[indexi][indexj].value = data.options[0]
			}
		}
		if (!colored && key == "multiselect") {
			data.options.forEach(function (option) {
				for (let i = 0; i < rowData[indexi][indexj].value.length; i++) {
					if (option.text == rowData[indexi][indexj].value[i].text) {
						rowData[indexi][indexj].value[i].color = option.color
					}
				}
			})
			colored = true
		}
	}
	if (key == "select" || key == "multiselect") {
		data.options.forEach((option) => {
			if (!option.color || option.color == "") {
				option.color = getRandomColor()
				if (key == "select") {
					if (option.text == rowData[indexi][indexj].value.text) {
						rowData[indexi][indexj].value.color = option.color
					}
				}
				if (key == "multiselect") {
					for (let i = 0; i < rowData[indexi][indexj].value.length; i++) {
						if (option.text == rowData[indexi][indexj].value[i].text) {
							rowData[indexi][indexj].value[i].color = option.color
						}
					}
				}
			}
			if (!rowData[indexi][indexj].value.color) {
				if (option.text == rowData[indexi][indexj].value.text) {
					rowData[indexi][indexj].value.color = option.color
				}
			}
		})
		refreshState()
	}
	refreshStat = refreshStat
	// if (key == "custom") console.log(rowData[indexi][indexj])
	// console.log(rowData)
</script>

{#if rowData[indexi]}
	<a
		href={rowData[indexi][indexj]?.href != undefined
			? rowData[indexi][indexj].href
			: "javascript:void(0)"}
		class={rowData[indexi][indexj]?.href != undefined
			? "cursor-pointer-important w-full"
			: "w-full"}
	>
		<div
			class={key == "checkbox"
				? "mx-auto w-min text-black"
				: "w-full text-black"}
		>
			{#if key == "text"}
				{#if rowData[indexi][indexj].editable}
					{#if showTextInput}
						<input
							type="text"
							bind:value={rowData[indexi][indexj].value}
							class="px-1 py-1"
							on:change={() => refreshState()}
							on:blur={() => {
								showTextInput = false
							}}
						/>
					{:else}
						<p
							class="py-1 break-words whitespace-normal text-left min-w-10"
							on:click={() => {
								showTextInput = true
							}}
						>
							{rowData[indexi][indexj].value}
						</p>
					{/if}
				{:else}
					<p class="py-1 break-words whitespace-normal text-left min-w-10">
						{rowData[indexi][indexj].value}
					</p>
				{/if}
			{:else if key == "checkbox"}
				{#if rowData[indexi][indexj].editable}
					<input
						type="checkbox"
						bind:checked={rowData[indexi][indexj].value}
						class="mx-auto py-1"
						on:change={() => {
							updateSelectedRows()
							refreshState()
						}}
					/>
				{:else}
					<input
						type="checkbox"
						checked={rowData[indexi][indexj].value}
						class="mx-auto py-1"
						disabled
					/>
				{/if}
			{:else if key == "number"}
				{#if rowData[indexi][indexj].editable}
					{#if showTextInput}
						<input
							type="number"
							bind:value={rowData[indexi][indexj].value}
							class="px-1 py-1 w-full"
							class:text-center={_allCenter}
							class:text-right={_numberAlign == "right"}
							on:change={() => refreshState()}
							on:blur={() => {
								showTextInput = false
							}}
						/>
					{:else}
						<p
							class="py-1 break-words whitespace-normal text-right min-w-5"
							class:min-w-10={!_numbersSmall}
							on:click={() => {
								showTextInput = true
							}}
						>
							{rowData[indexi][indexj].value}
						</p>
					{/if}
				{:else}
					<p
						class="py-1 break-words whitespace-normal text-right min-w-5"
						class:min-w-10={!_numbersSmall}
					>
						{rowData[indexi][indexj].value}
					</p>
				{/if}
			{:else if key == "date"}
				{#if rowData[indexi][indexj].editable}
					<input
						type="date"
						bind:value={rowData[indexi][indexj].value}
						class="px-1 py-1"
						class:text-center={_allCenter}
						on:change={() => refreshState()}
					/>
				{:else}
					<input
						type="date"
						value={rowData[indexi][indexj].value}
						class="px-1 py-1"
						class:text-center={_allCenter}
						readonly
					/>
				{/if}
			{:else if key == "time"}
				{#if rowData[indexi][indexj].editable}
					<input
						type="time"
						bind:value={rowData[indexi][indexj].value}
						class="px-1 py-1"
						class:text-center={_allCenter}
						on:change={() => refreshState()}
					/>
				{:else}
					<input
						type="time"
						value={rowData[indexi][indexj].value}
						class="px-1 py-1"
						class:text-center={_allCenter}
						readonly
					/>
				{/if}
			{:else if key == "icon"}
				<div class="justify-center w-min mx-auto">
					{#if rowData[indexi][indexj].value == ""}
						{@html data.svg}
					{:else}
						{@html rowData[indexi][indexj].value}
					{/if}
				</div>
			{:else if key == "image"}
				<div
					class={_allCenter
						? "flex flex-row overflow-y-hidden noscrollbar space-x-1 max-w-20 justify-center"
						: "flex flex-row overflow-y-hidden noscrollbar space-x-1 max-w-20"}
				>
					{#each rowData[indexi][indexj].value as image}
						<a href={image.href} class="flex-shrink-0">
							<img src={image.link} alt={image.href} class="rounded-full" />
						</a>
					{/each}
				</div>
			{:else if key == "select"}
				<div>
					<div
						class="cell-padding flex cursor-default justify-center flex-1 cursor-pointer"
						on:click={(e) => {
							if (rowData[indexi][indexj].editable) setShowSelect(true, e)
						}}
					>
						<div
							class="font-sm w-full py-0.5 rounded-2xl font-semibold"
							style={"border: solid 2px " +
								rowData[indexi][indexj].value.color +
								"; color: " +
								LightenDarkenColor(rowData[indexi][indexj].value.color, -70)}
						>
							{rowData[indexi][indexj].value?.text}
						</div>
					</div>
					{#if showSelect}
						<div class="overlay z-10" on:click={(e) => setShowSelect(false)} />
						<div
							class="absolute flex shadow-xl bg-white rounded-md z-20 p-2"
							ref={selectRef}
							style="
                    min-width: 200px;
                    max-width: 320px;"
						>
							<div class="flex flex-row flex-wrap -mt-2">
								{#each data.options as option}
									<div class="w-min relative">
										<div
											class="font-sm w-min px-2 py-1 rounded-2xl font-semibold mr-2 mt-2 m-0 cursor-pointer"
											style={"border: solid 2px " +
												option.color +
												"; color: " +
												LightenDarkenColor(option.color, -70)}
											on:click={() => {
												setShowSelect(false)
												rowData[indexi][indexj].value = option
												refreshState()
											}}
										>
											{option.text}
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{:else if key == "multiselect"}
				{#if rowData[indexi][indexj].value.length == 0}
					<div
						class="font-sm w-full p-2 rounded-lg mr-2 mt-2 m-0 cursor-pointer bg-gray-200"
						on:click={(e) => {
							if (rowData[indexi][indexj].editable) setShowSelect(true, e)
						}}
					>
						+
					</div>
				{/if}
				<div>
					<div
						class="flex justify-center cursor-pointer w-full"
						on:click={(e) => {
							if (rowData[indexi][indexj].editable) setShowSelect(true, e)
						}}
					>
						<div class="flex flex-row flex-wrap -mt-2 w-full">
							{#each rowData[indexi][indexj].value as option}
								<div class="w-full relative">
									<div
										class="font-sm w-full px-2 py-1 rounded-2xl font-semibold mr-2 mt-2 m-0 cursor-pointer"
										style={"border: solid 2px " +
											option.color +
											"; color: " +
											LightenDarkenColor(option.color, -70)}
									>
										{option.text}
									</div>
								</div>
							{/each}
						</div>
					</div>
					{#if showSelect}
						<div class="overlay z-10" on:click={(e) => setShowSelect(false)} />
						<div
							class="absolute flex shadow-xl bg-white rounded-md z-20 p-2"
							ref={selectRef}
							style="
                    min-width: 200px;
                    max-width: 320px;"
						>
							<div class="flex flex-row flex-wrap -mt-2">
								{#each data.options as option}
									<div class="relative">
										<div
											class="font-sm w-min px-2 py-1 rounded-2xl font-semibold mr-2 mt-2 m-0 cursor-pointer"
											style={"border: solid 2px " +
												option.color +
												"; color: " +
												LightenDarkenColor(option.color, -70)}
											on:click={() => {
												setMultiSelect(option)
											}}
										>
											{option.text}
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{:else if key == "custom"}
				<svelte:component
					this={component}
					on:event={(e) => {
						dispatch("customEvent", {
							e: e.detail,
							indexi: indexi,
							indexj: indexj,
							data: rowData?.[indexi]?.[indexj],
						})
					}}
					{...data?.defaultProps}
					{...rowData?.[indexi]?.[indexj]?.props}
				/>
			{/if}
		</div>
	</a>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		cursor: default;
	}

	.noscrollbar {
		padding-bottom: 5px;
	}
	/* Hide scrollbar for Chrome, Safari and Opera */
	.noscrollbar::-webkit-scrollbar {
		/* display: none; */
		height: 10px;
	}
	.noscrollbar::-webkit-scrollbar-track {
		background-color: #c4c4c4;
		border-radius: 20px;
	}
	.noscrollbar::-webkit-scrollbar-thumb {
		background-color: #747474;
		border-radius: 20px;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.noscrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
		width: 100%;
		border: 0;
		/* max-width: 120px; */
	}

	input[type="text"] {
		width: 100%;
		border: 0;
	}

	input[type="date"] {
		width: 100%;
		border: 0;
	}

	input[type="time"] {
		width: 100%;
		border: 0;
	}

	.max-w-20 {
		max-width: 20rem;
	}

	.cursor-pointer-important {
		cursor: pointer !important;
	}
	input[type="checkbox"] {
		width: 1.2rem;
		height: 1.2rem;
	}
	.min-w-10 {
		min-width: 10rem;
	}
</style>
