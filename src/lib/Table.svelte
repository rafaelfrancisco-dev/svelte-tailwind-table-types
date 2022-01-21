<script>
	import { onMount } from "svelte"
	import { writable } from "svelte/store"
	import Design from "design-system-svelte"
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()

	import TableCell from "../Atoms/TableCell.svelte"
	import TableHeader from "../Atoms/TableHeader.svelte"
	import { defaultColData, defaultRowData } from "./data"
	export let colData = defaultColData
	export let rowData = defaultRowData
	export let theme = "outline" // "outline" or "filled" or "borderless"
	export let showSearchBar = true
	export let searchStyles = ""
	export let searchText = ""
	export let showFilter = true
	export let filterButtonColor = "red"
	export let showHeaderIcons = true
	export let showHeaderOptions = true
	export let headerEditable = true
	export let borderBetweenColumns = false
	export let numberAlign = "right" // "right" or "left" or "center"
	export let allCenter = false
	export let pagination = true
	export let paginationRows = 10 // number of rows per page
	export let currentPage = 1 // current page
	export let paginationType = "default" // "default" or "detailed"
	export let selectAllMenu = true
	export let onClickFunction = (event, cellData, colIndex, rowIndex) => {
		// console.log(event, cellData)
	}
	export let onRowClickFunction = (event, rowIndex) => {
		// console.log(event, rowIndex)
	}
	export let interactiveRows = false
	export let interactiveRowColor = "gray"
	export let activeRow = 0
	export let rowBorderTouch = true
	export let borderRadius = "xl" // "sm" or "md" or "lg" or "xl" or "2xl" or "3xl" or "4xl"
	export let numbersSmall = true
	export let overrideClasses = ""

	let datatypelist = []
	$: filterText = ""
	$: totalPages = Math.ceil(rowData.length / paginationRows)
	$: showFilterBox = false
	$: filterPos = undefined
	$: filterColumn = ""
	$: filterType = ""
	$: filterValue = ""
	$: selectedRows = 0
	$: myrowdata = rowData && searchRows() //used to update the filteredRows hwen rowData changes
	$: _activeRow = activeRow //used to update the active row on click
	const filteredRowData = writable(rowData)
	$: filtering = false
	$: mylist = [1]
	filteredRowData.subscribe((v) => {
		if (v.length) {
			mylist = [1]
			for (let i = 2; i <= Math.ceil(rowData.length / paginationRows); i++) {
				mylist.push(i)
				// console.log(mylist)
			}
			// console.log(mylist, v)
		}
	})
	let filterOptions = [
		"is",
		"is not",
		"contains",
		"does not contain",
		"is empty",
		"is not empty",
	]
	function compareType(a, b, type) {
		// console.log(a.toString().toLowerCase() == b.toString().toLowerCase())
		if (type == "is") {
			return a.toString().toLowerCase() == b.toString().toLowerCase()
		} else if (type == "is not") {
			return a.toString().toLowerCase() != b.toString().toLowerCase()
		} else if (type == "contains") {
			return a.toString().toLowerCase().includes(b.toString().toLowerCase())
		} else if (type == "does not contain") {
			return !a.toString().toLowerCase().includes(b.toString().toLowerCase())
		} else if (type == "is empty") {
			return a == ""
		} else if (type == "is not empty") {
			return a != ""
		}
		return true
	}
	function getColumnIndex(columnName) {
		for (let i = 0; i < colData.length; i++) {
			if (colData[i][1].heading == columnName) {
				return i
			}
		}
		return -1
	}
	function compare(value, searchtext) {
		if (!value) return false
		return value.toString().toLowerCase().includes(searchtext.toLowerCase())
	}
	function filterData() {
		if (filterColumn == "") {
			filteredRowData.set(rowData)
		} else {
			filteredRowData.set(
				rowData.filter((row) => {
					let ind = getColumnIndex(filterColumn)
					if (datatypelist[ind] == "select") {
						return compareType(row[ind].value.text, filterValue, filterType)
					} else if (datatypelist[ind] == "multiselect") {
						let res = false
						for (let i = 0; i < row[ind].value.length; i++) {
							res =
								res ||
								compareType(row[ind].value[i].text, filterValue, filterType)
						}
						return res
					} else {
						return compareType(row[ind].value, filterValue, filterType)
					}
				})
			)
			// console.log(filteredRowData)
			$filteredRowData = $filteredRowData
		}
		filtering = true
		refreshState()
	}
	function filterRows(e) {
		filteredRowData.set(
			rowData.filter((row) => {
				if (e.detail.data == "select") {
					return compare(row[e.detail.index].value.text, filterText)
				} else if (e.detail.data == "multiselect") {
					let res = false
					for (let i = 0; i < row[e.detail.index].value.length; i++) {
						res = res || compare(row[e.detail.index].value[i].text, filterText)
					}
					return res
				} else {
					return compare(row[e.detail.index].value, filterText)
				}
			})
		)
		if (pagination) {
			filteredRowData.set(
				$filteredRowData.slice(
					paginationRows * (currentPage - 1),
					paginationRows * currentPage
				)
			)
		}
		refreshState()
	}
	function searchRows() {
		if (filtering) {
			filtering = false
			return
		}
		if (searchText.trim() != "") {
			filteredRowData.set(
				rowData.filter((row) => {
					let found = false
					for (let i = 0; i < row.length; i++) {
						const data = row[i]
						if (datatypelist[i] == "select") {
							found = found || compare(data.value.text, searchText)
						} else if (datatypelist[i] == "multiselect") {
							let res = false
							for (let i = 0; i < data.value.length; i++) {
								res = res || compare(data.value[i].text, searchText)
							}
							found = found || res
						} else {
							found = found || compare(data.value, searchText)
						}
					}
					return found
				})
			)
		} else {
			filteredRowData.set(rowData)
		}
		if (pagination) {
			filteredRowData.set(
				$filteredRowData.slice(
					paginationRows * (currentPage - 1),
					paginationRows * currentPage
				)
			)
		}
		refreshState()
	}
	function refreshState() {
		$filteredRowData = $filteredRowData
		rowData = rowData
		colData = colData
		currentPage = currentPage
		showFilterBox = showFilterBox
	}
	let enterdatatypes = () => {
		datatypelist = []
		for (let i = 0; i < colData.length; i++) {
			datatypelist.push(colData[i][0])
		}
		datatypelist = datatypelist
	}
	onMount(async () => {
		searchRows()
		refreshState()
	})
	enterdatatypes()
	// console.log(datatypelist, "This is list of datatypes in table")
