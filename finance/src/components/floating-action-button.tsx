import { makeLayoutStyles } from '@/styles/layout-styles';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTheme } from '@/hooks/use-theme';
import { useMemo } from 'react';

export function FloatingActionButton() {
  const theme = useTheme();
  const styles = useMemo(() => makeLayoutStyles(theme), [theme]);

  return(
    <Pressable onPress={console.log('Apertado') ?? null} style = {styles.floatingContainer}>
        <Plus color={theme.backgroundElement}></Plus>
    </Pressable>
  )
}