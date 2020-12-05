const pdf = require('html-pdf');

const create = async(req, res) => {
    let body = req.body;
    const contenido = `
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        th, td {
            padding: 15px;
            text-align: left;
        }
        #t01 {
            width: 100%;    
            background-color: #eee;
        }
    </style>

    <h1>Factura el buen sabor</h1>
    <p>Detalle de la compra</p>

    <table id="t01">
        <tr>
            <th>Cantidad</th>
            <th>Articulo</th> 
            <th>Precio</th>
            <th>Subtotal</th>
        </tr>
        <tr>
            <td>1</td>
            <td>pizza</td>
            <td>500</td>
            <td>500</td>
        </tr>
    </table>
    
    <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
      <img src="https://i.pinimg.com/originals/c2/bf/8f/c2bf8fe358f491df2bc6ebc34057172f.jpg" width="150" height="27" align="left">
      <p style="color: #666; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .85em">
        El buen sabor
      </p>
    </div>
    `;

    const options = {
        "format": 'A4',
        "pageHeader": {
            "height": "60px"
        },
        "footer": {
            "height": "22mm"
        }
    };

    pdf.create(contenido, options).toFile('./pdfs/' + body.nombre + '.pdf', function(err, resPDF) {
        if (err) {
            console.log(err);
        } else {
            console.log(resPDF);
            res.json({
                ok: true,
                mensaje: "Se genero la factura en formato pdf"
            });
        }
    });
};

module.exports = {
    create
};