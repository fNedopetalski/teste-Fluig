let Model = class Model {
    constructor(controller) {
        this._controller = controller
    }

    getResponsavel() {
        return [
            {
                nome: "Usuário 1",
                codigo: "01"
            },
            {
                nome: "Usuário 2",
                codigo: "02"
            },
            {
                nome: "Usuário 3",
                codigo: "03"
            },
            {
                nome: "Usuário 4",
                codigo: "04"
            },
            {
                nome: "Usuário 5",
                codigo: "05"
            },
            {
                nome: "Usuário 6",
                codigo: "06"
            },
            {
                nome: "Usuário 7",
                codigo: "07"
            },
            {
                nome: "Usuário 8",
                codigo: "08"
            }
        ]
    }

    getFilial() {
        return [
            {
                filial: "Filial 1",
                cnpj: "00.000.000/0001-00"
            },
            {
                filial: "Filial 2",
                cnpj: "00.000.000/0002-00"
            },
            {
                filial: "Filial 3",
                cnpj: "00.000.000/0003-00"
            },
            {
                filial: "Filial 4",
                cnpj: "00.000.000/0004-00"
            },
            {
                filial: "Filial 5",
                cnpj: "00.000.000/0005-00"
            },
            {
                filial: "Filial 6",
                cnpj: "00.000.000/0006-00"
            },
            {
                filial: "Filial 7",
                cnpj: "00.000.000/0007-00"
            },
        ]
    }

    getCodFiliais() {
        return [
            {
                codigo: "1234"
            },
            {
                codigo: "4321"
            },
            {
                codigo: "0000"
            }
        ]
    }
}