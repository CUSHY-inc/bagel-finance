import { prisma } from "@/lib/prisma";
import { postTelegramApi } from "@/lib/telegramApi";
import { NextRequest, NextResponse } from "next/server";
import { transferToken } from "./transferToken";

async function processPreCheckoutQuery(preCheckoutQuery: {
  id: string;
  from: { id: number };
  currency: string;
  invoice_payload: string;
  total_amount: number;
}) {
  const invoiceId = preCheckoutQuery.invoice_payload;
  const totalAmount = preCheckoutQuery.total_amount;
  const userId = preCheckoutQuery.from.id.toString();
  if (!invoiceId) {
    return;
  }
  const exchange = await prisma.exchange.findUnique({
    where: { id: invoiceId, status: "DRAFT" },
  });
  if (exchange) {
    if (exchange.stars === totalAmount && exchange.userId === userId) {
      await postTelegramApi("/answerPreCheckoutQuery", {
        pre_checkout_query_id: preCheckoutQuery.id,
        ok: true,
      });
      await prisma.exchange.update({
        where: { id: invoiceId },
        data: { status: "PENDING" },
      });
    }
  }
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId, status: "DRAFT" },
    include: { pack: true },
  });
  if (invoice) {
    if (
      invoice.pack.stars * invoice.quantity === totalAmount &&
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
}

async function processSuccessfulPayment(successfulPayment: {
  invoice_payload: string;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
}) {
  const invoiceId = successfulPayment.invoice_payload;
  if (!invoiceId) {
    return;
  }
  const exchange = await prisma.exchange.findUnique({
    where: { id: invoiceId, status: "DRAFT" },
  });
  if (exchange) {
    const exchange = await prisma.exchange.update({
      where: { id: invoiceId },
      data: {
        status: "PAID",
        telegramPaymentChargeId: successfulPayment.telegram_payment_charge_id,
        providerPaymentChargeId: successfulPayment.provider_payment_charge_id,
      },
    });
    await transferToken(exchange);
  }
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId, status: "DRAFT" },
  });
  if (invoice) {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: "PAID",
        telegramPaymentChargeId: successfulPayment.telegram_payment_charge_id,
        providerPaymentChargeId: successfulPayment.provider_payment_charge_id,
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const preCheckoutQuery = body.pre_checkout_query;
    const successfulPayment = body.message?.successful_payment;
    if (preCheckoutQuery) {
      processPreCheckoutQuery(preCheckoutQuery);
    }
    if (successfulPayment) {
      processSuccessfulPayment(successfulPayment);
    }
    return NextResponse.json({});
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 500 });
  }
}
