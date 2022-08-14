class PaymentPlan {
    totales = {
        interes:0,
        amortizacion:0,
        pago:0
    }
    constructor(monto, tasa, periodo, fechaIni) {
        this._periodo = periodo;
        this._monto = monto;
        this._tasa = tasa / 100;
        this._fechaIni = fechaIni;
    }

    calcularPago_PriceFormat() {
        let res = (this._monto * ((this._tasa * (Math.pow((1 + this._tasa), this._periodo))) / ((Math.pow((1 + this._tasa), this._periodo)) - 1)))
        return this.#formatNum(res);
    }
    #calcularSaldo_Price(monto, pago) {
        let k = pago - (monto * (this._tasa))
        if ((monto - k) <= 0) {
            return 0
        }
        return monto - k
    }
    #calcularSaldo_Const(monto, k) {
        if ((monto - k) <= 0) {
            return 0
        }
        return monto - k
    }

    #calcularPago_Price() {
        let res = (this._monto * ((this._tasa * (Math.pow((1 + this._tasa), this._periodo))) / ((Math.pow((1 + this._tasa), this._periodo)) - 1)))
        return res;
    }
    #calcularInteres(saldoAnterior) {
        return saldoAnterior * this._tasa
    }
    getTotales(){
        return this.totales
    }
    #initialTotals(){
        this.totales.amortizacion = 0
        this.totales.interes = 0
        this.totales.pago = 0
    }
    #updateTotals(amortizacion, interes, pago){
        this.totales.amortizacion = this.totales.amortizacion + amortizacion
        this.totales.interes = this.totales.interes + interes
        this.totales.pago = this.totales.pago + pago

    }

    #formatNum(number) { //12.222,02
        return (new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number))
    }
    #totales(){
        return ({
            num:" ",
            saldo: "TOTAL",
            amortizacion: this.#formatNum(this.totales.amortizacion),
            interes:this.#formatNum(this.totales.interes),
            pago: this.#formatNum(this.totales.pago),
            fecha:" "
        })
    }
    generatePlan_Price() {
        this.#initialTotals()
        const PAGO = this.#calcularPago_Price()
        let res = []
        let saldoAnt = this._monto;
        for (let i = 0; i < this._periodo; i++) {
            let interesMes = this.#calcularInteres(saldoAnt)
            let saldoMes = this.#calcularSaldo_Price(saldoAnt, PAGO)
            let amortizacionMes = PAGO - interesMes
            this.#updateTotals(amortizacionMes, interesMes, PAGO)
            let cuotaMes = {
                num: (i + 1),
                saldo: this.#formatNum(saldoMes),
                amortizacion: this.#formatNum(amortizacionMes),
                interes: this.#formatNum(interesMes),
                pago: this.#formatNum(PAGO),
                fecha: this.#fechaAddMes(i)
            }

            res.push(cuotaMes)
            saldoAnt = saldoMes
        }
        res.push(this.#totales())

        return res
    }
    

    #calcularAmortizacion_Const() {
        return this._monto / this._periodo
    }

    generatePlan_Const() {
        this.#initialTotals()
        const AMORTIZACION = this.#calcularAmortizacion_Const()
        let res = []
        let saldoAnt = this._monto;
        for (let i = 0; i < this._periodo; i++) {
            let interesMes = this.#calcularInteres(saldoAnt)
            let saldoMes = this.#calcularSaldo_Const(saldoAnt, AMORTIZACION)
            let pagoMes = AMORTIZACION + interesMes
            this.#updateTotals(AMORTIZACION, interesMes, pagoMes)
            let cuotaMes = {
                num: (i + 1),
                saldo: this.#formatNum(saldoMes),
                amortizacion: this.#formatNum(AMORTIZACION),
                interes: this.#formatNum(interesMes),
                pago: this.#formatNum(pagoMes),
                fecha: this.#fechaAddMes(i)

            }

            res.push(cuotaMes)
            saldoAnt = saldoMes
        }
        res.push(this.#totales())

        return res
    }

    generatePlan_Price_Gracia(numGracia) {
        let res = []
        this.#initialTotals()
        const PAGO = this.#calcularPago_Price()
        let saldoAnt = this._monto;
        for (let i = 0; i < (parseInt(this._periodo) + parseInt(numGracia)); i++) {
            if (i < numGracia) {
                let interesMes = this.#calcularInteres(this._monto)
                this.#updateTotals(0, interesMes, interesMes)
                let cuotaMes = {
                    num: (i + 1),
                    saldo: this.#formatNum(this._monto),
                    amortizacion: this.#formatNum(0),
                    interes: this.#formatNum(interesMes),
                    pago: this.#formatNum(interesMes),
                    fecha: this.#fechaAddMes(i)

                }
                res.push(cuotaMes)
            } else {
                let interesMes = this.#calcularInteres(saldoAnt)
                let saldoMes = this.#calcularSaldo_Price(saldoAnt, PAGO)
                let amortizacionMes = PAGO - interesMes
                this.#updateTotals(amortizacionMes, interesMes, PAGO)

                let cuotaMes = {
                    num: (i + 1),
                    saldo: this.#formatNum(saldoMes),
                    amortizacion: this.#formatNum(amortizacionMes),
                    interes: this.#formatNum(interesMes),
                    pago: this.#formatNum(PAGO),
                    fecha: this.#fechaAddMes(i)

                }

                res.push(cuotaMes)
                saldoAnt = saldoMes
            }
        }
        res.push(this.#totales())

        return res

    }
    generatePlan_Const_Gracia(numGracia) {
        this.#initialTotals()
        const AMORTIZACION = this.#calcularAmortizacion_Const()
        let res = []
        let saldoAnt = this._monto;
        for (let i = 0; i < (parseInt(this._periodo) + parseInt(numGracia)); i++) {
            if (i < numGracia) {
                let interesMes = this.#calcularInteres(this._monto)
                this.#updateTotals(0, interesMes, interesMes)
                let cuotaMes = {
                    num: (i + 1),
                    saldo: this.#formatNum(this._monto),
                    amortizacion: this.#formatNum(0),
                    interes: this.#formatNum(interesMes),
                    pago: this.#formatNum(interesMes),
                    fecha: this.#fechaAddMes(i)

                }

                res.push(cuotaMes)
            } else {
                let interesMes = this.#calcularInteres(saldoAnt)
                let saldoMes = this.#calcularSaldo_Const(saldoAnt, AMORTIZACION)
                let pagoMes = AMORTIZACION + interesMes
                this.#updateTotals(AMORTIZACION, interesMes, pagoMes)

                let cuotaMes = {
                    num: (i + 1),
                    saldo: this.#formatNum(saldoMes),
                    amortizacion: this.#formatNum(AMORTIZACION),
                    interes: this.#formatNum(interesMes),
                    pago: this.#formatNum(pagoMes),
                    fecha: this.#fechaAddMes(i)

                }

                res.push(cuotaMes)
                saldoAnt = saldoMes
            }
        }
        res.push(this.#totales())

        return res
    }

    #fechaAddMes(n) {
        var fecha = new Date(this._fechaIni)
        fecha.setMonth(fecha.getMonth() + n)
        return `${fecha.getDate()}/${(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
    }

}

export default PaymentPlan;

