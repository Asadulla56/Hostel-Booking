import { Webhook } from "svix";
import User from "../models/User.js";
import bodyParser from "body-parser";

const clerkWebhooks = [
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const wh = new Webhook(process.env.CLERK_WEBHOOKS_KEY);
      const headers = {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      };
      const payload = req.body;

      // verify
      const evt = wh.verify(payload, headers);
      const { data, type } = evt;

      const primaryEmail = data.email_addresses.find(email => email.id === data.primary_email_address_id);
      if (!primaryEmail) {
        return res.status(400).json({ success: false, message: "Primary email not found" });
      }

      const userData = {
        _id: data.id,
        email: primaryEmail.email_address,
        username: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      };

      // switch case events
      switch (type) {
        case "user.created": {
          await User.create(userData);
          break;
        }
        case "user.updated": {
          await User.findByIdAndUpdate(data.id, userData);
          break;
        }
        case "user.deleted": {
          await User.findByIdAndDelete(data.id);
          break;
        }

        default:
          break;
      }
      res.json({ success: true, message: "Webhook Received" });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
];

export default clerkWebhooks;
