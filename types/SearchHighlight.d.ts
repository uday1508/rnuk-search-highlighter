import * as React from 'react';
import { ViewStyle, TextStyle, TextInputProps, FlatListProps } from 'react-native';
import SearchHighlight from '../components/SearchHighlight';

export interface SearchHighlightProps {
  data?: string[];
  textbox?: boolean;
  searchPlaceholder?: string;
  highlightStyle?: TextStyle;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  listStyle?: ViewStyle;
  listContentStyle?: ViewStyle;
  renderCustomItem?: (params: { item: { value: string }, highlightedValue: React.ReactNode }) => React.ReactNode;
  placeholderTextColor?: string;
  onSelectItem?: (item: string) => void;
}

export default class SearchHighlight extends React.Component<SearchHighlightProps> {}
