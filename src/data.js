import CustomComponent from "../Atoms/CustomComponent.svelte"
export const defaultColData = [
	[
		"checkbox",
		{
			heading: "",
			data: {
				align: "center",
				showIcon: false,
			},
		},
	],
	["text", { heading: "Text", data: {} }],
	["number", { heading: "Number", data: { align: "right" } }],
	[
		"select",
		{
			heading: "Select",
			data: {
				align: "center",
				options: [{ text: "Item1" }, { text: "Item2" }, { text: "Item3" }],
			},
		},
	],
	[
		"multiselect",
		{
			heading: "Multiselect",
			data: {
				align: "center",
				options: [{ text: "Item1" }, { text: "Item2" }, { text: "Item3" }],
			},
		},
	],
	[
		"image",
		{
			heading: "Images",
			data: {
				iconAlign: "left",
			},
		},
	],
	[
		"date",
		{
			heading: "Date",
			data: {},
		},
	],
	[
		"time",
		{
			heading: "Time",
			data: {},
		},
	],
	[
		"icon",
		{
			heading: "Icon",
			data: {
				svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
			  </svg>`,
			},
		},
	],
	[
		"custom",
		{
			heading: "Custom Component",
			data: {
				component: CustomComponent,
				defaultProps: {
					active: false,
				},
			},
		},
	],
]

export const defaultRowData = [
	[
		{ value: false, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "1", editable: false },
		{ value: { text: "Item1" }, editable: false },
		{ value: [{ text: "Item1" }, { text: "Item2" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=1",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=4",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=5",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=6",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=8",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-17", editable: false },
		{ value: "12:00:00", editable: false },
		{ value: "", editable: false },
		{ props: { active: true } },
	],
	[
		{ value: true, editable: true },
		{ value: "This row cells are ", editable: true },
		{ value: "2", editable: true },
		{ value: { text: "Item3" }, editable: true },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: true },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: true,
		},
		{ value: "2021-08-18", editable: true },
		{ value: "10:10:00", editable: true },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: true },
		{ value: "This row cells are ", editable: true },
		{ value: "3", editable: true },
		{ value: { text: "Item3" }, editable: true },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: true },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: true,
		},
		{ value: "2021-08-18", editable: true },
		{ value: "10:10:00", editable: true },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: true },
		{ value: "This row cells are ", editable: true },
		{ value: "4", editable: true },
		{ value: { text: "Item3" }, editable: true },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: true },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: true,
		},
		{ value: "2021-08-18", editable: true },
		{ value: "10:10:00", editable: true },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{
			value: "I am a hyperlink",
			editable: false,
			href: "https://www.google.com",
		},
		{ value: "5", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "6", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "7", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "8", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "9", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "10", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: true },
		{ value: "Why am I editable?", editable: true },
		{ value: "11", editable: true },
		{ value: { text: "Item3" }, editable: true },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: true },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: true,
		},
		{ value: "2021-08-18", editable: true },
		{ value: "10:10:00", editable: true },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "12", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "13", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "14", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "15", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "16", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "17", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "My Age ;)", editable: false },
		{ value: "18", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "19", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "This row cells are not editable", editable: false },
		{ value: "20", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
	[
		{ value: true, editable: false },
		{ value: "Do you know Priyav?", editable: false },
		{ value: "21", editable: false },
		{ value: { text: "Item3" }, editable: false },
		{ value: [{ text: "Item2" }, { text: "Item3" }], editable: false },
		{
			value: [
				{
					link: "https://picsum.photos/30?random=3",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=2",
					href: "https://www.google.com",
				},
				{
					link: "https://picsum.photos/30?random=7",
					href: "https://www.google.com",
				},
			],
			editable: false,
		},
		{ value: "2021-08-18", editable: false },
		{ value: "10:10:00", editable: false },
		{ value: "", editable: false },
		{},
	],
]
