<script>
	import { createEventDispatcher, onMount } from "svelte"
	const dispatch = createEventDispatcher()

	export let data = ""
	export let index = 0
	export let colData = []
	export let _rowData = []
	export let filterText = ""
	export let _showHeaderIcons = true
	export let _headerEditable = true
	export let _allCenter = false
	export let _selectAllMenu = false
	export let _selectedRows = 0
	export let _showHeaderOptions = true

	$: showOptions = false
	$: optionsRef = null
	$: showInput = false
	$: inputTemp = ""
	$: selectAll = false
	if (colData[index][1].data?.checked) {
		selectAll = colData[index][1].data?.checked
		selectAll = selectAll
	}
	$: _checkbox = undefined
	$: _indeterminate = _selectedRows > 0 && !selectAll
	if (colData[index][1].data?.indeterminate) {
		_indeterminate = colData[index][1].data?.indeterminate
		_indeterminate = _indeterminate
	}

	// onMount(() => {
	// 	if (data == "checkbox") {
	// 		console.log(_selectedRows)
	// 		if (_selectedRows > 0 && !selectAll) {
	// 			console.log(_checkbox.intermediate)
	// 			_checkbox.intermediate = true
	// 			console.log(_checkbox.intermediate)
	// 			_checkbox.focus()
	// 		}
	// 	}
	// })
	function setShowOptions(bool, e) {
		showOptions = bool
		if (bool) optionsRef = e.target
		refreshState()
	}
	function LightenDarkenColor(col, amt) {
		var usePound = false
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
	function selectAllSet() {
		// console.log(selectAll)
		if (selectAll) {
			for (let i = 0; i < _rowData.length; i++) {
				_rowData[i][index].value = true
			}
			dispatch("selectAll")
		} else {
			for (let i = 0; i < _rowData.length; i++) {
				_rowData[i][index].value = false
			}
			_selectedRows = 0
			dispatch("deselectAll")
		}
		refreshState()
	}
	function setShowInput(bool) {
		showInput = bool
		if (!bool && inputTemp != "") {
			// console.log(options)
			colData[index][1]?.data?.options.push({
				text: inputTemp,
				color: "#c4c4c4",
			})
			inputTemp = ""
		}
		refreshState()
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

	function deleteOption(e, option) {
		// console.log(option)
		colData[index][1]?.data?.options.splice(
			customIndexOf(colData[index][1]?.data?.options, option),
			1
		)
		refreshState()
	}

	function sortAscending() {
		_rowData.sort((a, b) => {
			if (data == "number") {
				if (parseInt(a[index].value) < parseInt(b[index].value)) return -1
				if (parseInt(a[index].value) > parseInt(b[index].value)) return 1
			} else if (data == "date") {
				return new Date(a[index].value) - new Date(b[index].value)
			} else if (data == "time") {
				return (
					new Date("1970/01/01 " + a[index].value) -
					new Date("1970/01/01 " + b[index].value)
				)
			} else {
				if (a[index].value.toLowerCase() < b[index].value.toLowerCase())
					return -1
				if (a[index].value.toLowerCase() > b[index].value.toLowerCase())
					return 1
			}
			return 0
		})
		dispatch("sort")
		refreshState()
	}

	function sortDescending() {
		_rowData.sort((a, b) => {
			if (data == "number") {
				if (parseInt(a[index].value) > parseInt(b[index].value)) return -1
				if (parseInt(a[index].value) < parseInt(b[index].value)) return 1
			} else if (data == "date") {
				return new Date(b[index].value) - new Date(a[index].value)
			} else if (data == "time") {
				return (
					new Date("1970/01/01 " + b[index].value) -
					new Date("1970/01/01 " + a[index].value)
				)
			} else {
				if (a[index].value.toLowerCase() > b[index].value.toLowerCase())
					return -1
				if (a[index].value.toLowerCase() < b[index].value.toLowerCase())
					return 1
			}
			return 0
		})
		dispatch("sort")
		refreshState()
	}

	function refreshState() {
		showOptions = showOptions
		optionsRef = optionsRef
		showInput = showInput
		data = data
		colData = colData
		_rowData = _rowData
	}
</script>

<div class="space-x-10 w-full flex align-middle">
	<div
		class="inline-block text-sm leading-5 text-left text-gray-700 tracking-wider cursor-pointer w-full font-normal"
		on:click={(e) => {
			if (_showHeaderOptions) setShowOptions(true, e)
		}}
	>
		<div
			class:justify-center={_allCenter |
				(colData[index][1]?.data?.align == "center")}
			class:justify-end={colData[index][1]?.data?.align == "right"}
			class:flex-row-reverse={colData[index][1]?.data?.iconAlign == "left"}
			class:space-x-reverse={colData[index][1]?.data?.iconAlign == "left"}
			class="w-full flex align-middle space-x-3"
		>
			{#if colData[index][1].heading != ""}
				<span class="leading-6">
					{colData[index][1].heading}
				</span>
			{/if}
			{#if (colData[index][1].data?.showIcon != false && _showHeaderIcons) || data == "checkbox"}
				{#if colData[index][1].data?.iconSvg && colData[index][1].data.iconSvg != "" && data != "checkbox"}
					{@html colData[index][1].data.iconSvg}
				{:else if data == "text"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/>
					</svg>
				{:else if data == "checkbox"}
					{#if _selectAllMenu}
						<input
							bind:this={_checkbox}
							bind:indeterminate={_indeterminate}
							type="checkbox"
							bind:checked={selectAll}
							class="mx-auto py-1"
							on:change={() => {
								selectAllSet()
								refreshState()
							}}
						/>
					{/if}
					{#if _showHeaderIcons && colData[index][1].data?.showIcon != false}
						{#if colData[index][1].data?.iconSvg && colData[index][1].data.iconSvg != ""}
							{@html colData[index][1].data.iconSvg}
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
								/>
							</svg>
						{/if}
					{/if}
				{:else if data == "number"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
						/>
					</svg>
				{:else if data == "select"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
				{:else if data == "multiselect"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
						/>
					</svg>
				{:else if data == "image"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				{:else if data == "date"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				{:else if data == "time"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if data == "icon"}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
						/>
					</svg>
				{/if}
			{/if}
		</div>
	</div>
	{#if showOptions}
		<div class="overlay z-10 m-0" on:click={() => setShowOptions(false)} />
		<div
			class="absolute border flex shadow-2xl bg-white rounded-md z-20 p-2"
			ref={optionsRef}
			style="
                    min-width: 200px;
                    max-width: 320px;"
		>
			<div class="flex flex-row flex-wrap -mt-2 p-2">
				{#if _headerEditable}
					<span class="font-bold text-sm text-gray w-full text-left my-2">
						Heading
					</span>
					<input
						value={colData[index][1].heading}
						class="w-full border p-2"
						on:input={(e) => {
							colData[index][1].heading = e.target.value
						}}
					/>
					<span class="font-bold text-sm text-gray w-full text-left my-2">
						Property Type
					</span>
					<select
						class="text-green-500 bg-transparent w-full"
						on:change={() => {
							setShowOptions(false)
						}}
						bind:value={data}
					>
						<option value="text" class="text-green-500">Text</option>
						<option value="checkbox" class="text-green-500">Checkbox</option>
						<option value="number" class="text-green-500">Number</option>
						<option value="select" class="text-green-500">Select</option>
						<option value="multiselect" class="text-green-500"
							>Multiselect</option
						>
						<option value="image" class="text-green-500">Image</option>
						<option value="date" class="text-green-500">Date</option>
						<option value="time" class="text-green-500">Time</option>
					</select>
				{/if}
				{#if data == "select" || data == "multiselect"}
					<hr />
					<div class="flex flex-row flex-wrap font-light">
						{#each colData[index][1]?.data?.options as option}
							<div class="relative">
								<div
									class="font-sm px-2 py-1 rounded-2xl font-semibold mr-2 mt-2 m-0 cursor-pointer"
									style={"border: solid 2px " +
										option.color +
										"; color: " +
										LightenDarkenColor(option.color, -70)}
								>
									{option.text}
								</div>
								{#if colData[index][1]?.data?.options.length > 1}
									<div
										class="absolute right-1.5 top-1.5 bg-gray-700 text-white rounded-full h-2.5 w-2.5"
										on:click={(e) => {
											deleteOption(e, option)
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-2.5 w-2.5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</div>
								{/if}
							</div>
						{/each}
						{#if showInput}
							<div
								class="font-sm w-min p-2 rounded-lg mr-2 mt-2 m-0 cursor-pointer bg-gray-200"
							>
								<input
									value={inputTemp}
									on:input={(e) => {
										inputTemp = e.target.value
									}}
									on:blur={(e) => {
										setShowInput(false)
									}}
								/>
							</div>
						{:else}
							<div
								class="font-sm w-min p-2 rounded-lg mr-2 mt-2 m-0 cursor-pointer bg-gray-200"
								on:click={() => {
									setShowInput(true)
								}}
							>
								+
							</div>
						{/if}
					</div>
				{/if}
				{#if data != "checkbox" || data != "image" || data != "icon"}
					<hr class="m-1.5 w-full" />
					<span class="font-bold text-sm text-gray w-full text-left my-2">
						Filter
					</span>
					<input
						value={filterText}
						class="w-full border p-2 my-2"
						on:input={(e) => {
							filterText = e.target.value
							dispatch("filter", {
								index: index,
								data: data,
							})
						}}
					/>
					<div class="space-y-3 w-full">
						<div
							class="flex justify-between w-full font-light cursor-pointer"
							on:click={(e) => {
								sortAscending()
							}}
						>
							<span> Sort Ascending </span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								/>
							</svg>
						</div>
						<div
							class="flex justify-between w-full font-light cursor-pointer"
							on:click={(e) => {
								sortDescending()
							}}
						>
							<span> Sort Descending </span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M5 10l7-7m0 0l7 7m-7-7v18"
								/>
							</svg>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		margin: 0 !important;
		overflow: hidden;
		cursor: default;
	}
	input[type="checkbox"] {
		width: 1.2rem;
		height: 1.2rem;
	}
</style>
