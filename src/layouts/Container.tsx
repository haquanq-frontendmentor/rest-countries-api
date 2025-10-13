export const Container = (props: { children: React.JSX.Element }) => {
  return <div className="mx-auto w-[min(100vw-3rem,80rem)]">{props.children}</div>;
};
