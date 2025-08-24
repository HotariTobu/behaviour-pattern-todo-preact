export const Item = (props: { children: string }) => (
  <div class="px-2 py-1 text-lg text-white rounded-md bg-gradient-to-br from-blue-500 to-purple-500 flex justify-center items-center select-none">
    {props.children}
  </div>
)
