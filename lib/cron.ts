import cron from "node-cron";
import { connect } from "./db";
import { Confirmation } from "./models";

export function startCron() {
  cron.schedule("*/5 * * * *", async () => {
    await connect();
    const mpesaMessages = await (Confirmation as any)
      .find({ source: "mpesa" })
      .lean();
    for (const msg of mpesaMessages) {
      const pendingUser = await (Confirmation as any).findOne({
        source: "user",
        message: msg.message,
        status: "pending",
      });
      if (pendingUser) {
        pendingUser.status = "approved";
        await pendingUser.save();
      }
    }
  });
}

startCron();
