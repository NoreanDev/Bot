import { Comando, MessageAttachment } from "../../Client/index.js"
import { join } from "path"
import { createCanvas, loadImage, registerFont } from "canvas"
registerFont(join(__dirname, '../../Client/comicsans.ttf'), { family: 'Comic Sans' })

export default class extends Command {
    constructor(options) {
        super(options);
        this.nombre = "profile";
        this.aliases = ["pp"];
        this.cooldown = 20;
    }
    async execute(client, message, args) {
        try {

            let usuario = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => false) || message.author;
            if (usuario.bot) usuario = message.author

            const canvas = createCanvas(954, 647);
            const context = canvas.getContext('2d');

            const background = await loadImage(join(__dirname, "../../Client/fondo.jpg"));
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            context.shadowColor = "#000000";
            context.shadowBlur = 20;
            context.lineJoin = "bevel";
            context.lineWidth = 15;
            context.fillStyle = "rgba(180, 180, 180, 0.1)";
            context.fillRect(30, 30, 555, 215)

            context.fillStyle = "rgba(180, 180, 180, 0.1)";
            context.fillRect(30, 265, 650, 350)

            context.fillStyle = "rgba(180, 180, 180, 0.1)";
            context.fillRect(720, 30, 320, 215)

            context.shadowBlur = 0;

            applytxt(context, usuario.tag, 40, "#ffffff", 255, 95, "left"); // ctx, texto, tamaño del texto, color, x pos, y pos, alineado
            applytxt(context, "descripccion del usuario", 30, "#ffffff", 255, 125, "left");
            applytxt(context, "Tipo de cuenta", 40, "#ffffff", 255, 175, "left");

            applytxt(context, "Economía", 65, "#ffffff", 243, 310, "center");
            applytxt(context, "Economía", 65, "#000000", 243, 307, "center");

            applytxt(context, "Insignias", 65, "#ffffff", 755, 95, "center");
            applytxt(context, "Insignias", 65, "#000000", 755, 92, "center");

            applytxt(context, `Banco:`, 45, "#ffffff", 140, 377, "left");
            applytxt(context, `Banco:`, 45, "#000000", 140, 374, "left");

            applytxt(context, `Bolsillo:`, 45, "#ffffff", 140, 470, "left");
            applytxt(context, `Bolsillo:`, 45, "#000000", 140, 467, "left");

            applytxt(context, `diamantes:`, 45, "#ffffff", 140, 560, "left");
            applytxt(context, `diamantes:`, 45, "#000000", 140, 557, "left");

            applytxt(context, `Creditos: Tarjeta creada por Norean#5425`, 30, "#000000", 50, 630, "left");



            const avatar = await loadImage(usuario.displayAvatarURL({ dynamic: false, format: "png", size: 2048 }).replace(".webp", ".jpg"));
            context.beginPath();
            context.arc(140, 123, 90, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            context.drawImage(avatar, 50, 25, 190, 190);

            //await canvas.encode("png")

            const attachment = new MessageAttachment(await canvas.toBuffer(), 'tarjeta.jpg');
            attachment.setDescription(`tarjeta`);

            message.reply({
                files: [attachment],
                allowedMentions: { parse: [] }
            });

        } catch (err) {
            console.log(err);
        }

    }
}

function applytxt(ctx, text, size, color, x, y, aling) {
    if (!ctx) throw SyntaxError("El context no ha sido definido y esto es obligatorio");
    if (!text) throw SyntaxError("La opcion text debe ser de tipo string y es obligatorio");
    if (typeof size !== "number") throw SyntaxError("La opcion size debe ser de tipo number");
    if (!x || !y || isNaN(x) || isNaN(y)) throw SyntaxError("X y Y deben ser un numero y estos se requieren para posicionar el texto");

    ctx.font = `${size}px Comic Sans`; /// nombre de la fuente
    ctx.fillStyle = color
    ctx.textAlign = aling
    ctx.fillText(text, x, y);
    return ctx
};
