export const AppTitle = (props: { children: string }) => (
  // biome-ignore lint/correctness/noRestrictedElements: Force to use the h1 element via this component
  <h1 class="uppercase text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 select-none">
    {props.children}
  </h1>
)
