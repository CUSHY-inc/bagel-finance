import { prisma } from "@/lib/prisma";
import { postTelegramApi } from "@/lib/telegramApi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const preCheckoutQuery = body.pre_checkout_query;
    const successfulPayment = body.message?.successful_payment;
    if (preCheckoutQuery) {
      const invoiceId = preCheckoutQuery.invoice_payload;
      const amount = preCheckoutQuery.total_amount;
      const userId = preCheckoutQuery.from.id.toString();
      if (!invoiceId) {
        return NextResponse.json({});
      }
      const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: { pack: true },
      });
      if (!invoice) {
        return NextResponse.json({});
      }
      if (
        invoice.pack.stars * invoice.quantity === amount &&
        invoice.userId === userId
      ) {
        await postTelegramApi("/answerPreCheckoutQuery", {
          pre_checkout_query_id: preCheckoutQuery.id,
          ok: true,
        });
        await prisma.invoice.update({
          where: { id: invoiceId },
          data: { status: "PENDING" },
        });
      }
    }
    if (successfulPayment) {
      const invoiceId = successfulPayment.invoice_payload;
      if (!invoiceId) {
        return NextResponse.json({});
      }
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: {
          status: "PAID",
          telegramPaymentChargeId: successfulPayment.telegram_payment_charge_id,
          providerPaymentChargeId: successfulPayment.provider_payment_charge_id,
        },
      });
    }
    return NextResponse.json({});
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
