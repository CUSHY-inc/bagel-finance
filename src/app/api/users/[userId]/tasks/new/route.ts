import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    const tasks = await prisma.task.findMany({
      where: { isDeleted: false },
      include: { userTasks: { where: { userId } } },
    });
    for (const task of tasks) {
      if (task.userTasks.length === 0) {
        return NextResponse.json(true);
      }
      if (task.userTasks[0].status !== "CLAIMED") {
        return NextResponse.json(true);
      }
    }
    return NextResponse.json(false);
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(e, { status: 500 });
  }
}
