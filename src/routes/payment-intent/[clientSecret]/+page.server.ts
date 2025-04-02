export async function load({ params }) {
  const { clientSecret } = params;

  return { clientSecret };
}
