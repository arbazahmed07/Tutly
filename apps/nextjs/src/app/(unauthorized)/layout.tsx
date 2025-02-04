export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {props.children}
    </div>
  );
}
