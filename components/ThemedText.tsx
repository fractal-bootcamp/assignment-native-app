import { Text, type TextProps } from 'react-native';


export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function TText({
  className,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  return (
    <Text
      className={"text-[#2c3e50] font-[PlayfairDisplay-Regular] " + className}
      {...rest}
    />
  );
}