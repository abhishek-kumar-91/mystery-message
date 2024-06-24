import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User message creation not found",
        },
        { status: 400 }
      );
    }
    //is user accepting the messages

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages",
        },
        { status: 403 }
      );
    }

    const newMessages = { content, createdAt: new Date() };
    user.messages.push(newMessages as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Messaag not sent ", error);
    return Response.json(
      {
        success: false,
        message: "message not sent",
      },
      { status: 400 }
    );
  }
}
