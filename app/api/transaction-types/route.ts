import { turso } from "@/app/libs/connect";

export async function GET() {
  try {
    const transactionTypes = await turso.execute("SELECT * FROM transaction_types");

    return Response.json({ status: 200, data: transactionTypes.rows, message: "Transaction types retrieved successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500, message: "Internal server error when retrieving transaction types. Error: " + error });
  }
}