import { Text as RNText, StyleProp, TextStyle } from "react-native";
import { twMerge } from "tailwind-merge";

type TextVariants =
  | "headingLarge"
  | "headingMedium"
  | "headingSmall"
  | "paragraphLarge"
  | "paragraphMedium"
  | "paragraphSmall"
  | "caption";

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariants;
  bold?: boolean;
  semiBold?: boolean;
  italic?: boolean;
  color?: string;
  style?: StyleProp<TextStyle>;
  className?: string;
}

export function Text({
  children,
  variant = "paragraphMedium",
  bold,
  semiBold,
  italic,
  color,
  style,
  className,
  ...rest
}: TextProps) {
  const fontClass = getFontClass({ bold, semiBold, italic });
  const sizeClass = getSizeClass(variant);

  return (
    <RNText
      className={twMerge(sizeClass, fontClass, className)}
      style={[color ? { color } : {}, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

function getSizeClass(variant: TextVariants): string {
  switch (variant) {
    case "headingLarge":
      return "text-[32px] leading-[38.4px] font-bold";
    case "headingMedium":
      return "text-[24px] leading-[30px] font-bold";
    case "headingSmall":
      return "text-[18px] leading-[23.4px] font-semibold";
    case "paragraphLarge":
      return "text-[16px] leading-[22px] font-normal";
    case "paragraphMedium":
      return "text-[14px] leading-[20px] font-normal";
    case "paragraphSmall":
      return "text-[12px] leading-[18px] font-normal";
    case "caption":
      return "text-[10px] leading-[14px] font-normal";
    default:
      return "";
  }
}

function getFontClass({
  bold,
  semiBold,
  italic,
}: {
  bold?: boolean;
  semiBold?: boolean;
  italic?: boolean;
}): string {
  if (bold && italic) return "font-bold italic";
  if (bold) return "font-bold";
  if (semiBold) return "font-semibold";
  if (italic) return "italic";
  return "font-normal";
}
