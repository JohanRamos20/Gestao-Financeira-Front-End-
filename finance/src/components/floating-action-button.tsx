import { makeLayoutStyles } from '@/styles/layout-styles';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';
import { useMemo } from 'react';

export type FloatingActionButtonProps = {
    onPress : () => void,
}

export function FloatingActionButton(props : FloatingActionButtonProps) {
  const theme = useTheme();
  const styles = useMemo(() => makeLayoutStyles(theme), [theme]);

  return(
    <Pressable onPress={props.onPress} style = {styles.floatingContainer}>
        <Plus color={theme.backgroundElement}></Plus>
    </Pressable>
  )
}
