let View = class View {
  constructor(controller, model) {
    this._controller = controller;
    this._model = model;

    this._filters = new Object();
    this._modals = new Object();
    this._calendars = new Object();
  }

  loadMasks() {
    $('.data-mask').mask('00/00/0000');
    $('.cnpj').mask('00.000.000/0000-00');
    $('.cep').mask('00000-000');
    this._calendars["prazoEntrega"] = FLUIGC.calendar('#prazoEntrega', {
      pickDate: true, 
      pickTime: false, 
      useMinutes: false, 
      useSeconds: false, 
      useCurrent: true,
      showToday: true,
      minDate: this._controller.getDataAtual(),
      language: 'pt-br',
      defaultDate: "",
      disabledDates: [],
      enabledDates: [],
      useStrict: false,
      sideBySide: false,
      daysOfWeekDisabled: []
  });
  }

  loadFilters() {
    var users = this._model.getResponsavel()
    this._filters["usuarioCadastro"] = FLUIGC.filter('#usuarioCadastro', {
      source: users,
      displayKey: 'nome',
      multiSelect: false,
      minLength:0,
      style: {
        autocompleteTagClass: 'tag-gray',
        tableSelectedLineClass: 'info'
      },
      table: {
        header: [{
          'title': 'Usuário',
          'dataorder': 'nome',
          'standard': true
        }, {
          'title': 'Cod. Usuário',
          'dataorder': 'codigo'
        }],
        renderContent: ["nome", "codigo"]
      }
    });

    this._filters["usuarioCadastro"].on('fluig.filter.item.added', function (data) {
      $("#codusuarioCadastro").val(data.item.codigo)
    })
    this._filters["usuarioCadastro"].on('fluig.filter.itemRemoved', function (data) {
      $("#codusuarioCadastro").val("")
    });


    var filiais = this._model.getFilial()
    this._filters["filial"] = FLUIGC.filter('#filialDestino', {
      source: filiais,
      displayKey: 'filial',
      multiSelect: false,
      minLength:0,
      style: {
        autocompleteTagClass: 'tag-gray',
        tableSelectedLineClass: 'info'
      },
      table: {
        header: [{
          'title': 'Filial',
          'dataorder': 'filial',
          'standard': true
        }, {
          'title': 'CNPJ',
          'dataorder': 'cnpj'
        }],
        renderContent: ["filial", "cnpj"]
      }
    });

    this._filters["filial"].on('fluig.filter.item.added', function (data) {
      $("#cnpj").val(data.item.cnpj)
    })
    this._filters["filial"].on('fluig.filter.itemRemoved', function (data) {
      $("#cnpj").val("")
    });
  }

}