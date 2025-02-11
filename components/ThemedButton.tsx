import { TouchableOpacity, type TouchableOpacityProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemeButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemeButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const buttonStyle = [{ backgroundColor }, style];

  return (
    <TouchableOpacity
    style={buttonStyle}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({

});
