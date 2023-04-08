require("dotenv").config();

const { v4: uuidv4 } = require('uuid');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN)
const chapaToken = process.env.CHAPA_TOKEN;


const welcomeText = `
Hi there, this is an example of how you can integerate Chapa to your telegram bot.

/start - to start the bot
/item - to list Item

by @yohan_nes`;

bot.start(async (ctx) => {
    return await ctx.reply(welcomeText);
});

bot.command("item", async (ctx) => {
    await ctx.reply("Here is the item...")

    const invoiceTitle = "Kirar for sale!";
    const invoiceDescription = "In Ethiopia and Eritrea played 5-string lyre (krar, kirar). Ready-to-play instrument. Oil finish. It has a beautiful tone und keeps in tune."
    const invoiceCurrency = "ETB";
    const price = +1500;
    const needShippingAddress = false;

    const kirarInvoice = {
        title: invoiceTitle,
        description: invoiceDescription,
        prices: [
            { label: "Buy Kirar", amount: price * 100 }, // you would need to do this because telegram min and max check out here for more https://core.telegram.org/bots/payments/currencies.json
        ],
        currency: invoiceCurrency,
        payload: `txRef_${uuidv4()}`,
        provider_token: chapaToken,
        photo_url: "https://i.etsystatic.com/19083762/r/il/feb451/3712093551/il_fullxfull.3712093551_58y2.jpg",
        /* need_shipping_address: needShippingAddress,
        need_name: true,
        need_phone_number: true,
        need_email: true,
        is_flexible: true, */
    }

    return await ctx.replyWithInvoice(kirarInvoice);
});

bot.launch();
console.log("Bot started successfully!");
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));