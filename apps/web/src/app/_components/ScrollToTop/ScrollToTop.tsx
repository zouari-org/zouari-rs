'use client';

import { ActionIcon, Affix, rem, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 40, right: 40 }}>
      {/* Transition ensures the button smoothly slides in/out.
        mounted={scroll.y > 200}: Only show after scrolling down 200px.
      */}
      <Transition transition="slide-up" mounted={scroll.y > 200}>
        {(transitionStyles) => (
          <ActionIcon
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            size="xl"
            radius="xl"
            color="zouariPrimary"
            variant="filled"
            aria-label="Scroll to top"
          >
            <IconArrowUp style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
