import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import connectToDB from "@/lib/mongodb";
import User from "@/models/User";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request) {
  if (!webhookSecret) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Handle the webhook
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      await connectToDB();

      const { id, email_addresses, first_name, last_name } = evt.data;

      const user = new User({
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        role: "job_seeker", // Default role
      });

      await user.save();
      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.updated") {
    try {
      await connectToDB();

      const { id, email_addresses, first_name, last_name } = evt.data;

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0].email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
        }
      );

      console.log("User updated:", id);
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.deleted") {
    try {
      await connectToDB();

      const { id } = evt.data;

      await User.findOneAndDelete({ clerkId: id });
      console.log("User deleted:", id);
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Webhook processed successfully" });
}