</script>

<svelte:head>
	<link
		href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex flex-col table-classes {overrideClasses}">
	<div class="flex flex-row justify-end">
		{#if showSearchBar}
			<div class={searchStyles != "" ? searchStyles : "flex items-center px-2"}>
				<Design.SearchBar
					on:search={(e) => {
						searchText = e.detail.q
						searchRows()
					}}
				/>
			</div>
		{/if}
		{#if showFilter}
			<Design.Button
				bind:this={filterPos}
				title="Filter"
				themeColor={filterButtonColor}
				isIcon={true}
				onclick={() => {
					showFilterBox = true
					refreshState()
				}}
				classes="flex-row-reverse"
				iconSVG={`<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4 my-auto ml-2"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
			/>
		</svg>`}
			/>
			{#if showFilterBox}
				<div
					class="overlay z-10 m-0"
					on:click={() => {
						showFilterBox = false
						refreshState()
					}}
				/>
				<div
					class="absolute flex shadow-2xl border border-gray-200 bg-white rounded-md z-40 p-3 mt-10"
					ref={filterPos}
				>
					<div class="flex flex-row space-x-2">
						<span>Where </span>
						<select
							class="mx-1 bg-gray-200 rounded p-1"
							bind:value={filterColumn}
							on:change={() => {
								filterData()
							}}
						>
							<option value="" disabled selected hidden>Select Column</option>
							{#each colData as col}
								<option>{col[1].heading}</option>
							{/each}
						</select>
						<select
							class="mx-1 bg-gray-200 rounded p-1"
							bind:value={filterType}
							on:change={() => {
								filterData()
							}}
						>
							<option value="" disabled selected hidden
								>Select Filter Type</option
							>
							{#each filterOptions as opt}
								<option>{opt}</option>
							{/each}
						</select>
						{#if filterType != "is empty" && filterType != "is not empty"}
							<input
								class="mx-1 bg-gray-200 rounded p-1"
								type="text"
								placeholder="Value"
								bind:value={filterValue}
								on:input={() => {
									filterData()
								}}
							/>
						{/if}
						{#if filterColumn != ""}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								on:click={() => {
									filterColumn = ""
									filterType = ""
									filterValue = ""
									filterData()
								}}
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						{/if}
					</div>
				</div>
			{/if}
		{/if}
	</div>
	<div
		class="flex max-h-screen overflow-y-auto overflow-x-auto noscrollbar w-full border-gray-300 rounded-{borderRadius}"
		class:border={theme != "borderless"}
	>
		<table class="w-full" class:border-separate={rowBorderTouch}>
			<thead
				class="sticky top-0 z-30"
				class:bg-gray-100={theme == "filled"}
				class:filter={(theme = "borderless")}
				class:backdrop-blur-md={(theme = "borderless")}
			>
				<tr class="p-2">
					{#each datatypelist as dt, indexj}
						<th
							scope="col"
							class="w-min py-3 {theme != 'borderless'
								? `border-t border-b`
								: ``} xs:px-0 sm:px-1 md:px-3 lg:px-5 2xl:px-7"
							class:relative={dt == "checkbox"}
						>
							<TableHeader
								bind:colData
								index={indexj}
								bind:data={dt}
								bind:_rowData={rowData}
								bind:filterText
								bind:_selectedRows={selectedRows}
								_allCenter={allCenter}
								on:filter={(e) => filterRows(e)}
								_showHeaderIcons={showHeaderIcons}
								_headerEditable={headerEditable}
								_selectAllMenu={selectAllMenu}
								on:sort={() => searchRows()}
								on:selectAll={(e) => onClickFunction(e, "selectAll", -1, -1)}
								on:deselectAll={(e) =>
									onClickFunction(e, "deselectAll", -1, -1)}
								_showHeaderOptions={showHeaderOptions}
							/>
						</th>
					{/each}
				</tr>
			</thead>
			{#if $filteredRowData.length >= 1}
				<tbody
					class:bg-transparent={theme == "borderless"}
					class:bg-white={theme != "borderless"}
					class="rounded text-sm leading-5 font-normal"
				>
					{#each $filteredRowData as i}
						<tr
							class={interactiveRows
								? `${
										rowData.indexOf(i) == _activeRow
											? `bg-${interactiveRowColor}-200`
											: ""
								  } hover:bg-${interactiveRowColor}-100`
								: ""}
							on:click={(e) => {
								if (interactiveRows) {
									let rowIndex = rowData.indexOf(i)
									_activeRow = rowIndex
									activeRow = rowIndex
									onRowClickFunction(e, rowIndex)
								}
							}}
						>
							{#each i as j, myind}
								<td class="border-b" class:border-t={theme != "borderless"}>
									<div>
										<div class="py-1 my-auto">
											<div
												class="{onClickFunction.length > 0
													? 'cursor-pointer'
													: ''} text-center text-sm leading-5 font-normal text-left whitespace-nowrap text-gray-700 xs:px-0 sm:px-1 md:px-3 lg:px-5 2xl:px-7"
												on:click={(e) =>
													onClickFunction(e, j, myind, rowData.indexOf(i))}
											>
												<div class="flex">
													<TableCell
														key={datatypelist[myind]}
														indexi={rowData.indexOf(i)}
														indexj={myind}
														bind:rowData
														bind:_selectedRows={selectedRows}
														data={colData[myind][1].data}
														_numberAlign={numberAlign}
														_allCenter={allCenter}
														_numbersSmall={numbersSmall}
														on:customEvent={(e) => {
															dispatch("customEvent", {
																e: e.detail.e,
																indexi: e.detail.indexi,
																indexj: e.detail.indexj,
																data: e.detail.data,
															})
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			{/if}
		</table>
	</div>
	{#if paginationType == "default"}
		<div class="flex justify-start space-x-3 my-3">
			<div
				class="flex py-2 pr-2 cursor-pointer"
				on:click={() => {
					if (currentPage > 1) {
						currentPage--
						searchRows()
					}
				}}
			>
				<svg
					width="25"
					height="24"
					viewBox="0 0 25 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class={currentPage > 1 ? "h-6 w-4" : "h-6 w-4 text-gray-400"}
				>
					<path
						d="M15.5001 19.9201L8.98009 13.4001C8.21009 12.6301 8.21009 11.3701 8.98009 10.6001L15.5001 4.08008"
						stroke="#636374"
						stroke-width="1.5"
						stroke-miterlimit="10"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="text-sm mt-0.5" class:text-gray-400={currentPage <= 1}>
					Prev
				</span>
			</div>
			<span class="cursor-pointer">
				<select
					bind:value={currentPage}
					class="border-0 mr-1"
					class:bg-gray-300={theme == "filled"}
					on:change={() => searchRows()}
				>
					{#each mylist as i}
						<option>{i}</option>
					{/each}
				</select>
				of {totalPages} &nbsp;
			</span>
			<div
				class="flex py-2 cursor-pointer"
				on:click={() => {
					if (currentPage < totalPages) {
						currentPage++
						searchRows()
					}
				}}
			>
				<span
					class="text-sm mt-0.5"
					class:text-gray-400={currentPage >= totalPages}>Next</span
				>
				<svg
					width="25"
					height="24"
					viewBox="0 0 25 24"
					class={currentPage < totalPages ? "h-6 w-4" : "h-6 w-4 text-gray-400"}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.40991 19.9201L15.9299 13.4001C16.6999 12.6301 16.6999 11.3701 15.9299 10.6001L9.40991 4.08008"
						stroke="#636374"
						stroke-width="1.5"
						stroke-miterlimit="10"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
	{:else if paginationType == "detailed"}
		<div class="flex justify-between">
			<div class="flex space-x-3 my-3">
				<div class="text-sm py-2">
					<span>
						Showing {currentPage}-{currentPage * paginationRows > rowData.length
							? rowData.length
							: currentPage * paginationRows} of {rowData.length}
					</span>
				</div>
			</div>
			<div class="flex space-x-3 my-3">
				<div
					class="flex py-2 pr-2 cursor-pointer"
					on:click={() => {
						if (currentPage > 1) {
							currentPage--
							searchRows()
						}
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class={currentPage > 1 ? "h-6 w-4" : "h-6 w-4 text-gray-400"}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span class="text-sm mt-0.5" class:text-gray-400={currentPage <= 1}
						>Prev</span
					>
				</div>
				<span class="cursor-pointer">
					<select
						bind:value={currentPage}
						class="border-0 mr-1"
						class:bg-gray-300={theme == "filled"}
						on:change={() => searchRows()}
					>
						{#each mylist as i}
							<option>{i}</option>
						{/each}
					</select>
					of {totalPages} &nbsp;
				</span>
				<div
					class="flex py-2 cursor-pointer"
					on:click={() => {
						if (currentPage < totalPages) {
							currentPage++
							searchRows()
						}
					}}
				>
					<span
						class="text-sm mt-0.5"
						class:text-gray-400={currentPage >= totalPages}>Next</span
					>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class={currentPage < totalPages
							? "h-6 w-4"
							: "h-6 w-4 text-gray-400"}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			</div>
		</div>
	{/if}
</div>

{#if theme=="borderless"}
<style>
	table thead th:first-of-type{
		padding-left: 0;
	}
	table thead th:last-of-type{
		padding-right: 0;
	}
	table tbody tr td:first-of-type div div div{
		padding-left: 0;
	}
	table tbody tr td:last-of-type div div div{
		padding-right: 0;
	}
</style>
{/if}
{#if borderBetweenColumns}
	<style>
		td:not(:last-of-type):not(:first-of-type) {
			border: 1px solid #e0e0e0;
		}
		th:not(:last-of-type):not(:first-of-type) {
			border: 1px solid #e0e0e0;
		}
	</style>
{:else if theme != "borderless"}
	<style>
		td:last-of-type {
			border-right: 1px solid #e0e0e0;
		}
		td:first-of-type {
			border-left: 1px solid #e0e0e0;
		}
		th:last-of-type {
			border-right: 1px solid #e0e0e0;
		}
		th:first-of-type {
			border-left: 1px solid #e0e0e0;
		}
	</style>
{:else}
	<style>
		tr:first-of-type td {
			border-top: 1px solid #e0e0e0;
		}
		tr:last-of-type td {
			border-bottom: 1px solid #e0e0e0;
		}
		tbody {
			opacity: 0.75;
		}
	</style>
{/if}

{#if !rowBorderTouch}
	<style>
		table {
			border-collapse: collapse;
		}
		table tbody {
			border-right: 20px solid transparent;
			border-left: 20px solid transparent;
		}
		th:first-of-type {
			border-left: transparent;
			padding-left: 0.875rem;
		}
		th:last-of-type {
			border-right: transparent;
			padding-right: 1.875rem;
		}
	</style>
{/if}

<style>
	@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
	table {
		border-spacing: 0;
	}
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
	.table-classes {
		font-family: "Inter";
	}
	th {
		border-top: transparent;
	}
	.noscrollbar::-webkit-scrollbar {
		display: none;
	}
	.noscrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		/* background: transparent; */
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='50px' width='50px' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke='gray' stroke-width='2' d='M19 9l-7 7-7-7' /></svg>");
		background-repeat: no-repeat;
		background-position-x: 90%;
		background-size: 20px;
		background-position-y: 47%;
		border: 1px solid #dfdfdf;
		border-radius: 2px;
		margin-right: 1rem;
		padding: 0.2rem;
		padding-right: 2rem;
		padding-left: 0.5rem;
		margin-top: 0.3rem;
	}
</style>
