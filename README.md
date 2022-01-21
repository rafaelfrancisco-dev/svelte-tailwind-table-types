# Svelte Tailwind Table

The last Svelte Table library you will ever need. A Svelte component for rendering a dynamic table using tailwind CSS

##

This is a hard fork of [svelte-tailwind-table](https://www.npmjs.com/package/svelte-tailwind-table) since the original repository on GitLab couldn't be reached and I wanted to add types and SvelteKit-style imports.

---
### Check out the [demo]
---

## Key Features
- Inbuilt SearchBar (Can be removed using props)
- Most components are customizable
- You can set onclick events/hyperlinks and more...
- Customizable Pagination and Header Icons!
- Sort and Filter
- Custom icon column
- Custom component data type
- Interactive Rows with custom onclick events
- Multiple themes (outlined, filled and more coming soon...)

## What's new
- 8 new props `showHeaderOptions`, `theme`, `onRowClickFunction`, `interactiveRows`, `activeRow`, `rowBorderTouch`, `borderRadius`, `numbersSmall`
- Features: Interactive rows, themes added, more customization options
- UI improvements

## Coming soon!
- File upload

## Check it out!
<a href="https://drive.google.com/uc?export=view&id=1vYPGDjbSwoOTOZfYcSjamIi6MLq6LGIW"><img src="https://drive.google.com/uc?export=view&id=1vYPGDjbSwoOTOZfYcSjamIi6MLq6LGIW" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />

Demo GIF 👇(OLD)

<a href="https://drive.google.com/uc?export=view&id=1g_r74NKCGJPgjieUJxjaZwjeUhwhHpe7"><img src="https://drive.google.com/uc?export=view&id=1g_r74NKCGJPgjieUJxjaZwjeUhwhHpe7" style="width: 650px; max-width: 100%; height: auto" title="Click to enlarge picture" />

## Installation
---
*[Tailwind css](https://tailwindcss.com/docs/installation#using-tailwind-via-cdn) in required for the table to be styled properly*

`npm install svelte-tailwind-table`

## Basic usage
---
```html
<script>
  import Table from 'svelte-tailwind-table';
</script>

<Table colData={...} rowData={...}/>
```
## Props

| Prop Name              | Data Type  | Default value               |
| ---------------------- | ---------- | --------------------------- |
| `colData`              | `array`    | example with all data types |
| `rowData`              | `array`    | example with 2 row values   |
| `theme`                | `string`   | `outline`                   |
| `showSearchBar`        | `boolean`  | `true`                      |
| `searchStyles`         | `string`   | `""`                        |
| `searchText`           | `string`   | `""`                        |
| `showFilter`           | `boolean`  | `true`                      |
| `filterButtonColor`    | `string`   | `"red"`                     |
| `showHeaderIcons`      | `boolean`  | `true`                      |
| `showHeaderOptions`    | `boolean`  | `true`                      |
| `headerEditable`       | `boolean`  | `true`                      |
| `borderBetweenColumns` | `boolean`  | `true`                      |
| `numberAlign`          | `string`   | `"right"`                   |
| `allCenter`            | `boolean`  | `false`                     |
| `pagination`           | `boolean`  | `true`                      |
| `paginationRows`       | `number`   | `10`                        |
| `currentPage`          | `number`   | `1`                         |
| `paginationType`       | `string`   | `default`                   |
| `selectAllMenu`        | `boolean`  | `true`                      |
| `onClickFunction`      | `function` | `()={}`                     |
| `onRowClickFunction`   | `function` | `()={}`                     |
| `interactiveRows`      | `boolean`  | `false`                     |
| `interactiveRowColor`  | `string`   | `"gray"`                    |
| `activeRow`            | `number`   | `0`                         |
| `rowBorderTouch`       | `boolean`  | `true`                      |
| `borderRadius`         | `text`     | `xl`                        |
| `numbersSmall`         | `boolean`  | `true`                      |
| `overrideClasses`      | `string`   | `""`                        |

### `colData`
A 2-Dimensional array with the following properties:
```js
colData = [
    ["Data type", {heading: "Column 1 heading", data:{...}}],
    ["Data type", {heading: "Column 2 heading", data:{...}}],
]
```
Refer to [Datatypes](#data-types) for information regarding the `data:{...}`

### `rowData`
A 2-Dimensional array with the following properties:
```js
rowData = [
    [ //row 1
        {value: "The value", editable: true, href: "This is optional"},     //column 1 value
        {value: "The value", editable: true, href: "hyperlink for a cell"}, //column 2 value
    ],
    [ //row 2
        {value: "The value", editable: true}, //column 1 value
        {value: "The value", editable: true}, //column 2 value
    ]
]
```
Refer to [Data Types](#data-types) for information regarding the `The value`

### `theme`
The theme of the table. 
`outline` or `filled` makes the header background color white or grey.
`borderless` makes the table borderless and transparent.

### `showSearchBar`
A boolean value to determine if the default search bar is shown or not.

### `searchStyles`
A string value to override the styling of the search bar.

### `searchText`
A string value to set the searched text for the search bar.

### `showFilter`
A boolean value to determine if the default filter is shown or not.

### `filterButtonColor`
A string value to set the color of the filter button.

### `showHeaderIcons`
A boolean value to determine if the header icons are shown or not.

### `showHeaderOptions`
A boolean value to determine if the header options are shown or not.

### `headerEditable`
A boolean value to determine if the header is editable or not.

### `borderBetweenColumns`
A boolean value to determine if the border between columns is shown or not.

### `numberAlign`
A string value to set the alignment of the number column (`"right"` or `"left"`).

### `allCenter`
A boolean value to determine if the cell values are centered or not.

### `pagination`
A boolean value to determine if the pagination is done or not.

### `paginationRows`
An integer value to set the number of rows per page.

### `currentPage`
An integer value to set the current page.

### `paginationType`
A string value to set the type of pagination.
`default` or `detailed` - Detailed shows the number current showing data
Theme of pagination is determined by the theme of the table.

### `selectAllMenu`
A boolean value to determine if the select all box is shown or not.

### `onClickFunction`
A function to call when a cell is clicked on
The function needs to be of format
```js
function yourFunctionName(event, cellData, colIndex, rowIndex){
    // do anything using the params
}
```

### `onRowClickFunction`
A function to call when a row is clicked on (only if `interactiveRows` is set to `true`)
The function needs to be of format
```js
function yourFunctionName(event, rowIndex){
    // do anything using the params
}
```

### `interactiveRows`
A boolean value to determine if the rows are interactive or not.

### `interactiveRowColor`
A string value to set the color of the interactive rows on active and hover.

### `activeRow`
An integer value to set the active row. This is only used if `interactiveRows` is set to `true`.

### `rowBorderTouch`
A boolean value to determine if the row borders are touching the edges or are disconnected.

### `borderRadius`
A string value to set the border radius of the table.
One of `"none"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`, `"3xl"`, `"4xl"`, `"5xl"`, `"6xl"`, `"7xl"`, `"full"`

### `numbersSmall`
A boolean value to determine if the numbers are small or not. Makes the minimum width of the number column smaller or larger.

### `overrideClasses`
A string value to override the default classes.

# Data Types

## 🌐 Global Options
```js
data: {
    align: "right"/"left"/"center", //optional
    iconAlign: "right"/"left"/"center", //optional
    iconSvg: "svg as string for overriding default svg", //optional
    showIcon: true/false, //optional
}
```

## 📄 Text
```js
data: {}
```
```js
value: "The value"
```

## ✅ Checkbox
```js
data: {checked: true}
```
```js
value: boolean(false/true)
```

## 🔢 Number
```js
data: {}
```
```js
value: 123
```

## 🔽 Select
```js
data: {
    options: [
        {text: "Option 1", color: "#c3c3c3"}, // color is optional
        {text: "Option 2", color: "#c4c4c4"}, // When not provided random colors will be assigned
        {text: "Option 3", color: "#c5c5c5"}, // random colors will be taken from predefined light colors
    ]
}
```
```js
value: {text: "Option 1", color: "#c3c3c3"}
```

## ⏬ Multiselect
```js
data: {
    options: [
        {text: "Option 1"}, // color is optional here also
        {text: "Option 2"},
        {text: "Option 3"},
    ]
}
```
```js
value: [
    {text: "Option 1"},
    {text: "Option 2"}
] // make sure to use same object value as in options
```

## 🖼 Image
```js
data: {}
```
```js
value: [
    {
        link:"https://via.placeholder.com/150",
        href:"https://www.example.com"
    }, //image 1
    {
        link:"https://via.placeholder.com/150",
        href:"https://www.example.com"
    }, //image 2
]
```

## 📅 Date
```js
data: {}
```
```js
value: "2003-02-19"
```

## 🕒 Time
```js
data: {}
```
```js
value: "12:00"
```

## ⁝ Icon
```js
data: {
    svg: `<svg></svg>`, // default row svg string
}
```
```js
value: `<svg></svg>`/"" // override row svg string otherwise ""
```

***The above svg overrides are for row data and not the default header icon. Use [iconSvg prop](#data-types) for that***


## 👨‍💻 Custom Component
```js
data: {
    component: CustomComponent, // Custom Component directly from import
    defaultProps: { // props to pass to the component
        prop1: "value",
        prop2: "value"
    }
}
```
```js
value: {
    props: { // props to override default props
        prop1: "value", 
        prop2: "value"
    }
}
```

***To fire and use events on custom components, dispatch an event named as "event" from the component and use on:customEvent prop on Table component; The details passed on to the "event" dispatch will be e.detail.e for the Table listener***

### Example

```html
<!-- CustomComponent.svelte -->
<script>
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();
</script>
<div on:click={(e)=>{
    dispatch("event", {
        active: false
    })
}}>
    <!-- ... -->
</div>
```

```html
<!-- Main.svelte -->
<Table on:customEvent={(e)=>{
    console.log(e.detail.e) // logs {active: false}
}}/>
```

[demo]: https://svelte-tailwind-table-demo.vercel.app/

# Thank you so much checking out the package! 🙏
## Hope you like it! 😇
### Made with ❤️ by [Priyav Kaneria](https://priyavkaneria.me)

-----
Contact me at [LinkedIn](https://www.linkedin.com/in/priyavkaneria/) or [Github](https://github.com/PriyavKaneria) or priyavkaneria@gmail.com
