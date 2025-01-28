const getSiteUrl = () => {
  return (
    process.env.SITE ||
    import.meta.env.SITE ||
    (import.meta.env.PROD ? "https://learn.tutly.in" : "http://localhost:4321")
  );
};

export { getSiteUrl };
