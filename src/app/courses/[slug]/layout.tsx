export default function courseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>Layout</h1>
            {children}
        </div>
    )
}