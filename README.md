# rnuk-search-highlighter

## SearchHighlight

`SearchHighlight` is a React Native component that provides real-time search and text highlighting functionality for a list of items. It allows users to filter through a list based on the search input, with matching letters in the results highlighted. Additionally, it supports customizable styling and behavior.

## Features

- **Search Filtering:** Filters items as the user types, based on the search term.
- **Text Highlighting:** Dynamically highlights the letters in the results that match the search term.
- **Custom Styling:** Customize styles for the input field, list items, and highlighted text.
- [Custom Item Rendering](#basic-example): Option to provide a custom rendering function for list items.
- [Item Selection Callback](#props): Invoke a callback when an item is selected from the list.
- [Preview](#preview) : See Demo



## Installation

To install this package, run the following command:

```bash
npm install search-highlight-component
```

```bash
yarn add search-highlight-component
```

## Basic Example

```javascript
import React from 'react';
import { View, Alert } from 'react-native';
import SearchHighlight from 'search-highlight-component';

const App = () => {
  const data = [
  "This",
  "IS",
  "SAMPLE",
  "DATA",
  "uday",
  "kiran",
  "Gurramu",
  "searc",
  "highlight",
  "package",
  "please",
  "contribute",
];

  const handleSelectItem = (item) => {
    Alert.alert(`You selected: ${item}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <SearchHighlight
        data={data}
        onSelectItem={handleSelectItem}
        searchPlaceholder="Search Names"
        highlightStyle={{ backgroundColor: 'yellow' }}
        containerStyle={{ backgroundColor: 'white' }}
        inputStyle={{ color: 'black' }}
        listStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
      />
    </View>
  );
};

export default App;

```


## Preview 

[Watch Demo](https://player.vimeo.com/video/1009542537?h=39262bcde1)

![Search Preview1](https://i.ibb.co/RSBH4YZ/Whats-App-Image-2024-09-15-at-09-04-54-6b11b50d.jpg)

![Search Preview2](https://i.ibb.co/LN508wF/Whats-App-Image-2024-09-15-at-09-04-54-6980ce17.jpg)


## Props

| Prop Name            | Type          | Default Value                                                    | Description                                                                                                                                     |
|----------------------|---------------|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `data`               | `array`       | `[]`                                                             | The list of strings to be filtered and highlighted based on the search term.                                                                    |
| `textbox`            | `bool`        | `true`                                                           | Whether to show the search text input or not.                                                                                                   |
| `searchPlaceholder`   | `string`      | `'Search'`                                                       | Placeholder text for the search input field.                                                                                                    |
| `highlightStyle`      | `object`      | `{ backgroundColor: 'yellow' }`                                  | Style applied to the highlighted letters in the filtered results.                                                                                |
| `containerStyle`      | `object`      | `{}`                                                             | Custom styling for the main container.                                                                                                          |
| `inputContainerStyle` | `object`      | `{ height: 55, justifyContent: 'center', backgroundColor: 'grey' }` | Custom styling for the search input container.                                                                                                  |
| `inputStyle`          | `object`      | `{ padding: 0, fontSize: 20, paddingHorizontal: 10, marginHorizontal: 20 }` | Custom styling for the search text input field.                                                                                                 |
| `listStyle`           | `object`      | `{ height: 500 }`                                                | Custom styling for the list container.                                                                                                          |
| `listContentStyle`    | `object`      | `{}`                                                             | Custom styling for the content inside the list.                                                                                                 |
| `renderCustomItem`    | `function`    | `null`                                                           | Optional function to render a custom item component in the list. Receives `{ item, highlightedValue }` as parameters.                            |
| `placeholderTextColor`| `string`      | `'blue'`                                                         | Color of the placeholder text in the search input.                                                                                              |
| `onSelectItem`        | `function`    | `() => {}`                                                       | Callback function called when an item is selected from the list. Receives the selected item as a parameter.       


## Developer Note

If you are using the `renderCustomItem` prop to customize how items are rendered in the list, you must implement your own `TextInput` or similar component for handling the selection of items from the search feed.

The `SearchHighlight` component provides the filtered data, but it does not manage the selection state or input control when using a custom render method. You need to manage how the selected item is displayed and handled in the `TextInput` component.

### Example with Custom Input Handling

```javascript
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import SearchHighlight from 'search-highlight-component';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const data = ['John Doe', 'Jane Smith', 'Emily Davis'];

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Manually handle input when an item is selected
    Alert.alert(`Selected: ${item}`);
  };

  const renderCustomItem = ({ item, highlightedValue }) => (
    <TouchableOpacity onPress={() => handleSelectItem(item.value)}>
      <View style={{ padding: 10, backgroundColor: '#e0e0e0', borderRadius: 5 }}>
        <Text>{highlightedValue}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={selectedItem}
        onChangeText={setSelectedItem}
        placeholder="Select an item"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <SearchHighlight
        data={data}
        renderCustomItem={renderCustomItem}
        searchPlaceholder="Search People"
      />
    </View>
  );
};

export default App;
```




