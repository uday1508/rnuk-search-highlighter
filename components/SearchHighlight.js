import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} SearchHighlightProps
 * @property {string[]} [data=[]] - The list of strings to be filtered and highlighted.
 * @property {boolean} [textbox=true] - Whether to show the search text input or not.
 * @property {string} [searchPlaceholder='Search'] - Placeholder text for the search input field.
 * @property {Object} [highlightStyle={ backgroundColor: 'yellow' }] - Style applied to the highlighted letters.
 * @property {Object} [containerStyle={}] - Custom styling for the main container.
 * @property {Object} [inputContainerStyle={}] - Custom styling for the search input container.
 * @property {Object} [inputStyle={}] - Custom styling for the search text input field.
 * @property {Object} [listStyle={ height: 500 }] - Custom styling for the list container.
 * @property {Object} [listContentStyle={}] - Custom styling for the content inside the list.
 * @property {function} [renderCustomItem=null] - Optional function to render a custom item component in the list.
 * @property {string} [placeholderTextColor='blue'] - Color of the placeholder text in the search input.
 * @property {function} [onSelectItem=() => {}] - Callback function called when an item is selected from the list.
 */

/**
 * A React Native component for real-time search and text highlighting.
 * @param {SearchHighlightProps} props
 * @returns {JSX.Element}
 */

export default function SearchHighlight({
  data =  [],
  textbox = true,
  searchPlaceholder = 'Search',
  highlightStyle = { backgroundColor: 'yellow' },
  containerStyle = {},
  inputContainerStyle = {},
  inputStyle = {},
  listStyle = {height:500},
  listContentStyle = {},
  renderCustomItem = null,
  placeholderTextColor = "blue",
  onSelectItem = () => {}
}) {
  const [searchValue, setSearchValue] = useState('');
  const [appear,setAppear] = useState(false);
  const inputRef = useRef();

  const filteredData = useMemo(() => {
    const searchLetterArray = searchValue
      .split('')
      .filter(x => x !== ' ')
      .map(letter => letter.toLowerCase());

    return data
      .map(item => {
        const itemArray = item.toLowerCase().split('');
        let isValid = true;
        let strIndexSum = 0;

        for (let j = 0; j < searchLetterArray.length; j += 1) {
          const strLetter = searchLetterArray[j];
          const strIndex = itemArray.findIndex(x => x === strLetter);
          if (strIndex === -1) {
            isValid = false;
            break;
          }
          strIndexSum += strIndex;
          itemArray.splice(0, strIndex + 1);
        }

        return isValid ? { value: item, sortValue: strIndexSum } : null;
      })
      .filter(item => item !== null)
      .sort((a, b) => a.sortValue - b.sortValue);
  }, [searchValue, data]);

  const handleSelectItem = (item) => {
    console.log("HELLO")
    onSelectItem(item);  // Callback to return the selected item
    setSearchValue(item);  // Clear the search value to reset the list
    setAppear(true);
  };


  const renderItem = ({ item }) => {
    if(searchValue.length == 0) return null;
    const { value } = item;
    const highlightedValue = highlightSearchedLetters(value, searchValue);

    if (renderCustomItem) {
      return renderCustomItem({ item, highlightedValue });
    }

    return  <TouchableOpacity onPress={() => handleSelectItem(value)}>
    <View style={{height:30,width:"90%",justifyContent:'center',marginVertical:2,borderRadius:10,marginLeft:4}}>
            <Text style={{color:"black"}}>{highlightedValue}</Text>
    </View>
  </TouchableOpacity>
  };

  const highlightSearchedLetters = (text, searchTerm) => {
    if (!searchTerm) {
      return <Text>{text}</Text>;  // Return plain text if no search term
    }

    const searchLetters = searchTerm.toLowerCase().split('');
    const lowerText = text.toLowerCase();

    let startIndex = 0;
    const highlightedParts = [];

    searchLetters.forEach((searchLetter, i) => {
      const matchIndex = lowerText.indexOf(searchLetter, startIndex);
      if (matchIndex === -1) return;  // Stop if the letter is not found

      // Add the text before the match
      highlightedParts.push(
        <Text key={`before-${i}`} style={{ color: 'black' }}>
          {text.slice(startIndex, matchIndex)}
        </Text>
      );

      // Add the matched letter with highlight style
      highlightedParts.push(
        <Text key={`match-${i}`} style={highlightStyle}>
          {text[matchIndex]}
        </Text>
      );

      // Move startIndex forward
      startIndex = matchIndex + 1;
    });

    // Add the remaining text after the last match
    highlightedParts.push(
      <Text key="after" style={{ color: 'black' }}>
        {text.slice(startIndex)}
      </Text>
    );

    return <Text>{highlightedParts}</Text>;  // Return the combined result
  };

  useEffect(()=>{
        
  },[filteredData])

  return (
    <View style={[{flexDirection:'column'},containerStyle]}>
      {textbox && <View style={[{ height: 55, justifyContent: 'center', backgroundColor: 'grey' }, inputContainerStyle]}>
        <TextInput
          value={searchValue}
          placeholder={searchPlaceholder}
          style={[{ padding: 0, fontSize: 20, paddingHorizontal: 10, paddingTop: 5, marginHorizontal: 20, }, inputStyle]}
          onChangeText={(e)=>{
            console.log(e)
            setSearchValue(e)
            if(appear){
              setAppear(!appear);
            }         
          }}
          placeholderTextColor={placeholderTextColor}
          ref={inputRef}
        />
      </View>}
      
      {!appear && <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.value}
        style={[listStyle]}
        contentContainerStyle={listContentStyle}
        ListFooterComponent={()=>{
          if(filteredData.length == 0 && data.length != 0){
            return(
              <Text style={[highlightStyle,{color:'red'}]}>No Match</Text>
            )
          }
        }}
      />}
    </View>
  );
}

SearchHighlight.propTypes = {
  data: PropTypes.array.isRequired,
  textbox:PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  highlightStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  inputContainerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  listStyle: PropTypes.object,
  listContentStyle: PropTypes.object,
  renderCustomItem: PropTypes.func,
  placeholderTextColor:PropTypes.string,
  onSelectItem: PropTypes.func 
};

