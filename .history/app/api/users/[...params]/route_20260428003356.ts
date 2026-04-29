export async function GET(
  req: Request,
  { params }: { params: { params: string[] } }
) {
  return Response.json({
    allParams: params.params
  });
}