import React, { useState }  from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type InputProps = {
  state: 'default' | 'active' | 'filled' | 'error' | 'disable' | 'fetching';
  disable?: boolean;
  error?: boolean;
  ishelperText?: boolean;
  label: string;
  labelState: 'error' | 'disable';
  linkTextButton: {
    type: 'default' | 'active' | 'inactive';
    rightArrow?: boolean;
    leftArrow?: boolean;
    text: string;
  };
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
};

const InputText: React.FC<InputProps> = ({
  state,
  disable,
  error,
  ishelperText,
  label,
  labelState,
  linkTextButton,
  value,
  placeholder,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Handle input styles based on different states
  const getInputStyles = () => {
    switch (state) {
      case 'active':
        return styles.active;
      case 'filled':
        return styles.filled;
      case 'error':
        return styles.error;
      case 'disable':
        return styles.disable;
      case 'fetching':
        return styles.fetching;
      default:
        return styles.default;
    }
  };

  // Handle label styles based on its state
  const getLabelStyles = () => {
    if (labelState === 'error') {
      return styles.labelError;
    } else if (labelState === 'disable') {
      return styles.labelDisable;
    }
    return styles.label;
  };

  // Handle link button styles
  const getLinkButtonStyles = () => {
    switch (linkTextButton.type) {
      case 'active':
        return styles.linkActive;
      case 'inactive':
        return styles.linkInactive;
      default:
        return styles.linkDefault;
    }
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={getLabelStyles()}>{label}</Text>

      {/* TextInput */}
      <View style={[styles.inputWrapper, getInputStyles()]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          editable={!disable}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* Link Button with optional arrows */}
        <TouchableOpacity style={styles.linkWrapper}>
          {linkTextButton.leftArrow && <Image source={require('./path-to-left-arrow.png')} style={styles.arrow} />}
          <Text style={getLinkButtonStyles()}>{linkTextButton.text}</Text>
          {linkTextButton.rightArrow && <Image source={require('./path-to-right-arrow.png')} style={styles.arrow} />}
        </TouchableOpacity>
      </View>

      {/* Helper Text */}
      {ishelperText && error && <Text style={styles.helperText}>This is an error message.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
  labelError: {
    fontSize: 14,
    color: '#F44336',
  },
  labelDisable: {
    fontSize: 14,
    color: '#D3D3D3',
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  default: {
    borderColor: '#ccc',
  },
  active: {
    borderColor: '#007AFF',
  },
  filled: {
    borderColor: '#4CAF50',
  },
  error: {
    borderColor: '#F44336',
  },
  disable: {
    borderColor: '#D3D3D3',
    backgroundColor: '#F0F0F0',
  },
  fetching: {
    borderColor: '#FFD700',
  },
  helperText: {
    color: '#F44336',
    marginTop: 5,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkDefault: {
    color: '#808080',
  },
  linkActive: {
    color: '#007AFF',
  },
  linkInactive: {
    color: '#999999',
  },
  arrow: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
});

export default InputText;
