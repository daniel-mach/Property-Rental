import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const user = await User.findOne({ _id: userId });

    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
