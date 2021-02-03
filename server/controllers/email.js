  var nodemailer = require('nodemailer');
  const Configuration = require('../models/configuration');
  const path = require('path');

  const send = async(req, res) => {
      const body = req.body;

      Configuration.findOne((err, config) => {
          if (err) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }

          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: config.email,
                  pass: config.password
              }
          });

          var mailOptions = {
              from: config.email,
              to: body.clientEmail,
              subject: 'Comprobante de compra El buen sabor',
              text: 'Gracias por su compra.',
              attachments: [{
                  filename: body.billNumber + '.pdf',
                  path: path.resolve(__dirname, `../../pdfs/${ body.billNumber }.pdf`),
                  contentType: 'application/pdf'
              }],
          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return res.json({
                      ok: false,
                      error
                  });
              }
              res.json({
                  ok: true,
                  detail: 'Email sent: ' + info.response,
                  message: 'Se envio la factura correctamente'
              });
          });
      });
  };

  module.exports = {
      send
  }