import { turso } from "@/app/libs/connect";

export async function GET() {
  try {
    const transactions = await turso.execute("SELECT * FROM transactions");

    return Response.json({ status: 200, data: transactions.rows, message: "Transactions retrieved successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500, message: "Internal server error when retrieving transactions. Error: " + error });
  }
}

export async function POST(request: Request) {
  try {
    const { date, transaction_type, world_order, congregation_expenses, extra_description1, extra_amount1, extra_description2, extra_amount2, extra_description3, extra_amount3, total, filled_by, verified_by } = await request.json();

    const transaction = await turso.execute({
      sql:
        `INSERT INTO 
        transactions (
          date, created_at, transaction_type, world_order, congregation_expenses, 
          extra_description1, extra_amount1, extra_description2, extra_amount2, extra_description3, extra_amount3,
          total, filled_by, verified_by) 
        VALUES 
          (?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, 
          ?, ?, ?)`,
      args: [
        date, new Date().toISOString(), transaction_type, world_order, congregation_expenses,
        extra_description1, extra_amount1, extra_description2, extra_amount2, extra_description3, extra_amount3,
        total, filled_by, verified_by
      ]
    });

    return Response.json({ status: 200, data: transaction.rows, message: "Transaction created successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 500, message: "Internal server error when creating transaction. Error: " + error });
  }
}
