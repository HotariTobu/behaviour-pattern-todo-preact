import { AppBody } from "@/components/app-body/app-body"
import { useAppBody } from "@/components/app-body/use-app-body"
import { AppTitle } from "@/components/app-title/app-title"
import { Container } from "@/components/container/container"
import { Flex } from "@/components/flex/flex"
import { Root } from "@/components/root/root"
import { Text } from "@/components/text/text"

export const App = () => {
  return (
    <>
      <Root>
        <Flex dir="col" justify="center" items="center" gap="md" p="md">
          <Container>
            <Flex dir="col" gap="md">
              <AppTitle>my todo app</AppTitle>
              <AppBody useAppBody={useAppBody} />
            </Flex>
          </Container>
        </Flex>
      </Root>
      <a
        class="absolute bottom-1 left-1"
        href="./storybook/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text color="text-secondary">Storybook</Text>
      </a>
    </>
  )
}
