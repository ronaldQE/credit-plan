class PaymentPlan {

    constructor(monto, tasa, periodo, fechaIni) {
        this._periodo = periodo;
        this._monto = monto;
        this._tasa = tasa / 100;
        this._fechaIni = fechaIni;
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
    calcularPago_PriceFormat() {
        let res = (this._monto * ((this._tasa * (Math.pow((1 + this._tasa), this._periodo))) / ((Math.pow((1 + this._tasa), this._periodo)) - 1)))
        return this.#formatNum(res);
    }
    #calcularInteres(saldoAnterior) {
        return saldoAnterior * this._tasa
    }

    generatePlan_Price() {
        const PAGO = this.#calcularPago_Price()
        let res = []
        let saldoAnt = this._monto;
        for (let i = 0; i < this._periodo; i++) {
            let interesMes = this.#calcularInteres(saldoAnt)
            let saldoMes = this.#calcularSaldo_Price(saldoAnt, PAGO)
            let cuotaMes = {
                num: (i + 1),
                saldo: this.#formatNum(saldoMes),
                amortizacion: this.#formatNum(PAGO - interesMes),
                interes: this.#formatNum(interesMes),
                pago: this.#formatNum(PAGO),
                fecha: this.#fechaAddMes(i)
            }

            res.push(cuotaMes)
            saldoAnt = saldoMes
        }

        return res
    }

    #formatNum(number) { //12.222,02
        return (new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number))
    }

    #calcularAmortizacion_Const() {
        return this._monto / this._periodo
    }

    generatePlan_Const() {
        const AMORTIZACION = this.#calcularAmortizacion_Const()
        let res = []
        let saldoAnt = this._monto;
        for (let i = 0; i < this._periodo; i++) {
            let interesMes = this.#calcularInteres(saldoAnt)
            let saldoMes = this.#calcularSaldo_Const(saldoAnt, AMORTIZACION)
            let cuotaMes = {
                num: (i + 1),
                saldo: this.#formatNum(saldoMes),
                amortizacion: this.#formatNum(AMORTIZACION),
                interes: this.#formatNum(interesMes),
                pago: this.#formatNum(AMORTIZACION + interesMes),
                fecha: this.#fechaAddMes(i)

            }

            res.push(cuotaMes)
            saldoAnt = saldoMes
        }

        return res
    }

    generatePlan_Price_Gracia(numGracia) {
        let res = []
        const PAGO = this.#calcularPago_Price()
        let saldoAnt = this._monto;
        for (let i = 0; i < (this._periodo + numGracia); i++) {
            if (i < numGracia) {
                let interesMes = this.#calcularInteres(this._monto)
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
                let cuotaMes = {
                    num: (i + 1),
                    saldo: this.#formatNum(saldoMes),
                    amortizacion: this.#formatNum(PAGO - interesMes),
                    interes: this.#formatNum(interesMes),
                    pago: this.#formatNum(PAGO),
                    fecha: this.#fechaAddMes(i)

                }

                res.push(cuotaMes)
                saldoAnt = saldoMes
            }
        }

        return res

    }
    generatePlan_Const_Gracia(numGracia) {
        const AMORTIZACION = this.#calcularAmortizacion_Const()
        let res = []
        let saldoAnt = this._monto;
        for (let i = 0; i < (this._periodo + numGracia); i++) {
            if (i < numGracia) {
                let interesMes = this.#calcularInteres(this._monto)
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
                let cuotaMes = {
                    num: (i + 1),
                    saldo: this.#formatNum(saldoMes),
                    amortizacion: this.#formatNum(AMORTIZACION),
                    interes: this.#formatNum(interesMes),
                    pago: this.#formatNum(AMORTIZACION + interesMes),
                    fecha: this.#fechaAddMes(i)

                }

                res.push(cuotaMes)
                saldoAnt = saldoMes
            }
        }

        return res
    }

    #fechaAddMes(n) {
        var fecha = new Date(this._fechaIni)
        fecha.setMonth(fecha.getMonth() + n)
        return `${fecha.getDate()}/${(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
    }

}

export default PaymentPlan;

