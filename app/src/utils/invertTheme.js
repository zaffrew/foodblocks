export default function invertTheme(theme) {
    const oldColors = theme.colors;
    return {
        ...theme, colors: {
            ...theme.colors,
            primary: oldColors.background,
            background: oldColors.primary,
            text: oldColors.background,
            placeholder: oldColors.background,
        }
    }
}
