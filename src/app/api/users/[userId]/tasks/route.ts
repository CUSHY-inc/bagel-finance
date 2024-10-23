import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  const tasks = await prisma.task.findMany({
    where: { isDeleted: false },
    include: { userTasks: { where: { userId } } },
    orderBy: { id: "asc" },
  });
  const tasksWithUserTask = await Promise.all(
    tasks.map(async (task) => {
      if (task.userTasks.length === 0) {
        const newUserTask = await prisma.userTask.create({
          data: { userId, taskId: task.id },
        });
        return {
          ...task,
          userTasks: [newUserTask],
        };
      }
      return task;
    })
  );
  return NextResponse.json(tasksWithUserTask);
}
