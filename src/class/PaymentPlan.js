class PaymentPlan {

    constructor(monto, tasa, periodo) {
        //this._tipo=tipo;
        this._periodo = periodo;
        this._monto = monto;
        this._tasa = tasa / 100;
    }

    #calcularSaldo_Price(monto, pago) {
        let k = pago - (monto * (this._tasa))
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
    #calcularInetes_Price(saldoAnterior) {
        return saldoAnterior * this._tasa
    }

    generatePlan() {
        const PAGO = this.#calcularPago_Price()
        let res = []
        let saldoAnt = this._monto;
        for (let i = 0; i < this._periodo; i++) {
            let interesMes = this.#calcularInetes_Price(saldoAnt)
            let saldoMes = this.#calcularSaldo_Price(saldoAnt, PAGO)
            let cuotaMes = {
                num: (i + 1),
                saldo: this.#formatNum(saldoMes),
                interes: this.#formatNum(interesMes),
                amortizacion: this.#formatNum(PAGO - interesMes)
            }

            res.push(cuotaMes)
            saldoAnt = saldoMes
        }

        return res
    }
    
    #formatNum(number) { //12.222,02
        return (new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2}).format(number))
    }


}

let plan1 = new PaymentPlan(30000, 4.5, 6)

console.log("Pago: ",plan1.calcularPago_PriceFormat())
console.table(plan1.generatePlan())
//console.log(plan1.formatNum(52633.23589))