const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "crishood.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.verify = async (transporter) => {
  const connection = await transporter.verify();
  if (connection) {
    console.log("Server is ready to take your message");
  }
};

exports.welcome = ({ artistName, email }) => {
  return {
    from: `"${process.env.MAIL_USERNAME}"<${process.env.MAIL_USER}>`,
    to: email,
    subject: `Dímelo ${artistName}`,
    html: `<div style="
    background-color: #008080;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/crishood/image/upload/v1657292358/dimelo-logo_gm23ua.png"
    alt="Logo Dímelo"
    width="250"
    style="margin-top: 16px"
  />
  <h2>
    Dímelo <strong>${artistName}</strong>, gracias por darnos tu confianza para
    ayudarte a encontrar a los mejores artistas en tu ciudad.
  </h2>
  <p>
    Esperamos que encuentres a las mejores personas para hacer la música más increíble de la galaxia.
  </p>
</div>`,
    text: `Dímelo <strong>${artistName}</strong>, racias por darnos tu confianza para
    ayudarte a encontrar a los mejores artistas en tu ciudad. E Esperamos que encuentres a las mejores personas para hacer la música más increíble de la galaxia.
    `,
  };
};
