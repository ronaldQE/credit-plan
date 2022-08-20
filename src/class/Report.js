import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class Report {

    URL = 'https://ronaldqe.github.io/financial-mathematics/'

    constructor(){
     }
    getItems(items) {
        const list = items.map((item) => {
            let styleRow = (item.saldo === 'TOTAL') ? 'tableHeaderTotal' : 'tableRow'
            return [
                { text: item.num, style: styleRow },
                { text: item.saldo, style: styleRow },
                { text: item.amortizacion, style: styleRow },
                { text: item.interes, style: styleRow },
                { text: item.pago, style: styleRow },
                { text: item.fecha, style: styleRow }
            ]
        })
        return list
    }
    rowGracia(gracia, tipoCredit) {
        return (tipoCredit === "gracia" && gracia) ? ['Gracia:', { text: `${gracia} (meses)` }] : [{},{}]
    }

    async generateReport(dataTable, dataCredit) {
        const date = new Date()
        const outputDate = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear().toString()

        const reportHeader = (currentPage, pageCount, pageSize) => {
            return [
                {
                    style: 'tableExample',
                    fontSize: 10,
                    margin: [50, 20, 50, 5],
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto'],
                        body: [
                            ['Matemática Financiera', { text: `Pagina: ${currentPage}/${pageCount}\n Fecha:${outputDate}`, noWrap: false }],
                        ]
                    },
                    layout: 'noBorders',

                },
                {
                    text: 'Plan de Pagos',
                    fontSize: 14,
                    bold: true,
                    margin: [50, 5, 50, 5],
                    alignment: 'center'

                },

            ]
        }

        var tableDetail = [
            {
                style: 'tableExample',
                fontSize: 10,
                margin: [0, 0, 0, 10],
                table: {
                    body: [
                        ['Monto:', { text: dataCredit.monto }],
                        ['Tasa:', { text: `${dataCredit.tasa} %  (${dataCredit.tipoTasa})` }],
                        ['Periodo:', { text: `${dataCredit.periodo} (meses)` }],
                        [...this.rowGracia(dataCredit.gracia, dataCredit.tipoCredit)]
                    ]
                },
                layout: 'noBorders',

            },
            {
                fontSize: 10,
                margin: [0, 0, 0, 0],
                table: {
                    headerRows: 1,
                    widths: [40, 80, 80, 80, 100, 80],
                    body: [

                        [{
                            text: 'N°', style: 'tableHeader'
                        },
                        {
                            text: 'Saldo', style: 'tableHeader'
                        },
                        {
                            text: "Amortización", style: 'tableHeader'
                        },
                        {
                            text: "Interés", style: 'tableHeader'
                        },
                        {

                            text: "Pago", style: 'tableHeader'
                        },
                        {
                            text: "Fecha", style: 'tableHeader'
                        },
                        ],
                        ...this.getItems(dataTable)

                    ],
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 1 || i === node.table.body.length - 1) ? 0.75 : 0;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 0;
                    },
                },
            },
        ]

        const rodape = [
            {
                text: `Visita: ${this.URL}`,
                fontSize: 10,
                margin: [20, 20, 50, 20],
                alignment: 'right',
                color: ''
            },
        ]

        const report = {
            pageSize: 'letter',
            pageMargins: [50, 80, 50, 70],
            header: reportHeader,
            content: [tableDetail],
            footer: [rodape],

            styles: {
                tableHeader: {
                    bold: true,
                    color: 'black',
                    alignment: 'right'

                },
                tableHeaderTotal: {
                    bold: true,
                    color: 'black',
                    alignment: 'right'
                },
                tableRow: {

                    color: 'black',
                    alignment: 'right'
                },

            },
        }
        pdfMake.createPdf(report).download()

    }

}